import { Center, Stack } from '@mantine/core';
import { useMemo } from 'react';

import { JotForm } from '../../components/JotForm';
import { JotTable } from '../../components/JotTable/JotTable';
import { useCreateJot } from '../../lib/createJot';
import { useJots } from '../../lib/listJots';
import { partitionJots } from '../../lib/partitionJots';
import { useShowErrorToast } from '../../lib/showErrorToast';
import { useStyles } from './styles';
import { useKeyboardNavigation } from './useKeyboardNavigation';

export function Home() {
  const { classes } = useStyles();
  const createJot = useCreateJot();
  const jotQuery = useJots();
  const jots = useMemo(
    () => jotQuery.data?.pages.flatMap((page) => page.jots) ?? [],
    [jotQuery.data],
  );
  const buckets = useMemo(() => partitionJots(jots), [jots]);
  const showErrorToast = useShowErrorToast();
  const [activeBucket, activeRow] = useKeyboardNavigation(buckets);

  return (
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
        />
        {buckets
          .filter((bucket) => bucket.items.length)
          .map((bucket, idx) => (
            <div key={bucket.heading}>
              <h2 className={classes.sectionHeader}>{bucket.heading}</h2>
              <JotTable
                jots={bucket.items}
                activeIdx={idx === activeBucket ? activeRow : null}
              />
            </div>
          ))}
      </Stack>
    </Center>
  );
}
