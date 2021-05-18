import { history } from 'umi';
import { Result, Button, message as alert } from 'antd';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

// FIXME： 想写成Page的话就应该把文件放到pages目录下，而且需要与其他页面一致，需要有otter（不知道为啥现在的没有）
// FIXME： 或者将这个写成组件，然后只是将create那个组件替换，两种方案选一个就好。
const ResultPage = () => {
  const messageCode = history.location.query?.messageCode;

  return (
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
            alert.success(
              `res.setHeader('code', '${messageCode}'); copy success`,
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

export default ResultPage;
