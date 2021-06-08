import { FC } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { newCodeAction } from '../actions';

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

  return (
    <Button
      type="link"
      htmlType="submit"
      onClick={() => {
        if (type && message) {
          console.log('get code');
          dispatch(newCodeAction(type));
        }
      }}
    >
      {content}
    </Button>
  );
};

export default CreateCode;
