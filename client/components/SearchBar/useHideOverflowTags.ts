import { useElementSize } from '@mantine/hooks';
import { useCallback, useEffect } from 'react';

import { useStyles } from './styles';

export function useHideOverflowTags() {
  const { classes } = useStyles();
  const { ref: containerRef, width: containerWidth } =
    useElementSize<HTMLDivElement>();
  const truncate = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    console.log('in truncate', { containerWidth });

    const containerEl = containerRef.current;
    const tagEls = containerEl.children;
    const gap = parseInt(getComputedStyle(containerEl).columnGap, 10);
    let totalWidth = 0;

    for (let i = 0; i < tagEls.length; i++) {
      const isFirst = i === 0;
      const tagEl = tagEls[i];
      tagEl.classList.remove(classes.hidden);

      const { left, right } = tagEl.getBoundingClientRect();
      totalWidth += right - left;

      const currentGap = i * gap;

      if (!isFirst && totalWidth + currentGap > containerWidth) {
        tagEl.classList.add(classes.hidden);
      }
    }
  }, [containerRef, classes.hidden, containerWidth]);

  useEffect(() => {
    truncate();
  }, [containerWidth, truncate]);

  return { containerRef };
}
