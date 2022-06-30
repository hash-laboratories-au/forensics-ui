import {Axios} from 'axios';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type ForensicsEventType = 'ATTACK' | 'PRONE_TO_NETWORK';

interface BlockInformation {
  Hash: string;
  Round: string;
  Number: string
  SignersAddress: string[]
}

export interface DetailedReport {
  key: string;
  divergingBlockNumber: number;
  divergingBlockHash: string;
  forensicsType: string;
  divergingPathsMap: RawNodeDatum,
  eventTime: string;
  daysSinceLastEvent: string;
  attackType: ForensicsEventType;
  fork1: BlockInformation;
  fork2: BlockInformation;
  suspeciousNodes: string[];
  timeSinceLastEvent?: string;
}

export interface NodeInfo {
  candidate: string;
  createdAt: string;
  owner: string;
  status: string;
  latestSignedBlock: number;
  dataCenter: {
    location: string;
    name: string;
  }
  hardware: string;
}

export interface InitialForensicsReports {
  key: string,
  forensicsType: string;
  eventTime: string;
  divergingBlockNumber: number;
  divergingBlockHash: string;
  numberOfSuspeciousNodes: number;
}

const request = new Axios({
  baseURL: process.env.FORENSICS_URL,
});

const explorerRequest = new Axios({
  baseURL: process.env.EXPLORER_URL,
});

const masterNodeInfoRequest = new Axios({
  baseURL: process.env.MASTERNODE_URL,
});

// Load the inital content from backend when the page is first landed
export const loadInitialForensicsEvents = async (numOfDays: string): Promise<InitialForensicsReports[]> => {
  // Default is 7
  let range = '7';
  switch (numOfDays) {
    case 'LAST_1_DAY':
      range = '1'
      break;
    case 'LAST_30_DAYS':
      range = '30'
      break;
    case 'ALL_HISTORY':
      range = 'all'
      break;
    default:
      break;
  }
  const {data} = await request.get('/batch/load', {
    params: { range }
  });
  return JSON.parse(data);
};

export const loadNewForensicsReports = async (lastItemId?: string): Promise<InitialForensicsReports[]> => {
  const {data} = await request.get('/load/latest', lastItemId? {
    params: { id: lastItemId }
  }: {});
  return JSON.parse(data);
};

export const getDetailedForensics = async(forensicsId: string): Promise<DetailedReport>  => {
  const {data} = await request.get('/load/detail', {
    params: { id: forensicsId }
  });
  
  return JSON.parse(data);
};

// Summary includes latest blocks, committed blocks, number of attacks and number of attackers
export const getLatestBlock = async () => {
  try {
    const {data} = await explorerRequest.get('/txs/listByType/all?page=1&limit=1');
    const blocks = JSON.parse(data).items;
    if (!blocks.length) {
      throw new Error("Not found new block");
    }
    return {
      hash: blocks[0].blockHash,
      number: blocks[0].blockNumber,
    }
    
  } catch (error) {
    console.error("Failed to get latest block", error);
    throw error;
  }
};


export const getNodeInfo = async(nodeKey: string): Promise<NodeInfo> => {
  try {
    const {data} = await masterNodeInfoRequest.get(`/candidates/${nodeKey}`);
    const nodeInfo = JSON.parse(data)
    return {
      candidate: nodeInfo.candidate,
      createdAt: nodeInfo.createdAt,
      owner: nodeInfo.owner,
      status: nodeInfo.status,
      latestSignedBlock: nodeInfo.latestSignedBlock,
      dataCenter: nodeInfo.dataCenter,
      hardware: nodeInfo.hardware,
    };
  } catch (error) {
    console.error("Error while fethcing node information", error);
    throw error;
  }
}