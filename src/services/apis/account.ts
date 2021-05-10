import client from '@/services/client';

/**
 * 获取账号数据
 * @returns 账号数据
 */
export const account = (): Promise<MC.Account> => {
  return client.get('account');
};
