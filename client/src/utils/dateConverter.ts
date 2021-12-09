export const dateConverter = (date: Date) => {
  const result = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  return Number(result);
};
