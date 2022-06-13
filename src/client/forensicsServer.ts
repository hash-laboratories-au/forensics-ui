import { sleep } from './utils';
import {Axios} from 'axios';
import { detailedForensicsReport, fakeNodeInfo, latestSummary, loadInitialReports, loadInitialReports_last30days, loadInitialReports_last7days, loadRealtimeNewReports } from './data/simulation';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export type ForensicsEventType = 'ATTACK' | 'PRONE_TO_NETWORK';

interface BlockInformation {
  hash: string;
  round: string;
  number: string
  signersAddress: string[]
}

export interface DetailedReport {
  id: string;
  DivergingHash: string;
  AcrossEpochs: boolean;
  divergingPathsMap: RawNodeDatum,
  eventTime: string;
  daysSinceLastEvent: string;
  eventType: ForensicsEventType;
  FORK_1: BlockInformation;
  FORK_2: BlockInformation;
  suspeciousNodes: string[];
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



const instance = new Axios({
  baseURL: '', // TODO: Add the baseURL of the backend service
});

// Load the inital content from backend when the page is first landed
export const loadInitialForensicsReports = async (range: string) => {
  // const {data} = await instance.get('/report', {
  //   params: { range }
  // });
  // return data;
  await sleep(2000);
  let report = loadInitialReports_last7days;
  switch (range) {
    case 'LAST_30_DAYS':
      report = loadInitialReports_last30days;
      break;
    case 'ALL_HISTORY':
      report = loadInitialReports;
      break;
    default:
      break;
  }
  return report.map(r => {
    return {
      ...r,
      ...{
        timestamp: r.timestamp.toTimeString()
      }
    };
  });
  
};

export const loadNewForensicsReports = async (lastItemId?: string) => {
  await sleep(2000);
  return loadRealtimeNewReports().map(r => {
    return {
      ...r,
      ...{
        timestamp: r.timestamp.toTimeString()
      }
    };
  });
};

// Summary includes latest blocks, committed blocks, number of attacks and number of attackers
export const getLatestSummary = async (latestBlockHash?: string) => {
  await sleep(2000);
  return latestSummary();
};

export const getDetailedForensics = async(forensicsId: string): Promise<DetailedReport>  => {
  await sleep(2000);
  return detailedForensicsReport;
};

export const getNodeInfo = async(nodeKy: string): Promise<NodeInfo> => {
  await sleep(2000);
  return {
    candidate: fakeNodeInfo.candidate,
    createdAt: fakeNodeInfo.createdAt,
    owner: fakeNodeInfo.owner,
    status: fakeNodeInfo.status,
    latestSignedBlock: fakeNodeInfo.latestSignedBlock,
    dataCenter: fakeNodeInfo.dataCenter,
    hardware: fakeNodeInfo.hardware,
  };
}