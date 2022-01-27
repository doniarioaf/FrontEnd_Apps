import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import {useHistory}                 from 'react-router-dom';
import * as actions                 from '../../../store/actions';
import * as pathmenu           from '../../shared/pathMenu';
import Grid                         from './grid';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuCompany } from '../../shared/permissionMenu';

const CompanyIndex = () => {
    reloadToHomeNotAuthorize(MenuCompany,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    // const [hiddenColumns] = useState(['id']);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'contactnumber', title: i18n.t('label_CONTACT_NUMBER')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [tableColumnExtensions] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCompanyData('/getlistcompanyactive',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'contactnumber':el.contactnumber?el.contactnumber:'',
                    'isactive': el.isactive?el.isactive == true?'Yes':'No':'No'
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function handlerAddAction() {
        history.push(pathmenu.addcompany);
    }

    function handlerDetailAction(id) {
        history.push(pathmenu.detailcompany+'/'+id);
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
                <span><Trans t={t} i18nKey={'label_COMPANY'}>Company</Trans></span>
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
export default CompanyIndex;