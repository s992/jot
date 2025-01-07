import { useQuery } from '@connectrpc/connect-query';

import { findTags } from '../generated/proto/jot/v1/jot-TagService_connectquery';

export function useTags(search = '') {
  return useQuery(findTags, { searchTerm: search });
}
