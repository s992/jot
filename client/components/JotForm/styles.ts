import { rem } from '@mantine/core';
import { tss } from 'tss-react';

import { input, inputBase, inputWrapper } from '../../lib/inputStyles';

export const useStyles = tss.create({
  wrapper: {
    position: 'relative',
  },
  input,
  inputWrapper,
  completion: {
    ...inputBase,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid transparent',
    color: 'var(--mantine-color-placeholder)',
    height: '100%',
    paddingLeft: rem(34),
    position: 'absolute',
    top: 0,
    whiteSpace: 'pre',
    width: '100%',
  },
});
