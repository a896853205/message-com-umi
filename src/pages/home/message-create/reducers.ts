import { handleActions } from 'redux-actions';
import produce from 'immer';

import { actionTypes } from './actions';

const initState: MC.ReduxState = {
  messages: {
    messageList: [],
    message: '',
    code: '',
    type: '',
    isAdded: false,
    haveCode: false,
    createdMessage: undefined,
    loading: false,
  },
};

export default handleActions(
  {
    // 创建message，并将isAdded设置为true
    [actionTypes.ADD_MESSAGE]: (state) => {
      console.log('REDUX ADD MESSAGE');
      return produce(state, (draftState) => {
        draftState.isAdded = true;
        draftState.loading = !draftState.loading;
      });
    },
    [actionTypes.CHANGE_ISADDED]: (state) => {
      // 修改isAdded的值
      return produce(state, (draftState) => {
        draftState.isAdded = false;
      });
    },
    [actionTypes.CHANGE_MESSAGE]: (state, action) => {
      // 修改message值
      return produce(state, (draftState) => {
        draftState.message = action.payload.message;
      });
    },
    [actionTypes.CHANGE_CODE]: (state, action) => {
      // 修改code值
      return produce(state, (draftState) => {
        draftState.code = action.payload.code;
      });
    },
    [actionTypes.CHANEG_TYPE]: (state, action) => {
      // 修改message值
      return produce(state, (draftState) => {
        draftState.type = action.payload.type;
      });
    },
    [actionTypes.CREATE_CODE]: (state, action) => {
      // 获取code
      console.log('reducer action:', action);
      return produce(state, (draftState) => {
        draftState.haveCode = true;
        draftState.code = action.payload.code;
        draftState.loading = !draftState.loading;
      });
    },
    [actionTypes.RECOMMEND]: (state, action) => {
      // 获取推荐message
      console.log('reducer action:', action);
      return produce(state, (draftState) => {
        draftState.createdMessage = action.payload.createdMessage;
        draftState.loading = !draftState.loading;
      });
    },
  },
  initState.messages,
);
