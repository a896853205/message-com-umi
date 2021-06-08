import { call, put, takeEvery } from 'redux-saga/effects';

import {
  createCode,
  newCodeAction,
  searchAction,
  recommendMessage,
  createMessage,
  createMessageAction,
} from './actions';

import { newCode, recommend, create } from '@/services/apis/message';

function* getNewCode({ payload }: ReturnType<typeof newCodeAction>) {
  try {
    const { code } = yield call(newCode, payload);
    yield put(createCode(code));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* getRecommendMessageList({
  payload,
}: ReturnType<typeof searchAction>) {
  try {
    const recommendList: { count: number; recommend: MC.Message[] } =
      yield call(recommend, payload);
    yield put(recommendMessage(recommendList.recommend));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* createNewMessage({
  payload,
}: ReturnType<typeof createMessageAction>) {
  try {
    const { type, message, code } = payload;
    const newMessage: MC.Message = yield call(create, type, message, code);
    yield put(createMessage(newMessage));
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

function* watchRequest() {
  yield takeEvery(newCodeAction, getNewCode);
  yield takeEvery(searchAction, getRecommendMessageList);
  yield takeEvery(createMessageAction, createNewMessage);
}

export default function* rootSaga() {
  yield watchRequest();
}
