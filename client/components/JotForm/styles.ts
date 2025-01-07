import { rem } from '@mantine/core';
import { type CSSObject, tss } from 'tss-react';

const inputHeight = rem(48);
const inputBase: CSSObject = {
  fontFamily: 'monospace',
  fontSize: rem(16),
  lineHeight: inputHeight,
};

export const useStyles = tss.create({
  wrapper: {
    position: 'relative',
  },
  input: {
    ...inputBase,
    border: '1px solid var(--mantine-color-gray-3)',
    borderRadius: 'var(--mantine-radius-md)',
    zIndex: 1,
    ':focus, :hover': {
      borderColor: 'var(--mantine-color-gray-outline)',
    },
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: inputHeight,
    position: 'relative',
  },
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
