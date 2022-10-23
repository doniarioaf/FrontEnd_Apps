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
import { MenuPriceList,addPriceList_Permission } from '../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuPriceList,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'nodocument', title: i18n.t('label_NO_DOCUMENT')},
        {name: 'customer', title: i18n.t('label_CUSTOMER')},
        {name: 'nocontainer', title: i18n.t('No Container')},
        {name: 'namacargo', title: i18n.t('Nama Cargo')},
        {name: 'status', title: i18n.t('Status')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getSuratJalanData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'nodocument': el.nodocument ?el.nodocument:'',
                    'customer':el.namacustomer?el.namacustomer:'',
                    'nocontainer':el.nocantainer?el.nocantainer:'',
                    'namacargo':el.namacargoWO?el.namacargoWO:'',
                    'status':el.statusname?el.statusname:''
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
        history.push(pathmenu.addSuratJalan);
    }
    function onClickView(id) {
        history.push(pathmenu.detailpricelist+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuPriceList} label={'Surat Jalan'} labeldefault={'Surat Jalan'} />
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
                permissionadd={!isGetPermissions(addPriceList_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuPriceList,'READ')}
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