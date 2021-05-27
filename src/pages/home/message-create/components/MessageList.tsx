import { Typography, Form } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TypedSpan from '@/components/typed-span';
import styles from './message-create.module.scss';
import FormComponent from './form';
import Remind from './remind';
import ResultComponent from './result';
import { searchAction } from '../actions';

const { Title } = Typography;

const MessageList = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isAdded, message } = useSelector(
    ({ isAdded, message }: { isAdded: boolean; message: string }) => {
      return { isAdded, message };
    },
  );

  useEffect(() => {
    dispatch(searchAction(message));
  }, [message]);

  return (
    <Typography>
      <Title>
        <TypedSpan strings="Create Message" />
      </Title>
      {isAdded ? (
        <ResultComponent />
      ) : (
        <div className={styles['message-create-box']}>
          <FormComponent form={form} />
          <div className={styles['divider']} />
          <Remind />
        </div>
      )}
    </Typography>
  );
};

export default MessageList;
