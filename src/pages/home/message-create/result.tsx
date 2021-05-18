import { history } from 'umi';
import { Result, Button, message as alert } from 'antd';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

const ResultPage = () => {
  const messageCode = history.location.query?.messageCode;
  return (
    <>
      <Result
        status="success"
        title="成功添加message!"
        extra={[
          <Button
            type="primary"
            key="create"
            onClick={() => {
              history.push('/home/message-create');
            }}
          >
            继续添加
          </Button>,
          <CopyToClipboard
            text={`res.setHeader('code', '${messageCode}');`}
            onCopy={() => {
              alert.success(`code "${messageCode}" copy success`);
            }}
            key="copy"
          >
            <Button type="default" icon={<CopyOutlined />}>
              copy
            </Button>
          </CopyToClipboard>,
        ]}
      />
    </>
  );
};

export default ResultPage;
