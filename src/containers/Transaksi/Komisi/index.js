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
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth, formatRupiah } from '../../shared/globalFunc';
import { MenuKomisi, addKomisi_Permission } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker } from 'react-widgets';
import Select from 'react-select';
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

const KomisiIndex = () => {
    reloadToHomeNotAuthorize(MenuKomisi, 'READ');
    momentLocalizer();
    const history = useHistory();

    const [rowskomisi, setRowsKomisi] = useState([]);
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [selection, setSelection] = useState([]);
    const [columnsPurchaseReceive] = useState([
        { name: 'id', title: 'id' },
        { name: 'nama', title: i18n.t('Nama Broker') },
        { name: 'nodoc', title: i18n.t('No Document') },
        { name: 'transdate', title: i18n.t('Tanggal') },
        { name: 'koli', title: i18n.t('Koli') },
        { name: 'komisiperkoli', title: i18n.t('Komisi Per Koli') },
        { name: 'subtotalkomisi', title: i18n.t('Subtotal Komisi') },
    ]);
    const [columnsKomisi] = useState([
        { name: 'id', title: 'id' },
        { name: 'nodoc', title: i18n.t('No Document') },
        { name: 'transdate', title: i18n.t('Tanggal') },
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);

    let getdate = firstAndLastDateInMonth();
    const [from, setFrom] = useState(getdate.first);
    const [to, setTo] = useState(getdate.last);

    const [fromKomisi, setFromKomisi] = useState(getdate.first);
    const [toKomisi, setToKomisi] = useState(getdate.last);
    
    const [selectedVendor, setSelectedVendor] = useState([]);
    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState([]);
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState(0);
    const [IdBox, setIdBox] = useState(0);

    const customStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }) // Ensure it's above everything
      };
      

    useEffect(() => {
        localStorage.removeItem('ajskme3ss');
        setLoading(true);
        dispatch(actions.getKomisiData({ url: '/template', type: 'GET', payload: null }, successHandlerTemplate, errorHandler));

    }, []);

    function successHandlerTemplate(data, propsdata) {
        let det = data.data;
        setIdBox(det.idbox);
        if(det.vendorBrokerOpt){
            let theData = det.vendorBrokerOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            theData.push(
                {
                    'value': 'ALL',
                    'label': 'All',
                    'data': []
                }
            );

            setListVendor(theData);
        }
        
        

        let obj = new Object();
        obj.from = from.getTime();
        obj.to = to.getTime();
        obj.listIdVendor = '';
        obj.idbox = det.idbox;
        dispatch(actions.getKomisiData({ url: '/listall', type: 'POST', payload: obj }, successHandler, errorHandler));
    }
    function successHandler(data, propsdata) {
        let det = data.data;
        let listkomisi = det.listkomisi?det.listkomisi:[];
        let listpr = det.listpr?det.listpr:[];
        
        setListKomisi(listkomisi);
        setLisPR(listpr);

        setLoading(false);
    }

    function successHandlerSearchPR(data, propsdata) {
        let listpr = data.data;
        setLisPR(listpr);
        setLoading(false);
    }

    function successHandlerSearchKomisi(data, propsdata) {
        let listkomisi = data.data;
        setListKomisi(listkomisi);
        setLoading(false);
    }

    function setListKomisi(listkomisi) {
        setRowsKomisi(listkomisi.reduce((obj, el) => [
            ...obj,
            {
                'id': el.id,
                'nodoc': el.nodocument,
                'transdate': el.date ? moment(el.date).format(formatdate) : ''
            }
        ], []));
    }

    function setLisPR(listpr) {
        setRows(listpr.reduce((obj, el) => [
            ...obj,
            {
                'id': el.id,
                'nama': el.vendornamabroker,
                'nodoc': el.nodocument,
                'transdate': el.date ? moment(el.date).format(formatdate) : '',
                'koli': el.koli,
                'komisiperkoli': el.komisi?formatRupiah((el.komisi?new String(el.komisi).replaceAll('.',','):''),2):0,
                'subtotalkomisi': el.subTotalkomisi?formatRupiah((el.subTotalkomisi?new String(el.subTotalkomisi).replaceAll('.',','):''),2):0,
            }
        ], []));
    }

    const handleChangeVendor = (data) =>{
        let temp = [];
        if (data !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].value);
            }
        }
        setSelVendor(temp);
    }
    
    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    function handleChangeTabIndex(index) {
        setTabValue(index);
    }

    function onClickView(id) {
        history.push(pathmenu.detailkomisi + '/' + id);
    }

    const handleChangeFromKomisi = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setFromKomisi(moment(data, formatdate).toDate())
        } else {
            setFromKomisi(null)
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

    const handleChangeTOKomisi = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setToKomisi(moment(data, formatdate).toDate())
        } else {
            setToKomisi(null);
        }
    }

    function onClickSearch() {
        if (from != null && to != null) {
            let idvendor = '';
            if(SelVendor.indexOf('ALL') > -1){
                idvendor = ''
            }else{
                idvendor = SelVendor.join(',');
            }
            setLoading(true);
            let obj = new Object();
            obj.from = from.getTime();
            obj.to = to.getTime();
            obj.listIdVendor = idvendor;
            obj.idbox = IdBox;
            dispatch(actions.getKomisiData({ url: '/listpurchasereceive', type: 'POST', payload: obj }, successHandlerSearchPR, errorHandler));
        }
    }
    function onClickSearchKomisi() {
        if (from != null && to != null) {
            setLoading(true);
            let obj = new Object();
            obj.from = fromKomisi.getTime();
            obj.to = toKomisi.getTime();
            obj.listIdVendor = '';
            obj.idbox = IdBox;
            dispatch(actions.getKomisiData({ url: '/list', type: 'POST', payload: obj }, successHandlerSearchKomisi, errorHandler));
        }

    }

    function onClickBayar() {
        let list = [];
        if(selection.length > 0){
            for(let i=0; i < selection.length; i++){
                let val = rows[selection[i]];
                list.push(val.id);
            }
            localStorage.setItem('ajskme3ss',list.join(','));
            const idsenc = CryptoJS.AES.encrypt(JSON.stringify(list),key.keyEcncrypt).toString();
            history.push(pathmenu.bayarkomisi + '/' + idsenc);
        }
    }

    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menukomisi} label={'Komisi'} labeldefault={'Komisi'} />
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
                    <Tab label={i18n.t('Nota Pembelian') }/>
                    <Tab label={i18n.t('Komisi') }/>
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
                    title={i18n.t('Bayar Komisi')}
                    style={{float: 'right',marginRight:'0.2%'}}
                    hidden={isGetPermissions(addKomisi_Permission,'TRANSACTION') ?selection.length == 0:true}
                >
                    {i18n.t('Bayar Komisi')}
                </Button>

                <table>
                    <th>{'From'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'To'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'Broker'}</th>
                    {/* <th style={{ paddingLeft: '10px' }}>{'Status'}</th> */}
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
                             <td width={'300px'}>
                                <div>
                             <Select
                                defaultValue={selectedVendor}
                                isMulti
                                name="colors"
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                options={ListVendor}
                                onChange={val => handleChangeVendor(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            </div>
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
                                    columns={columnsPurchaseReceive}
                                    totalCounts={rows.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    selection={selection}
                                    setselection={setSelection}
                                    // permissionadd={!isGetPermissions(addDraftPurchaseReceive_Permission, 'TRANSACTION')}
                                    // onclickadd={onClickAdd}
                                    // permissionview={!isGetPermissions(MenuPelunasanHutang, 'READ')}
                                    // onclickview={onClickViewHutang}
                                    listfilterdisabled={['transdate','koli','komisiperkoli','subtotalkomisi']}
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
                    {/* <th style={{ paddingLeft: '10px' }}>{'Customer'}</th> */}
                    <tbody>
                        <tr>
                        <td>
                            <DatePicker
                            name="from"
                            onChange={val => handleChangeFromKomisi(val)}
                            // onBlur={handleBlur}
                            // defaultValue={Date(moment([]))}
                            format={formatdate}
                            value={fromKomisi}
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
                                    onChange={val => handleChangeTOKomisi(val)}
                                    // onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={toKomisi}
                                // max={new Date()}
                                // style={{width: '25%'}}
                                />
                            </td> 
                             {/* <td width={'200px'}>
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
                            </td> */}
                            <td>
                                <IconButton color={'primary'}
                                    onClick={() => onClickSearchKomisi()}
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
                                    rows={rowskomisi}
                                    columns={columnsKomisi}
                                    totalCounts={rowskomisi.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    // permissionadd={!isGetPermissions(addDraftPurchaseReceive_Permission, 'TRANSACTION')}
                                    // onclickadd={onClickAdd}
                                    permissionview={!isGetPermissions(MenuKomisi, 'READ')}
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
export default KomisiIndex;