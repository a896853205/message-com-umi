import { FC, useState } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Select, Tag, Input } from 'antd';

import { alterMessage } from '@/services/apis/message';

interface Props {
  visable: boolean;
  message: MC.Message;
  setAlterVisable: (visable: boolean) => void;
}
const { run, loading } = useRequest(alterMessage, {
  debounceInterval: 300,
  manual: true,
  onSuccess: (data) => {
    /* setMessages(data.messages);
    setTotal(data.count); */
  },
});
const Alter: FC<Props> = ({ visable, message, setAlterVisable }) => {
  const [newMessage, setNewMessage] = useState(message.message);
  console.log('弹窗内部接受的message:', message.message);
  console.log('newMessage', newMessage);
  const handleOk = () => {
    run(message.id, newMessage);
  };
  return (
    <>
      <Modal
        visible={visable}
        title="修改message"
        onOk={handleOk}
        onCancel={() => {
          setAlterVisable(false);
        }}
      >
        <Input
          defaultValue={message.message}
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default Alter;
