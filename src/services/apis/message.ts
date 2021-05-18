import client from '@/services/client';

/**
 * 获取信息数组
 * @param code code值
 * @param message 信息信息
 * @param type 信息类型
 * @param page 页号
 * @returns 信息数组
 */
export const messages = (
  code: number,
  message: string,
  type: string,
  page: number = 1,
): Promise<{
  messages: MC.Message[];
  count: number;
}> =>
  client.get('messages', {
    params: {
      code,
      message,
      type,
      page,
    },
  });

/**
 * 根据message id删除message
 * @param id message id
 */
export const deleteMessage = (id: number) =>
  client.delete('messages', {
    params: {
      id,
    },
  });

/**
 * 根据message id修改message内容
 * @param id message id
 * @param message 信息内容
 */
export const alterMessage = (id: number, message: string) =>
  client.put('messages', {
    params: {
      id,
      message,
    },
  });

/**
 * 根据输入的message获取推荐message
 * @param message 参考message
 * @returns 推荐message列表
 */
export const recommend = (
  message: string,
): Promise<{
  recommend: MC.Message[];
  count: number;
}> =>
  client.get('messages/recommend', {
    params: {
      message,
    },
  });

/**
 * 根据type获取新的code
 * @param type message类型
 * @returns 新的code
 */
export const newCode = (type: string): Promise<{ code: string }> =>
  client.get('messages/newCode', {
    params: {
      type,
    },
  });

/**
 * 创建message
 * @param type 类型信息
 * @param message 信息内容
 * @param code code值
 */
export const create = (
  type: string,
  message: string,
  code: string,
): Promise<MC.Message> =>
  client.post('messages', {
    data: {
      type,
      message,
      code,
    },
  });
