import { useHotkeys } from '@mantine/hooks';
import { useRef } from 'react';

export function useDoubleTapHotKey(key: string, action: () => void) {
  const lastPress = useRef<number>(-1);
  const onPress = () => {
    const now = performance.now();

    if (now - lastPress.current <= 500) {
      action();
      lastPress.current = -1;
      return;
    }

    lastPress.current = now;
  };

  useHotkeys([[key, onPress]]);
}
