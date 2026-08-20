export const htmlToText = (value: string): string => {
  if (!value) return '';

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(value);

  if (!isHtml) {
    return value;
  }

  const doc = new DOMParser().parseFromString(value, 'text/html');

  return doc.body.textContent?.trim() ?? '';
};
