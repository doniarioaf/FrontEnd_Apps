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
import { MenuPengeluaranKasBank, addPengeluaranKasBank_Permission } from '../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';
import moment                       from "moment/moment";
import { formatdate } from '../shared/constantValue';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuPengeluaranKasBank,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'nodocument', title: i18n.t('label_NO_DOCUMENT')},
        {name: 'paymentto', title: i18n.t('Payment To')},
        {name: 'nodocumentwo', title: i18n.t('No')+' WO'},
        {name: 'noaju', title: i18n.t('No AJU')},
        {name: 'paymentdate', title: i18n.t('Payment Date')},
    ]);
    const [tableColumnExtensions] = useState([
        {columnName: 'paymentto', width:'300'},
    ]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPengeluaranKasBankData('',successHandler, errorHandler));
    }, []);

    const getPaymentToName = (data) =>{
        if(data.paymentto){
            if(data.paymentto == 'EMPLOYEE'){
                return data.employeeName?data.employeeName:''
            }else if(data.paymentto == 'CUSTOMER'){
                return data.customerName?data.customerName:''
            }else if(data.paymentto == 'VENDOR'){
                return data.vendorName?data.vendorName:''
            }else{
                return data.paymentto;
            }
        }
        return '';
    }

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'nodocument': el.nodocument ?el.nodocument:'',
                    'nodocumentwo': el.nodocumentWO ?el.nodocumentWO:'',
                    'noaju': el.noAjuWO ?el.noAjuWO:'',
                    'paymentto':getPaymentToName(el),
                    'paymentdate':el.paymentdate?moment (new Date(el.paymentdate)).format(formatdate):''
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
        history.push(pathmenu.addpengeluarankasbank);
    }
    function onClickView(id) {
        history.push(pathmenu.detailpengeluarankasbank+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuPengeluaranKasBank} label={'Pengeluaran Kas Bank'} labeldefault={'Pengeluaran Kas Bank'} />
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
                permissionadd={!isGetPermissions(addPengeluaranKasBank_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuPengeluaranKasBank,'READ')}
                onclickview={onClickView}
                listfilterdisabled={['paymentdate']}
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