import { notifications } from '@mantine/notifications';

import { useToastStyle } from './useToastStyle';

export function useShowSuccessToast() {
  const { classes } = useToastStyle();

  return (title: string, message: string, autoClose: number | boolean = 1000) =>
    notifications.show({
      title,
      message,
      position: 'bottom-center',
      withCloseButton: false,
      color: 'black',
      autoClose,
      classNames: classes,
    });
}
