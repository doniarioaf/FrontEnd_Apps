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
import { MenuVendor,addVendor_Permission } from '../../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const VendorIndex = () => {
    reloadToHomeNotAuthorize(MenuVendor,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'alias', title: i18n.t('Alias')},
        {name: 'categoryname', title: i18n.t('label_CATEGORY')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getVendorData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'alias':el.alias?el.alias:'',
                    'categoryname':el.vendorcategoryname?el.vendorcategoryname:'',
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

    function onClickAdd() {
        history.push(pathmenu.addvendor);
    }
    function onClickView(id) {
        history.push(pathmenu.detailvendor+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuvendor} label={'Vendor'} labeldefault={'Vendor'} />
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
                permissionadd={!isGetPermissions(addVendor_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuVendor,'READ')}
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
export default VendorIndex;