import { timestampDate } from '@bufbuild/protobuf/wkt';
import { Table } from '@mantine/core';
import { useIntersection, usePrevious } from '@mantine/hooks';
import { format } from 'date-fns/format';
import { useEffect, useRef } from 'react';

import { type Jot } from '../../generated/proto/jot/v1/jot_pb';
import { TagDisplay } from '../TagDisplay';
import { Actions } from './Actions';
import { useStyles } from './styles';

type Props = {
  jot: Jot;
  isActive: boolean;
};

export function JotRow({ jot, isActive }: Props) {
  const scrollRef = useRef<HTMLTableRowElement>(null);
  const previousIsActive = usePrevious(isActive);
  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (!isActive || previousIsActive === isActive || entry?.isIntersecting) {
      return;
    }

    scrollRef.current?.scrollIntoView();
  }, [entry?.isIntersecting, isActive, previousIsActive]);

  return (
    <>
      <Table.Tr
        ref={scrollRef}
        className={cx(classes.tableRow, {
          [classes.activeTableRow]: isActive,
        })}
      >
        <Table.Td
          ref={ref}
          className={cx(classes.autoWidthTd, classes.baseline)}
        >
          {jot.tag && <TagDisplay tag={jot.tag} />}
          <div className={classes.actionContainer}>
            <Actions jot={jot} />
          </div>
        </Table.Td>
        <Table.Td className={cx(classes.autoWidthTd, classes.baseline)}>
          {jot.createdAt
            ? format(timestampDate(jot.createdAt), 'MM-dd-yyyy hh:mm:ss aa')
            : '-'}
        </Table.Td>
        <Table.Td className={classes.baseline}>
          <div className={classes.contentContainer}>
            <span className={classes.content}>{jot.content}</span>
          </div>
        </Table.Td>
      </Table.Tr>
    </>
  );
}
