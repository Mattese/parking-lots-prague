import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs | number, format: string = 'DD.MM.YYYY') => dayjs(date).format(format);
