import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/named
import { withLoadingAsync } from '../../services/common-service';
import { getApplicationDataAsync } from '../../services/application-service';
import {
    getResourceAsync,
    saveResourceAsync
} from '../../services/resources-service';

import settings from '../../config';

import Header from './components/Header';
import Button from '../../components/Button';
import { DEFAULT_TIME } from './constants';
import DayOff from './components/DaysOff';
import ListWeek from './components/ListWeek';

const PAGE_ICON = 'plugin';
const BLANK = '_blank';
const WORK_TIME_NAME = 'workTime';

const Home = () => {
    const [times, setTimes] = React.useState(null);
    const [strongDayFormat, setStrongDayFormat] = React.useState(false);
    const [application, setApplication] = React.useState({});
    const { t } = useTranslation();
    const styles = {
        weekContainer: {
            display: 'flex',
            justifyContent: 'space-around'
        }
    };
    React.useEffect(() => {
        withLoadingAsync(async () => {
            setApplication(await getApplicationDataAsync());
            try {
                const resourceTimes = JSON.parse(
                    await getResourceAsync(WORK_TIME_NAME)
                );
                if (resourceTimes.weekdays && resourceTimes.noWorkDays) {
                    handleChangeTimes(resourceTimes);
                } else {
                    handleChangeTimes(DEFAULT_TIME);
                }
            } catch (error) {
                handleChangeTimes(DEFAULT_TIME);
            }
        });
    }, [application.shortName]);

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

    const buildSchedulerMessage = (val) => {
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
                        woorkDaysIsEquals(
                            val.weekdays[index],
                            val.weekdays[indexj]
                        )
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
                    firstDay === lastDay
                        ? firstDay
                        : `${firstDay} a ${lastDay}`;
                if (strongDayFormat) {
                    message += `*${dayText}:* ${hoursText}\n`;
                } else {
                    message += `${dayText}: ${hoursText}\n`;
                }
            }
        }

        return message;
    };

    const handleChangeTimes = (val) => {
        const schedulerMessage = buildSchedulerMessage(val);
        setTimes({
            ...val,
            schedulerMessage
        });
    };
    const saveAsync = async () => {
        await saveResourceAsync(WORK_TIME_NAME, times);
    };

    const removeDayOff = (index) => {
        const newVal = { ...times };
        newVal.noWorkDays.splice(index, 1);
        setTimes(newVal);
    };

    const removeWorkTime = (indexWeek, indexHour) => {
        const newVal = { ...times };
        newVal.weekdays[indexWeek].workTimes.splice(indexHour, 1);
        handleChangeTimes(newVal);
    };

    const changeStart = (indexWeek, indexHour, event) => {
        const newVal = { ...times };
        const weekdays = newVal.weekdays[indexWeek];
        const workTime = weekdays.workTimes.find(
            (_item, index) => index === indexHour
        );
        if (workTime) {
            workTime.start = event.target.value;
        }
        handleChangeTimes(newVal);
    };

    const changeEnd = (indexWeek, indexHour, event) => {
        const newVal = { ...times };
        const weekdays = newVal.weekdays[indexWeek];
        const workTime = weekdays.workTimes.find(
            (_item, index) => index === indexHour
        );
        if (workTime) {
            workTime.end = event.target.value;
        }
        handleChangeTimes(newVal);
    };

    const changeDayOff = (index, event) => {
        const newVal = { ...times };
        newVal.noWorkDays[index] = event.target.value;
        setTimes(newVal);
    };

    const addWorkTime = (index) => {
        const newItem = {
            start: '09:00',
            end: '19:00'
        };

        const newVal = { ...times };
        if (newVal.weekdays[index].workTimes) {
            newVal.weekdays[index].workTimes.push(newItem);
        } else {
            newVal.weekdays[index].workTimes = [newItem];
        }
        handleChangeTimes(newVal);
    };

    const addDayOff = () => {
        const newItem = 'MM-DD';
        const newVal = { ...times };
        newVal.noWorkDays.push(newItem);
        setTimes(newVal);
    };

    if (times != null) {
        return (
            <div className="ph1 ph4-m ph5-ns pb5">
                <Header
                    title={t('title.homePage')}
                    icon={PAGE_ICON}
                    onClick={() => window.open(settings.repositoryUrl, BLANK)}
                />
                <h2>Dias de trabalho</h2>
                <div style={styles.weekContainer}>
                    <ListWeek
                        times={times}
                        changeStart={changeStart}
                        changeEnd={changeEnd}
                        removeWorkTime={removeWorkTime}
                        addWorkTime={addWorkTime}
                    />
                </div>
                <h2>Dias sem trabalhos</h2>
                <DayOff
                    noWorkDays={times.noWorkDays}
                    changeDayOff={changeDayOff}
                    removeDayOff={removeDayOff}
                    addDayOff={addDayOff}
                />
                <br />
                <br />
                <Button
                    text={t('labels.save')}
                    icon="save-disk"
                    variant="primary"
                    arrow={false}
                    disabled={false}
                    onClick={saveAsync}
                />
                {/* <bds-switch
                    checked={strongDayFormat}
                    bdsChange={() => {
                        console.log('ola');
                        setStrongDayFormat(!strongDayFormat);
                    }}
                ></bds-switch>
                <p>{times.schedulerMessage}</p> */}
            </div>
        );
    }
    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <Header
                title={t('title.homePage')}
                icon={PAGE_ICON}
                onClick={() => window.open(settings.repositoryUrl, BLANK)}
            />
            <h2>{t('loading')}</h2>
        </div>
    );
};

Home.propTypes = {};

export default Home;
