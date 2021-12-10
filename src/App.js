import React, { useState } from "react";
import CalendarMain from "./components/CalendarMain";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const sampleSchedule = [
    {
        id: "1",
        calendarId: "0",
        title: "TOAST UI Calendar Study",
        category: "time",
        dueDateClass: "",
        start,
        end,
    },
    {
        id: "2",
        calendarId: "0",
        title: "Practice",
        category: "milestone",
        dueDateClass: "",
        start,
        end,
        isReadOnly: true,
    },
    {
        id: "3",
        calendarId: "0",
        title: "FE Workshop",
        category: "allday",
        dueDateClass: "",
        start,
        end,
        isReadOnly: true,
    },
    {
        id: "4",
        calendarId: "0",
        title: "Report",
        category: "time",
        dueDateClass: "",
        start,
        end,
    },
];

const App = () => {
    const [originSchedule, setOriginSchedule] = useState([sampleSchedule]);

    const onDeleteSchedule = (e, callback) => {
        console.log("onAddSchedule : " + callback);
    };
    const onUpdateSchedule = (e, callback) => {
        console.log("onAddSchedule : " + callback);
    };

    const onAddSchedule = (e, schedule) => {
        console.log("onAddSchedule : " + JSON.stringify([schedule]));
    };

    return (
        <div>
            <CalendarMain sampleSchedule={sampleSchedule}
                          originSchedule={originSchedule}
                          setOriginSchedule={setOriginSchedule}
                          onDeleteSchedule={onDeleteSchedule}
                          onUpdateSchedule={onUpdateSchedule} />
                          onAddSchedule={onAddSchedule}
        </div>
    );
};

export default App;
