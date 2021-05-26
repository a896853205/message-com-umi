declare namespace MC {
  interface Message {
    id: number;
    uuid: string;
    message: string;
    code: string;
    type: string;
  }

  /**
   * 创建message参数
   */
  interface CreateMessageParam {
    message: string;
    code: string;
    type: string;
  }

  /**
   * redux ReduxState
   */
  interface ReduxState {
    messages: {
      messageList: MC.Message[];
      message: string;
      code: string;
      type: string;
      isAdded: boolean;
      haveCode: boolean;
      createdMessage: MC.Message | undefined;
      loading: boolean;
    };
  }
}
