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
    newVal.weekdays[index].isWorkDay = event.target.checked;
    setTimes(newVal)
  }

  function changeStart(event: any) {
    const ids = event.target.id.split('-');
    const indexWeek = ids[0];
    const indexHour = ids[1];
    let newVal = { ...times };
    let weekdays = newVal.weekdays[indexWeek];
    if(weekdays.workTimes){
      let workTime = weekdays.workTimes.find((_item,index) => (index == indexHour));
      if(workTime)
        workTime.start = event.target.value;
    }
    setTimes(newVal)
  }

  function changeEnd(event: any) {
    const ids = event.target.id.split('-');
    const indexWeek = ids[0];
    const indexHour = ids[1];
    let newVal = { ...times };
    let weekdays = newVal.weekdays[indexWeek];
    if(weekdays.workTimes){
      let workTime = weekdays.workTimes.find((_item,index) => (index == indexHour));
      if(workTime)
        workTime.end = event.target.value;
    }
    setTimes(newVal)
  }

  function removeWorkTime(event: any) {
    console.log(event);
    const ids = event.target.id.split('-');
    const indexWeek = ids[0];
    const indexHour = ids[1];
    console.log(indexWeek);
    console.log(indexHour);
    let newVal = { ...times };
    newVal.weekdays[indexWeek].workTimes?.splice(indexHour, 1);
    setTimes(newVal)
  }

  function addWorkTime(event: any) {
    const index = +event.target.id;
    const newItem: WorkTime = {
      start: "09:00",
      end: "19:00"
    }
    let newVal = { ...times };
    if (newVal.weekdays[index].workTimes)
      newVal.weekdays[index].workTimes?.push(newItem);
    else
      newVal.weekdays[index].workTimes = [newItem]
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
          {htmlCheckBox(index)}
          {times.weekdays[index].workTimes?.map((element, indexHour) => (
            <>
              <div>Início: <input type="text" id={index + '-' + indexHour} value={element.start} onChange={changeStart} /> </div>
              <div>Fim: <input type="text" id={index + '-' + indexHour} value={element.end} onChange={changeEnd} /> </div>
              <button id={index + '-' + indexHour} onClick={removeWorkTime}>X</button>
            </>
          ))}
          <br />
          <button id={index.toString()} onClick={addWorkTime} >Novo</button>
        </div>
      else if(times.weekdays[index].isWorkDay )
        return <div>
          {htmlCheckBox(index)}
          <br />
          <button id={index.toString()} onClick={addWorkTime} >Novo</button>
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
