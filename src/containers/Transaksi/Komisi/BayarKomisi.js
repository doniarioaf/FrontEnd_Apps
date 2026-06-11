import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button,Input } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { formatRupiah, numToMoneyNegative, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { addKomisi_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { InputAmountIDR } from '../../../components/Common/InputAmount';
import InputText from '../../../components/Common/InputText';

export default function BayarKomisi(props) {
    reloadToHomeNotAuthorize(addKomisi_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [TransDate, setTransDate] = useState(new Date());
    const [ErrTransDate, setErrTransDate] = useState("");

    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState("");

    const [ListIdVendorBroker, setListIdVendorBroker] = useState([]);

    const [ListMsgError, setListMsgError] = useState([]);

    const [TotalKomisi, setTotalKomisi] = useState("");
    const [addKomisi, setAddKomisi] = useState(0);
    const [Description, setDescription] = useState("");

    const id = props.match.params.id;
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getKomisiData({ url: '/template', type: 'GET', payload: null }, successHandlerTemplate, errorHandler));

    }, []);

    function successHandlerTemplate(data, propsdata) {
        let det = data.data;
        let iddec = localStorage.getItem('ajskme3ss');

        let obj = new Object();
        obj.idbox = det.idbox;
        obj.listidpurchaisereceive = iddec;
        dispatch(actions.getKomisiData({ url: '/bayar/listpr', type: 'POST', payload: obj }, successHandler, errorHandler));
    }

    function successHandler(data, propsdata) {
        let listpr = data.data;
        setLisPR(listpr);
        setLoading(false);

    }

    function setLisPR(listpr) {
        let list = [];
        let idvendorsbroker = [];
        let totalKomisi = 0;
        for(let i=0; i < listpr.length; i++){
            let el = listpr[i];
            let idbroker = el.idvendorbroker;
            if(idvendorsbroker.indexOf(idbroker) == -1){
                idvendorsbroker.push(idbroker);
            }
            let subtotalKomisi = el.subTotalkomisi?el.subTotalkomisi:0;
            let subtotalKomisiRupiah = formatRupiah((new String(subtotalKomisi).replaceAll('.',',')),2);
            totalKomisi = totalKomisi + subtotalKomisi;
            list.push(
                {
                    'id': el.id,
                    'idvendorbroker':idbroker,
                    'nama': el.vendornamabroker,
                    'nodoc': el.nodocument,
                    'transdate': el.date ? moment(el.date).format(formatdate) : '',
                    'koli': el.koli,
                    'komisiperkoli': el.komisi?formatRupiah((el.komisi?new String(el.komisi).replaceAll('.',','):''),2):0,
                    'subtotalkomisi': subtotalKomisiRupiah,
                    'subtotalkomisinominal': subtotalKomisi,
                }
            );
        }
        totalKomisi = String(totalKomisi).replaceAll('.',',');
        setTotalKomisi(totalKomisi);
        setListItems(list);
        setListIdVendorBroker(idvendorsbroker);
        // setListItems(listpr.reduce((obj, el) => [
        //     ...obj,
        //     {
        //         'id': el.id,
        //         'nama': el.vendornamabroker,
        //         'nodoc': el.nodocument,
        //         'transdate': el.date ? moment(el.date).format(formatdate) : '',
        //         'koli': el.koli,
        //         'komisiperkoli': el.komisi?formatRupiah((el.komisi?new String(el.komisi).replaceAll('.',','):''),2):0,
        //         'subtotalkomisi': el.subTotalkomisi?formatRupiah((el.subTotalkomisi?new String(el.subTotalkomisi).replaceAll('.',','):''),2):0,
        //     }
        // ], []));
    }
    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        if (ListItems.length <= 0) {
            setErrItems(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (TransDate == null) {
            setErrTransDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }
    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            if(ListIdVendorBroker.length == 1){
                let propsdata = {index:0};
                sendPayload(ListItems,propsdata);
            }else{
                for(let i=0; i < ListIdVendorBroker.length; i++){
                    let idvendorbroker = ListIdVendorBroker[i];
                    let index = i;
                    let listfilteroutput = ListItems.filter(output => output.idvendorbroker == idvendorbroker);
                    if(listfilteroutput.length > 0){
                        let propsdata = {index:index};
                        sendPayload(listfilteroutput,propsdata);
                        break;
                    }
                }
                
            }
            // let obj = new Object();
            // obj.date = TransDate.getTime();
            // obj.note = '';
            // let items = [];
            // if (ListItems.length > 0) {
            //     items = ListItems.reduce((obj, el) => [
            //         ...obj,
            //         {
            //             'idpurchasereceive': el.id,
            //             'koli': el.koli,
            //             'komisiperkoli': removeFormatRupiah(el.komisiperkoli) !== '' ? removeFormatRupiah(el.komisiperkoli): '0',
            //             'subtotalkomisi': removeFormatRupiah(el.subtotalkomisi) !== '' ? removeFormatRupiah(el.subtotalkomisi) : '0',
            //         }
            //     ], []);
            // }
            // obj.items = items;
            // dispatch(actions.submitKomisi({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }
    }
    function sendPayload(listitem,propsdata) {
        let obj = new Object();
            obj.date = TransDate.getTime();
            obj.note = '';
            obj.additional_commission = addKomisi;
            obj.description = Description;
            let items = [];
            if (listitem.length > 0) {
                items = listitem.reduce((obj, el) => [
                    ...obj,
                    {
                        'idpurchasereceive': el.id,
                        'koli': el.koli,
                        'komisiperkoli': removeFormatRupiah(el.komisiperkoli) !== '' ? removeFormatRupiah(el.komisiperkoli): '0',
                        'subtotalkomisi': removeFormatRupiah(el.subtotalkomisi) !== '' ? removeFormatRupiah(el.subtotalkomisi) : '0',
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitKomisi({ url: '', payload: obj, type: 'ADD', propsdata:propsdata }, succesHandlerSubmit, errorHandlerSubmit));
    }

    const succesHandlerSubmit = (data, propsdata) => {
        let index = propsdata.index;
        let length = ListIdVendorBroker.length - 1;
        let msgerr = propsdata.msgerr?propsdata.msgerr:[];
        if(index == length){
            setLoading(false);
            if(msgerr.length > 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msgerr[0]
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.goBack();
                    }
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: i18n.t('label_SUCCESS')
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.goBack();
                    }
                })
            }
            
            
        }else {
            index = index + 1;
            if(index < ListIdVendorBroker.length){
                let idvendorbroker = ListIdVendorBroker[index];
                let listfilteroutput = ListItems.filter(output => output.idvendorbroker == idvendorbroker);
                if(listfilteroutput.length > 0){
                    let propsdata = {index:index};
                    sendPayload(listfilteroutput,propsdata);
                }
            }else{
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'SUCCESS',
                    text: i18n.t('label_SUCCESS')
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.goBack();
                    }
                })
            }
            
        }
    }

    function errorHandlerSubmit(error, propsdata) {
        // setLoading(false);
        let index = propsdata.index;
        let length = ListIdVendorBroker.length - 1;
        let msgerr = propsdata.msgerr?propsdata.msgerr:[];
        if(index == length){
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.msg
            }).then((result) => {
                if (result.isConfirmed) {
                    history.goBack();
                }
            })
        }else{
            index = index + 1;
            msgerr.push(error.msg);
            if(index < ListIdVendorBroker.length){
                let idvendorbroker = ListIdVendorBroker[index];
                let listfilteroutput = ListItems.filter(output => output.idvendorbroker == idvendorbroker);
                if(listfilteroutput.length > 0){
                    let propsdata = {index:index,msgerr:msgerr};
                    sendPayload(listfilteroutput,propsdata);
                }
            }
        }

        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: error.msg
        // })
    }

    const submitHandler = (values) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit(values);
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const handleRemoveItems = index => {
        const list = [...ListItems];
        list.splice(index, 1);
        setListItems(list);

        let addkomisi = addKomisi !== ''?addKomisi:0;
        let total = list.reduce((sum, item) => {
        return sum + (item.subtotalkomisinominal?item.subtotalkomisinominal:0);
        }, 0);
        total = total + parseFloat(addkomisi);
        total = String(total).replaceAll('.',',');
        setTotalKomisi(total);
    };

    const handleChangeTransDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setTransDate(datetrans);
        } else {
            setTransDate(null)
        }
    }

    const handleChangeAddKomisi = (data) =>{
        setAddKomisi(data);

        let total = ListItems.reduce((sum, item) => {
        return sum + (item.subtotalkomisinominal?item.subtotalkomisinominal:0);
        }, 0);
        if(data !== ''){
        total = parseFloat(total) + parseFloat(data);
        }
        total = String(total).replaceAll('.',',');
        setTotalKomisi(total);
    }
    

    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    return (
        <Formik
            initialValues={
                {
                    transdate: TransDate,
                    totalkomisi: TotalKomisi,
                    addkomisi: addKomisi,
                    description: Description,
                    // kurs: InputKurs,
                }
            }
            validate={values => {
                setDescription(values.description)
                const errors = {};
                return errors;
            }}
            enableReinitialize="true"
            onSubmit={(values) => {

            }}
        >
            {
                formikProps => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldTouched,
                        setFieldValue,
                    } = formikProps;

                    return (
                        <form className="mb-6" onSubmit={handleSubmit} name="bayarkomisi">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.bayarkomisi+'/'+id} label={'Bayar Komisi'} labeldefault={'Bayar Komisi'} />
                                <div className="row mt-2">
                                <div className="mt-2 col-lg-6 ft-detail mb-5">
                                    <label className="mt-3 form-label required" htmlFor="transdate">
                                        {i18n.t('Tanggal')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>

                                    <DatePicker
                                        name="transdate"
                                        onChange={val => handleChangeTransDate(val)}
                                        format={formatdate}
                                        value={values.transdate}
                                    />
                                    <div className="invalid-feedback-custom">{ErrTransDate}</div>

                                    <label className="mt-3 form-label required" htmlFor="amount">
                                        {i18n.t('Total Komisi')}
                                    </label>
                                    <Input
                                        name="totalkomisi"
                                        type="text"
                                        id="totalkomisi"
                                        disabled={true}
                                        // onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.totalkomisi !== '' ? numToMoneyNegative(new String(values.totalkomisi).replaceAll(".", "")) : ''}
                                        // value={values.amount !== '' ? numToMoney(parseFloat(new String(values.amount).replaceAll(".", ""))) : ''}
                                    />
                                </div>

                                <div className="mt-2 col-lg-6 ft-detail mb-5">
                                     <label className="mt-3 form-label required" htmlFor="penambahanamount">
                                        {i18n.t('Penambahan Komisi')}
                                    </label>
                                    <InputAmountIDR  value={values.addkomisi} 
                                    onChange={(raw) => handleChangeAddKomisi(raw)}
                                    placeholder="0"
                                    />

                                    <label className="mt-3 form-label required" htmlFor="description">
                                        {i18n.t('Deskripsi')}
                                    </label>
                                     <InputText
                                    id="description"
                                    name="description"
                                    // label="Deskripsi"
                                    value={values.description}
                                    onChange={(val) => setFieldValue('description', val)}
                                    onBlur={handleBlur}
                                    />
                                </div>

                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItems}</div>
                                {
                                    <div className="row justify-content-center">
                                        <table id="tablegrid">
                                        <tbody>
                                            <tr>
                                            <th>{''}</th>
                                            <th >{i18n.t('Nama Broker')}</th>
                                            <th >{i18n.t('No Document')}</th>
                                            <th >{i18n.t('Tanggal')}</th>
                                            <th >{i18n.t('Koli')}</th>
                                            <th >{i18n.t('Komisi Per Koli')}</th>
                                            <th >{i18n.t('Subtotal Komisi')}</th>
                                            </tr>
                                            {
                                                ListItems.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td >
                                                                <IconButton
                                                                    color={'primary'}
                                                                    // style={{color:'white'}}
                                                                    onClick={() => handleRemoveItems(i)}
                                                                    // hidden={x.nodocument == 'TOTAL'}
                                                                >
                                                                    <DeleteIcon style={{ fontSize: 18 }} />
                                                                </IconButton>
                                                            </td>
                                                            <td >
                                                                {x.nama}
                                                            </td>
                                                            <td >
                                                                {x.nodoc}
                                                            </td>
                                                            <td >
                                                                {x.transdate}
                                                            </td>
                                                            <td >
                                                                {x.koli}
                                                            </td>
                                                            <td >
                                                                {x.komisiperkoli}
                                                            </td>
                                                            <td >
                                                                {x.subtotalkomisi}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                
                                                ListItems.length > 0 && (() => {
                                                    let total = ListItems.reduce((sum, item) => {
                                                    return sum + (item.subtotalkomisinominal?item.subtotalkomisinominal:0);
                                                    }, 0);
                                                    // total = String(total).replaceAll('.',',');
                                                    return (
                                                        <tr style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize: '1rem' }}>
                                                            <td></td>
                                                            <td >{'Total'}</td>
                                                            <td ></td>
                                                            <td ></td>
                                                            <td ></td>
                                                            
                                                            <td ></td>
                                                            <td >{formatRupiah(new String(total).replaceAll('.', ','), 2)}</td>
                                                        </tr>
                                                    );
                                                })()

                                                
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                }
                            </ContentWrapper>
                            {loading && <Loading />}
                            <div className="row justify-content-center" style={{ marginTop: '-30px', marginBottom: '20px' }}>
                                <Button
                                    // disabled={props.activeStep === 0}
                                    // style={{marginLeft:"20%"}}
                                    onClick={() => history.goBack()}
                                >
                                    {/* {i18n.t('common.BACK')} */}
                                    {'Cancel'}
                                </Button>

                                <Button
                                    // style={{marginLeft:"1%"}}
                                    color={'primary'}
                                    onClick={() => submitHandler(values)}
                                >
                                    {'Submit'}
                                </Button>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>
    )
}