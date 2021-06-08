import {
  Form,
  FormInstance,
  Input,
  Button,
  Select,
  Tag,
  Space,
  message as alert,
} from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateCode from './create-code';
import styles from './form.module.scss';
import { changeMessage, changeType, createMessageAction } from '../actions';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Props {
  form: FormInstance;
}

const MessageCreateForm: FC<Props> = ({ form }) => {
  const dispatch = useDispatch();
  const { code, haveCode } = useSelector(
    ({ code, haveCode }: { code: string; haveCode: boolean }) => {
      return { code, haveCode };
    },
  );

  const createRequest = async () => {
    try {
      const values = await form.validateFields();
      const { type, message } = values;
      dispatch(createMessageAction({ type, code, message }));
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Form form={form} {...layout} className={styles['form-box']}>
      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select
          placeholder="Select a type of message"
          allowClear
          onChange={(value: string) => {
            dispatch(changeType(value));
          }}
        >
          <Option value="information">
            <Tag color="blue">information</Tag>
          </Option>
          <Option value="success">
            <Tag color="green">success</Tag>
          </Option>
          <Option value="alter">
            <Tag color="yellow">alter</Tag>
          </Option>
          <Option value="error">
            <Tag color="red">error</Tag>
          </Option>
          <Option value="unknow">
            <Tag color="gray">unknow</Tag>
          </Option>
        </Select>
      </Form.Item>

      <Form.Item name="message" label="Message" rules={[{ required: true }]}>
        <Input
          onChange={(e) => {
            dispatch(changeMessage(e.target.value));
          }}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        {haveCode ? (
          <Space direction="vertical">
            <Space>
              <CreateCode content="acquire again" />
              <span>
                Code: <Tag color="#f50">{code}</Tag>
              </span>
            </Space>
            <Button
              type="primary"
              size="middle"
              shape="round"
              onClick={createRequest}
            >
              satisfy
            </Button>
          </Space>
        ) : (
          <CreateCode content={' get "Code" !!!'} />
        )}
      </Form.Item>
    </Form>
  );
};

export default MessageCreateForm;
