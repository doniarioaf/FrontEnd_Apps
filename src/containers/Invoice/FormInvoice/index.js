import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../../components/TableGrid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import * as pathmenu           from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize,isGetPermissions } from '../../shared/globalFunc';
import { MenuInvoice, addInvoice_Permission } from '../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';
import moment                       from "moment/moment";
import { formatdate } from '../../shared/constantValue';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuInvoice,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'nodocument', title: i18n.t('label_NO_DOCUMENT')},
        {name: 'customer', title: i18n.t('Customer')},
        {name: 'refno', title: i18n.t('Ref. No')},
        {name: 'tanggal', title: i18n.t('Tanggal')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'nodocument': el.nodocument ?el.nodocument:'',
                    'customer':el.namaCustomer?el.namaCustomer:'',
                    'refno':el.refno?el.refno:'',
                    'tanggal':el.tanggal?moment (new Date(el.tanggal)).format(formatdate):''
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

    function onClickAdd() {
        history.push(pathmenu.addInvoice);
    }
    function onClickView(id) {
        history.push(pathmenu.detailInvoice+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuInvoice} label={'Invoice'} labeldefault={'Invoice'} />
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
                permissionadd={!isGetPermissions(addInvoice_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuInvoice,'READ')}
                onclickview={onClickView}
                listfilterdisabled={['tanggal']}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default MenuIndex;