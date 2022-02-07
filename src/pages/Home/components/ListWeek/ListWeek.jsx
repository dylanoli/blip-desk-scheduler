import React from 'react';
import PropTypes from 'prop-types';
import HoursList from '../HoursList';

const ListWeek = ({
    times,
    changeStart,
    changeEnd,
    removeWorkTime,
    addWorkTime
}) => {
    return (
        <>
            {times.weekdays.map((element, index) => (
                <div key={index}>
                    <h2>{element.day}</h2>
                    <HoursList
                        key={index}
                        workTimes={element.workTimes}
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
