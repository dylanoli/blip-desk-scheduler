//Default BLiP TimeZoneOffset = São Paulo (GMT-3)
const DEFAULT_OFFSET = -3;
const TRUE = "true";
const FALSE = "false";

// Receive the variables as parameters
const run = (workTime) => {
  try {
    if (workTime === undefined) {
      return TRUE;
    }

    const today = nowUTC(DEFAULT_OFFSET);
    const js = JSON.parse(workTime);

    const weekDay = js.weekdays[today.getDay()];
    const noWorkDays = js.noWorkDays;

    return !checkDayOff(today, noWorkDays) &&
      checkWorkHour(today, weekDay)
      ? TRUE
      : FALSE;
  } catch (e) {
    return FALSE;
  }
}

//Check for holidays and/or dayoffs
const checkDayOff = (today, dateList) => {
  const month =
    today.getUTCMonth() < 9
      ? "0" + (today.getUTCMonth() + 1)
      : today.getUTCMonth() + 1;

  const day =
    today.getUTCDate() <= 9 ? "0" + today.getUTCDate() : today.getUTCDate();

  const monthDay = month + "-" + day;

  if (dateList.includes(monthDay)) {
    return true;
  }

  return false;
}

const checkWorkHour = (today, weekDay) => {
  let startDate = null;
  let endDate = null;

  for (let i = 0; i < weekDay.workTimes.length; i++) {
    startDate = utcDate(weekDay.workTimes[i].start);
    endDate = utcDate(weekDay.workTimes[i].end);

    if (today - startDate > 0 && endDate - today > 0) {
      return true;
    }
  }

  return false;
}

//Get now UTC Date
const nowUTC = (offset) => {
  const now = new Date();
  let utc_timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );

  return new Date(utc_timestamp + offset * 3600 * 1000);
}

//Get UTC Date
const utcDate = (timeString) => {
  const now = new Date();

  const hour = getValueByString("hour", timeString);
  const minutes = getValueByString("minutes", timeString);

  const utc_timestamp = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hour,
    minutes,
    0,
    0
  );
  return new Date(utc_timestamp);
}

//Get hour/minute by string with pattern HH:mm
const getValueByString = (type, timeString) => {
  if (type === "hour") {
    return parseInt(timeString.substring(0, timeString.indexOf(":")));
  } else if (type === "minutes") {
    return parseInt(
      timeString.substring(timeString.indexOf(":") + 1, timeString.length)
    );
  }

  return 0;
}
