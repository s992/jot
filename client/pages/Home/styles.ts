import { tss } from 'tss-react';

export const useStyles = tss.create({
  container: {
    width: '70%',
    paddingBottom: 'var(--mantine-spacing-md)',
    // --mantine-breakpoint-md
    '@media (max-width: 62rem)': {
      width: '100%',
      padding: 'var(--mantine-spacing-xs)',
    },
  },
  sectionHeader: {
    margin: 0,
  },
  floatingActionContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    padding: 'var(--mantine-spacing-lg)',
  },
});
