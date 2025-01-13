import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Jot } from '../../generated/proto/jot/v1/jot_pb';
import { useActions } from '../useActions';

vi.mock('./showSuccessToast', () => ({
  useShowSuccessToast: () => vi.fn(),
}));

vi.mock('./showErrorToast', () => ({
  useShowErrorToast: () => vi.fn(),
}));

vi.mock('./updateJot', () => ({
  useUpdateJot: () => ({
    mutate: vi.fn(),
  }),
}));

const client = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

describe('useActions', () => {
  const mockJot = {
    jotId: 123n,
    content: 'Test content https://example.com',
    pinned: false,
    deleted: false,
    createdAt: undefined,
  } as Jot;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'open').mockImplementation(vi.fn());
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(),
      },
      writable: true,
    });
  });

  describe('openUrl', () => {
    it('should open the first URL in a new tab', () => {
      const { result } = renderHook(() => useActions(mockJot), { wrapper });

      act(() => {
        result.current.openUrl();
      });

      expect(window.open).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noreferrer',
      );
    });

    it('should not open window if no URLs present', () => {
      const jotWithoutUrl = { ...mockJot, content: 'No URL here' };
      const { result } = renderHook(() => useActions(jotWithoutUrl), {
        wrapper,
      });

      act(() => {
        result.current.openUrl();
      });

      expect(window.open).not.toHaveBeenCalled();
    });

    it('should not throw if jot is null', () => {
      const { result } = renderHook(() => useActions(null), { wrapper });

      expect(() => {
        act(() => {
          result.current.openUrl();
        });
      }).not.toThrow();
    });
  });

  describe('copyContent', () => {
    it('should copy content to clipboard', async () => {
      const { result } = renderHook(() => useActions(mockJot), { wrapper });
      (navigator.clipboard.writeText as Mock).mockResolvedValue(undefined);

      await act(async () => {
        await result.current.copyContent();
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        mockJot.content,
      );
    });

    it('should not throw if jot is null', () => {
      const { result } = renderHook(() => useActions(null), { wrapper });

      expect(() => {
        act(() => {
          void result.current.copyContent();
        });
      }).not.toThrow();
    });
  });

  describe('togglePin', () => {
    it('should not throw if jot is null', () => {
      const { result } = renderHook(() => useActions(null), { wrapper });

      expect(() => {
        act(() => {
          result.current.togglePin();
        });
      }).not.toThrow();
    });
  });

  describe('deleteJot', () => {
    it('should not throw if jot is null', () => {
      const { result } = renderHook(() => useActions(null), { wrapper });

      expect(() => {
        act(() => {
          result.current.deleteJot();
        });
      }).not.toThrow();
    });
  });
});
