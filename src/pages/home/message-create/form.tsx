import { useRequest } from 'umi';
import {
  Form,
  Input,
  Button,
  Select,
  Tag,
  Space,
  message as alert,
} from 'antd';
import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

import { newCode, create } from '@/services/apis/message';
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
  message: string;
}
const MessageCreateForm: FC<Props> = ({ setMessage, message }) => {
  const [type, setType] = useState<string>();
  const [code, setCode] = useState<string>('123456');
  const [falg, setFlag] = useState<boolean>(false); // 标志位，按钮随之变化
  const [form] = Form.useForm();
  const codeRequest = useRequest(newCode, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data: unknown) => {
      console.log('获取后台生成的随机code:', data);
      setCode(data as string);
      setFlag(true);
    },
  });
  const createRequest = useRequest(create, {
    manual: true,
    onSuccess: (data) => {
      //setCode(data.code);
      console.log('create Message result:', data);
      alert.success('添加成功');
      // TODO: 需要跳转到添加成功界面，那个界面有两个按钮‘copy’与‘继续添加’
    },
    onError: () => {
      alert.error('添加失败，请重试！');
    },
  });
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
          {falg ? (
            <Space>
              <Button
                type="link"
                htmlType="submit"
                onClick={() => {
                  console.log(
                    '要创建新message之前的message值',
                    message,
                    type,
                    code,
                  );
                  createRequest.run(type as string, message, code);
                }}
              >
                满意
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  codeRequest.run(type as string);
                }}
              >
                重新获取
              </Button>
              <span>
                Code: <Tag color="#f50">{code}</Tag>
              </span>
              <CopyToClipboard
                text={`res.setHeader('code', '${code}');`}
                onCopy={() => {
                  alert.success(
                    `res.setHeader('code', '${code}'); copy success`,
                  );
                }}
              >
                <Button type="link">
                  <CopyOutlined />
                  copy
                </Button>
              </CopyToClipboard>
            </Space>
          ) : (
            <Button
              type="link"
              htmlType="submit"
              onClick={() => {
                codeRequest.run(type as string);
              }}
            >
              get "Code" !!!
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default MessageCreateForm;
