import {Dispatch, SetStateAction} from "react";

export type CalendarProps = BaseProps &
    (SingleProps | MultipleProps | RangeProps)

export interface DateRange {
    from?: Date,
    to?: Date,
}

export interface WeekDay {
    day: number;
    pos: number;
}

interface BaseProps {
    mode?: Mode | undefined,
    locale?: Locale | undefined
}

export type Locale = "en" | "pt"

type Mode = "single" | "multiple" | "range"

type SingleProps = {
    mode?: "single",
    selected: Date | undefined,
    setSelected: Dispatch<SetStateAction<Date | undefined>>
}

type MultipleProps = {
    mode: "multiple",
    selected: Date[] | undefined,
    setSelected: Dispatch<SetStateAction<Date[] | undefined>>
}

type RangeProps = {
    mode: "range",
    selected: DateRange | undefined,
    setSelected: Dispatch<SetStateAction<DateRange| undefined>>
}