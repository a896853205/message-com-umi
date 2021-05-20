import { FC } from 'react';
import { useRequest } from 'umi';
import { Button } from 'antd';

import { newCode } from '@/services/apis/message';

interface Props {
  type: string;
  message: string;
  content: string; // 按钮展示文字
  setCode: (code: string) => void;
  setHaveCode: (haveCode: boolean) => void;
}
const CreateCode: FC<Props> = ({
  type,
  message,
  setCode,
  setHaveCode,
  content,
}) => {
  const { run } = useRequest(newCode, {
    debounceInterval: 300,
    manual: true,
    onSuccess: (data) => {
      setCode(data.code);
      setHaveCode(true);
    },
  });
  return (
    <Button
      type="link"
      htmlType="submit"
      onClick={() => {
        if (type && message) {
          run(type);
        }
      }}
    >
      {content}
    </Button>
  );
};

export default CreateCode;
