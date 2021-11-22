import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export const Loading = (props) => {
    return (
        <div style={{
            position: 'absolute', 
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }} className={"loading-shading-mui " + props.extClass}>
            <CircularProgress className="loading-icon-mui"/>
        </div>
    );
};

Loading.defaultProps = {
    extClass: ''
};