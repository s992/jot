import { Table } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

import { type Jot, type Tag } from '../../generated/proto/jot/v1/jot_pb';
import { useActions } from '../../lib/useActions';
import { useDoubleTapHotKey } from '../../lib/useDoubleTapHotkey';
import { JotRow } from './JotRow';
import { useStyles } from './styles';

type Props = {
  jots: Jot[];
  activeIdx: number | null;
  onTagClick?: (tag: Tag) => void;
};

export function JotTable({ jots, activeIdx }: Props) {
  const { classes } = useStyles();
  const { copyContent, deleteJot, openUrl, togglePin } = useActions(
    activeIdx !== null ? jots[activeIdx] : null,
  );

  useHotkeys([
    ['y', copyContent],
    ['o', openUrl],
    ['p', togglePin],
  ]);

  useDoubleTapHotKey('d', deleteJot);

  return (
    <Table classNames={{ table: classes.table }}>
      <Table.Tbody>
        {jots.map((jot, idx) => (
          <JotRow
            key={`jot-${jot.jotId}`}
            jot={jot}
            isActive={idx === activeIdx}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
}
