import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody,Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Grid from '../../../components/TableGrid';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Loading } from '../../../components/Common/Loading';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';
import * as pathmenu from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth } from '../../shared/globalFunc';
import { MenuIntegrasi } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker } from 'react-widgets';
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

const IntegrasiIndex = () => {
    reloadToHomeNotAuthorize(MenuIntegrasi, 'READ');
    momentLocalizer();
    const { i18n } = useTranslation('translations');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg?error.msg:error
        })
    }

    const executeSubmit = () => {
        setLoading(true);
        let obj = new Object();
        obj.from = null;
        obj.to = null;
        obj.isall = 'Y';
        dispatch(actions.submitJournal({ url: '/integrasi', payload: obj, type: 'INTEGRASI' }, succesHandlerSubmit, errorHandler));
    }

    const succesHandlerSubmit = (data, propsdata) => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: i18n.t('label_SUCCESS')
            }).then((result) => {
                if (result.isConfirmed) {
                    // history.goBack();
                }
            })
        }

    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.integrasiSaldo} label={'Integrasi Saldo'} labeldefault={'Integrasi Saldo'} />
            <Container fluid>
                <div className="row justify-content-center" >
                <Button
                // style={{marginLeft:"1%"}}
                color={'primary'}
                disabled={loading}
                onClick={() => submitHandler()}
            >
                {'Integrasi'}
            </Button>
            </div>
            </Container>
            {loading && <Loading />}
        </ContentWrapper>
        
    )
}
export default IntegrasiIndex;