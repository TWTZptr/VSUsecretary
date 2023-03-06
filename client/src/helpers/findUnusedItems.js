export const findUnusedItems = (items, usedItems) => {
  const s = new Set();
  usedItems.forEach((item) => s.add(item.id));
  return items.filter((item) => !s.has(item.id));
};
