import { ActionIcon, Chip, Group } from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import { IconSearch, IconX } from '@tabler/icons-react';

import { getTagColor } from '../../lib/getTagColor';
import { useTags } from '../../lib/listTags';
import { useStyles } from './styles';

type Props = {
  search: string | undefined;
  onSearch: (term: string | undefined) => void;
};

export function SearchBar({ search, onSearch }: Props) {
  const { classes } = useStyles();
  const { data: tags } = useTags();
  const chipColor = search ? getTagColor(search) : undefined;

  return (
    <Group justify="space-between" align="center">
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
          classNames={{
            label: classes.chip,
          }}
        >
          {search}
        </Chip>
      ) : (
        <Group>
          {tags?.tags.slice(0, 3).map((tag) => (
            <Chip
              key={`tag-${tag.tagId}`}
              color={getTagColor(tag.name)}
              onClick={() => {
                onSearch(tag.name);
              }}
              classNames={{
                label: classes.chip,
              }}
            >
              {tag.name}
            </Chip>
          ))}
        </Group>
      )}
    </Group>
  );
}
