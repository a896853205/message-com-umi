import { createActions, createAction } from 'redux-actions';

export const actionTypes = {
  CREATE_MESSAGE: 'ADD_MESSAGE',
  SEARCH_ACTION: 'SEARCH_MESSAGE',
  CHANGE_ISADDED: 'CHANGE_ISADDED',
  CHANGE_MESSAGE: 'CHANGE_MESSAGE',
  CHANGE_CODE: 'CHANGE_CODE',
  CHANEG_TYPE: 'CHANGE_TYPE',
  CREATE_CODE: 'CREATE_CODE',
  CODE_REQUEST: 'CODE_REQUEST',
  RECOMMEND_MESSAGE: 'RECOMMEND',
  CREATE_ACTION: 'CREATE',
};

export const searchAction = createAction<string>(actionTypes.SEARCH_ACTION);
export const createMessageAction = createAction<{
  type: string;
  code: string;
  message: string;
}>(actionTypes.CREATE_ACTION);
export const newCodeAction = createAction<string>(actionTypes.CODE_REQUEST);
export const recommendMessage = createAction<MC.Message[]>(
  actionTypes.RECOMMEND_MESSAGE,
);
export const createMessage = createAction<MC.Message>(
  actionTypes.CREATE_MESSAGE,
);
export const createCode = createAction<string>(actionTypes.CREATE_CODE);
export const changeIsAdded = createAction<void>(actionTypes.CHANGE_ISADDED);
export const changeMessage = createAction<string>(actionTypes.CHANGE_MESSAGE);
export const changeCode = createAction<string>(actionTypes.CHANGE_CODE);
export const changeType = createAction<string>(actionTypes.CHANEG_TYPE);
