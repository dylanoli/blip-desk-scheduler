import React from 'react';
// eslint-disable-next-line import/no-unresolved
import PropTypes from 'prop-types';

const Paper = ({ elevation = 'primary', className, children }) => {
    return (
        <bds-paper className={className} elevation={elevation}>
            {children}
        </bds-paper>
    );
};

Paper.propTypes = {
    elevation: PropTypes.string,
    children: PropTypes.object,
    className: PropTypes.string
};

export default Paper;
