import { ActionIcon, Chip, Group } from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import { IconSearch, IconX } from '@tabler/icons-react';

import { getTagColor } from '../../lib/getTagColor';
import { TagList } from './TagList';
import { useStyles } from './styles';

type Props = {
  search: string | undefined;
  onSearch: (term: string | undefined) => void;
};

export function SearchBar({ search, onSearch }: Props) {
  const { classes } = useStyles();
  const chipColor = search ? getTagColor(search) : undefined;

  return (
    <Group className={classes.barContainer}>
      <ActionIcon aria-label="search" variant="subtle" onClick={openSpotlight}>
        <IconSearch size={16} />
      </ActionIcon>
      {search ? (
        <Chip
          defaultChecked
          onClick={() => {
            onSearch(undefined);
          }}
          color={chipColor}
          icon={<IconX size={16} />}
        >
          {search}
        </Chip>
      ) : (
        <TagList
          onTagSelected={(tag) => {
            onSearch(tag.name);
          }}
        />
      )}
    </Group>
  );
}
