import * as React from 'react';
import { Modal } from 'antd';

const DetailedForensicsEventModal = (props: {
  handleCancel: () => void;
  isModalVisible: boolean;
  forensicsId: string;
}) => {
  return (
    <>
      <Modal title="Detailed forensics event" visible={props.isModalVisible} onCancel={props.handleCancel}>
        <p>id: {props.forensicsId}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>  
    </>
  );
};

export default DetailedForensicsEventModal;