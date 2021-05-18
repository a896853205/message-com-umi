import { Typography } from 'antd';
import { useState, useEffect } from 'react';
import { useRequest } from 'umi';

import TypedSpan from '@/components/typed-span';
import styles from './message-create.module.scss';
import Form from './form';
import Remind from './remind';
import { recommend } from '@/services/apis/message';

const { Title } = Typography;

const MessageList = () => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<MC.Message[]>([]);

  const { run, loading } = useRequest(recommend, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setMessageList(data.recommend);
    },
  });

  useEffect(() => {
    // TODO：这里需要进行表单判断，form有个Promise的方法直接可以进行判断，具体看list的那个form
    run(message);
  }, [message]);

  return (
    <Typography>
      <Title>
        <TypedSpan strings="Create Message" />
      </Title>
      <div className={styles['message-create-box']}>
        <Form setMessage={setMessage} message={message} />
        <div className={styles['divider']} />
        <Remind messageList={messageList} loading={loading} />
      </div>
    </Typography>
  );
};

export default MessageList;
