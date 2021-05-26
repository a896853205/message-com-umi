import { useRequest } from 'umi';
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
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateCode from './create-code';
import { create } from '@/services/apis/message';
import styles from './form.module.scss';
import { changeMessage, changeType } from '../actions';

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
  //const [code, setCode] = useState<string>('');
  // const [haveCode, setHaveCode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { code, haveCode } = useSelector(
    ({ code, haveCode }: { code: string; haveCode: boolean }) => {
      return { code, haveCode };
    },
  );
  const { run, loading } = useRequest(create, {
    manual: true,
    onSuccess: (data) => {
      alert.success('add message succeed!');
      // setIsAdded(true);
      // setCreateMessage(data);
    },
    onError: () => {
      alert.error('add failure! try again!');
    },
  });

  const createRequest = async () => {
    try {
      const values = await form.validateFields();
      const { type: fromType, message: fromMessage } = values;
      run(fromType, fromMessage, code);
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
            // setType(value);
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
            // setMessage(e.target.value);
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
              loading={loading}
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
