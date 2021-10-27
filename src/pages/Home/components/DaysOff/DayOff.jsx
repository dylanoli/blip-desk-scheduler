import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

const DayOff = ({
    noWorkDays,
    changeDayOff = () => {},
    removeDayOff,
    addDayOff
}) => {
    const { t } = useTranslation();

    return (
        <div>
            {noWorkDays.map((element, index) => (
                <div key={index} className="days-off-group">
                    <Input
                        name="start"
                        placeholder="MM-DD"
                        icon="calendar"
                        value={element}
                        onChange={(event) => {
                            changeDayOff(index, event);
                        }}
                    />
                    <Button
                        text=""
                        icon="trash"
                        variant="ghost"
                        arrow={false}
                        disabled={false}
                        onClick={() => {
                            removeDayOff(index);
                        }}
                    />
                </div>
            ))}
            <br />
            <Button
                text={t('labels.new')}
                icon="add"
                variant="primary"
                arrow={false}
                disabled={false}
                onClick={addDayOff}
            />
        </div>
    );
};

DayOff.propTypes = {
    noWorkDays: PropTypes.array,
    changeDayOff: PropTypes.func,
    removeDayOff: PropTypes.func,
    addDayOff: PropTypes.func
};

export default DayOff;
