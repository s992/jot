import { rem } from '@mantine/core';
import { type CSSObject } from 'tss-react';

export const inputHeight = rem(48);
export const inputBase: CSSObject = {
  fontFamily: 'monospace',
  fontSize: rem(16),
  lineHeight: inputHeight,
};

export const input: CSSObject = {
  ...inputBase,
  border: '1px solid var(--mantine-color-gray-3)',
  borderRadius: 'var(--mantine-radius-md)',
  zIndex: 1,
  ':focus, :hover': {
    borderColor: 'var(--mantine-color-gray-outline)',
  },
};

export const inputWrapper: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  height: inputHeight,
  position: 'relative',
};
