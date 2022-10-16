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
import { MenuInvoiceType,addInvoiceType_Permission,editInvoiceType_Permission,deleteInvoiceType_Permission } from '../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuInvoiceType,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'invoicetype', title: i18n.t('label_INVOICE_TYPE')},
        {name: 'nama', title: i18n.t('label_NAME')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceTypeData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'invoicetype': el.invoicetypename ?el.invoicetypename:'',
                    'nama':el.nama?el.nama:'',
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

    const submitHandlerDelete = (id) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(actions.submitDeleteInvoiceType('/'+id,succesHandlerSubmitDelete, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const succesHandlerSubmitDelete = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(0);
            }
        })
    }
    function onClickDelete(id) {
        submitHandlerDelete(id);
    }

    function onClickAdd() {
        history.push(pathmenu.addInvoiceType);
    }
    function onClickView(id) {
    }
    function onClickEdit(id) {
        history.push(pathmenu.editInvoiceType+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuInvoiceType} label={'label_INVOICE_TYPE'} labeldefault={'Invoice Item'} />
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
                permissionadd={!isGetPermissions(addInvoiceType_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                // permissionview={!isGetPermissions(MenuPartai,'READ')}
                onclickview={onClickView}
                permissionedit={!isGetPermissions(editInvoiceType_Permission,'TRANSACTION')}
                onclickedit={onClickEdit}
                onclickdelete={onClickDelete}
                permissiondelete={!isGetPermissions(deleteInvoiceType_Permission,'TRANSACTION')}
                width = {110}
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