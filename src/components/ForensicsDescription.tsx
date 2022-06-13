import * as React from 'react';
import { Descriptions, Segmented, Spin } from 'antd';
import ForensicsReasonTag from './ForensicsReasonTag';
import { ForensicsEventType } from '../client/forensicsServer';

interface ForensicsDescriptionData {
  number: string;
  hash: string;
  round: string;
}


export interface ForensicsDescriptionProps {
  data: {
    FORK_1: ForensicsDescriptionData;
    FORK_2: ForensicsDescriptionData;
    eventTime: string;
    daysSinceLastEvent: string;
    eventType: ForensicsEventType;
  }
}

const ForensicsDescription = (props: ForensicsDescriptionProps) => {
  const [descriptionKey, setDescriptionKey] = React.useState<'FORK_1' | 'FORK_2'>('FORK_1');
  const [descriptionData, setDescriptionData] = React.useState<ForensicsDescriptionData>({} as ForensicsDescriptionData);
  
  React.useEffect(() => {
    setDescriptionData(props.data[descriptionKey]);
  },[descriptionKey])
  

  return (
    <div>
      <Segmented block options={['FORK_1', 'FORK_2']} value={descriptionKey} onChange={setDescriptionKey as any} ></Segmented>
      <br/>
      <Descriptions bordered>
        <Descriptions.Item label="Block Number">{descriptionData.number || ''}</Descriptions.Item>
        <Descriptions.Item label="Block Hash">{descriptionData.hash || ''}</Descriptions.Item>
        <Descriptions.Item label="Block Round">{descriptionData.round || ''}</Descriptions.Item>
        <Descriptions.Item label="Event Time">{props.data.eventTime}</Descriptions.Item>
        <Descriptions.Item label="Days since last event" span={2}>
          {props.data.daysSinceLastEvent}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={3}>
          <ForensicsReasonTag eventType={props.data.eventType}></ForensicsReasonTag>
        </Descriptions.Item>
      </Descriptions>
    </div>
    
  )
}

export default React.memo(ForensicsDescription);