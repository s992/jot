import { ActionIcon } from '@mantine/core';
import {
  IconCopy,
  IconPin,
  IconPinFilled,
  IconTrash,
} from '@tabler/icons-react';

import { type Jot } from '../../generated/proto/jot/v1/jot_pb';
import { useActions } from '../../lib/useActions';
import { useStyles } from './styles';

type Props = {
  jot: Jot;
};

export function Actions({ jot }: Props) {
  const { classes } = useStyles();
  const { copyContent, togglePin, deleteJot } = useActions(jot);

  return (
    <>
      <ActionIcon
        variant="subtle"
        size="sm"
        className={classes.actionIcon}
        onClick={() => {
          copyContent();
        }}
      >
        <IconCopy />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        size="sm"
        className={classes.actionIcon}
        onClick={() => {
          togglePin();
        }}
      >
        {jot.pinned ? <IconPinFilled /> : <IconPin />}
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        size="sm"
        color="red"
        className={classes.actionIcon}
        onClick={() => {
          deleteJot();
        }}
      >
        <IconTrash />
      </ActionIcon>
    </>
  );
}
