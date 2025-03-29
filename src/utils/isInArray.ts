const isInArray = <T extends { [key: string]: number }>(
  id: number,
  array: T[] | undefined,
  idKey: keyof T,
) => {
  if (array) {
    return array.some((elem) => elem[idKey] === id);
  }
  return false;
};

export default isInArray;
