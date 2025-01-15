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

  const onRowClicked = (bucketIdx: number, rowIdx: number) => {
    if (bucketIdx === position.bucketIdx && rowIdx === position.rowIdx) {
      resetPosition();
      return;
    }

    setPosition({ bucketIdx, rowIdx });
  };

  useEffect(() => {
    resetPosition();
  }, [buckets]);

  const maybeGoToNextBucket = () => {
    if (position.bucketIdx < usableBuckets.length - 1) {
      setPosition((pos) => ({
        ...pos,
        bucketIdx: pos.bucketIdx + 1,
        rowIdx: 0,
      }));
    }
  };

  const maybeGoToPrevBucket = (end = true) => {
    if (position.bucketIdx > 0) {
      const prevBucket = usableBuckets[position.bucketIdx - 1];
      setPosition({
        bucketIdx: position.bucketIdx - 1,
        rowIdx: end ? prevBucket.items.length - 1 : 0,
      });
    } else {
      resetPosition();
      // so we don't get stuck with the input offscreen
      document.scrollingElement?.scrollTo({ top: 0 });
    }
  };

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

    maybeGoToNextBucket();
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

    maybeGoToPrevBucket();
  };
  const onStart = () => {
    setPosition({ bucketIdx: 0, rowIdx: 0 });
  };
  const onEnd = () => {
    const lastBucketIdx = usableBuckets.length - 1;

    setPosition({
      bucketIdx: lastBucketIdx,
      rowIdx: usableBuckets[lastBucketIdx].items.length - 1,
    });
  };
  const onPgUp = () => {
    maybeGoToPrevBucket(false);
  };

  useHotkeys([
    ['j', onDown],
    ['ArrowDown', onDown],
    ['k', onUp],
    ['ArrowUp', onUp],
    ['Shift+g', onEnd],
    ['Home', onStart],
    ['End', onEnd],
    ['Ctrl+d', maybeGoToNextBucket],
    ['Ctrl+u', onPgUp],
    [
      'Escape',
      () => {
        resetPosition();
      },
    ],
  ]);

  useDoubleTapHotKey('g', onStart);

  return { position, resetPosition, onRowClicked };
}
