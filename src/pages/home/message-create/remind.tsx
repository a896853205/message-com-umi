import { FC } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Table, Tag, message, Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import styles from './remind.module.scss';
import { getTagColorFromType } from '@/utils/tagColorFromType';

const { Column } = Table;

interface Props {
  messageList: MC.Message[];
  loading: boolean;
}
const MessageCreateRemind: FC<Props> = ({ messageList, loading }) => {
  return (
    <div className={styles['remind-box']}>
      {/* TODO: 输入message时给与类似提示，模糊搜索？还是带有一些学习机制 */}
      <Table<MC.Message>
        dataSource={messageList}
        size="small"
        style={{ width: '100%' }}
        rowKey={(record) => record.code}
        title={() => '推荐的message'}
        loading={loading}
      >
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(text) => <Tag color={getTagColorFromType(text)}>{text}</Tag>}
          width={100}
        />
        <Column title="Code" dataIndex="code" key="code" />
        <Column
          title="Message"
          dataIndex="message"
          key="message"
          render={(_, record: MC.Message) => {
            return (
              <Space>
                <span>{record.message}</span>

                <CopyToClipboard
                  text={record.message}
                  onCopy={() => {
                    message.success(
                      `recommend message "${record.message}"， copy success!'`,
                    );
                  }}
                >
                  <Button type="link">
                    <CopyOutlined />
                    copy
                  </Button>
                </CopyToClipboard>
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default MessageCreateRemind;
