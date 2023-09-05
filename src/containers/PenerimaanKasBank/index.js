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
import { MenuPenerimaanKasBank, addPenerimaanKasBank_Permission } from '../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';
import moment                       from "moment/moment";
import { formatdate } from '../shared/constantValue';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuPenerimaanKasBank,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'nodocument', title: i18n.t('label_NO_DOCUMENT')},
        {name: 'receivefrom', title: i18n.t('label_RECEIVE_FROM')},
        {name: 'receivedate', title: i18n.t('label_RECEIVE_DATE')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPenerimaanKasBankData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'nodocument': el.nodocument ?el.nodocument:'',
                    'receivefrom':getReceiveFromName(el),
                    'receivedate':el.receivedate?moment (new Date(el.receivedate)).format(formatdate):''
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    const getReceiveFromName = (data) =>{
        if(data.idreceivetype){
            if(data.idreceivetype == 'EMPLOYEE'){
                return data.employeeName?data.employeeName:''
            }else if(data.idreceivetype == 'CUSTOMER'){
                return data.customerName?data.customerName:''
            }else if(data.idreceivetype == 'VENDOR'){
                return data.vendorName?data.vendorName:''
            }else{
                return data.idreceivetype;
            }
        }
        return data.receivefrom;
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
        history.push(pathmenu.addpenerimaankasbank);
    }
    function onClickView(id) {
        history.push(pathmenu.detailpenerimaankasbank+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuPenerimaanKasBank} label={'Penerimaan Kas Bank'} labeldefault={'Penerimaan Kas Bank'} />
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
                permissionadd={!isGetPermissions(addPenerimaanKasBank_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuPenerimaanKasBank,'READ')}
                onclickview={onClickView}
                listfilterdisabled={['receivedate']}
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