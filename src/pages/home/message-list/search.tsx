import { FC } from 'react';
import { Form, Input, Select, FormInstance, InputNumber } from 'antd';

import styles from './search.module.scss';

const { Option } = Select;

interface Props {
  setCode: (code?: number) => void;
  setMessage: (message?: string) => void;
  setType: (type?: string) => void;
  form: FormInstance;
}
const Search: FC<Props> = ({ setCode, setMessage, setType, form }) => {
  return (
    <div className={styles['search-box']}>
      <Form layout="inline" form={form}>
        <Form.Item label="Code" name="code">
          <InputNumber onChange={value => setCode(Number(value))} />
        </Form.Item>

        <Form.Item label="Message" name="message">
          <Input onChange={e => setMessage(e.target.value)} />
        </Form.Item>

        <Form.Item label="Type" name="type" className={styles['type-select']}>
          <Select
            allowClear
            onChange={value => {
              setType(value as string | undefined);
            }}
          >
            <Option value="information">information</Option>
            <Option value="success">success</Option>
            <Option value="alter">alter</Option>
            <Option value="error">error</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Search;
