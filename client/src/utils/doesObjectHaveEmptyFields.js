export const doesObjectHaveEmptyFields = (object) => {
  const keys = Object.keys(object);
  const isFieldEmpty = keys.reduce((acc, current) => {
    const field = object[current];
    if (typeof field === 'object') {
      return acc;
    }

    return acc || field === '';
  }, false);
  return isFieldEmpty;
};
