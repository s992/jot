import { createConnectQueryKey, useMutation } from '@connectrpc/connect-query';
import { useQueryClient } from '@tanstack/react-query';

import { createJot } from '../generated/proto/jot/v1/jot-JotService_connectquery';
import { JotService, TagService } from '../generated/proto/jot/v1/jot_pb';

export function useCreateJot() {
  const client = useQueryClient();

  return useMutation(createJot, {
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: JotService,
          cardinality: 'infinite',
        }),
      });

      await client.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: TagService,
          cardinality: 'finite',
        }),
      });
    },
  });
}
