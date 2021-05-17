import { useState, useCallback, useEffect } from 'react';
import { Typography } from 'antd';

import TypedSpan from '@/components/typed-span';
import useRequest from '@ahooksjs/use-request';

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

  const accountListRequest = useCallback(() => {
    run(page, name, isAuth);
  }, [page, name, isAuth]);

  useEffect(accountListRequest, [name, isAuth]);

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
      />
    </Typography>
  );
};

export default AccountList;
