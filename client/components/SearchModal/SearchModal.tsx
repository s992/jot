import { Spotlight, type SpotlightActionData } from '@mantine/spotlight';
import { IconHash, IconSearch, IconX } from '@tabler/icons-react';
import { useState } from 'react';

import { getTagColor } from '../../lib/getTagColor';
import { useTags } from '../../lib/listTags';
import { useStyles } from './styles';

type Props = {
  canClear: boolean;
  onSearch: (term: string | undefined) => void;
};

export function SearchModal({ canClear, onSearch }: Props) {
  const [value, setValue] = useState('');
  const { classes } = useStyles();
  const tags = useTags();
  const onActionSelected = (term: string | undefined) => {
    onSearch(term);
    setValue('');
  };
  const tagActions: SpotlightActionData[] =
    tags.data?.tags.map((tag) => ({
      id: `tag-${tag.tagId}`,
      label: tag.name,
      leftSection: <IconHash size={16} color={getTagColor(tag.name)} />,
      onClick: () => {
        onActionSelected(tag.name);
      },
    })) ?? [];
  const actions = [
    ...tagActions,
    ...(canClear
      ? [
          {
            id: 'clear',
            label: 'clear search',
            leftSection: <IconX size={16} />,
            onClick: () => {
              onActionSelected(undefined);
            },
          },
        ]
      : []),
    ...(value
      ? [
          {
            id: 'search',
            label: value,
            leftSection: <IconSearch size={16} />,
            onClick: () => {
              onActionSelected(value);
            },
          },
        ]
      : []),
  ];

  return (
    <Spotlight
      shortcut={['mod + K', '/', 'shift+semicolon']}
      actions={actions}
      highlightQuery
      searchProps={{
        value,
        onChange: (e) => {
          setValue(e.target.value);
        },
        leftSection: <IconSearch size={16} />,
        classNames: {
          input: classes.input,
        },
      }}
    />
  );
}
