import { FC, useState } from 'react';
import { List } from 'antd';
import styles from './remind.module.scss';

interface Props {
  messageList: string[];
}
const MessageCreateRemind: FC<Props> = ({ messageList }) => {
  return (
    <div className={styles['remind-box']}>
      {/* TODO: 输入message时给与类似提示，模糊搜索？还是带有一些学习机制 */}
      <List
        bordered
        dataSource={messageList}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default MessageCreateRemind;
