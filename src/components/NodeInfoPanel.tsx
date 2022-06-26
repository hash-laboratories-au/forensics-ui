import * as React from 'react';
import { Descriptions, Spin } from 'antd';
import { getNodeInfo, NodeInfo } from '../client/forensicsServer';

export interface NodeInfoPanel {
  nodeKey: string;
}

const NodeInfoPanel = (props: NodeInfoPanel) => {
  const [nodeInfo, setNodeInfo] = React.useState<NodeInfo>();
  React.useEffect(() => {
    (async () => {
      const result = await getNodeInfo(props.nodeKey);
      setNodeInfo(result)
    })();
  }, []);


  return (
    nodeInfo?
    <Descriptions bordered>
      <Descriptions.Item label="Owner Address">{nodeInfo.owner}</Descriptions.Item>
      <Descriptions.Item label="Coinbase Address">{nodeInfo.candidate}</Descriptions.Item>
      <Descriptions.Item label="Status">{nodeInfo.status}</Descriptions.Item>
      <Descriptions.Item label="Hardware">{nodeInfo.hardware}</Descriptions.Item>
      <Descriptions.Item label="Node Creation date">{nodeInfo.createdAt}</Descriptions.Item>
      <Descriptions.Item label="Node name">{nodeInfo.dataCenter.name}</Descriptions.Item>
      <Descriptions.Item label="Location">{nodeInfo.dataCenter.location}</Descriptions.Item>
    </Descriptions>
    : 
    <Spin />
  )
}

export default React.memo(NodeInfoPanel);

