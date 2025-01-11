const COLORS = [
  '#f44336',
  '#e81e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#000000',
] as const;

const lookup: Record<string, string> = {};

export function getTagColor(tagName: string): string {
  if (!lookup[tagName]) {
    const hash = hashString(tagName);
    const index = Math.abs(hash) % COLORS.length;

    lookup[tagName] = COLORS[index];
  }

  return lookup[tagName];
}

function hashString(tag: string) {
  let hash = 0;

  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}
