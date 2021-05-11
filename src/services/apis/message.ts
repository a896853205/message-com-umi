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
