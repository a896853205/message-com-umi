/**
 * layout-home
 */
import React from 'react';
import { IRouteComponentProps } from 'umi';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Layout } from 'antd';

import styles from './home.module.scss';
import rootSaga from '../home/message-create/sagas';
import reducers from '../home/message-create/reducers';

const sagas = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagas));
sagas.run(rootSaga);

const { Content } = Layout;

const HomeLayout: React.FC<IRouteComponentProps> = ({ children }) => {
  // TODO： 跳转loading

  return (
    <Provider store={store}>
      <Layout>
        <Content className={styles['home-content']}>{children}</Content>
      </Layout>
    </Provider>
  );
};

export default HomeLayout;
