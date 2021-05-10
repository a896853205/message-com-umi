/**
 * layout-home
 */
import React, { useState } from 'react';
import { IRouteComponentProps } from 'umi';

import { Layout } from 'antd';

import styles from './home.module.scss';

const { Content } = Layout;

const HomeLayout: React.FC<IRouteComponentProps> = ({ children }) => {
  const [isLoading, setLoadingState] = useState(false);

  // TODO： 跳转loading

  return (
    <Layout>
      <Content className={styles['home-content']}>{children}</Content>
    </Layout>
  );
};

export default HomeLayout;
