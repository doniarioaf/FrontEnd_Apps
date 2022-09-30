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
import { MenuVendorCategory,addVendorCategory_Permission } from '../../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const VendorCategoryIndex = () => {
    reloadToHomeNotAuthorize(MenuVendorCategory,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'note', title: i18n.t('label_NOTE')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getVendorCategoryData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.categoryname ?el.categoryname:'',
                    'note':el.note?el.note:'',
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
        history.push(pathmenu.addvendorcategory);
    }
    function onClickView(id) {
        history.push(pathmenu.detailvendorcategory+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuvendorcategory} label={'Vendor Category'} labeldefault={'Vendor Category'} />
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
                permissionadd={!isGetPermissions(addVendorCategory_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuVendorCategory,'READ')}
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
export default VendorCategoryIndex;