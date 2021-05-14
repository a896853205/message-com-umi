import { useRequest } from 'umi';
import { Form, Input, Button, Select, Tag, Space } from 'antd';
import { FC, useEffect, useState } from 'react';

import { newCode, recommend } from '@/services/apis/message';
import styles from './form.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface Props {
  setMessage: (message: string) => void;
}
const MessageCreateForm: FC<Props> = ({ setMessage }) => {
  const [type, setType] = useState<string>();
  const [code, setCode] = useState<string>();
  const [falg, setFlag] = useState<boolean>(false); // 设置标志位，按钮随之变化
  // const [message, setMessage] = useState('');
  const [form] = Form.useForm();
  const { run } = useRequest(newCode, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setCode(data.code);
    },
  });
  // TODO: 成功之后需要有复制key相关信息的按钮逻辑
  return (
    <Form form={form} {...layout} className={styles['form-box']}>
      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select
          placeholder="Select a type of message"
          allowClear
          onChange={(value) => {
            setType(value as string | undefined);
          }}
        >
          <Option value="male">
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
            setMessage(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          {/* TODO: 有重新获取的字眼 */}
          {falg ? (
            <Button
              type="link"
              htmlType="submit"
              onClick={() => {
                run(type as string);
              }}
            >
              满意
            </Button>
          ) : (
            <Button
              type="link"
              htmlType="submit"
              onClick={() => {
                run(type as string);
              }}
            >
              get "Code" !!!
            </Button>
          )}

          <span>
            Code: <Tag color="#f50">{code}</Tag>
          </span>
        </Space>
      </Form.Item>

      {/* TODO: 有key值之后可以点击Satisfied字眼 */}
      {/* <Form.Item>
        <Button disabled htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default MessageCreateForm;
