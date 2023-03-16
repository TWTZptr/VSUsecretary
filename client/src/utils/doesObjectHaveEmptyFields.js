export const doesObjectHaveEmptyFields = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, current) => {
    const field = object[current];
    if (typeof field === 'object') {
      return acc;
    }

    return acc || field === '';
  }, false);
};
