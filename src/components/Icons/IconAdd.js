import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function IconAdd(props) {
    return (
        <SvgIcon {...props} viewBox='0 0 500 500'>
            <path className="cls-1" d="M408,184H272a8,8,0,0,1-8-8V40a40,40,0,0,0-80,0V176a8,8,0,0,1-8,8H40a40,40,0,0,0,0,80H176a8,8,0,0,1,8,8V408a40,40,0,0,0,80,0V272a8,8,0,0,1,8-8H408a40,40,0,0,0,0-80Z"/>
        </SvgIcon>
    );
}

export default IconAdd;