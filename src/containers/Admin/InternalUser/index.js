import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import Grid                         from './grid';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuInternalUser } from '../../shared/permissionMenu';

const InternalUserIndex = () => {
    reloadToHomeNotAuthorize(MenuInternalUser,'READ');
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    // const [hiddenColumns] = useState(['id']);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'username', title: i18n.t('label_USERNAME')},
        {name: 'notelepon', title: i18n.t('label_CONTACT_NUMBER')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [tableColumnExtensions] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getUserAppsData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'username':el.username?el.username:'',
                    'notelepon':el.notelepon?el.notelepon:'',
                    'isactive': el.isactive?el.isactive == true?'Yes':'No':'No'
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
                <span><Trans t={t} i18nKey={'label_INTERNAL_USERR'}>Internal User</Trans></span>
            </div>
            <Container fluid>
            <Card>
            <CardBody>
            <Container fluid className="center-parent">
            <div className="table-responsive">
            <Grid
                rows={rows}
                columns={columns}
                totalCounts={rows.length}
                loading={loading}
                columnextension={tableColumnExtensions}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
    );
};
export default InternalUserIndex;