import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

const Switch = ({ checked, onChange = () => {} }) => {
    const blipInputRef = useRef(null);
    const [error, setError] = useState('');
    let time = null;

    useEffect(() => {
        const { current } = blipInputRef;
        current.addEventListener('bdsChange', handleChange);
        current.addEventListener('bdsFocus', (e) => onFocus(e));
        current.addEventListener('bdsOnBlur', (e) => onBlur(e));

        return () => {
            current.removeEventListener('bdsChange', handleChange);
            current.removeEventListener('bdsFocus', (e) => onFocus(e));
            current.removeEventListener('bdsOnBlur', (e) => onBlur(e));
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const { current } = blipInputRef;
        if (!!focused && !!current) {
            current.setFocus();
        }
    }, [focused]);

    useEffect(() => {
        setError(
            getIn(touched, name) && getIn(errors, name)
                ? getIn(errors, name)
                : ''
        );
    }, [touched, errors, name]);

    const handleChange = (e) => {
        clearTimeout(time);
        time = setTimeout(() => onChange(e), waitTime);
    };

    return (
        <div className="relative">
            <bds-switch checked={checked}></bds-switch>
        </div>
    );
};

Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default Switch;
