import { Typography, Form } from 'antd';
import { useState, useEffect } from 'react';
import { useRequest } from 'umi';

import TypedSpan from '@/components/typed-span';
import styles from './message-create.module.scss';
import FormComponent from './form';
import Remind from './remind';
import ResultComponent from './result';
import { recommend } from '@/services/apis/message';

const { Title } = Typography;

const MessageList = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState<string>('');
  const [createMessage, setCreateMessage] = useState<MC.Message>();
  const [messageList, setMessageList] = useState<MC.Message[]>([]);
  const [type, setType] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false); // 标志位，message是否添加成功

  const { run, loading } = useRequest(recommend, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setMessageList(data.recommend);
    },
  });

  useEffect(() => {
    run(message);
  }, [message]);

  return (
    <Typography>
      <Title>
        <TypedSpan strings="Create Message" />
      </Title>
      {isAdded ? (
        <ResultComponent
          createMessage={createMessage}
          setIsAdded={setIsAdded}
        />
      ) : (
        <div className={styles['message-create-box']}>
          <FormComponent
            form={form}
            setMessage={setMessage}
            message={message}
            type={type}
            setType={setType}
            setIsAdded={setIsAdded}
            setCreateMessage={setCreateMessage}
          />
          <div className={styles['divider']} />
          <Remind messageList={messageList} loading={loading} />
        </div>
      )}
    </Typography>
  );
};

export default MessageList;
