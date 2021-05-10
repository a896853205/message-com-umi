import { Form, Input, Select } from 'antd';

import styles from './search.module.scss';

const { Option } = Select;
const Search = () => {
  return (
    <div className={styles['search-box']}>
      <Form layout="inline">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Isauth">
          <Select>
            <Option value={0}>auth</Option>
            <Option value={1}>unauth</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Search;
