import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import Grid                         from './grid';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuRole } from '../../shared/permissionMenu';

const RoleIndex = () => {
    reloadToHomeNotAuthorize(MenuRole,'READ');
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'description', title: i18n.t('label_DESCRIPTION')}
    ]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [tableColumnExtensions] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getRoleData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'description':el.descriptions?el.descriptions:''
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
            <span><Trans t={t} i18nKey={'Role'}>Role</Trans></span>
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
export default RoleIndex;