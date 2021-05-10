import { Typography } from 'antd';

import TypedSpan from '@/components/typed-span';
import styles from './message-create.module.scss';
import Form from './form';
import Remind from './remind';

const { Title } = Typography;

const MessageList = () => {
  return (
    <Typography>
      <Title>
        <TypedSpan strings="Create Message" />
      </Title>
      <div className={styles['message-create-box']}>
        <Form />
        <div className={styles['divider']} />
        <Remind />
      </div>
    </Typography>
  );
};

export default MessageList;
