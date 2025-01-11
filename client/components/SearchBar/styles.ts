import { tss } from 'tss-react';

export const useStyles = tss.create({
  hidden: {
    visibility: 'hidden',
  },
  barContainer: {
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
});
