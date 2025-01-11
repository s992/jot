import { notifications } from '@mantine/notifications';
import { useCallback } from 'react';

import { useToastStyle } from './useToastStyle';

export function useShowErrorToast() {
  const { classes } = useToastStyle();

  return useCallback(
    (title: string, message?: string) =>
      notifications.show({
        title,
        message,
        position: 'bottom-center',
        color: 'black',
        autoClose: 10_000,
        classNames: classes,
      }),
    [classes],
  );
}
