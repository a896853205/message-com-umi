import { useState, useEffect, useCallback } from 'react';
import { useRequest } from 'umi';

import { Typography, Form } from 'antd';
import { useBoolean } from 'ahooks';

import TypedSpan from '@/components/typed-span';
import Table from './table';
import Search from './search';

import { messages as getMessages } from '@/services/apis/message';

const { Title } = Typography;

const MessageList = () => {
  const [form] = Form.useForm();
  const { run, loading } = useRequest(getMessages, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setMessages(data.messages);
      setTotal(data.count);
    },
  });

  /**
   * 此处状态不是form表单最终提交的状态，此处是用户输入的状态值
   */
  const [code, setCode] = useState<number>();
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();
  const [total, setTotal] = useState(0);

  const [messages, setMessages] = useState<MC.Message[]>([]);

  const [page, setPage] = useState(1);
  const [isFresh, { setTrue, setFalse }] = useBoolean(true);

  useEffect(() => {
    setTrue();
  }, [code, message, type, page]);

  const searchFetch = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const { code, message, type } = values;
      run(code, message, type, page);
    } catch (errorInfo) {
      console.error('Failed:', errorInfo);
    }
  }, [code, message, type, page]);

  useEffect(() => {
    searchFetch().finally(() => {
      setFalse();
    });
  }, [isFresh]);

  return (
    <Typography>
      <Title>
        <TypedSpan strings="Message" />
      </Title>
      <Search
        form={form}
        setCode={setCode}
        setMessage={setMessage}
        setType={setType}
      />
      <Table
        setPage={setPage}
        messages={messages}
        loading={loading}
        total={total}
        handleRemove={setTrue}
        handleAlter={setTrue}
      />
    </Typography>
  );
};

export default MessageList;
