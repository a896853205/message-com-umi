import { FC } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input, Button, Space, message as alert } from 'antd';

import { alterMessage } from '@/services/apis/message';

interface Props {
  visable: boolean;
  message?: MC.Message;
  setAlterVisable: (visable: boolean) => void;
  handleAlter: () => void;
}

const TAIL_LAYOUT = {
  wrapperCol: { offset: 16, span: 16 },
};

// TODO: 添加loading,表单认证
const Alter: FC<Props> = ({
  visable,
  message,
  setAlterVisable,
  handleAlter,
}) => {
  const { run } = useRequest(alterMessage, {
    debounceInterval: 300,
    manual: true,
    onSuccess: () => {
      setAlterVisable(false);
      handleAlter();
      alert.success('修改完毕！');
    },
  });

  const handleOk = (value: { message: string }) => {
    if (message) {
      run(message.id, value.message);
      return;
    }

    setAlterVisable(false);
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
        <Form.Item name="message" label="Message">
          <Input defaultValue={message?.message} />
          {/*不能做到根据传入值默认显示*/}
        </Form.Item>
        <Form.Item {...TAIL_LAYOUT}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                setAlterVisable(false);
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
