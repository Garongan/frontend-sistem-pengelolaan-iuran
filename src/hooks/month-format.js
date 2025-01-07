export const monthFormat = (date) => {
  return new Intl.DateTimeFormat('id', { month: 'long' }).format(date);
};
