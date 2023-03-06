const defaultLength = 20;

export const formatTextToUnderline = (text, length = defaultLength) => {
  if (text.length >= defaultLength) {
    return text;
  }

  const initialStr = '_'.repeat(length);
  const leftEdge = Math.ceil((defaultLength - text.length) / 2);
  const rightEdge = Math.ceil((defaultLength + text.length) / 2);

  console.log(leftEdge);
  return (
    initialStr.substring(0, leftEdge) +
    text +
    initialStr.substring(rightEdge, text.length)
  );
};
