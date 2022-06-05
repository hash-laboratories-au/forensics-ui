import * as React from 'react';
import { Table, Segmented } from 'antd';
import type { ColumnsType } from 'antd/lib/table';


import { loadInitialForensicsReports, loadNewForensicsReports } from '../client/forensicsServer';


type DataType = {
  key: string,
  timestamp: string;
  divergingBlockNumber: number;
  divergingBlockHash: string;
  numberOfAttackerNodes: number;
  numberOfSuspeciousNodes: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Diverging Number',
    width: 250,
    dataIndex: 'divergingBlockNumber',
    key: 'divergingBlockNumber',
    fixed: 'left',
  },
  {
    title: 'Diverging Hash',
    width: 400,
    dataIndex: 'divergingBlockHash',
    key: 'divergingBlockHash',
    fixed: 'left',
  },
  {
    title: 'Num. attacker nodes',
    width: 200,
    dataIndex: 'numberOfAttackerNodes',
    key: 'numberOfAttackerNodes',
    fixed: 'left',
  },

  {
    title: 'Date',
    width: 150,
    dataIndex: 'timestamp',
    key: 'timestamp',
    fixed: 'left',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 150,
    render: () => <a>Show more</a>,
  },
];

const LAST_7_DAYS = 'Last 7 Days';
const LAST_30_DAYS = 'Last 30 days';
const ALL_HISTORY = 'All History';

const ForensicsTable = () => {
  const [segmentValue, setSegmentValue]: [string, (v: string) => void] = React.useState<string>(LAST_7_DAYS);
  const [forensicsReports, setForensicsReports] = React.useState<DataType[]>([]);
  
  const onSegmentValueChange = (v: string) => {
    setForensicsReports([]);
    setSegmentValue(v);
  };
  
  const subscribeToRealtimeForensicsReport = () => {
    setInterval(async () => {
      const newForensicsReports = await loadNewForensicsReports();
      if (newForensicsReports.length) {
        setForensicsReports(p => ([...newForensicsReports, ...p]));
      }
    }, 5000);
  };
  React.useEffect(() => {
    subscribeToRealtimeForensicsReport();
  }, []);
  
  React.useEffect(() => {
    let isSubscribed = true;
    // Fetch the inital report
    const fetchAndSetInitialReports = async() => {
      const reports = await loadInitialForensicsReports(segmentValue.toUpperCase().split(" ").join('_'));
      if (isSubscribed) {
        setForensicsReports(p => ([...reports, ...p]));
      }
    };
    fetchAndSetInitialReports();
    return () => {
      isSubscribed=false;
    };
  }, [segmentValue]);

  return (
    <div>
      <Segmented size="large" options={[LAST_7_DAYS, LAST_30_DAYS, ALL_HISTORY]} value={segmentValue} onChange={onSegmentValueChange}/>
      <br></br>
      <Table columns={columns} dataSource={forensicsReports} scroll={{ x: 1300 }} />
    </div>
  ); 
};

export default ForensicsTable;