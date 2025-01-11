import { ActionIcon, Center, Stack, Table } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconHelp } from '@tabler/icons-react';
import { Fragment, useMemo, useState } from 'react';

import { HelpModal } from '../../components/HelpModal/HelpModal';
import { JotForm } from '../../components/JotForm';
import { JotTable } from '../../components/JotTable/JotTable';
import { SearchBar } from '../../components/SearchBar';
import { SearchModal } from '../../components/SearchModal';
import { useCreateJot } from '../../lib/createJot';
import { useJots } from '../../lib/listJots';
import { partitionJots } from '../../lib/partitionJots';
import { useShowErrorToast } from '../../lib/showErrorToast';
import { useStyles } from './styles';
import { useKeyboardNavigation } from './useKeyboardNavigation';

export function Home() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>();
  const { classes } = useStyles();
  const createJot = useCreateJot();
  const jotQuery = useJots(search);
  const jots = useMemo(
    () => jotQuery.data?.pages.flatMap((page) => page.jots) ?? [],
    [jotQuery.data],
  );
  const buckets = useMemo(() => partitionJots(jots), [jots]);
  const showErrorToast = useShowErrorToast();
  const { position, resetPosition, onRowClicked } =
    useKeyboardNavigation(buckets);

  useHotkeys([
    [
      'shift+slash',
      () => {
        setHelpOpen(true);
      },
    ],
  ]);

  return (
    <>
      <Center>
        <Stack className={classes.container}>
          <JotForm
            onCreate={async (tagName, content) => {
              try {
                await createJot.mutateAsync({ tagName, content });
              } catch {
                showErrorToast('failed to jot');
              }
            }}
            onFocused={() => {
              resetPosition();
            }}
          />
          <SearchBar search={search} onSearch={setSearch} />
          <Table>
            {buckets.map((bucket, idx) => (
              <Fragment key={bucket.heading}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>{bucket.heading}</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody key={bucket.heading}>
                  <JotTable
                    jots={bucket.items}
                    activeIdx={
                      idx === position.bucketIdx ? position.rowIdx : null
                    }
                    onRowClick={(rowIdx) => {
                      onRowClicked(idx, rowIdx);
                    }}
                  />
                </Table.Tbody>
              </Fragment>
            ))}
          </Table>
        </Stack>
      </Center>
      <SearchModal
        canClear={!!search}
        onSearch={(term) => {
          setSearch(term);
        }}
      />
      <HelpModal
        open={helpOpen}
        onClose={() => {
          setHelpOpen(false);
        }}
      />
      <Stack className={classes.floatingActionContainer}>
        <ActionIcon
          variant="subtle"
          onClick={() => {
            setHelpOpen(true);
          }}
        >
          <IconHelp size={32} color="gray" />
        </ActionIcon>
      </Stack>
    </>
  );
}
