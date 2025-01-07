import { type CSSObject, tss } from 'tss-react';

const text: CSSObject = {
  color: 'white',
  fontFamily: 'monospace',
};

export const useToastStyle = tss.create({
  root: {
    maxWidth: 320,
    backgroundColor: 'black',
  },
  title: {
    ...text,
  },
  description: {
    ...text,
  },
});
