import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Grid from '../../../components/TableGrid';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';
import * as pathmenu from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth } from '../../shared/globalFunc';
import { MenuPurchaseReceive, addPurchaseReceive_Permission } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker } from 'react-widgets';
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Tabs            from '@material-ui/core/Tabs';
import Tab             from '@material-ui/core/Tab';
import TabPanel        from '../../../components/Common/TabPanel';
import SwipeableViews  from 'react-swipeable-views';
import CryptoJS from 'crypto-js';

const PurchaseReceiveIndex = () => {
    reloadToHomeNotAuthorize(MenuPurchaseReceive, 'READ');
    momentLocalizer();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [rowsDpr, setRowsDpr] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        { name: 'id', title: 'id' },
        { name: 'nodoc', title: i18n.t('No Document') },
        { name: 'vendor', title: i18n.t('Vendor') },
        { name: 'transdate', title: i18n.t('Date') },
    ]);

    const [columnsDpr] = useState([
        { name: 'id', title: 'id' },
        { name: 'nodoc', title: i18n.t('No Document') },
        { name: 'smu', title: i18n.t('SMU') },
        { name: 'vendor', title: i18n.t('Vendor') },
        { name: 'transdate', title: i18n.t('Date') },
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    let getdate = firstAndLastDateInMonth();
    const [from, setFrom] = useState(getdate.first);
    const [to, setTo] = useState(getdate.last);

    const [fromDpr, setFromDpr] = useState(getdate.first);
    const [toDpr, setToDpr] = useState(getdate.last);

    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState(0);
    const [IdBox, setIdBox] = useState(0);

    useEffect(() => {
        localStorage.removeItem('mxowe1I9ey');
        setLoading(true);
        dispatch(actions.getPurchaseReceiveData({ url: '/listalltab?from=' + from.getTime() + '&to=' + to.getTime() }, successHandler, errorHandler));
    }, []);

    function successHandler(data, propsdata) {
        if (data.data) {
            setListPr(data.data.listPr?data.data.listPr:[]);
            setListDpr(data.data.listDpr?data.data.listDpr:[]);
        }
        setLoading(false);
    }

    function setListPr(listPr){
        const theData = listPr.reduce((obj, el) => [
            ...obj,
            {
                'id': el.id,
                'nodoc': el.nodocument,
                'vendor': el.vendorAlias,
                'transdate': el.transactiondate ? moment(el.transactiondate).format(formatdate) : '',
            }
        ], []);
        setRows(theData);
    }
    function setListDpr(listDpr){
        const theDataDpr = listDpr.reduce((obj, el) => [
            ...obj,
            {
                'id': el.id,
                'nodoc': el.nodocument,
                'smu': el.smu,
                'idvendor': el.idvendor,
                'vendor': el.vendorName,
                'transdate': el.date ? moment(el.date).format(formatdate) : '',
            }
        ], []);
        setRowsDpr(theDataDpr);
    }

    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    function onClickAdd() {
        history.push(pathmenu.addpurchasereceive);
    }
    function onClickAddDpr(row) {
        //mxowe1I9ey
        let val = row.id+"|"+row.idvendor;
        let id = row.nodoc;
        localStorage.setItem('mxowe1I9ey',val);
        history.push(pathmenu.addpurchasereceivefromtabpenerimaanbarang+'/'+id);
    }
    function onClickView(id) {
        history.push(pathmenu.detailpurchasereceive + '/' + id);
    }

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    function handleChangeTabIndex(index) {
        setTabValue(index);
    }

    const handleChangeFrom = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setFrom(moment(data, formatdate).toDate())
        } else {
            setFrom(null)
        }
    }

    const handleChangeTO = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setTo(moment(data, formatdate).toDate())
        } else {
            setTo(null)
        }
    }

    const handleChangeFromDpr = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setFromDpr(moment(data, formatdate).toDate())
        } else {
            setFromDpr(null)
        }
    }

    const handleChangeTODpr = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setToDpr(moment(data, formatdate).toDate())
        } else {
            setToDpr(null)
        }
    }

    function successHandlerSearchPr(data, propsdata) {
        let list = data.data?data.data:[];
        setListPr(list);
        setLoading(false);
    }
    function successHandlerSearchDpr(data, propsdata) {
        let list = data.data?data.data:[];
        setListDpr(list);
        setLoading(false);
    }

    function onClickSearch() {
        if (from != null && to != null) {
            setLoading(true);
            dispatch(actions.getPurchaseReceiveData({ url: '/tabpr?from=' + from.getTime() + '&to=' + to.getTime() }, successHandlerSearchPr, errorHandler));
        }
    }

    function onClickSearchDpr() {
        if (from != null && to != null) {
            setLoading(true);
            dispatch(actions.getPurchaseReceiveData({ url: '/tabdpr?from=' + fromDpr.getTime() + '&to=' + toDpr.getTime() }, successHandlerSearchDpr, errorHandler));
        }
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menupurchasereceive} label={'Nota Pembelian'} labeldefault={'Nota Pembelian'} />
            <Container fluid>
            <div className="row mt-3" style={{padding: '0 15px 0 15px'}}>
                <Paper style={{flexGrow: 1}}>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label={i18n.t('Penerimaan Barang') }/>
                    <Tab label={i18n.t('Nota Pembelian') }/>
                </Tabs>
                </Paper>
                </div>
                <SwipeableViews
                axis={'x'}
                index={tabValue}
                onChangeIndex={handleChangeTabIndex}
                style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}
                >
                    <TabPanel index={tabValue} value={0}>
                    <table>
                    <th>{'From'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'To'}</th>
                    <tbody>
                        <tr>
                            <td><DatePicker
                                name="from"
                                // onChange={(val) => {
                                //         setFieldValue("startdate", val);
                                //     }
                                // }
                                onChange={val => handleChangeFromDpr(val)}
                                // onBlur={handleBlur}
                                // defaultValue={Date(moment([]))}
                                format={formatdate}
                                value={fromDpr}
                            // max={new Date()}
                            // style={{width: '25%'}}
                            /></td>
                            <td style={{ paddingLeft: '10px' }}>
                                <DatePicker
                                    name="to"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeTODpr(val)}
                                    // onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={toDpr}
                                // max={new Date()}
                                // style={{width: '25%'}}
                                />
                            </td>
                            <td>
                                <IconButton color={'primary'}
                                    onClick={() => onClickSearchDpr()}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Card>
                    <CardBody>
                        <Container fluid className="center-parent">
                            <div className="table-responsive">
                                <Grid
                                    rows={rowsDpr}
                                    columns={columnsDpr}
                                    totalCounts={rowsDpr.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    permissionpostadd={!isGetPermissions(addPurchaseReceive_Permission, 'TRANSACTION')}
                                    onclickpostadd={onClickAddDpr}
                                    texttooltoppostadd={'Add Nota Pembelian'}
                                    // permissionview={!isGetPermissions(MenuPurchaseReceive, 'READ')}
                                    // onclickview={onClickView}
                                    listfilterdisabled={['transdate']}
                                />
                            </div>
                        </Container>
                    </CardBody>
                </Card>

                    </TabPanel>

                    <TabPanel index={tabValue} value={1}>
                    <table>
                    <th>{'From'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'To'}</th>
                    <tbody>
                        <tr>
                            <td><DatePicker
                                name="from"
                                // onChange={(val) => {
                                //         setFieldValue("startdate", val);
                                //     }
                                // }
                                onChange={val => handleChangeFrom(val)}
                                // onBlur={handleBlur}
                                // defaultValue={Date(moment([]))}
                                format={formatdate}
                                value={from}
                            // max={new Date()}
                            // style={{width: '25%'}}
                            /></td>
                            <td style={{ paddingLeft: '10px' }}>
                                <DatePicker
                                    name="to"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeTO(val)}
                                    // onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={to}
                                // max={new Date()}
                                // style={{width: '25%'}}
                                />
                            </td>
                            <td>
                                <IconButton color={'primary'}
                                    onClick={() => onClickSearch()}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                                    permissionadd={!isGetPermissions(addPurchaseReceive_Permission, 'TRANSACTION')}
                                    onclickadd={onClickAdd}
                                    permissionview={!isGetPermissions(MenuPurchaseReceive, 'READ')}
                                    onclickview={onClickView}
                                    listfilterdisabled={['transdate']}
                                />
                            </div>
                        </Container>
                    </CardBody>
                </Card>
                        
                    </TabPanel>
                </SwipeableViews>

                
            </Container>
        </ContentWrapper>

    );
};
export default PurchaseReceiveIndex;