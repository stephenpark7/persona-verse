import moment from 'moment';

export const getMonthAndDay = (date: string) => {
  return moment(date, 'YYYY-MM-DD').format('MMM D');
};
