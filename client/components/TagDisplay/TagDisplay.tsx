import { Anchor } from '@mantine/core';

import { type Tag } from '../../generated/proto/jot/v1/jot_pb';
import { useStyles } from './styles';

type Props = {
  tag: Tag;
  onClick?: (tag: Tag) => void;
};

export function TagDisplay({ tag, onClick }: Props) {
  const { classes } = useStyles(tag, !!onClick);

  return (
    <Anchor
      component={onClick ? 'a' : 'span'}
      underline={onClick ? 'hover' : 'never'}
      className={classes.link}
      onClick={() => {
        onClick?.(tag);
      }}
    >
      #{tag.name}
    </Anchor>
  );
}
