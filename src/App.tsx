import React from 'react';
type Times = {
  weekdays:Weekdays[],
  holidays:string[],
  noWorkDays:string[]
}
type Weekdays = {
  isWorkDay:boolean,
  workTimes?:WorkTime[]
} 
type WorkTime = {
  start:string,
  end:string,
}
function App() {
  const times:Times = {
    weekdays: [
        {
            isWorkDay: false,
        },
        {
            isWorkDay: true,
            workTimes: [
                {
                    start: "09:00",
                    end: "19:00"
                }
            ]
        },
        {
            isWorkDay: true,
            workTimes: [
                {
                    start: "09:00",
                    end: "19:00"
                }
            ]
        },
        {
            isWorkDay: true,
            workTimes: [
                {
                    start: "09:00",
                    end: "19:00"
                }
            ]
        },
        {
            isWorkDay: true,
            workTimes: [
                {
                    start: "09:00",
                    end: "19:00"
                }
            ]
        },
        {
            isWorkDay: true,
            workTimes: [
                {
                    start: "09:00",
                    end: "19:00"
                }
            ]
        },
        {
            isWorkDay: false
        }
    ],
    holidays: [
        "01-01",
        "04-21",
        "05-01",
        "09-07",
        "10-08",
        "10-12",
        "11-02",
        "11-15",
        "12-25"
    ],
    noWorkDays: [
        "04-02",
        "12-24",
        "12-31"
    ]
}
function timesTostring(){
  return  JSON.stringify(times);
}
  return (
    <div className="App">
      {timesTostring()}
    </div>
  );
}

export default App;
