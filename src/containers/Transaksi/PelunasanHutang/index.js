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
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth, numToMoney } from '../../shared/globalFunc';
import { MenuPelunasanHutang } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DropdownList, DatePicker } from 'react-widgets';
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

const PelunasanHutangIndex = () => {
    reloadToHomeNotAuthorize(MenuPelunasanHutang, 'READ');
        momentLocalizer();
        const history = useHistory();
        const [rowshutang, setRowsHutang] = useState([]);
        const [rows, setRows] = useState([]);
        const [t, i18n] = useTranslation('translations');
        const [columnshutang] = useState([
            { name: 'id', title: 'id' },
            { name: 'nodoc', title: i18n.t('No Document') },
            { name: 'vendor', title: i18n.t('Vendor') },
            { name: 'transdate', title: i18n.t('Tanggal') },
            { name: 'total', title: i18n.t('Total') },
            { name: 'outstanding', title: i18n.t('Outstanding') },
        ]);
        const [columns] = useState([
            { name: 'id', title: 'id' },
            { name: 'nodoc', title: i18n.t('No Document') },
            { name: 'noinv', title: i18n.t('No Invoice') },
            { name: 'vendor', title: i18n.t('Vendor') },
            { name: 'transdate', title: i18n.t('Tanggal') },
            { name: 'amount', title: i18n.t('Amount (Rp)') },
        ]);
        const [tableColumnExtensions] = useState([]);
        const [loading, setLoading] = useState(false);
        let getdate = firstAndLastDateInMonth();
        const [from, setFrom] = useState(getdate.first);
        const [to, setTo] = useState(getdate.last);

        const [ListCategory, setListCategory] = useState([{value:'ALL',label:'All'}, {value:'SUPPLIER',label:'Supplier'},{value:'CARGO',label:'Cargo'},{value:'UPI',label:'UPI'}]);
        const [SelCategory, setSelCategory] = useState('ALL');
        const [ListStatus, setListStatus] = useState([{value:'ALL',label:'All'},{value:'LUNAS',label:'Lunas'},{value:'BELUMLUNAS',label:'Belum Lunas'}]);
        const [SelStatus, setSelStatus] = useState('BELUMLUNAS');

        const dispatch = useDispatch();

        const [tabValue, setTabValue] = useState(0);

        useEffect(() => {
            setLoading(true);
            let obj = new Object();
            obj.category = SelCategory;
            obj.status = SelStatus;
            dispatch(actions.getPelunasanHutangData({ url: '/hutanglist', type: 'POST', payload: obj }, successHandlerHutang, errorHandler));
        }, []);

        function successHandlerHutang(data, propsdata) {
            let list = [];
            if (data.data) {
                if(data.data.listPR){
                    list = data.data.listPR.reduce((obj, el) => [
                        ...obj,
                        {
                            'id': el.nodocument,
                            'iddoc':el.id,
                            'nodoc': el.nodocument,
                            'vendor': el.vendorAlias,
                            'transdate':el.transactiondate?moment(el.transactiondate).format(formatdate):"",
                            'total': el.totalprice?numToMoney(el.totalprice):0,
                            'outstanding': el.outstanding?numToMoney(el.outstanding):0,
                            'type':'PR'
                        }
                    ], []);
                    
                }
                if(data.data.listCargo){
                    for(let i=0; i < data.data.listCargo.length; i++){
                        let el = data.data.listCargo[i];
                        list.push(
                            {
                                'id': el.id+'CARGO',
                                'iddoc':el.id,
                                'nodoc': el.invoicenumber,
                                'vendor': el.vendorAlias,
                                'transdate':el.date?moment(el.date).format(formatdate):"",
                                'total': el.netamount?numToMoney(el.netamount):0,
                                'outstanding': el.outstanding?numToMoney(el.outstanding):0,
                                'type':'CARGO'
                            }
                        );
                    }
                }
               
            }
            setRowsHutang(list);

            let obj = new Object();
            obj.from = from.getTime();
            obj.to = to.getTime();
            dispatch(actions.getPelunasanHutangData({ url: '/list', type: 'POST', payload: obj }, successHandlerPelunasanHutang, errorHandler));
            // setLoading(false);
        }

        function successHandlerPelunasanHutang(data, propsdata) {
            let list = [];
            if (data.data) {
                list = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'nodoc': el.nodocument,
                        'noinv': el.nodocumentPR?el.nodocumentPR:el.nodocumentCargo,
                        'vendor': el.aliasvendorPR?el.aliasvendorPR:el.aliasvendorCargo,
                        'transdate': el.date ? moment(el.date).format(formatdate) : '',
                        'amount': el.amount?numToMoney(el.amount):0,
                    }
                ], []);
            }
            setRows(list);
            setLoading(false);
        }

        function handleChangeTab(event, value) {
            setTabValue(value);
        }
    
        function handleChangeTabIndex(index) {
            setTabValue(index);
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
            history.push(pathmenu.adddraftpurchasereceive);
        }
        function onClickView(id) {
            history.push(pathmenu.detailpelunasanhutang + '/' + id);
        }

        function onClickViewHutang(id) {
            let listfilteroutput = rowshutang.filter(output => output.id == id);
            if(listfilteroutput.length > 0){
                if(listfilteroutput[0].type == 'PR'){
                    history.push(pathmenu.detailhutangpr + '/' + listfilteroutput[0].iddoc);
                }else if(listfilteroutput[0].type == 'CARGO'){
                    history.push(pathmenu.detailhutangcargo + '/' + listfilteroutput[0].iddoc);
                }
                
            }
            
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

        function onClickSearch() {
            if (from != null && to != null) {
                setLoading(true);
                let obj = new Object();
                obj.from = from.getTime();
                obj.to = to.getTime();
                dispatch(actions.getPelunasanHutangData({ url: '/list', type: 'POST', payload: obj }, successHandlerPelunasanHutang, errorHandler));
            }

        }

        const handleChangeCategory = (data) => {
            let id = data?.value ? data.value : '';
            setSelCategory(id);
        }

        const handleChangeStatus = (data) => {
            let id = data?.value ? data.value : '';
            setSelStatus(id);
        }

        function onClickSearchHutang() {
            if (from != null && to != null) {
                setLoading(true);
                let obj = new Object();
                obj.category = SelCategory;
                obj.status = SelStatus;
                dispatch(actions.getPelunasanHutangData({ url: '/hutanglist', type: 'POST', payload: obj }, successHandlerHutang, errorHandler));
            }

        }
        return (
            <ContentWrapper>
                <ContentHeading history={history} removehistorylink={true} link={pathmenu.menupelunasanhutang} label={'Pelunasan Hutang'} labeldefault={'Pelunasan Hutang'} />
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
                    <Tab label={i18n.t('Hutang') }/>
                    <Tab label={i18n.t('Pelunasan Hutang') }/>
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
                    <th>{'Category'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'Status'}</th>
                    <tbody>
                        <tr>
                             <td width={'200px'}>
                                <DropdownList
                                    name="SelCategory"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}

                                    onChange={val => handleChangeCategory(val)}
                                    // onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                    data={ListCategory}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={SelCategory}
                                />
                            </td>
                            <td width={'200px'}>
                            <DropdownList
                                    name="SelStatus"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}

                                    onChange={val => handleChangeStatus(val)}
                                    // onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                    data={ListStatus}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={SelStatus}
                                />
                            </td>
                            
                            <td>
                                <IconButton color={'primary'}
                                    onClick={() => onClickSearchHutang()}
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
                                    rows={rowshutang}
                                    columns={columnshutang}
                                    totalCounts={rowshutang.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    // permissionadd={!isGetPermissions(addDraftPurchaseReceive_Permission, 'TRANSACTION')}
                                    // onclickadd={onClickAdd}
                                    permissionview={!isGetPermissions(MenuPelunasanHutang, 'READ')}
                                    onclickview={onClickViewHutang}
                                    listfilterdisabled={['transdate','total','outstanding']}
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
                             <td>
                                <DatePicker
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
                                    // permissionadd={!isGetPermissions(addDraftPurchaseReceive_Permission, 'TRANSACTION')}
                                    // onclickadd={onClickAdd}
                                    permissionview={!isGetPermissions(MenuPelunasanHutang, 'READ')}
                                    onclickview={onClickView}
                                    listfilterdisabled={['transdate','amount']}
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
export default PelunasanHutangIndex;