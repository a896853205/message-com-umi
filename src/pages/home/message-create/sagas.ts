import { call, put, TakeEffect, takeEvery } from 'redux-saga/effects';

import {
  createCode,
  actionTypes,
  codeReuqest,
  searchMessage,
  recommend,
  createMessage,
  create,
} from './actions';
import { getCode, getRecommendList, loading } from './api';

function* getNewCode({ payload }: ReturnType<typeof codeReuqest>) {
  // yield call();
  try {
    console.log('getNewCode get param:', payload);
    const code: string = yield call(getCode, payload);
    console.log('saga get response code:', code);
    yield put(createCode(code));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* getRecommendMessageList({
  payload,
}: ReturnType<typeof searchMessage>) {
  try {
    console.log('recommendMessageList', payload);
    const recommendList: MC.Message[] = yield call(getRecommendList, payload);
    console.log('saga get response recommendList:', recommendList);
    yield put(recommend(recommendList));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* createNewMessage({ payload }: ReturnType<typeof create>) {
  try {
    console.log('createNewMessage', payload);
    const newMessage: MC.Message = yield call(getRecommendList, payload);
    console.log('saga get response createNewMessage:', newMessage);
    yield put(createMessage(newMessage));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* watchRequest() {
  yield takeEvery(codeReuqest, getNewCode);
  yield takeEvery(searchMessage, getRecommendMessageList);
  yield takeEvery(create, createNewMessage);
}

export default function* rootSaga() {
  yield watchRequest();
  // yield takeEvery('CODE_REQUEST', getNewCode);
}
