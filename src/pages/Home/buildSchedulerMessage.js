export const buildSchedulerMessage = (val, strongDayFormat) => {
    let message = '';

    // run by all weekdays
    for (let index = 0; index < val.weekdays.length; index++) {
        // verify if has workTimes in this day
        if (val.weekdays[index].workTimes.length > 0) {
            const firstDay = val.weekdays[index].day;
            let lastDay = val.weekdays[index].day;
            let findDiferentDay = false;

            // join days that have equals worktimes
            for (
                let indexj = index + 1;
                indexj < val.weekdays.length && !findDiferentDay;
                indexj++
            ) {
                if (
                    woorkDaysIsEquals(val.weekdays[index], val.weekdays[indexj])
                ) {
                    lastDay = val.weekdays[indexj].day;
                    index = indexj;
                } else {
                    findDiferentDay = true;
                }
            }

            // build hour text
            let hoursText = '';
            val.weekdays[index].workTimes.forEach((hour, indexHour) => {
                const hourStartFormated = hour.start.replace(':', 'h');
                const hourEndFormated = hour.end.replace(':', 'h');
                hoursText += `${hourStartFormated} às ${hourEndFormated}`;
                if (indexHour < val.weekdays[index].workTimes.length - 1) {
                    hoursText += '; ';
                }
            });

            // build day text
            const dayText =
                firstDay === lastDay ? firstDay : `${firstDay} a ${lastDay}`;
            if (strongDayFormat) {
                message += `*${dayText}:* ${hoursText}\n\n`;
            } else {
                message += `${dayText}: ${hoursText}\n\n`;
            }
        }
    }

    return message;
};

const woorkDaysIsEquals = (a, b) => {
    if (a.workTimes.length !== b.workTimes.length) {
        return false;
    }
    for (let index = 0; index < a.workTimes.length; index++) {
        if (
            a.workTimes[index].start !== b.workTimes[index].start ||
            a.workTimes[index].end !== b.workTimes[index].end
        ) {
            return false;
        }
    }
    return true;
};
