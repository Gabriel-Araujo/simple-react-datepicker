import { Locale, WeekDay } from '../types';
export declare function getLocaleWeekDays(locale: Locale): [string, string][];
export declare function getTotalDaysInMonth(date: Readonly<Date>): number;
export declare function getFirstDay(date: Readonly<Date>): number;
export declare function getDaysInMonth(date: Readonly<Date>): number[];
export declare function getWeekDays(date: Readonly<Date>): WeekDay[][];
