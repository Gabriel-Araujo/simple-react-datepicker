//import {Calendar} from "./components/calendar";
import {useState} from "react";
import {Calendar, DateRange} from "sr-datepicker"
import "sr-datepicker/dist/styles/defaultStyles.css"

function App() {
    const [date, setDate] = useState<Date>();
    const [dates, setDates] = useState<Date[]>();
    const [range, setRange] = useState<DateRange>();

    return (
        <div style={{display: "flex", justifyContent: "space-evenly", height: "100vh", alignItems: "center"}}>
            <div>
                <p>Single mode</p>
                <Calendar locale={"pt"} selected={date} setSelected={setDate} />
            </div>
            <div>
                <p>Multiple mode</p>
                <Calendar mode={"multiple"} locale={"pt"} selected={dates} setSelected={setDates} />
            </div>
            <div>
                <p>Range mode</p>
                <Calendar mode={"range"} locale={"pt"} selected={range} setSelected={setRange} />
            </div>
        </div>
    )
}

export default App
