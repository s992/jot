import { tss } from 'tss-react';

import { type Tag } from '../../generated/proto/jot/v1/jot_pb';
import { getTagColor } from '../../lib/getTagColor';

export function useStyles(tag: Tag, isClickable: boolean) {
  const color = getTagColor(tag.name);

  return tss.create({
    link: {
      color,
      cursor: isClickable ? 'pointer' : 'text',
      width: 'fit-content',
    },
  })();
}
