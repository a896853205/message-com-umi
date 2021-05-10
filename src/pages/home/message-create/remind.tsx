import styles from './remind.module.scss';

const MessageCreateRemind = () => {
  return (
    <div className={styles['remind-box']}>
      MessageCreateRemind
      {/* TODO: 输入message时给与类似提示，模糊搜索？还是带有一些学习机制 */}
    </div>
  );
};

export default MessageCreateRemind;
