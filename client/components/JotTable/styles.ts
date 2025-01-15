import { tss } from 'tss-react';

export const useStyles = tss
  .withNestedSelectors<'visibleOnHover'>()
  .create(({ classes }) => ({
    tableRow: {
      [`&:hover .${classes.visibleOnHover}`]: {
        visibility: 'visible',
      },
    },
    visibleOnHover: {},
    activeTableRow: {
      backgroundColor: 'var(--mantine-color-gray-light)',
    },
    baseline: {
      verticalAlign: 'baseline',
    },
    autoWidthTd: {
      width: '1%',
      whiteSpace: 'nowrap',
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
      alignItems: 'center',
      gap: 'var(--mantine-spacing-xs)',
      paddingTop: 'var(--mantine-spacing-xs)',
      visibility: 'hidden',
    },
    visible: {
      visibility: 'visible',
    },
    timestamp: {
      visibility: 'hidden',
      color: 'var(--mantine-color-gray-5)',
    },
    actionIcon: {
      opacity: 0.3,
      '&:hover': {
        opacity: 1,
      },
    },
    tagCell: {
      display: 'flex',
      flexDirection: 'column',
    },
  }));
