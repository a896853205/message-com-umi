import client from '@/services/client';

// TODO：
export const messages = (
  page: number = 1,
): Promise<{
  messages: MC.Message[];
  count: number;
}> => {
  return client.get('messages', {
    params: {
      page,
    },
  });
};
