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

/**
 * 获取个人账号数据
 * @returns 账号数据
 */
export const oneAccount = (): Promise<{ accounts: MC.Account }> =>
  client.get('accounts/one');

export const changeIsAuth = (uuid: string, isAuth: number): Promise<null> =>
  client.put('accounts/isAuth', {
    params: {
      uuid,
      isAuth,
    },
  });
