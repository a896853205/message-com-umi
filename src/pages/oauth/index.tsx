import { useEffect } from 'react';

import { useParams, history } from 'umi';
import client from '@/services/client';

interface PageParam {
  accessToken?: string;
}
const Oauth = () => {
  const param = useParams<PageParam>();
  useEffect(() => {
    if (param?.accessToken) {
      localStorage.setItem('token', `bearer ${param?.accessToken}`);

      console.log(`bearer ${param?.accessToken}`);

      client.extendOptions({
        headers: {
          Authorization: `bearer ${param?.accessToken}`,
        },
      });

      history.push('/home');
    }
  }, [param?.accessToken]);

  // TODO： 好看的loading
  return <>loading...</>;
};

export default Oauth;
