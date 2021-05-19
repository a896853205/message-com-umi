import { FC } from 'react';
import { Result, Button, message as alert } from 'antd';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

interface Props {
  createMessage?: MC.Message;
  setIsAdded: (isAdded: boolean) => void;
}

const ResultComponent: FC<Props> = ({ createMessage, setIsAdded }) => {
  return (
    <Result
      status="success"
      title="add message ssucceed!"
      extra={[
        <Button
          type="primary"
          key="create"
          onClick={() => {
            setIsAdded(false);
          }}
        >
          Keep adding
        </Button>,
        <CopyToClipboard
          text={`res.setHeader('code', '${createMessage?.code}');`}
          onCopy={() => {
            alert.success(
              `res.setHeader('code', '${createMessage?.code}'); copy success`,
            );
          }}
          key="copy"
        >
          <Button type="default" icon={<CopyOutlined />}>
            copy
          </Button>
        </CopyToClipboard>,
      ]}
    />
  );
};

export default ResultComponent;
