import * as React from 'react';
import { Descriptions, Segmented, Spin } from 'antd';
import * as moment from 'moment';
import {
  NumberOutlined,
  CalculatorTwoTone,
  DashboardTwoTone
} from '@ant-design/icons';

import ForensicsReasonTag from './ForensicsReasonTag';
import { ForensicsEventType } from '../client/forensicsServer';

interface ForensicsDescriptionData {
  number: string;
  hash: string;
  round: string;
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
            Block Number: {props.data.fork1.number || ''}
            <br/>
            Block Hash: {props.data.fork1.hash || ''}
            <br/>
            Block Round {props.data.fork1.round || ''}
          </div>          
        </Descriptions.Item>
        
        <Descriptions.Item label="Fork 2 Block Info" span={3}>
          <div>
              Block Number: {props.data.fork2.number || ''}
              <br/>
              Block Hash: {props.data.fork2.hash || ''}
              <br/>
              Block Round {props.data.fork2.round || ''}
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