import {Locale, WeekDay} from "../types";
import locales from "../locales";

export function getLocaleWeekDays(locale: Locale): [string, string][] {
    return Object.entries(locales.days[locale]);
}

export function getTotalDaysInMonth(date: Readonly<Date>): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDay(date: Readonly<Date>) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getDaysInMonth(date: Readonly<Date>): number[] {
    let first = getFirstDay(date);
    const t = [...Array(getTotalDaysInMonth(date)).keys()];

    return t.map(() => {
        if (first > 6) {
            first = 0;
        }

        return first++;
    });
}

export function getWeekDays(date: Readonly<Date>): WeekDay[][] {
    const days = getDaysInMonth(date);
    const weekday: WeekDay[][] = [[]];
    let week = 0;
    let day = 0;

    days.forEach((pos) => {
        weekday[week].push({ day: ++day, pos });
        if (pos === 6) {
            week++;
            weekday.push([]);
        }
    });

    return weekday;
}
