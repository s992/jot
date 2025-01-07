import { tss } from 'tss-react';

export const useStyles = tss.create({
  container: {
    width: '70%',
    padding: 'var(--mantine-spacing-lg)',
    '@media': {
      ['(max-width: var(--mantine-breakpoints-xs)']: {
        width: '100%',
        padding: 'var(--mantine-spacing-xs)',
      },
    },
  },
  sectionHeader: {
    fontFamily: 'monospace',
    margin: 0,
  },
});
