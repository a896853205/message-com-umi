import { useRequest } from 'umi';

import { newCode, recommend } from '@/services/apis/message';

export const { run: getCode } = useRequest(newCode, {
  debounceInterval: 300,
  manual: true,
});

export const { run: getRecommendList, loading } = useRequest(recommend, {
  debounceInterval: 300,
  manual: true,
  /* onSuccess: (data) => {
      setMessageList(data.recommend);
  }, */
});
