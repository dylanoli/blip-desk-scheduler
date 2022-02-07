import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Switch = ({
    name,
    label,
    labelPosition = 'left',
    size = 'standard',
    disabled = false,
    checked = false,
    rounded = true,
    onChange = () => {}
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = () => {
        onChange(!checked);
    };

    return (
        <label
            className={classNames(
                'relative flex w-100 items-center',
                styles.switch,
                {
                    [styles.short]: size === 'short',
                    [styles.tall]: size === 'tall',
                    [styles.gap]: !!label
                }
            )}
        >
            {!!label && labelPosition === 'left' && (
                <span className="b f6 bp-c-extend-grays-street">{label}</span>
            )}
            <input
                data-testid="switch-input"
                type="checkbox"
                name={name}
                checked={isChecked}
                disabled={disabled}
                onChange={handleChange}
            />
            <span
                className={classNames(
                    'relative pointer top-0 left-0 right-0 bottom-0 bp-bg-neutral-medium-silver',
                    styles.slider,
                    {
                        [styles.round]: !!rounded
                    }
                )}
            ></span>
            {!!label && labelPosition === 'right' && (
                <span className="b f6 bp-c-extend-grays-street">{label}</span>
            )}
        </label>
    );
};

Switch.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    labelPosition: PropTypes.string,
    size: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    onChange: PropTypes.func
};

export default Switch;
