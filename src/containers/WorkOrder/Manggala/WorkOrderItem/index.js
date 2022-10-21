import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../../../components/TableGrid';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../../store/actions';
import * as pathmenu           from '../../../shared/pathMenu';
import { reloadToHomeNotAuthorize,isGetPermissions } from '../../../shared/globalFunc';
import { MenuWorkOrder,addWorkOrder_Permission } from '../../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';
import moment                       from "moment/moment";

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuWorkOrder,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'nodocument', title: i18n.t('No Document')},
        {name: 'customer', title: i18n.t('Customer')},
        {name: 'status', title: i18n.t('Status')},
        {name: 'tanggal', title: i18n.t('Tanggal')},
        // {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getWorkOrderData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'nodocument':el.nodocument?el.nodocument:'',
                    'customer': el.namaCustomer ?el.namaCustomer:'',
                    'status':el.status?el.status:'',
                    'tanggal': el.tanggal?moment (new Date(el.tanggal)).format('DD MMMM YYYY'):''
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
        history.push(pathmenu.addWorkOrder);
    }
    function onClickView(id) {
        history.push(pathmenu.detailWorkOrder+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuWorkOrder} label={'Work Order Item'} labeldefault={'Work Order Item'} />
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
                permissionadd={!isGetPermissions(addWorkOrder_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuWorkOrder,'READ')}
                onclickview={onClickView}
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