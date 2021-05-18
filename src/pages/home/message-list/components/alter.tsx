import { FC, useState } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input, Button, Space, message as alert } from 'antd';

import { alterMessage } from '@/services/apis/message';

interface Props {
  visable: boolean;
  message?: MC.Message;
  setFalse: () => void;
  handleAlter: () => void;
}

const TAIL_LAYOUT = {
  wrapperCol: { offset: 16, span: 16 },
};

const Alter: FC<Props> = ({ visable, message, setFalse, handleAlter }) => {
  const { run, loading } = useRequest(alterMessage, {
    debounceInterval: 300,
    manual: true,
    onSuccess: () => {
      setFalse();
      handleAlter();
      alert.success('修改完毕！');
    },
  });

  const handleOk = (value: { message: string }) => {
    if (message) {
      run(message.id, value.message);
      return;
    }

    setFalse();
    alert.error('请重新选择要修改的message');
  };

  return (
    <Modal
      visible={visable}
      title="修改message"
      footer={null}
      closable={false}
      destroyOnClose={true}
    >
      <Form onFinish={handleOk}>
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: '请输入message值' }]}
        >
          <Input defaultValue={message?.message} />
        </Form.Item>
        <Form.Item {...TAIL_LAYOUT}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              确定
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                setFalse();
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Alter;
