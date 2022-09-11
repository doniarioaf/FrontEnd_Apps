import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import Grid                         from './grid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper'
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuBranch } from '../../shared/permissionMenu';

const BankAccountIndex = () => {
    reloadToHomeNotAuthorize(MenuBranch,'READ');
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'cabang', title: i18n.t('Cabang')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        console.log('Start');
        dispatch(actions.getBankAccountData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        console.log('Start 1 ',data);
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.namabank ?el.namabank:'',
                    'cabang':el.cabang?el.cabang:'',
                    'isactive': el.isactive?'Yes':'No'
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
            text: '' + error
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
                <span><Trans t={t} i18nKey={'Bank Account'}>Bank Account</Trans></span>
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
export default BankAccountIndex;