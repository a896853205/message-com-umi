import { FC } from 'react';
import { Table, Button, Avatar, Tag } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useRequest from '@ahooksjs/use-request';
import { changeIsAuth } from '@/services/apis/account';

const { Column } = Table;
dayjs.extend(customParseFormat);

/**
 * 通过用户是否授权获取Tag颜色
 * @param isAuth 是否授权
 * @returns Tag颜色字符串
 */
const getTagColorFromType = (isAuth: number) => {
  switch (isAuth) {
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return 'gray';
  }
};

interface TableProps {
  accounts: MC.Account[];
  loading: boolean;
  handlePageChange: (page: number) => void;
  total: number;
  handleAlter: () => void;
}

const AccountTable: FC<TableProps> = ({
  accounts,
  loading,
  handlePageChange,
  total,
  handleAlter,
}) => {
  const { run } = useRequest(changeIsAuth, {
    manual: true,
  });

  return (
    <Table
      dataSource={accounts}
      loading={loading}
      size="small"
      style={{ width: '100%' }}
      rowKey={(record) => record.id}
      pagination={{
        onChange: (page) => handlePageChange(page),
        total,
      }}
    >
      <Column
        title="Avatar"
        dataIndex="avatarUrl"
        key="avatarUrl"
        render={(text) => {
          return <Avatar src={text}>U</Avatar>;
        }}
        width={100}
      />
      <Column
        title="IsAuth"
        dataIndex="isAuth"
        key="isAuth"
        render={(text) => <Tag color={getTagColorFromType(text)}>{text}</Tag>}
        width={100}
      />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="CreatedAt" dataIndex="createdAt" key="createdAt" />
      <Column
        title="Action"
        width={100}
        align="center"
        render={(record) => {
          if (record.isAuth === 1)
            return (
              <Button
                type="link"
                onClick={() => {
                  run(record.uuid, 0);
                  handleAlter();
                }}
              >
                cancel
              </Button>
            );
          else if (record.isAuth === 0)
            return (
              <Button
                type="link"
                onClick={() => {
                  run(record.uuid, 1);
                  handleAlter();
                }}
              >
                comfirm
              </Button>
            );
        }}
      />
    </Table>
  );
};

export default AccountTable;
