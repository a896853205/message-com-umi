import client from '@/services/client';

/**
 * 获取账号数据
 * @returns 账号数据
 */
export const account = (
  page: number,
  name?: string,
  isAuth?: number,
): Promise<{ accounts: MC.Account[]; count: number }> =>
  client.get('accounts', {
    params: {
      name,
      isAuth,
      page,
    },
  });
