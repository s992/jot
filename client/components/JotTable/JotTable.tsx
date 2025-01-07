import { timestampDate } from '@bufbuild/protobuf/wkt';
import { Table } from '@mantine/core';
import { format } from 'date-fns';

import { type Jot, type Tag } from '../../generated/proto/jot/v1/jot_pb';
import { TagDisplay } from '../TagDisplay';
import { useStyles } from './styles';

type Props = {
  jots: Jot[];
  onTagClick?: (tag: Tag) => void;
};

export function JotTable({ jots, onTagClick }: Props) {
  const { classes } = useStyles();

  return (
    <Table classNames={{ table: classes.table }}>
      <Table.Tbody>
        {jots.map((jot) => (
          <Table.Tr key={jot.jotId}>
            <Table.Td className={classes.autoWidthTd}>
              {jot.tag && <TagDisplay tag={jot.tag} onClick={onTagClick} />}
            </Table.Td>
            <Table.Td className={classes.autoWidthTd}>
              {jot.createdAt
                ? format(timestampDate(jot.createdAt), 'MM-dd-yyyy hh:mm:ss aa')
                : '-'}
            </Table.Td>
            <Table.Td>{jot.content}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
