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
import { MenuCategoryProduct,addCategoryProduct_Permission } from '../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const CategoryProductIndex = () => {
    reloadToHomeNotAuthorize(MenuCategoryProduct,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'size', title: i18n.t('Size')},
        {name: 'weight', title: i18n.t('Weight')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCategoryProductData({url:''},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'size': el.size ?el.size:'',
                    'weight': el.weight ?el.weight:'',
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function errorHandler(error,propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    function onClickAdd() {
        history.push(pathmenu.addcategoryproduct);
    }
    function onClickView(id) {
        history.push(pathmenu.detailcategoryproduct+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuCategoryProduct} label={'Category Product'} labeldefault={'Category Product'} />
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
                permissionadd={!isGetPermissions(addCategoryProduct_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuCategoryProduct,'READ')}
                onclickview={onClickView}
                listfilterdisabled = {['value']}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default CategoryProductIndex;