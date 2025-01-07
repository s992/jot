import { useInfiniteQuery } from '@connectrpc/connect-query';

import { listJots } from '../generated/proto/jot/v1/jot-JotService_connectquery';

export function useJots(pageSize = 100n) {
  return useInfiniteQuery(
    listJots,
    {
      pageSize,
      page: 1n,
    },
    {
      pageParamKey: 'page',
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.jots.length < pageSize) {
          return undefined;
        }

        if (!lastPageParam) {
          return 1n;
        }

        return lastPageParam + 1n;
      },
    },
  );
}
