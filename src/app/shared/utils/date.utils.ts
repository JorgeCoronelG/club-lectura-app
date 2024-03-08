export const getDateFormat = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
  const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${date.getFullYear()}-${month}-${day}`;
};
