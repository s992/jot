import { act, fireEvent, renderHook } from '@testing-library/react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { useKeyboardNavigation } from '../useKeyboardNavigation';

vi.mock('../../lib/useDoubleTapHotkey', () => ({
  useDoubleTapHotKey: vi.fn(),
}));

describe('useKeyboardNavigation', () => {
  const mockBuckets = [
    { items: ['item1-1', 'item1-2'] },
    { items: ['item2-1', 'item2-2', 'item2-3'] },
    { items: ['item3-1'] },
  ];

  let scrollToMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    scrollToMock = vi.fn();
    Object.defineProperty(document, 'scrollingElement', {
      value: { scrollTo: scrollToMock },
      writable: true,
    });
  });

  const triggerHotkey = (key: string, shiftKey = false, ctrlKey = false) => {
    fireEvent.keyDown(document.body, {
      key,
      shiftKey,
      ctrlKey,
    });
  };

  describe('initial state', () => {
    it('should start with no selection', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      expect(result.current.position).toEqual({ bucketIdx: -1, rowIdx: -1 });
    });
  });

  describe('navigation', () => {
    it('should move down with j/ArrowDown', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        triggerHotkey('j');
      });
      expect(result.current.position).toEqual({ bucketIdx: 0, rowIdx: 0 });

      act(() => {
        triggerHotkey('ArrowDown');
      });
      expect(result.current.position).toEqual({ bucketIdx: 0, rowIdx: 1 });
    });

    it('should move up with k/ArrowUp', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      // Move to middle position first
      act(() => {
        result.current.onRowClicked(1, 1);
      });

      act(() => {
        triggerHotkey('k');
      });
      expect(result.current.position).toEqual({ bucketIdx: 1, rowIdx: 0 });

      act(() => {
        triggerHotkey('ArrowUp');
      });
      expect(result.current.position).toEqual({ bucketIdx: 0, rowIdx: 1 });
    });

    it('should move between buckets', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      // Move to last item of first bucket
      act(() => {
        result.current.onRowClicked(0, 1);
      });

      act(() => {
        triggerHotkey('j');
      });
      expect(result.current.position).toEqual({ bucketIdx: 1, rowIdx: 0 });
    });

    it('should handle Shift+g (end)', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        triggerHotkey('g', true);
      });
      expect(result.current.position).toEqual({
        bucketIdx: mockBuckets.length - 1,
        rowIdx: mockBuckets[mockBuckets.length - 1].items.length - 1,
      });
    });

    it('should handle Home/End keys', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        triggerHotkey('End');
      });
      expect(result.current.position).toEqual({
        bucketIdx: mockBuckets.length - 1,
        rowIdx: mockBuckets[mockBuckets.length - 1].items.length - 1,
      });

      act(() => {
        triggerHotkey('Home');
      });
      expect(result.current.position).toEqual({ bucketIdx: 0, rowIdx: 0 });
    });

    it('should handle Ctrl+d (next bucket)', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(0, 0);
      });

      act(() => {
        triggerHotkey('d', false, true);
      });
      expect(result.current.position).toEqual({ bucketIdx: 1, rowIdx: 0 });
    });

    it('should handle Ctrl+u (previous bucket)', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(1, 0);
      });

      act(() => {
        triggerHotkey('u', false, true);
      });
      expect(result.current.position).toEqual({ bucketIdx: 0, rowIdx: 0 });
    });

    it('should handle Escape (reset)', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(1, 1);
      });
      expect(result.current.position).toEqual({ bucketIdx: 1, rowIdx: 1 });

      act(() => {
        triggerHotkey('Escape');
      });
      expect(result.current.position).toEqual({ bucketIdx: -1, rowIdx: -1 });
    });
  });

  describe('boundary conditions', () => {
    it('should not go past the last item', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(2, 0); // Last bucket, last item
      });

      act(() => {
        triggerHotkey('j');
      });
      expect(result.current.position).toEqual({ bucketIdx: 2, rowIdx: 0 });
    });

    it('should scroll to top when going up from first bucket', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(0, 0);
      });

      act(() => {
        triggerHotkey('k');
      });
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0 });
      expect(result.current.position).toEqual({ bucketIdx: -1, rowIdx: -1 });
    });
  });

  describe('reset behavior', () => {
    it('should reset position when buckets change', () => {
      const { result, rerender } = renderHook(
        ({ buckets }) => useKeyboardNavigation(buckets),
        { initialProps: { buckets: mockBuckets } },
      );

      act(() => {
        result.current.onRowClicked(1, 1);
      });

      rerender({ buckets: [...mockBuckets, { items: ['new-item'] }] });

      expect(result.current.position).toEqual({ bucketIdx: -1, rowIdx: -1 });
    });
  });

  describe('click handling', () => {
    it('should update position on row click', () => {
      const { result } = renderHook(() => useKeyboardNavigation(mockBuckets));

      act(() => {
        result.current.onRowClicked(1, 2);
      });
      expect(result.current.position).toEqual({ bucketIdx: 1, rowIdx: 2 });
    });
  });
});
