import {
  Kbd,
  Modal,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTr,
} from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { useStyles } from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function HelpModal({ open, onClose }: Props) {
  const { classes } = useStyles();
  const os = useOs();
  const mod = os === 'macos' ? '⌘' : 'Ctrl';

  return (
    <Modal opened={open} onClose={onClose} withCloseButton={false}>
      <Stack>
        <h1 className={classes.heading}>input</h1>
        <Table className={classes.table}>
          <TableTbody>
            <Shortcut keys={[['i'], ['#']]}>focus jot input</Shortcut>
            <Shortcut keys={[[mod, 'k'], [':'], ['/']]}>open search</Shortcut>
          </TableTbody>
        </Table>
        <h1 className={classes.heading}>navigation</h1>
        <Table className={classes.table}>
          <TableTbody>
            <Shortcut keys={[['?']]}>open this modal</Shortcut>
            <Shortcut keys={[['j'], ['↓']]}>down</Shortcut>
            <Shortcut keys={[['k'], ['↑']]}>up</Shortcut>
            <Shortcut keys={[['ctrl', 'd']]}>page down</Shortcut>
            <Shortcut keys={[['ctrl', 'u']]}>page up</Shortcut>
            <Shortcut keys={[['G'], ['End']]}>bottom</Shortcut>
            <Shortcut keys={[['gg'], ['Home']]}>top</Shortcut>
          </TableTbody>
        </Table>
        <h1 className={classes.heading}>actions</h1>
        <Table className={classes.table}>
          <TableTbody>
            <Shortcut keys={[['Esc']]}>clear highlight</Shortcut>
            <Shortcut keys={[['p']]}>pin highlighted</Shortcut>
            <Shortcut keys={[['o']]}>open highlighted url</Shortcut>
            <Shortcut keys={[['y']]}>copy highlighted text</Shortcut>
            <Shortcut keys={[['dd']]}>delete highlighted</Shortcut>
          </TableTbody>
        </Table>
      </Stack>
    </Modal>
  );
}

function Shortcut({
  keys,
  children,
}: {
  keys: string[][];
  children: ReactNode;
}) {
  return (
    <TableTr>
      <TableTd>
        {keys.map((set, idx) => (
          <Fragment key={`shortcut-${set.join('')}`}>
            <Keyset keys={set} />
            {idx < keys.length - 1 ? ' / ' : null}
          </Fragment>
        ))}
      </TableTd>
      <TableTd>{children}</TableTd>
    </TableTr>
  );
}

function Keyset({ keys }: { keys: string[] }) {
  return (
    <>
      {keys.map((key, idx) => (
        <Fragment key={`shortcut-${key}`}>
          <Kbd>{key}</Kbd>
          {idx < keys.length - 1 ? ' + ' : null}
        </Fragment>
      ))}
    </>
  );
}
