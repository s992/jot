import { tss } from 'tss-react';

export const useStyles = tss.create({
  table: {
    fontFamily: 'monospace',
  },
  autoWidthTd: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
});
