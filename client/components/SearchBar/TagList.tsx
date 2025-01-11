import { Chip, Group } from '@mantine/core';
import { RefObject } from 'react';

import type { Tag } from '../../generated/proto/jot/v1/jot_pb';
import { getTagColor } from '../../lib/getTagColor';
import { useTags } from '../../lib/listTags';
import { useStyles } from './styles';
import { useHideOverflowTags } from './useHideOverflowTags';

type Props = {
  onTagSelected: (tag: Tag) => void;
};

export function TagList({ onTagSelected }: Props) {
  const { data: tags } = useTags();
  const { containerRef } = useHideOverflowTags();
  const { classes } = useStyles();

  return (
    <Group
      ref={containerRef as RefObject<HTMLDivElement>}
      className={classes.tagContainer}
    >
      {tags?.tags.map((tag) => (
        <Chip
          key={`tag-${tag.tagId}`}
          color={getTagColor(tag.name)}
          onClick={() => {
            onTagSelected(tag);
          }}
        >
          {tag.name}
        </Chip>
      ))}
    </Group>
  );
}
