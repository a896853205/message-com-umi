import { useState, useCallback, useEffect } from 'react';
import { Typography } from 'antd';

import TypedSpan from '@/components/typed-span';
import useRequest from '@ahooksjs/use-request';
import { useBoolean } from 'ahooks';

import Table from './table';
import Search from './search';
import { account } from '@/services/apis/account';

const { Title } = Typography;

const AccountList = () => {
  const [accounts, setAccounts] = useState<MC.Account[]>([]);
  const [total, setTotal] = useState(0);
  const { run, loading } = useRequest(account, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setAccounts(data.accounts);
      setTotal(data.count);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [name, setName] = useState('');
  const [isAuth, setIsAuth] = useState<number>();
  const [page, setPage] = useState(1);
  const [isFresh, { setTrue, setFalse }] = useBoolean(true);

  useEffect(() => {
    setTrue();
  }, [page, name, isAuth]);

  const searchAccounts = useCallback(async () => {
    try {
      run(page, name, isAuth);
    } catch (error) {
      console.error('Failed:', error);
    }
  }, [page, name, isAuth]);

  useEffect(() => {
    if (isFresh) {
      searchAccounts().finally(() => {
        setFalse();
      });
    }
  }, [isFresh]);

  return (
    <Typography>
      <Title>
        <TypedSpan strings="Account" />
      </Title>
      <Search handleNameChange={setName} handleIsAuthChange={setIsAuth} />
      <Table
        accounts={accounts}
        loading={loading}
        handlePageChange={setPage}
        total={total}
        handleAlter={setTrue}
      />
    </Typography>
  );
};

export default AccountList;
