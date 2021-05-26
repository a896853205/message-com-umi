import { createActions } from 'redux-actions';

export const actionTypes = {
  CREATE_MESSAGE: 'ADD_MESSAGE',
  SEARCH_MESSAGE: 'SEARCH_MESSAGE',
  CHANGE_ISADDED: 'CHANGE_ISADDED',
  CHANGE_MESSAGE: 'CHANGE_MESSAGE',
  CHANGE_CODE: 'CHANGE_CODE',
  CHANEG_TYPE: 'CHANGE_TYPE',
  CREATE_CODE: 'CREATE_CODE',
  CODE_REQUEST: 'CODE_REQUEST',
  RECOMMEND: 'RECOMMEND',
  CREATE: 'CREATE',
};

export const {
  create,
  createMessage,
  searchMessage,
  recommend,
  changeIsAdded,
  changeMessage,
  changeCode,
  changeType,
  createCode,
  codeReuqest,
} = createActions({
  [actionTypes.CREATE]: (payload) => payload,
  [actionTypes.CREATE_MESSAGE]: (state) => state,
  [actionTypes.SEARCH_MESSAGE]: (state) => state,
  [actionTypes.RECOMMEND]: (recommend) => recommend,
  [actionTypes.CHANGE_ISADDED]: (state) => state,
  [actionTypes.CHANGE_MESSAGE]: (message) => message,
  [actionTypes.CHANGE_CODE]: (code) => code,
  [actionTypes.CHANEG_TYPE]: (type) => type,
  [actionTypes.CREATE_CODE]: (newCode) => newCode,
  [actionTypes.CODE_REQUEST]: (payload) => payload,
});
