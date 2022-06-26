import * as React from 'react';
import { Modal, Collapse, Spin, Segmented, Divider, Space, Row, Col } from 'antd';
import { DetailedReport, getDetailedForensics } from '../client/forensicsServer';
import HierarchicalTreeVisualization from './HierarchicalTreeVisualization';
import ForensicsDescription from './ForensicsDescription';
import NodeInfoPanel from './NodeInfoPanel';
const { Panel } = Collapse;


const DetailedForensicsEventModal = (props: {
  handleCancel: () => void;
  isModalVisible: boolean;
  forensicsId: string;
}) => {
  const [details, setDetails] = React.useState<DetailedReport>(undefined);
  
  React.useEffect(() => {
    (async () => {
      // Only call if the modal is open
      if(props.isModalVisible) {
        const report = await getDetailedForensics(props.forensicsId);
        setDetails(report);
      }
    })();
  }, [props.isModalVisible]);
  
  const generateCollapsedNodeInfo = () => {
    if (details?.suspeciousNodes?.length) {
      const panelList = details.suspeciousNodes.map(n => {
        return (
          <Panel header={n} key={n}>
            <NodeInfoPanel nodeKey={n}></NodeInfoPanel>
          </Panel>
        );
      })
      
      if (!panelList || !panelList.length) {
        return (
          <div>
            <Spin/>
          </div>
        );
      }
      return (
        <div>
          <Collapse accordion>
            {panelList}
          </Collapse>
        </div>
      )
    }
  }
  
  
  const modalContent = () => {
    if (!details) {
      return (<Spin></Spin>)
    } else {
      return (
        <div>
          <ForensicsDescription data={details}></ForensicsDescription>
          <Row>
            <Col span={16}>
              <Divider orientation="left">Suspecious nodes</Divider>
              {generateCollapsedNodeInfo()}
            </Col>
            <Col span={8}>
              <Divider orientation="left">Forking Chain Visualization</Divider>
              <HierarchicalTreeVisualization data={details.divergingPathsMap}></HierarchicalTreeVisualization>
            </Col>
          </Row>
        </div>
      )
    
    }
  }

  return (
    <>
      <Modal title="Detailed forensics event" visible={props.isModalVisible} onCancel={props.handleCancel} destroyOnClose={true} footer={null} width={2000} style={{ top: 20 }}>        
        {modalContent()}
      </Modal>  
    </>
  );
};


export default React.memo(DetailedForensicsEventModal, (prevProps, nextProps) => prevProps.isModalVisible == nextProps.isModalVisible);