import { useRequest, history } from 'umi';
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
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('unknow');
  const [code, setCode] = useState<string>('');
  const [haveCode, setHaveCode] = useState<boolean>(false);

  const { run: newCodeRequest } = useRequest(newCode, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setCode(data.code);
      setHaveCode(true);
    },
  });
  const { run: createRequest, loading } = useRequest(create, {
    manual: true,
    onSuccess: (data) => {
      alert.success('添加成功!');
      const newCode: string = data.code;
      history.push({
        pathname: '/home/message-create/result',
        query: {
          messageCode: newCode,
        },
      });
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
          onChange={(value: string) => {
            setType(value);
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
        {haveCode ? (
          <>
            <Space direction="vertical">
              <div className={styles['get-code']}>
                <Space>
                  <Button
                    type="link"
                    onClick={() => {
                      newCodeRequest(type);
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
                      alert.success(`code "${code}" copy success`);
                    }}
                  >
                    <Button type="link">
                      <CopyOutlined />
                      copy
                    </Button>
                  </CopyToClipboard>
                </Space>
              </div>
              <Button
                type="primary"
                size="middle"
                loading={loading}
                shape="round"
                onClick={() => createRequest(type, message, code)}
              >
                满意
              </Button>
            </Space>
          </>
        ) : (
          <Button
            type="link"
            htmlType="submit"
            onClick={() => {
              if (type && message) {
                newCodeRequest(type);
              }
            }}
          >
            get "Code" !!!
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default MessageCreateForm;
