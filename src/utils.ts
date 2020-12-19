import { Dimensions } from 'react-native';
import { startOfWeek, endOfWeek, addDays, getDate, format } from 'date-fns';

export const getScreenWidth = Dimensions.get('window').width;

export const getWeeklyDates = () => {
  const startWeek = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  const endWeek = endOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  const lastDay = getDate(endWeek);


  const dates = [startWeek];

  let isEnd = false;

  while (!isEnd) {
    const lastDate = dates[dates.length - 1];
    const nextDate = addDays(lastDate, 1);
    const nextDay = getDate(nextDate);
    if (nextDay < lastDay) {
      dates.push(nextDate);
    } else {
      dates.push(endWeek);
      isEnd = true;
    }
  }

  return dates;
};

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
