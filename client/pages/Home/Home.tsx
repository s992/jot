import { Center, Stack } from '@mantine/core';

import { JotForm } from '../../components/JotForm';
import { JotTable } from '../../components/JotTable/JotTable';
import { useCreateJot } from '../../lib/createJot';
import { useJots } from '../../lib/listJots';
import { partitionJots } from '../../lib/partitionJots';
import { useStyles } from './styles';

export function Home() {
  const { classes } = useStyles();
  const createJot = useCreateJot();
  const jotQuery = useJots();
  const jots = jotQuery.data?.pages.flatMap((page) => page.jots) ?? [];
  const { pinned, byDate } = partitionJots(jots);

  return (
    <Center>
      <Stack className={classes.container}>
        <JotForm
          onCreate={async (tagName, content) => {
            try {
              await createJot.mutateAsync({ tagName, content });
            } catch (err) {
              console.error('i should show a toast or something', err);
            }
          }}
        />
        {pinned.length > 0 && (
          <div>
            <h2 className={classes.sectionHeader}>pinned</h2>
            <JotTable jots={pinned} />
          </div>
        )}
        {Object.keys(byDate).map((date) => (
          <div key={date}>
            <h2 className={classes.sectionHeader}>{date}</h2>
            <JotTable jots={byDate[date]} />
          </div>
        ))}
      </Stack>
    </Center>
  );
}
