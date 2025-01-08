import { createConnectQueryKey, useMutation } from '@connectrpc/connect-query';
import { useQueryClient } from '@tanstack/react-query';

import { createJot } from '../generated/proto/jot/v1/jot-JotService_connectquery';
import { TagService } from '../generated/proto/jot/v1/jot_pb';
import { useInvalidateJotList } from './listJots';

export function useCreateJot() {
  const client = useQueryClient();
  const invalidateJots = useInvalidateJotList();

  return useMutation(createJot, {
    onSuccess: async () => {
      await invalidateJots();
      await client.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: TagService,
          cardinality: 'finite',
        }),
      });
    },
  });
}
