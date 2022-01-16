import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {deleteSessionAndLocalStorage} from '../../../containers/shared/globalFunc';
// import {useDispatch} from 'react-redux';
// import * as actions from '../../../store/actions';

export default function LogoutMenu() {

    // const dispatch = useDispatch();

    useEffect(() => {
        deleteSessionAndLocalStorage();
    }, []);

    return (
        <Redirect to="/"/>
    );
}