import { memo } from 'react';
import { history, useRequest } from 'umi';

import { Avatar, Button, Space, Divider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { oneAccount } from '@/services/apis/account';
import styles from './user-header.module.scss';

const UserHeader = memo(() => {
  const { data } = useRequest<MC.Account>(oneAccount);

  return (
    <Space>
      <Avatar src={data?.avatarUrl} size="small">
        U
      </Avatar>
      <span className={styles['user-name-box']}>
        {data?.name ?? 'username'}
      </span>
      <Divider className={styles['divider']} type="vertical" />
      <Button
        type="text"
        icon={<LogoutOutlined />}
        className={styles['logout-button']}
        onClick={() => {
          localStorage.clear();
          history.push('/');
        }}
      >
        退出登录
      </Button>
    </Space>
  );
});

export default UserHeader;
