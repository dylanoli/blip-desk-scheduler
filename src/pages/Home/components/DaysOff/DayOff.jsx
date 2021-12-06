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

    const styles = {
        daysOffGroup: {
            display: 'flex',
            justifyContent: 'start'
        }
    };
    return (
        <div data-testid="day-off">
            {noWorkDays.map((element, index) => (
                <div key={index} style={styles.daysOffGroup}>
                    <Input
                        name="start"
                        placeholder="MM-DD"
                        icon="calendar"
                        value={element}
                        onChange={(event) => {
                            changeDayOff(index, event);
                        }}
                        dataTestId={`ipt-data-${index}`}
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
                        dataTestId={`btn-remove-${index}`}
                    />
                </div>
            ))}
            <br />
            <Button
                dataTestId={`btn-add`}
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
