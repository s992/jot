import {
  createConnectQueryKey,
  useInfiniteQuery,
} from '@connectrpc/connect-query';
import { useQueryClient } from '@tanstack/react-query';

import { listJots } from '../generated/proto/jot/v1/jot-JotService_connectquery';
import { JotService } from '../generated/proto/jot/v1/jot_pb';

export function useJots(searchTerm?: string, pageSize = 100n) {
  return useInfiniteQuery(
    listJots,
    {
      pageSize,
      page: 1n,
      searchTerm,
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

export function useInvalidateJotList() {
  const client = useQueryClient();

  return async () => {
    await client.invalidateQueries({
      queryKey: createConnectQueryKey({
        schema: JotService,
        cardinality: 'infinite',
      }),
    });
  };
}
