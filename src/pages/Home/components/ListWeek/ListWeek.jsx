import React from 'react';
import PropTypes from 'prop-types';
import HoursList from '../HoursList';

const WEEK_DAYS = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
];
const ListWeek = ({
    times,
    changeStart,
    changeEnd,
    removeWorkTime,
    addWorkTime
}) => {
    return (
        <>
            {WEEK_DAYS.map((element, index) => (
                <div key={index}>
                    <h2>{element}</h2>
                    <HoursList
                        workTimes={times.weekdays[index].workTimes}
                        index={index}
                        changeStart={changeStart}
                        changeEnd={changeEnd}
                        removeWorkTime={removeWorkTime}
                        addWorkTime={addWorkTime}
                    />
                </div>
            ))}
        </>
    );
};

ListWeek.propTypes = {
    times: PropTypes.object,
    index: PropTypes.number,
    changeStart: PropTypes.func,
    changeEnd: PropTypes.func,
    removeWorkTime: PropTypes.func,
    addWorkTime: PropTypes.func
};

export default ListWeek;
