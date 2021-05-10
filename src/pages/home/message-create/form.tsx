import { Form, Input, Button, Select, Tag, Space } from 'antd';

import styles from './form.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const MessageCreateForm = () => {
  const [form] = Form.useForm();

  // TODO: 成功之后需要有复制key相关信息的按钮逻辑
  return (
    <Form form={form} {...layout} className={styles['form-box']}>
      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select placeholder="Select a type of message" allowClear>
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
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          {/* TODO: 有重新获取的字眼 */}
          <Button type="link" htmlType="submit">
            get "Key" !!!
          </Button>

          <span>
            Key: <Tag color="#f50">20035</Tag>
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
