import { useState } from 'react';

import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { CLIENT_ID, REDIRECT_URI } from '@/constants/github';

/**
 * Index
 */
const Index = () => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <Button
      type="primary"
      icon={<GithubOutlined />}
      size="large"
      shape="round"
      loading={loading}
      onClick={onClick}
    >
      login
    </Button>
  );
};

export default Index;
