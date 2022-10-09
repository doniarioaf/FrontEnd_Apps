import React     from 'react';
import Box       from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const {children, value, index, withBox, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                withBox ?
                    <Box p={3}>
                        {children}
                    </Box>
                    :
                    {children}
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
    withBox : true,
};

export default TabPanel;