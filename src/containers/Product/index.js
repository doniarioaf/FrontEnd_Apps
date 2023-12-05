import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../components/TableGrid';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../store/actions';
import * as pathmenu           from '../shared/pathMenu';
import { reloadToHomeNotAuthorize,isGetPermissions } from '../shared/globalFunc';
// import { MenuWorkOrder,addWorkOrder_Permission } from '../shared/permissionMenu';
// import { formatdate } from '../../../shared/constantValue';
import {useHistory}                 from 'react-router-dom';
// import moment                       from "moment/moment";

const MenuIndex = () => {
    // reloadToHomeNotAuthorize(MenuWorkOrder,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'productname', title: i18n.t('label_PRODUCT_NAME')},
        {name: 'productcode', title: i18n.t('label_PRODUCT_CODE')},
        {name: 'barcode', title: i18n.t('label_BARCODE')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // setLoading(true);
        // dispatch(actions.getWorkOrderData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'productname':el.nama?el.nama:'',
                    'productcode':el.code?el.code:'',
                    'barcode': el.barcode ?el.barcode:'',
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
        // history.push(pathmenu.addWorkOrder);
    }
    function onClickView(id) {
        // history.push(pathmenu.detailWorkOrder+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={""} label={'label_PRODUCT'} labeldefault={'Product'} />
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
                // permissionadd={!isGetPermissions(addWorkOrder_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                // permissionview={!isGetPermissions(MenuWorkOrder,'READ')}
                onclickview={onClickView}
                // listfilterdisabled={['tanggal']}
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