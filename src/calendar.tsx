import {Dispatch, SetStateAction, useCallback, useState, PointerEvent, useLayoutEffect} from "react";
import {CalendarProps, DateRange, WeekDay} from "./types";
import {getDateCell, getWeekDays, getLocaleWeekDays, addClassesTo, removeClass, removeClasses} from "./utils";
import locales from "./locales";
import {FIRST, IN_RANGE, LAST, SELECTED} from "./index";

function Calendar({mode = "single", locale = "en", ...props}: CalendarProps) {
    const [current, setCurrent] = useState<Date>(new Date());

    const weeks: WeekDay[][] = getWeekDays(current);

    const handlePrevious = useCallback(() => {
        setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }, [setCurrent])

    const handleNext = useCallback(() => {
        setCurrent((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }, [setCurrent])

    const handleSingleSelect = useCallback((e: PointerEvent) => {
        const setSelected = props.setSelected as Dispatch<SetStateAction<Date | undefined>>;
        const day = e.currentTarget.parentElement?.getAttribute("data-day") ?? "";

        setSelected(prev => {
            if (prev?.getTime() === new Date(day).getTime()) return undefined;
            return new Date(day);
        })
    },[props.setSelected]);

    const handleMultipleSelect = useCallback((e: PointerEvent) => {
        const [selected, setSelected] = [props.selected as Date[], props.setSelected as Dispatch<SetStateAction<Date[]>>];
        const day = new Date(e.currentTarget.parentElement?.getAttribute("data-day") ?? "");

        if (selected === undefined) {
            setSelected([day])
            return;
        }

        const index = (selected as Date[]).findIndex(
            (i) => i.getTime() === day.getTime(),
        );

        setSelected?.((prev) => {
            if (index > -1) return prev.filter((i) => i.getTime() !== day.getTime());
            return [...prev.values()].concat([day]);
        });

    }, [props.selected, props.setSelected]);

    const handleRangeSelect = useCallback((e: PointerEvent) => {
        const [selected, setSelected] = [props.selected as DateRange, props.setSelected as Dispatch<SetStateAction<DateRange>>];
        const targetString = e.currentTarget.parentElement?.getAttribute("data-day") ?? "";
        const target = new Date(targetString);

        if (selected === undefined) {
            setSelected({from: new Date(target), to: undefined})
            return;
        }

        if (selected.from?.getTime() === target.getTime()) {
            setSelected(prev => ({...prev, from: undefined}))
        }
        else if (selected.to?.getTime() === target.getTime()) {
            setSelected(prev => ({...prev, to: undefined}))
        }
        else if (selected.from === undefined) {
            if (selected.to && target.getTime() > selected.to.getTime()) {
                setSelected(prev => ({from: prev.to, to: target}))
                return;
            }
            setSelected(prev => ({...prev, from: target}))
        }
        else if (selected.to === undefined) {
            if (selected.from && target.getTime() < selected.from.getTime()) {
                setSelected(prev => ({from: target, to: prev.from}));
                return;
            }
            setSelected(prev => ({...prev, to: target}))
        }
        else if (selected.from && selected.to) {
            if (target.getTime() < selected.from.getTime()) {
                setSelected(prev => ({...prev, from: target}))
            }
            if (target.getTime() > selected.to.getTime()) {
                setSelected(prev => ({...prev, to: target}))
            }
            else {
                setSelected(prev => ({...prev, from: target}))
            }
        }
    }, [props.selected, props.setSelected])

    const onClick = useCallback((e: PointerEvent) => {
        e.preventDefault();
        if (mode === "range") {
            handleRangeSelect(e)
        } else if (mode === "multiple") {
            handleMultipleSelect(e);
        } else {
            handleSingleSelect(e);
        }
    }, [mode, handleSingleSelect, handleMultipleSelect, handleRangeSelect])

    useLayoutEffect(() => {
        removeClass(SELECTED);
        removeClass(IN_RANGE);

        if (mode === "single") {
            addClassesTo([SELECTED], `dc${(props.selected as Date)?.toISOString().split("T")[0]}`);
        } //
        else if (mode === "multiple") {
            const _selected = props.selected as Date[];
            _selected?.forEach((i) =>
                addClassesTo([SELECTED], `dc${i.toISOString().split("T")[0]}`)
            );
        }
        else if (mode === "range") {
            const selected = props.selected as DateRange;
            removeClasses([FIRST, LAST]);


            if (selected === undefined) return;

            Object.values(selected).forEach((i: Date) => {
                const targetId = `dc${i?.toISOString().split('T')[0]}`;
                addClassesTo([SELECTED], targetId);
            })


            if (selected.from && selected.to) {
                const [from, to] = [selected.from, selected.to];
                const table = document.querySelector("#calendarTable");

                addClassesTo([FIRST], `dc${selected.from.toISOString().split("T")[0]}`);
                addClassesTo([LAST], `dc${selected.to.toISOString().split("T")[0]}`);

                table?.childNodes.item(1).childNodes.forEach(row => {
                    row.childNodes.forEach(cell => {
                        const target = new Date((cell as Element)?.getAttribute("data-day") ?? "");
                        if (target.getTime() > from.getTime?.() && target.getTime() < to.getTime()) {
                            (cell.firstChild as Element)?.classList.add(IN_RANGE);
                        }
                    })
                })
            }
        }
    }, [mode, props.selected, current]);

    return (
        <div className={"Calendar"}>
            <div className={"CalendarTop"}>
                <button onClick={handlePrevious}>{"<"}</button>
                <span>{locales.months[locale][current.getMonth()]} - {current.getFullYear()}</span>
                <button onClick={handleNext}>{">"}</button>
            </div>
            <table id={"calendarTable"}>
                <thead aria-hidden={true}>
                <tr>{getLocaleWeekDays(locale).map(d => <th aria-label={d[0]} key={d[0]} scope={"col"}>{d[1]}</th>)}</tr>
                </thead>
                <tbody>
                <tr>
                    {[...Array(weeks[0][0].pos).keys()].map((i) => (
                        <td key={i}></td>
                    ))}
                    {weeks
                        .shift()
                        ?.map((item) => getDateCell(item, current, onClick, locale))}
                </tr>
                {weeks.map((week) => (
                    <tr key={weeks.findIndex((w) => w === week)}>
                        {week.map((day) => getDateCell(day, current, onClick, locale))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export {Calendar}