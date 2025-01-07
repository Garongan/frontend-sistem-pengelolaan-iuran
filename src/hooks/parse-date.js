export const parseDate = (date) => {
  return new Date(new Date(date).setTime(new Date().getTime()));
};
