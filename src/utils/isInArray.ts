const isInArray = (id: number, array: { id: number }[] | undefined) => {
  if (array) {
    return array.some((elem) => elem.id === id);
  }
  return false;
};

export default isInArray;
