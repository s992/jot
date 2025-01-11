import { tss } from 'tss-react';

export const useStyles = tss
  .withNestedSelectors<'actionContainer'>()
  .create(({ classes }) => ({
    table: {
      fontFamily: 'monospace',
    },
    tableRow: {
      [`&:hover .${classes.actionContainer}`]: {
        visibility: 'visible',
      },
    },
    activeTableRow: {
      backgroundColor: 'var(--mantine-color-gray-light)',
    },
    autoWidthTd: {
      width: '1%',
      whiteSpace: 'nowrap',
      verticalAlign: 'baseline',
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 'var(--mantine-spacing-md)',
    },
    content: {
      wordBreak: 'break-all',
    },
    actionContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--mantine-spacing-md)',
      visibility: 'hidden',
    },
    actionIcon: {
      opacity: 0.3,
      '&:hover': {
        opacity: 1,
      },
    },
  }));
