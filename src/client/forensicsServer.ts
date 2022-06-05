import { sleep } from './utils';
import {Axios} from 'axios';
import { loadInitialReports, loadInitialReports_last30days, loadInitialReports_last7days, loadRealtimeNewReports } from './data/simulation';

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
        timestamp: r.timestamp.toDateString()
      }
    };
  });
  
};

export const loadNewForensicsReports = async (lastItemId?: string) => {
  await sleep(1);
  return loadRealtimeNewReports().map(r => {
    return {
      ...r,
      ...{
        timestamp: r.timestamp.toDateString()
      }
    };
  });
};