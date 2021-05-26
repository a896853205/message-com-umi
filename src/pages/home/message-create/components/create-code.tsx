import { FC } from 'react';
import { useRequest } from 'umi';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { newCode } from '@/services/apis/message';
import { codeReuqest, createCode } from '../actions';

interface Props {
  content: string; // 按钮展示文字
}
const CreateCode: FC<Props> = ({ content }) => {
  const { message, type } = useSelector(
    ({
      message,

      type,
    }: {
      message: string;

      type: string;
    }) => {
      return { message, type };
    },
  );
  const dispatch = useDispatch();
  /* const { run } = useRequest(newCode, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setCode(data.code);
      setHaveCode(true);
    },
  }); */
  return (
    <Button
      type="link"
      htmlType="submit"
      onClick={() => {
        if (type && message) {
          dispatch(codeReuqest(type));
          // run(type);
        }
      }}
    >
      {content}
    </Button>
  );
};

export default CreateCode;
