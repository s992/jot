import { timestampDate } from '@bufbuild/protobuf/wkt';
import { format, parse } from 'date-fns';

import type { Jot } from '../generated/proto/jot/v1/jot_pb';

export function partitionJots<T extends Jot>(jots: T[]) {
  const pinned: T[] = [];
  const byDate: Record<string, T[]> = {};

  for (const jot of jots) {
    if (jot.pinned) {
      pinned.push(jot);
      continue;
    }

    const formattedDate = jot.createdAt
      ? format(timestampDate(jot.createdAt), 'MM-dd-yyyy')
      : '-';

    // wtf?
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!byDate[formattedDate]) {
      byDate[formattedDate] = [];
    }

    byDate[formattedDate].push(jot);
  }

  const buckets = [
    { heading: 'pinned', items: pinned },
    ...Object.keys(byDate)
      .sort((a, b) => {
        const ref = new Date();

        return parse(a, 'MM-dd-yyyy', ref) < parse(b, 'MM-dd-yyyy', ref)
          ? 1
          : -1;
      })
      .map((date) => ({
        heading: date,
        items: byDate[date],
      })),
  ];

  return buckets.filter(({ items }) => items.length);
}
