import {Locale, WeekDay} from "../types";
import {CSSProperties} from "react";

export function getDateCell(
    styles: CSSProperties | undefined,
    day: WeekDay,
    date: Date,
    onClick?: CallableFunction,
    locale?: Locale) {
    const _date = new Date(date.getFullYear(), date.getMonth(), day.day);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateString = _date.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    return (
        <td style={styles} key={day.day} role="gridcell" data-day={dateString}>
            <button
                className={dateString === today ? "DateButton Today" : "DateButton"}
                id={"dc" + dateString}
                onClick={(e) => onClick?.(e)}
                aria-label={_date.toLocaleDateString(locale, options)}
            >
                {day.day}
            </button>
        </td>
    );
}
