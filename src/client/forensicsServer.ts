import {Axios} from 'axios';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type ForensicsEventType = 'ATTACK' | 'PRONE_TO_NETWORK';

export interface BlockInformation {
  blockInfo: {
    Number: string;
    Hash: string;
    Round: string;
    SignersAddress: string[]
  }
  hashPath: string[]
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
  suspeciousNodes: string[];
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

let latestMinedBlock = { blockHash: '', blockNumber: '0'}
export const getLatestBlock = () => {
  return latestMinedBlock;
}

export const loadNewForensicsReports = async (lastItemId?: string): Promise<InitialForensicsReports[]> => {
  const {data} = await request.get('/load/latest', lastItemId? {
    params: { id: lastItemId }
  }: {});
  const latest = JSON.parse(data);
  // A shortcut to update latest mined block
  if(latest?.latestBlockInfo) {
    latestMinedBlock = latest?.latestBlockInfo
  }
  
  return latest.forensics;
};

export const getDetailedForensics = async(forensicsId: string): Promise<DetailedReport>  => {
  const {data} = await request.get('/load/detail', {
    params: { id: forensicsId }
  });
  
  return JSON.parse(data);
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