import { FC } from 'react';
import { useRequest } from 'umi';
import { Modal, Form, Input, Button, Space, message as alert } from 'antd';

import { alterMessage } from '@/services/apis/message';

interface Props {
  visable: boolean;
  message: MC.Message;
  setAlterVisable: (visable: boolean) => void;
}
const Alter: FC<Props> = ({ visable, message, setAlterVisable }) => {
  const { run } = useRequest(alterMessage, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setAlterVisable(false); // TODO:完成修改后的实时刷新
      alert.success('修改完毕！');
    },
  });
  console.log('弹窗内部接受的message:', message.message);
  const tailLayout = {
    wrapperCol: { offset: 16, span: 16 },
  };
  const handleOk = (value: any) => {
    console.log('form get value:', value);
    run(message.id, value.message);
  };
  return (
    <>
      <Modal
        visible={visable}
        title="修改message"
        footer={null}
        closable={false}
        destroyOnClose={true}
      >
        <Form onFinish={handleOk}>
          <Form.Item name="message" label="Message">
            <Input defaultValue={message.message} />
            {/*不能做到根据传入值默认显示*/}
          </Form.Item>
          <Form.Item {...tailLayout}>
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
    </>
  );
};

export default Alter;
