import { useQuery } from '@connectrpc/connect-query';

import { findTags } from '../generated/proto/jot/v1/jot-TagService_connectquery';

export function useTags(search = '', enabled = true) {
  return useQuery(findTags, { searchTerm: search }, { enabled });
}
