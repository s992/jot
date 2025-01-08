import { useMutation } from '@connectrpc/connect-query';

import { updateJot } from '../generated/proto/jot/v1/jot-JotService_connectquery';
import { useInvalidateJotList } from './listJots';

export function useUpdateJot() {
  const invalidateJots = useInvalidateJotList();

  return useMutation(updateJot, {
    onSuccess: invalidateJots,
  });
}
