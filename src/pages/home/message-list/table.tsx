import { FC, useState } from 'react';

import { useRequest } from 'umi';
import { Table, Button, Divider, Tag, message, Modal } from 'antd';
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

/**
 * 弹出删除确认框
 * @param id 删除的目标message的id
 */
const { run, loading } = useRequest(deleteMessage, {
  debounceInterval: 300,
  manual: true,
  onSuccess: (data) => {
    console.log(data);
    /*  setMessages(data.messages);
    setTotal(data.count); */
  },
});
const showConfirm = (id: number) => {
  confirm({
    title: '您确定要删除这条message吗？',
    icon: <ExclamationCircleOutlined />,
    content: '一旦删除，不可恢复哦~',
    onOk(id) {
      // TODO:后台请求删除message
      run(id);
    },
    onCancel() {
      console.log('cancel message delete');
    },
  });
};

const MessageTable: FC<Props> = ({ setPage, messages, loading, total }) => {
  const [alterVisable, setAlterVisable] = useState(false); // TODO:优化为useBoolean
  const [alterMessage, setAlterMessage] = useState<MC.Message>(messages[0]);
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
                    message.success(
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
                    setAlterVisable(true);
                    console.log('点击item的message', record);
                    setAlterMessage(record);
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
      {console.log('显示弹窗之前alterMessage', alterMessage)}
      <Alter
        visable={alterVisable}
        message={alterMessage}
        setAlterVisable={setAlterVisable}
      />
    </>
  );
};

export default MessageTable;
