import React from 'react';
// eslint-disable-next-line import/no-unresolved
import PropTypes from 'prop-types';

const Paper = ({ elevation = 'primary', children }) => {
    return <bds-paper elevation={elevation}>{children}</bds-paper>;
};

Paper.propTypes = {
    elevation: PropTypes.string,
    children: PropTypes.object
};

export default Paper;
