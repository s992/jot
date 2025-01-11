import { timestampDate } from '@bufbuild/protobuf/wkt';
import { Table } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { format } from 'date-fns';

import { type Jot, type Tag } from '../../generated/proto/jot/v1/jot_pb';
import { useActions } from '../../lib/useActions';
import { useDoubleTapHotKey } from '../../lib/useDoubleTapHotkey';
import { TagDisplay } from '../TagDisplay';
import { Actions } from './Actions';
import { useStyles } from './styles';

type Props = {
  jots: Jot[];
  activeIdx: number | null;
  onTagClick?: (tag: Tag) => void;
};

export function JotTable({ jots, activeIdx, onTagClick }: Props) {
  const { classes, cx } = useStyles();
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
          <Table.Tr
            key={jot.jotId}
            className={cx(classes.tableRow, {
              [classes.activeTableRow]: idx === activeIdx,
            })}
          >
            <Table.Td className={classes.autoWidthTd}>
              {jot.tag && <TagDisplay tag={jot.tag} onClick={onTagClick} />}
            </Table.Td>
            <Table.Td className={classes.autoWidthTd}>
              {jot.createdAt
                ? format(timestampDate(jot.createdAt), 'MM-dd-yyyy hh:mm:ss aa')
                : '-'}
            </Table.Td>
            <Table.Td>
              <div className={classes.contentContainer}>
                <span className={classes.content}>{jot.content}</span>
                <div className={classes.actionContainer}>
                  <Actions jot={jot} />
                </div>
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
