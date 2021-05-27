import { handleActions, Action } from 'redux-actions';
import produce from 'immer';

import { actionTypes, changeMessage } from './actions';

const initState: MC.ReduxState = {
  messageList: [],
  message: 'hello',
  code: '',
  type: '',
  isAdded: false,
  haveCode: false,
  createdMessage: undefined,
  loading: false,
};

export default handleActions<MC.ReduxState, any>(
  {
    // 创建message，并将isAdded设置为true
    [actionTypes.CREATE_MESSAGE]: (state, { payload }: Action<MC.Message>) => {
      return produce(state, (draftState) => {
        draftState.isAdded = true;
        draftState.createdMessage = payload;
        draftState.loading = !draftState.loading;
      });
    },
    [actionTypes.CHANGE_ISADDED]: (state) => {
      // 修改isAdded的值
      return produce(state, (draftState) => {
        draftState.isAdded = false;
        draftState.haveCode = false;
        draftState.loading = false;
      });
    },
    [actionTypes.CHANGE_MESSAGE]: (state, { payload }: Action<string>) => {
      // 修改message值
      const result = produce(state, (draftState) => {
        draftState.message = payload;
      });
      return result;
    },
    [actionTypes.CHANGE_CODE]: (state, { payload }: Action<string>) => {
      // 修改code值
      const result = produce(state, (draftState) => {
        draftState.code = payload;
      });
      return result;
    },
    [actionTypes.CHANEG_TYPE]: (state, { payload }: Action<string>) => {
      // 修改type值
      const result = produce(state, (draftState) => {
        draftState.type = payload;
      });
      return result;
    },
    [actionTypes.CREATE_CODE]: (state, { payload }: Action<string>) => {
      // 获取code
      return produce(state, (draftState) => {
        draftState.haveCode = true;
        draftState.code = payload;
        draftState.loading = false;
      });
    },
    [actionTypes.RECOMMEND_MESSAGE]: (
      state,
      { payload }: Action<MC.Message[]>,
    ) => {
      // 获取推荐message
      return produce(state, (draftState) => {
        draftState.messageList = payload;
        draftState.loading = false;
      });
    },
  },
  initState,
);
