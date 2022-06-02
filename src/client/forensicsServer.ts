import { sleep } from './utils';
import {Axios} from 'axios';
import { loadInitialReports } from './data/simulation';

const instance = new Axios({
  baseURL: '', // TODO: Add the baseURL of the backend service
});

// Load the inital content from backend when the page is first landed
export const loadInitialForensicsReports = async () => {
  // const {data} = await instance.get('/report', {
  //   params: { limits = 20 }
  // });
  // return data;
  await sleep(2000);
  return loadInitialReports;
};