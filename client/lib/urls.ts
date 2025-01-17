const regex =
  /([(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/gi;

export function wrapUrls(content: string) {
  return content.replaceAll(
    regex,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
  );
}

export function getUrls(content: string) {
  return content.match(regex);
}
