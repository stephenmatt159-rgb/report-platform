import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export type DateFormat =
  | 'dddd, MMMM DD, YYYY'
  | 'ddd, MMMM D, YYYY'
  | 'ddd, MMM DD, YYYY'
  | 'Do MMMM, YYYY | hh:mm A'
  | 'HH:mm'
  | 'hh:mm A | Do MMMM, YYYY'
  | 'hh:mm A | Do MMM, YYYY'
  | 'hh:mm A'
  | 'MMMM DD, YYYY'
  | 'MMM DD, YYYY'
  | 'MMM DD, YYYY - hh:mm A'
  | 'MMM DD, YYYY - HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DDTHH:mm:ssZ'
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH:mm';

export const formatDate = (
  date: Date | string,
  format: DateFormat = 'Do MMMM, YYYY | hh:mm A',
) => {
  if (!date) return 'Nil';
  const parsed = dayjs.utc(date).local();
  return parsed.isValid() ? parsed.format(format) : 'Nil';
};

export const timeAgo = (
  value: string | Date | number,
  includeAgo: boolean = true,
) => {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else {
    const parts = value.split('-');
    if (parts.length === 3 && parts[2].length === 4) {
      const [day, month, year] = parts.map(Number);
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(value);
    }
  }

  const diff = Date.now() - date.getTime();
  if (isNaN(diff)) return 'Invalid date';

  const suffix = includeAgo ? ' ago' : '';
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return includeAgo ? 'just now' : '0 minutes';

  if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''}${suffix}`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''}${suffix}`;

  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''}${suffix}`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''}${suffix}`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}${suffix}`;

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? 's' : ''}${suffix}`;
};
