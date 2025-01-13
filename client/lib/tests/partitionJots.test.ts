import { timestampFromDate } from '@bufbuild/protobuf/wkt';
import { describe, expect, it } from 'vitest';

import type { Jot } from '../../generated/proto/jot/v1/jot_pb';
import { partitionJots } from '../partitionJots';

describe('partitionJots', () => {
  const createJot = (props: Partial<Jot>): Jot =>
    ({
      jotId: 0n,
      content: '',
      pinned: false,
      deleted: false,
      createdAt: undefined,
      ...props,
    }) as Jot;

  const createTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return timestampFromDate(date);
  };

  it('should separate pinned and unpinned jots', () => {
    const jots = [
      createJot({ pinned: true, content: 'pinned1' }),
      createJot({ pinned: false, content: 'unpinned1' }),
      createJot({ pinned: true, content: 'pinned2' }),
    ];

    const result = partitionJots(jots);

    expect(result[0].heading).toBe('pinned');
    expect(result[0].items).toHaveLength(2);
    expect(result[0].items.every((jot) => jot.pinned)).toBe(true);
  });

  it('should sort dates in descending order', () => {
    const jots = [
      createJot({
        createdAt: createTimestamp('2024-01-01'),
        content: 'older',
      }),
      createJot({
        createdAt: createTimestamp('2024-01-02'),
        content: 'newer',
      }),
    ];

    const result = partitionJots(jots);

    expect(result[0].heading).toBe('01-02-2024');
    expect(result[1].heading).toBe('01-01-2024');
  });

  it('should group jots by date', () => {
    const sameDate = createTimestamp('2024-01-01');
    const jots = [
      createJot({ createdAt: sameDate, content: 'first' }),
      createJot({ createdAt: sameDate, content: 'second' }),
    ];

    const result = partitionJots(jots);

    expect(result).toHaveLength(1);
    expect(result[0].items).toHaveLength(2);
  });

  it('should handle jots without createdAt', () => {
    const jots = [createJot({ content: 'no date' })];

    const result = partitionJots(jots);

    expect(result[0].heading).toBe('-');
    expect(result[0].items).toHaveLength(1);
  });

  it('should filter out empty buckets', () => {
    const jots: Jot[] = [];
    const result = partitionJots(jots);
    expect(result).toHaveLength(0);
  });
});
