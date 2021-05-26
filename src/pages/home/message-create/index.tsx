import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import MessageList from './components/MessageList';
import rootSaga from './sagas';
import reducers from './reducers';

const sagas = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagas));
sagas.run(rootSaga);

const CreateMessageIndex = () => {
  return (
    <>
      <Provider store={store}>
        <MessageList />
      </Provider>
    </>
  );
};
export default CreateMessageIndex;
