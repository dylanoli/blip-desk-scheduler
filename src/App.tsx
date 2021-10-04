import axios from 'axios';
import { useState } from 'react';
import { BLIP_COMMANDS_URL } from './constants'
import { Guid } from 'js-guid';
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
  const [times, setTimes] = useState<Times>(deafultTime)
  const [botKey, setBotKey] = useState<string>('')
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  async function getTimes() {
    const body = {
      id: Guid.newGuid().toString(),
      method: 'get',
      uri: '/resources/workTime'
    }
    const { data } = await axios.post(BLIP_COMMANDS_URL, body, {
      headers: {
        'Authorization': botKey,
        'Content-Type': 'application/json'
      }
    })
    console.log(data)
    if ((data as any).status === 'success') {
      const timeResult = JSON.parse((data as any).resource);
      setTimes(timeResult)
    }
    else
      setTimes(deafultTime)
  }

  async function save() {
    const body = {
      id: Guid.newGuid().toString(),
      method: 'set',
      uri: '/resources/workTime',
      type: 'text/plain',
      resource: JSON.stringify(times)
    }
    const { data } = await axios.post(BLIP_COMMANDS_URL, body, {
      headers: {
        'Authorization': botKey,
        'Content-Type': 'application/json'
      }
    })
    console.log(data);
  }

  function validateFieldStart(indexDay: number, indexHour: number) {
    const weekDay = times.weekdays[indexDay];
    return weekDay.isWorkDay && weekDay.workTimes && validateField(weekDay.workTimes[indexHour].start);
  }

  function validateFieldEnd(indexDay: number, indexHour: number) {
    const weekDay = times.weekdays[indexDay];
    return weekDay.isWorkDay && weekDay.workTimes && validateField(weekDay.workTimes[indexHour].end);
  }
  function validateField(value: string) {
    const regex = /[0-9]{2}:[0-9]{2}/gm
    if (regex.test(value)) {
      const hours = value.split(':');
      return !isNaN(+hours[0])
        && !isNaN(+hours[1])
        && +hours[0] < 24
        && +hours[0] >= 0
        && +hours[1] < 60
        && +hours[1] >= 0
    }
    return false;
  }

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
    if (weekdays.workTimes) {
      let workTime = weekdays.workTimes.find((_item, index) => (index == indexHour));
      if (workTime)
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
    if (weekdays.workTimes) {
      let workTime = weekdays.workTimes.find((_item, index) => (index == indexHour));
      if (workTime)
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
              <div>Início: <input type="text" id={index + '-' + indexHour + '-stt'} value={element.start} onChange={changeStart} /> </div>
              <div>Fim: <input type="text" id={index + '-' + indexHour + '-end'} value={element.end} onChange={changeEnd} /> </div>
              <button id={index + '-' + indexHour} onClick={removeWorkTime}>X</button>
            </>
          ))}
          <br />
          <button id={index.toString()} onClick={addWorkTime} >Novo</button>
        </div>
      else if (times.weekdays[index].isWorkDay)
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
      <input type="text" value={botKey} onChange={(event) => { setBotKey(event.target.value) }} />
      <button onClick={getTimes}>Iniciar</button>
      <div className="week-container">
        {htmlListWeek()}
      </div>
      <br />
      <button onClick={save}>Salvar</button>
    </div>
  );
}

export default App;

const deafultTime: Times = {
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
