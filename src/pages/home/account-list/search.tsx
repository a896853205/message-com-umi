import { FC } from 'react';
import { Form, Input, Select } from 'antd';

import styles from './search.module.scss';

interface SearchProps {
  handleNameChange: (name: string) => void;
  handleIsAuthChange: (isAuth?: number) => void;
}
const { Option } = Select;
const Search: FC<SearchProps> = ({ handleNameChange, handleIsAuthChange }) => {
  return (
    <div className={styles['search-box']}>
      <Form layout="inline">
        <Form.Item label="Name" name="name">
          <Input onChange={(evt) => handleNameChange(evt.target.value)} />
        </Form.Item>

        <Form.Item label="Isauth">
          <Select onChange={(evt) => handleIsAuthChange(Number(evt))} clearIcon>
            <Option value={1}>auth</Option>
            <Option value={0}>unauth</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Search;
