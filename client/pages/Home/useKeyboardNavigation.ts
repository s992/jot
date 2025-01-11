import { useHotkeys } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { useDoubleTapHotKey } from '../../lib/useDoubleTapHotkey';

type Bucket<T> = {
  items: T[];
};

export function useKeyboardNavigation<T>(buckets: Bucket<T>[]) {
  const [position, setPosition] = useState({ bucketIdx: -1, rowIdx: -1 });
  const usableBuckets = buckets.filter(({ items }) => items.length);

  const resetPosition = () => {
    setPosition({ bucketIdx: -1, rowIdx: -1 });
  };

  useEffect(() => {
    resetPosition();
  }, [buckets]);

  const onDown = () => {
    if (position.bucketIdx === -1 || position.rowIdx === -1) {
      setPosition({ bucketIdx: 0, rowIdx: 0 });
      return;
    }

    const currentBucket = usableBuckets[position.bucketIdx];

    if (position.rowIdx < currentBucket.items.length - 1) {
      setPosition((pos) => ({ ...pos, rowIdx: pos.rowIdx + 1 }));
      return;
    }

    if (position.bucketIdx < usableBuckets.length - 1) {
      setPosition((pos) => ({
        ...pos,
        bucketIdx: pos.bucketIdx + 1,
        rowIdx: 0,
      }));
      return;
    }
  };
  const onUp = () => {
    if (position.bucketIdx === -1 || position.rowIdx === -1) {
      setPosition({ bucketIdx: 0, rowIdx: 0 });
      return;
    }

    if (position.rowIdx > 0) {
      setPosition((pos) => ({ ...pos, rowIdx: pos.rowIdx - 1 }));
      return;
    }

    if (position.bucketIdx > 0) {
      const prevBucket = usableBuckets[position.bucketIdx - 1];
      setPosition({
        bucketIdx: position.bucketIdx - 1,
        rowIdx: prevBucket.items.length - 1,
      });
    }
  };

  useHotkeys([
    ['j', onDown],
    ['ArrowDown', onDown],
    ['k', onUp],
    ['ArrowUp', onUp],
    [
      'Escape',
      () => {
        resetPosition();
      },
    ],
    [
      'Shift+g',
      () => {
        const lastBucketIdx = usableBuckets.length - 1;

        setPosition({
          bucketIdx: lastBucketIdx,
          rowIdx: usableBuckets[lastBucketIdx].items.length - 1,
        });
      },
    ],
  ]);

  useDoubleTapHotKey('g', () => {
    setPosition({ bucketIdx: 0, rowIdx: 0 });
  });

  return [position.bucketIdx, position.rowIdx];
}
