import * as React from 'react';
import { Descriptions} from 'antd';
import * as moment from 'moment';

import ForensicsReasonTag from './ForensicsReasonTag';
import { ForensicsEventType } from '../client/forensicsServer';

interface ForensicsDescriptionData {
  Number: string;
  Hash: string;
  Round: string;
}


export interface ForensicsDescriptionProps {
  data: {
    fork1: ForensicsDescriptionData;
    fork2: ForensicsDescriptionData;
    eventTime: string;
    attackType: ForensicsEventType;
    timeSinceLastEvent?: string;
  }
}

const ForensicsDescription = (props: ForensicsDescriptionProps) => {

  return (
    <div>
      <Descriptions bordered>
        <Descriptions.Item label="Fork 1 Block Info" span={3}>
          <div>
            Block Number: {props.data.fork1.Number || ''}
            <br/>
            Block Hash: {props.data.fork1.Hash || ''}
            <br/>
            Block Round {props.data.fork1.Round || ''}
          </div>          
        </Descriptions.Item>
        
        <Descriptions.Item label="Fork 2 Block Info" span={3}>
          <div>
              Block Number: {props.data.fork2.Number || ''}
              <br/>
              Block Hash: {props.data.fork2.Hash || ''}
              <br/>
              Block Round {props.data.fork2.Round || ''}
          </div>          
        </Descriptions.Item>

        <Descriptions.Item label="Type" span={3}>
          <ForensicsReasonTag eventType={props.data.attackType}></ForensicsReasonTag>
        </Descriptions.Item>
        <Descriptions.Item label="Event Time(UTC)">{new Date(props.data.eventTime).toLocaleString('en-GB', { timeZone: 'UTC' })}</Descriptions.Item>
        <Descriptions.Item label="Time since last event" span={2}>
          {props.data.timeSinceLastEvent? moment.duration(props.data.timeSinceLastEvent).humanize(true): 'Nah'}
        </Descriptions.Item>
        
      </Descriptions>
    </div>
    
  )
}

export default React.memo(ForensicsDescription);