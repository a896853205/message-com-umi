import { FC } from 'react';
import { Result, Button, message as alert } from 'antd';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { changeIsAdded } from '../actions';

interface Props {
  createMessage?: MC.Message;
}

const ResultComponent: FC<Props> = () => {
  const dispatch = useDispatch();
  const createdMessage = useSelector(
    ({ createdMessage }: { createdMessage: MC.Message }) => createdMessage,
  );
  return (
    <Result
      status="success"
      title="add message ssucceed!"
      extra={[
        <Button
          type="primary"
          key="create"
          onClick={() => {
            dispatch(changeIsAdded());
          }}
        >
          Keep adding
        </Button>,
        <CopyToClipboard
          text={`res.setHeader('code', '${createdMessage?.code}');`}
          onCopy={() => {
            alert.success(
              `res.setHeader('code', '${createdMessage?.code}'); copy success`,
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
