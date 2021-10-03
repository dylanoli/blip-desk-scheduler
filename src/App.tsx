import { useState } from 'react';
import './App.css';
type Times = {
  weekdays: Weekdays[],
  holidays: string[],
  noWorkDays: string[]
}
type Weekdays = {
  isWorkDay: boolean,
  workTimes?: WorkTime[]
}
type WorkTime = {
  start: string,
  end: string,
}
function App() {
  const [times, setTimes] = useState<Times>({
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
  })
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  function checkIsWorkDays(event: any) {
    const index = +event.target.id
    let newVal = { ...times };
    console.log(newVal)
    newVal.weekdays[index].isWorkDay = event.target.checked;
    setTimes(newVal)
  }

  function htmlListWeek() {
    return weekDays.map((element, index) => (
      <div key={index}>
        <h1>{element}</h1>
        {htmlHoursList(index)}
      </div>
    ))

    function htmlHoursList(index: number) {
      if (times.weekdays[index].isWorkDay && times.weekdays[index].workTimes)
        return <div>
          {times.weekdays[index].workTimes?.map(element => (
            <>
              {htmlCheckBox(index)}
              <div>Início: {element.start}</div>
              <div>Fim: {element.end}</div>
              <button>X</button>
            </>
          ))}
          <br />
          <button>Novo</button>
        </div>
      else
        return <div>
          {htmlCheckBox(index)}
        </div>
    }

    function htmlCheckBox(index: number) {
      return (
        <div>
          <label>Dia de trabalho
            <input type="checkbox" id={index.toString()} name="is-work-day" checked={times.weekdays[index].isWorkDay} onChange={checkIsWorkDays} />
          </label>
        </div>
      )
    }
  }
  return (
    <div className="App">
      {JSON.stringify(times)}
      <div className="week-container">
        {htmlListWeek()}
      </div>
    </div>
  );
}

export default App;
