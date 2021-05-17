import { FC, useState } from 'react';

import { useRequest } from 'umi';
import { Table, Button, Divider, Tag, message as alert, Modal } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// TODO：换成异步的Clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Alter from './components/alter';
import { deleteMessage } from '@/services/apis/message';

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
/**
 * 通过信息类型获取Tag颜色
 * @param type 信息类型
 * @returns Tag颜色字符串
 */
const getTagColorFromType = (type: string) => {
  switch (type) {
    case 'information':
      return 'blue';
    case 'success':
      return 'green';
    case 'alter':
      return 'yellow';
    case 'error':
      return 'red';
    default:
      return 'gray';
  }
};

const MessageTable: FC<Props> = ({
  setPage,
  messages,
  loading,
  total,
  handleRemove,
  handleAlter
}) => {
  const [alterVisable, setAlterVisable] = useState(false); // TODO:改为useBoolean
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
          render={(text) => <Tag color={getTagColorFromType(text)}>{text}</Tag>}
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
                    setAlterVisable(true);
                  }}
                >
                  alter
                </Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={() => {
                    console.log(record.id);
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
        visable={alterVisable}
        message={alterMessage}
        setAlterVisable={setAlterVisable}
        handleAlter={handleAlter}
      />
    </>
  );
};

export default MessageTable;
