import { Table, Button, Avatar, Tag } from 'antd';

const { Column } = Table;

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
const AccountTable = () => {
  const mockData = [
    {
      id: 23151,
      isAuth: 1,
      name: 'Qcccccc',
      avatarUrl: 'https://avatars.githubusercontent.com/u/19189063?v=4',
      creatdAt: '2021-06-02 16:23',
    },
  ];

  return (
    <Table
      dataSource={mockData}
      size="small"
      style={{ width: '100%' }}
      rowKey={record => record.id}
    >
      <Column
        title="Avatar"
        dataIndex="avatarUrl"
        key="avatarUrl"
        render={text => {
          return <Avatar src={text}>U</Avatar>;
        }}
        width={100}
      />
      <Column
        title="IsAuth"
        dataIndex="isAuth"
        key="isAuth"
        render={text => <Tag color={getTagColorFromType(text)}>{text}</Tag>}
        width={100}
      />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="CreatdAt" dataIndex="creatdAt" key="creatdAt" />
      <Column
        title="Action"
        width={100}
        align="center"
        render={() => {
          return <Button type="link">comfirm</Button>;
        }}
      />
    </Table>
  );
};

export default AccountTable;
