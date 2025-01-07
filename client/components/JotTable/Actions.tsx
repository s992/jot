import { ActionIcon } from '@mantine/core';
import {
  IconCopy,
  IconExternalLink,
  IconPin,
  IconTrash,
} from '@tabler/icons-react';

import { type Jot } from '../../generated/proto/jot/v1/jot_pb';
import { isUrl } from '../../lib/isUrl';
import { useShowErrorToast } from '../../lib/showErrorToast';
import { useShowSuccessToast } from '../../lib/showSuccessToast';
import { useStyles } from './styles';

type Props = {
  jot: Jot;
};

export function Actions({ jot }: Props) {
  const { classes } = useStyles();
  const showSuccessToast = useShowSuccessToast();
  const showErrorToast = useShowErrorToast();

  return (
    <>
      {isUrl(jot.content) && (
        <ActionIcon
          variant="subtle"
          size="sm"
          className={classes.actionIcon}
          onClick={() => window.open(jot.content, '_blank')}
        >
          <IconExternalLink />
        </ActionIcon>
      )}
      <ActionIcon
        variant="subtle"
        size="sm"
        className={classes.actionIcon}
        onClick={() => {
          navigator.clipboard
            .writeText(jot.content)
            .then(() => {
              showSuccessToast('', 'copied to clipboard');
            })
            .catch(() => {
              showErrorToast(
                'failed to copy',
                'are clipboard permissions enabled?',
              );
            });
        }}
      >
        <IconCopy />
      </ActionIcon>
      <ActionIcon variant="subtle" size="sm" className={classes.actionIcon}>
        <IconPin />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        size="sm"
        color="red"
        className={classes.actionIcon}
      >
        <IconTrash />
      </ActionIcon>
    </>
  );
}
