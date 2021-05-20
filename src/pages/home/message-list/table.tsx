import { FC, useState } from 'react';

import { useRequest, history } from 'umi';
import { useBoolean } from 'ahooks';
import {
  Table,
  Button,
  Divider,
  Tag,
  message as alert,
  Modal,
  Result,
} from 'antd';
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// TODO：换成异步的Clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Alter from './components/alter';
import { deleteMessage } from '@/services/apis/message';
import { getTagColorFromType } from '@/utils/tag-color-from-type';

const { Column } = Table;
const { confirm } = Modal;

interface Props {
  setPage: (page: number) => void;
  messages: MC.Message[];
  loading: boolean;
  total: number;
  handleRemove: () => void;
  handleAlter: () => void;
}

const MessageTable: FC<Props> = ({
  setPage,
  messages,
  loading,
  total,
  handleRemove,
  handleAlter,
}) => {
  const [isVisable, { setTrue, setFalse }] = useBoolean(false);
  const [alterMessage, setAlterMessage] = useState<MC.Message>();

  const { run } = useRequest(deleteMessage, {
    debounceInterval: 300,
    manual: true,
    onSuccess: () => {
      handleRemove();
      alert.success('删除成功');
    },
  });

  /**
   * 弹出删除确认框
   * @param id 删除的目标message的id
   */
  const showConfirm = (id: number) => {
    confirm({
      title: '您确定要删除这条message吗？',
      icon: <ExclamationCircleOutlined />,
      content: '一旦删除，不可恢复哦~',
      onOk() {
        run(id);
      },
      onCancel() {
        console.log('cancel message delete');
      },
    });
  };

  return (
    <>
      {total ? (
        <>
          <Table<MC.Message>
            dataSource={messages}
            size="small"
            style={{ width: '100%' }}
            rowKey={(record) => record.code}
            pagination={{
              onChange: (page) => setPage(page),
              total,
            }}
            loading={loading}
          >
            <Column
              title="Type"
              dataIndex="type"
              key="type"
              render={(text) => (
                <Tag color={getTagColorFromType(text)}>{text}</Tag>
              )}
              width={100}
            />
            <Column title="Code" dataIndex="code" key="code" />
            <Column title="Message" dataIndex="message" key="message" />
            <Column
              title="Action"
              width={280}
              align="center"
              render={(_, record: MC.Message) => {
                return (
                  <>
                    <CopyToClipboard
                      text={`res.setHeader('code', '${record.code}');`}
                      onCopy={() => {
                        alert.success(
                          `res.setHeader('code', '${record.code}'); copy success`,
                        );
                      }}
                    >
                      <Button type="link">
                        <CopyOutlined />
                        copy
                      </Button>
                    </CopyToClipboard>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      onClick={() => {
                        setAlterMessage(record);
                        setTrue();
                      }}
                    >
                      alter
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      onClick={() => {
                        showConfirm(record.id);
                      }}
                    >
                      delete
                    </Button>
                  </>
                );
              }}
            />
          </Table>
          <Alter
            visable={isVisable}
            message={alterMessage}
            setFalse={setFalse}
            handleAlter={handleAlter}
          />
        </>
      ) : (
        <Result
          title="没有相关message哦~"
          extra={
            <Button
              type="primary"
              onClick={() => {
                history.push('/home/message-create');
              }}
            >
              点我！创建message
            </Button>
          }
        />
      )}
    </>
  );
};

export default MessageTable;
