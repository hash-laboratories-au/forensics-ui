import * as React from 'react';
import { Table, Segmented } from 'antd';
import type { ColumnsType } from 'antd/lib/table';


import { loadInitialForensicsReports } from '../client/forensicsServer';


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
    render: () => <a>show more</a>,
  },
];

export default class ForensicsTable extends React.Component {
  state: { forensicsReports: DataType[] } = {
    forensicsReports: []
  };
  async componentDidMount() {
    const reports = await loadInitialForensicsReports();
    
    this.setState({ forensicsReports: reports});
  }
  render() {
    return (
      <div>
        <Segmented size="large" options={['Last 7 Days', 'Last 30 days', 'All History']} />
        <br></br>
        <Table columns={columns} dataSource={this.state.forensicsReports} scroll={{ x: 1300 }} />
      </div>
    ); 
  }
}
