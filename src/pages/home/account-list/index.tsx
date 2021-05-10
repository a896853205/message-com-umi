import { Typography } from 'antd';

import TypedSpan from 'components/typed-span';
import Table from './table';
import Search from './search';

const { Title } = Typography;

const AccountList = () => {
  return (
    <Typography>
      <Title>
        <TypedSpan strings="Account" />
      </Title>
      <Search />
      <Table />
    </Typography>
  );
};

export default AccountList;
