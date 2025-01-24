import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody,Input,Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Grid from '../../../components/TableGrid';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import * as key from '../../../containers/shared/constantKey';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';
import * as pathmenu from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth, numToMoney, formatRupiah } from '../../shared/globalFunc';
import { MenuPelunasanPiutang,addPelunasanPiutang_Permission } from '../../shared/permissionMenu';
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
import CryptoJS from 'crypto-js';

export const calculateDolarToRupiah = (value, valuekurs) => {
    let dolar = value?value:0;
    let kursrp = valuekurs?valuekurs:0;
    let rp = parseFloat(dolar) * parseFloat(kursrp);
    return rp;
}
const PelunasanPiutangIndex = () => {
    reloadToHomeNotAuthorize(MenuPelunasanPiutang, 'READ');
        momentLocalizer();
        const history = useHistory();
        const [rowspiutang, setRowsPiutang] = useState([]);
        const [rows, setRows] = useState([]);
        const [t, i18n] = useTranslation('translations');
        const [selection, setSelection] = useState([]);
        const [columnspiutang] = useState([
            { name: 'id', title: 'id' },
            { name: 'nodoc', title: i18n.t('No Document') },
            { name: 'customer', title: i18n.t('Customer') },
            { name: 'transdate', title: i18n.t('Tanggal') },
            { name: 'amount', title: i18n.t('Amount($)') },
            { name: 'amountRp', title: i18n.t('Amount(Rp)') },
            { name: 'outstanding', title: i18n.t('Outstanding($)') },
        ]);
        const [columns] = useState([
            { name: 'id', title: 'id' },
            { name: 'nodoc', title: i18n.t('No Document') },
            { name: 'customer', title: i18n.t('Customer') },
            { name: 'transdate', title: i18n.t('Tanggal') },
            { name: 'amount', title: i18n.t('Amount($)') },
            { name: 'amountRp', title: i18n.t('Amount(Rp)') },
        ]);
        const [tableColumnExtensions] = useState([]);
        const [loading, setLoading] = useState(false);

        let getdate = firstAndLastDateInMonth();
        const [from, setFrom] = useState(getdate.first);
        const [to, setTo] = useState(getdate.last);

        const [fromPelunasanPiutang, setFromPelunasanPiutang] = useState(getdate.first);
        const [toPelunasanPiutang, setToPelunasanPiutang] = useState(getdate.last);

        const [NamaCustomer, setNamaCustomer] = useState('');
        const [NamaCustomerPelunasanPiutang, setNamaCustomerPelunasanPiutang] = useState('');
        const [ListCustomerGrup, setListCustomerGrup] = useState([]);
        const [SelCustomerGrup, setSelCustomerGrup] = useState('ALL');
        const [ListStatus, setListStatus] = useState([{value:'ALL',label:'All'},{value:'LUNAS',label:'Lunas'},{value:'BELUMLUNAS',label:'Belum Lunas'}]);
        const [SelStatus, setSelStatus] = useState('BELUMLUNAS');

        const dispatch = useDispatch();

        const [tabValue, setTabValue] = useState(0);

        useEffect(() => {
            setLoading(true);
            let obj = new Object();
            obj.from = from.getTime();
            obj.to = to.getTime();
            obj.namaCust = NamaCustomer;
            obj.customergrup = SelCustomerGrup;
            obj.status = SelStatus;
            dispatch(actions.getPelunasanPiutangData({ url: '/piutanglist', type: 'POST', payload: obj }, successHandlerPiutang, errorHandler));
        }, []);


        
        function successHandlerPiutang(data, propsdata) {
            let list = [];
            if (data.data) {
                list = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'nodoc': el.nodocument,
                        'customer': el.customerName,
                        'transdate': el.date ? moment(el.date).format(formatdate) : '',
                        'amount': el.amount?formatRupiah((el.amount?new String(el.amount).replaceAll('.',','):''),2):0,
                        'amountRp': formatRupiah(new String(calculateDolarToRupiah(el.amount,el.kurs)).replaceAll('.',','),2),
                        'outstanding': el.outstanding?formatRupiah((el.outstanding?new String(el.outstanding).replaceAll('.',','):''),2):0,
                    }
                ], []);
            }
            setRowsPiutang(list);
            dispatch(actions.getPelunasanPiutangData({ url: '/template', type: 'GET' }, successHandlerTemplate, errorHandler));
        }
        function successHandlerPiutangSearch(data, propsdata) {
            let list = [];
            if (data.data) {
                list = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'nodoc': el.nodocument,
                        'customer': el.customerName,
                        'transdate': el.date ? moment(el.date).format(formatdate) : '',
                        'amount': el.amount?formatRupiah((el.amount?new String(el.amount).replaceAll('.',','):''),2):0,
                        'amountRp': formatRupiah(new String(calculateDolarToRupiah(el.amount,el.kurs)).replaceAll('.',','),2),
                        'outstanding': el.outstanding?formatRupiah((el.outstanding?new String(el.outstanding).replaceAll('.',','):''),2):0,
                    }
                ], []);
            }
            setRowsPiutang(list);
            setLoading(false);
        }
        function successHandlerTemplate(data, propsdata) {
            let list = [];
            if(data.data){
                list = data.data.customerGrupOpt.reduce((obj, el) => [
                    ...obj,
                    {
                        value: el.grupcode,
                        label: el.grup,
                    }
                ], []);
            }
            list.push({
                value: 'ALL',
                label: 'All',
            })
            setListCustomerGrup(list);

            let obj = new Object();
            obj.from = fromPelunasanPiutang.getTime();
            obj.to = toPelunasanPiutang .getTime();
            obj.namaCust = NamaCustomerPelunasanPiutang;
            dispatch(actions.getPelunasanPiutangData({ url: '/pelunasanpiutanglist', type: 'POST', payload: obj }, successHandlerPelunasanPiutang, errorHandler));

            // setLoading(false);
        }

        function successHandlerPelunasanPiutang(data, propsdata) {
            let list = [];
            if (data.data) {
                list = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'nodoc': el.nodocument,
                        'transdate': el.date ? moment(el.date).format(formatdate) : '',
                        'customer': el.customerName,
                        'amount': el.amountInvoice?formatRupiah((el.amountInvoice?new String(el.amountInvoice).replaceAll('.',','):''),2):0,
                        'amountRp': formatRupiah(new String(calculateDolarToRupiah(el.amountInvoice,el.kursInvoice)).replaceAll('.',',')),
                    }
                ], []);
            }
            setRows(list)
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
            history.push(pathmenu.detailpelunasanpiutang + '/' + id);
        }

        // function onClickViewHutang(id) {
        //     let listfilteroutput = rowshutang.filter(output => output.id == id);
        //     if(listfilteroutput.length > 0){
        //         if(listfilteroutput[0].type == 'PR'){
        //             history.push(pathmenu.detailhutangpr + '/' + listfilteroutput[0].iddoc);
        //         }else if(listfilteroutput[0].type == 'CARGO'){
        //             history.push(pathmenu.detailhutangcargo + '/' + listfilteroutput[0].iddoc);
        //         }
                
        //     }
            
        // }
        const handleChangeFromPelunasanPiutang = (data) => {
            //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
            if (data !== null) {
                setFromPelunasanPiutang(moment(data, formatdate).toDate())
            } else {
                setFromPelunasanPiutang(null)
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

        const handleChangeTOPelunasanPiutang = (data) => {
            //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
            if (data !== null) {
                setToPelunasanPiutang(moment(data, formatdate).toDate())
            } else {
                setToPelunasanPiutang(null);
            }
        }

        function onClickSearch() {
            if (from != null && to != null) {
                setLoading(true);
                let obj = new Object();
                obj.from = fromPelunasanPiutang.getTime();
                obj.to = toPelunasanPiutang .getTime();
                obj.namaCust = NamaCustomerPelunasanPiutang;
                dispatch(actions.getPelunasanPiutangData({ url: '/pelunasanpiutanglist', type: 'POST', payload: obj }, successHandlerPelunasanPiutang, errorHandler));
            }

        }

        function onClickBayar() {
            let list = [];
            if(selection.length > 0){
                for(let i=0; i < selection.length; i++){
                    let val = rowspiutang[i];
                    list.push(val.id);
                }
                localStorage.setItem('meo!kmadmasku',list.join(','));
                const idsenc = CryptoJS.AES.encrypt(JSON.stringify(list),key.keyEcncrypt).toString();
                history.push(pathmenu.bayarpelunasanpiutang + '/' + idsenc);
            }
        }

        const handleChangeCustomerGrup = (data) => {
            let id = data?.value ? data.value : '';
            setSelCustomerGrup(id);
        }

        const handleChangeStatus = (data) => {
            let id = data?.value ? data.value : '';
            setSelStatus(id);
        }

        function onClickSearchPiutang() {
            if (from != null && to != null) {
                setLoading(true);
                let obj = new Object();
                obj.from = from.getTime();
                obj.to = to.getTime();
                obj.namaCust = NamaCustomer;
                obj.customergrup = SelCustomerGrup;
                obj.status = SelStatus;
                dispatch(actions.getPelunasanPiutangData({ url: '/piutanglist', type: 'POST', payload: obj }, successHandlerPiutangSearch, errorHandler));
            }

        }
        return (
            <ContentWrapper>
                <ContentHeading history={history} removehistorylink={true} link={pathmenu.menupelunasanpiutang} label={'Pelunasan Piutang'} labeldefault={'Pelunasan Piutang'} />
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
                    <Tab label={i18n.t('Piutang') }/>
                    <Tab label={i18n.t('Pelunasan Piutang') }/>
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
                <Button
                    color='primary'
                    onClick={() => onClickBayar()}
                    title={i18n.t('Bayar')}
                    style={{float: 'right',marginRight:'0.2%'}}
                    hidden={isGetPermissions(addPelunasanPiutang_Permission,'TRANSACTION') ?selection.length == 0:true}
                >
                    {i18n.t('Bayar')}
                </Button>

                <table>
                    <th>{'From'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'To'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'Customer Grup'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'Status'}</th>
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
                             <td width={'200px'}>
                                <DropdownList
                                    name="SelCategory"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}

                                    onChange={val => handleChangeCustomerGrup(val)}
                                    // onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                    data={ListCustomerGrup}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={SelCustomerGrup}
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
                                    onClick={() => onClickSearchPiutang()}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table>
                <th>{'Customer'}</th>
                <tbody>
                    <tr>
                        <td>
                        <Input
                            name="NamaCustomer"
                            type="text"
                            id="NamaCustomer"
                            // maxLength={100}

                            // onChange={handleChange}
                            onChange={val => setNamaCustomer(val.target.value)}
                            // onBlur={handleBlur}
                            value={NamaCustomer}
                        />
                        </td>
                    </tr>
                </tbody>
                </table>
                <Card>
                    <CardBody>
                        <Container fluid className="center-parent">
                            <div className="table-responsive">
                                <Grid
                                    rows={rowspiutang}
                                    columns={columnspiutang}
                                    totalCounts={rowspiutang.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    selection={selection}
                                    setselection={setSelection}
                                    // permissionadd={!isGetPermissions(addDraftPurchaseReceive_Permission, 'TRANSACTION')}
                                    // onclickadd={onClickAdd}
                                    // permissionview={!isGetPermissions(MenuPelunasanHutang, 'READ')}
                                    // onclickview={onClickViewHutang}
                                    listfilterdisabled={['transdate','amount','amountRp','outstanding']}
                                    width={10}
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
                    <th style={{ paddingLeft: '10px' }}>{'Customer'}</th>
                    <tbody>
                        <tr>
                        <td>
                            <DatePicker
                            name="from"
                            onChange={val => handleChangeFromPelunasanPiutang(val)}
                            // onBlur={handleBlur}
                            // defaultValue={Date(moment([]))}
                            format={formatdate}
                            value={fromPelunasanPiutang}
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
                                    onChange={val => handleChangeTOPelunasanPiutang(val)}
                                    // onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={toPelunasanPiutang}
                                // max={new Date()}
                                // style={{width: '25%'}}
                                />
                            </td> 
                             <td width={'200px'}>
                                <Input
                                    name="NamaCustomerPelunasanPiutang"
                                    type="text"
                                    id="NamaCustomerPelunasanPiutang"
                                    // maxLength={100}

                                    // onChange={handleChange}
                                    onChange={val => setNamaCustomerPelunasanPiutang(val.target.value)}
                                    // onBlur={handleBlur}
                                    value={NamaCustomerPelunasanPiutang}
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
                                    permissionview={!isGetPermissions(MenuPelunasanPiutang, 'READ')}
                                    onclickview={onClickView}
                                    listfilterdisabled={['transdate','amount','amountRp']}
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
export default PelunasanPiutangIndex;