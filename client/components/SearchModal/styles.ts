import { tss } from 'tss-react';

import { inputBase, inputWrapper } from '../../lib/inputStyles';

export const useStyles = tss.create({
  input: {
    ...inputBase,
    border: 'none',
  },
  inputWrapper,
});
