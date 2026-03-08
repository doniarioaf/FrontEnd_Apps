import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { decryptObjectNotLocalStorage, formatRupiah, numToMoney, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { addPelunasanPiutang_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { calculateDolarToRupiah } from '.';

export default function AddStockAdjusment(props) {
    reloadToHomeNotAuthorize(addPelunasanPiutang_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [TransDate, setTransDate] = useState(new Date());
    const [ErrTransDate, setErrTransDate] = useState("");

    const [InputKurs, setInputKurs] = useState(1);
    const [ErrInputKurs, setErrInputKurs] = useState(1);

    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState("");
    
    const id = props.match.params.id;


    useEffect(() => {
        let iddec = decryptObjectNotLocalStorage(id,true);

        if(iddec != null){
            iddec = iddec.join(',');
            setLoading(true);
            dispatch(actions.getPelunasanPiutangData({ url: '/bayar/listinvoice/'+iddec }, successHandler, errorHandler));
        }else{
            iddec = localStorage.getItem('meo!kmadmasku');
            setLoading(true);
            dispatch(actions.getPelunasanPiutangData({ url: '/bayar/listinvoice/'+iddec }, successHandler, errorHandler));
        }
        
        
        
    }, []);

    function successHandler(data, propsdata) {
        let list = []
        if (data.data) {
            let totalAmount =0;
            let totalAmountRp =0;
            let totalOutstanding =0;
            for(let i=0; i < data.data.length; i++){
                let el = data.data[i];
                let amountRp = calculateDolarToRupiah(el.amount,el.kurs);
                totalAmount += el.amount;
                totalAmountRp += amountRp;
                totalOutstanding += el.outstanding;
                list.push(
                    {
                        'idinvoice':el.id,
                        'nodocument': el.nodocument,
                        'amount': el.amount?formatRupiah((el.amount?new String(el.amount).replaceAll('.',','):0),2):0,
                        // 'amountrp': amountRp,
                        'amountrp': formatRupiah(new String(amountRp).replaceAll('.',','),2),
                        'outstanding': el.outstanding?formatRupiah((el.outstanding?new String(el.outstanding).replaceAll('.',','):0),2):0,
                        'biayabebanudangmati': 0,
                        'biayabank': 0,
                        'pembayaran': 0,
                        'pembayaranrp': 0,
                        'metodepembayaran': '',
                    }
                );
            }
            if(list.length > 0){
                list.push(
                    {
                        'idinvoice':0,
                        'nodocument': 'TOTAL',
                        'amount': formatRupiah((new String(totalAmount).replaceAll('.',',')),2),
                        'amountrp': formatRupiah((new String(totalAmountRp).replaceAll('.',',')),2),
                        'outstanding': formatRupiah((new String(totalOutstanding).replaceAll('.',',')),2),
                        'biayabebanudangmati': 0,
                        'biayabank': 0,
                        'pembayaran': 0,
                        'pembayaranrp': 0,
                        'metodepembayaran': '',
                    }
                );
            }
        }
        setListItems(list);

        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        setErrInputKurs('');
        setErrItems('')

        let listitem = ListItems.filter(output => output.nodocument !== 'TOTAL');
        if (listitem.length > 0) {
            for (let i = 0; i < ListItems.length; i++) {
                let det = ListItems[i];
                if(det.nodocument == 'TOTAL'){
                    continue;
                }
                let biayabebanudangmati = parseFloat(removeFormatRupiah(det.biayabebanudangmati));
                let biayabank = parseFloat(removeFormatRupiah(det.biayabank));
                let pembayaran = parseFloat(removeFormatRupiah(det.pembayaran));
                let outstanding = parseFloat(removeFormatRupiah(det.outstanding?det.outstanding:0));
                let totalPembayaran = biayabebanudangmati + biayabank + pembayaran;
                if (parseFloat(removeFormatRupiah(det.pembayaranrp)) <= 0) {
                    setErrItems(i18n.t('Pembayaran Harus diatas 0'));
                    flag = false;
                    break;
                }
                console.log('det.nodocument ',det.nodocument);
                console.log('totalPembayaran ',totalPembayaran);
                console.log('outstanding ',outstanding);
                if (totalPembayaran > outstanding) {
                    setErrItems(i18n.t('Pembayaran '+det.nodocument+' Lebih besar dari nilai outstanding'));
                    flag = false;
                    break;
                }
            }
        } else {
            setErrItems(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (TransDate == null) {
            setErrTransDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (values.kurs == '') {
            setErrInputKurs(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let kurs = new String(values.kurs).replaceAll('.','');
            if(parseFloat(kurs) <= 0){
                setErrInputKurs(i18n.t('Harus Lebih besar dari 0'));
                flag = false;
            }
        }
        return flag;
    }

    const succesHandlerSubmit = (data, propsdata) => {
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

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.date = TransDate.getTime();
            obj.kurs = removeFormatRupiah(values.kurs) !== '' ? removeFormatRupiah(values.kurs) : '0';
            let items = [];
            let listitem = ListItems.filter(output => output.nodocument !== 'TOTAL');
            if (listitem.length > 0) {
                
                items = listitem.reduce((obj, el) => [
                    ...obj,
                    {
                        'idinvoice': el.idinvoice,
                        'biayabebanudangmati': removeFormatRupiah(el.biayabebanudangmati) !== '' ? removeFormatRupiah(el.biayabebanudangmati): '0',
                        'biayabank': removeFormatRupiah(el.biayabank) !== '' ? removeFormatRupiah(el.biayabank) : '0',
                        'pembayaran': removeFormatRupiah(el.pembayaran) !== '' ? removeFormatRupiah(el.pembayaran) : '0',
                        'metodepembayaran': el.metodepembayaran,
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitPelunasanPiutang({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }
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

    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleChangeTransDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setTransDate(datetrans);
        } else {
            setTransDate(null)
        }
    }

    const handleInputChangeItems = (e, index) => {
        const { name, value } = e.target;
        let kurs = InputKurs !== ''?removeFormatRupiah(InputKurs):0;
        let flag = true;
        let subtotal = 0;
        if(name == 'biayabebanudangmati' || name == 'biayabank' || name == 'pembayaran'){
            if (isNaN(value) && value !== '') {
                flag = false;
                if(new String(value).split(',').length >= 3){
                    flag = false;
                }else{
                    flag = true;
                }
            }
        }
        if (flag) {
            
            const list = [...ListItems];
            if(name == 'metodepembayaran'){
                list[index][name] = value;
            }else{
                let indexTotal = list.findIndex(obj => obj.nodocument == 'TOTAL');

                let valPriceTemp = '';
                if(new String(value).includes(',')){
                    let splitComma = new String(value).split(','); 
                    let angka = splitComma[0];
                    let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                    valPriceTemp = removeFormatRupiah(angka)+','+desimal;
                }else{
                    valPriceTemp = removeFormatRupiah(value);
                }
                list[index][name] = formatRupiah(valPriceTemp,2);
                
                if(name == 'pembayaran'){
                    list[index]['pembayaranrp'] = removeFormatRupiah(value) !== ''?formatRupiah(new String(parseFloat(removeFormatRupiah(value))* parseFloat(kurs)).replaceAll('.',','),2):'';
                }
                let calc = calculateTotal(list);
                list[indexTotal]['biayabebanudangmati'] = calc.totalbiayaudangmati;
                list[indexTotal]['biayabank'] = calc.totalbiayabank;
                list[indexTotal]['pembayaran'] = calc.totalpembayaran;
                list[indexTotal]['pembayaranrp'] = calc.totalpembayaranrp;
            }   
            setListItems(list);
        }
        //let indexBox = listBiaya.findIndex(obj => obj.namabiaya == 'BOX');
    }

    const calculateTotal = (list) => {
        let totalBebanBiayaUdangMati = 0;
        let totalBiayaBank = 0;
        let totalPembayaran = 0;
        let totalPembayaranrp = 0;
        for(let i=0; i < list.length; i++){
            let det = list[i];
            if(det.nodocument == 'TOTAL'){
                continue;
            }
            let biayabebanudangmati = det.biayabebanudangmati !== ''? parseFloat( removeFormatRupiah(det.biayabebanudangmati)):0;
            totalBebanBiayaUdangMati += biayabebanudangmati;

            let biayabank = det.biayabank !== ''? parseFloat(removeFormatRupiah(det.biayabank)):0;
            totalBiayaBank += biayabank;

            let pembayaran = det.pembayaran !== ''? parseFloat(removeFormatRupiah(det.pembayaran)):0;
            totalPembayaran += pembayaran;

            let pembayaranrp = det.pembayaranrp !== ''? parseFloat(removeFormatRupiah(det.pembayaranrp)):0;
            totalPembayaranrp += pembayaranrp;
        }
        let obj = new Object();
        obj.totalbiayaudangmati = formatRupiah(new String(totalBebanBiayaUdangMati).replaceAll('.',','));
        obj.totalbiayabank = formatRupiah(new String(totalBiayaBank)).replaceAll('.',',');
        obj.totalpembayaran = formatRupiah(new String(totalPembayaran)).replaceAll('.',',');
        obj.totalpembayaranrp = formatRupiah(new String(totalPembayaranrp)).replaceAll('.',',');
        return obj;
    }
    const changeValueKurs = (value) => {
        let val = parseFloat(new String(value).replaceAll('.',''));
        return numToMoney( val )
    }

    const handleInputKurs = (data) =>{
        let val = data.target.value;
        let flag = true;
        if (isNaN(val) && val !== '') {
            flag = false;
            if(new String(val).split(',').length >= 3){
                flag = false;
            }else{
                flag = true;
            }
        }
        let valPriceTemp = '';
        if(new String(val).includes(',')){
            let splitComma = new String(val).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valPriceTemp = removeFormatRupiah(angka)+','+desimal;
        }else{
            valPriceTemp = removeFormatRupiah(val);
        }

        if (flag) {
            let formatRp = formatRupiah(valPriceTemp,2);
            setInputKurs(formatRp);

            let valKurs = parseFloat(removeFormatRupiah(formatRp));
            // let valKurs = val !== ''?parseFloat(new String(val).replaceAll('.','')):0;
            const list = [...ListItems];
            for(let i=0; i < list.length; i++){
                let valPrice = list[i]['pembayaran'];
                valPrice = removeFormatRupiah(valPrice) !== ''?removeFormatRupiah(valPrice):0
                list[i]['pembayaranrp'] = formatRupiah(new String(parseFloat(valPrice) * parseFloat(valKurs)).replaceAll('.',','),2);
            }
            
            let indexTotal = list.findIndex(obj => obj.nodocument == 'TOTAL');
            let calc = calculateTotal(list);
            list[indexTotal]['biayabebanudangmati'] = calc.totalbiayaudangmati;
            list[indexTotal]['biayabank'] = calc.totalbiayabank;
            list[indexTotal]['pembayaran'] = calc.totalpembayaran;
            list[indexTotal]['pembayaranrp'] = calc.totalpembayaranrp;

            setListItems(list);
        }

        
    }

    const handleRemoveItems = index => {
        const list = [...ListItems];
        list.splice(index, 1);
        let indexTotal = list.findIndex(obj => obj.nodocument == 'TOTAL');
        let calc = calculateTotal(list);
        list[indexTotal]['biayabebanudangmati'] = calc.totalbiayaudangmati;
        list[indexTotal]['biayabank'] = calc.totalbiayabank;
        list[indexTotal]['pembayaran'] = calc.totalpembayaran;
        list[indexTotal]['pembayaranrp'] = calc.totalpembayaranrp;
        setListItems(list);
    };

    return (
        <Formik
            initialValues={
                {
                    transdate: TransDate,
                    kurs: InputKurs,
                }
            }
            validate={values => {
                const errors = {};
                setInputKurs(values.kurs);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="bayarpelunasanpiutang">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.bayarpelunasanpiutang} label={'Bayar Piutang'} labeldefault={'Bayar Piutang'} />

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

                                    <label className="mt-3 form-label required" htmlFor="notes">
                                        {i18n.t('Kurs')}
                                    </label>
                                    <Input
                                        name="kurs"
                                        type="text"
                                        id="kurs"
                                        // onChange={handleChange}
                                        onChange={val => handleInputKurs(val)}
                                        onBlur={handleBlur}
                                        value={values.kurs}
                                    />
                                    </div>
                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItems}</div>
                                {
                                    // ListItemsPurchaseReceive.length == 0?'':

                                    <div className="row justify-content-center">
                                        {/* <h4>{'Input Item'}</h4> */}
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th>{''}</th>
                                                    <th >{i18n.t('No Document')}</th>
                                                    <th >{i18n.t('Amount($)')}</th>
                                                    <th >{i18n.t('Amount(Rp)')}</th>
                                                    <th >{i18n.t('Oustanding')}</th>
                                                    <th >{i18n.t('Biaya beban udang mati($)')}</th>
                                                    <th >{i18n.t('Biaya bank($)')}</th>
                                                    <th >{i18n.t('Pembayaran($)')}</th>
                                                    <th >{i18n.t('Pembayaran(Rp)')}</th>
                                                    <th >{i18n.t('Metode Pembayaran')}</th>
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
                                                                        hidden={x.nodocument == 'TOTAL'}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                    </td>
                                                                    <td >
                                                                        {x.nodocument}
                                                                    </td>
                                                                    <td >
                                                                        {x.amount}
                                                                    </td>
                                                                    <td >
                                                                        {/* {x.amountrp !== ''?numToMoney(parseFloat(x.amountrp)):'' } */}
                                                                        {x.amountrp}
                                                                    </td>
                                                                    <td >
                                                                        {x.outstanding}
                                                                    </td>
                                                                <td>
                                                                    <Input
                                                                    name="biayabebanudangmati"
                                                                    type="text"
                                                                    id="biayabebanudangmati"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.biayabebanudangmati}
                                                                    disabled={x.nodocument == 'TOTAL'}
                                                                /></td>
                                                                <td>
                                                                    <Input
                                                                    name="biayabank"
                                                                    type="text"
                                                                    id="biayabank"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.biayabank}
                                                                    disabled={x.nodocument == 'TOTAL'}
                                                                /></td>
                                                                <td>
                                                                    <Input
                                                                    name="pembayaran"
                                                                    type="text"
                                                                    id="pembayaran"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.pembayaran}
                                                                    disabled={x.nodocument == 'TOTAL'}
                                                                /></td>
                                                                <td>
                                                                    <Input
                                                                    name="pembayaranrp"
                                                                    type="text"
                                                                    id="pembayaranrp"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    // value={x.pembayaranrp}
                                                                    value={x.pembayaranrp }
                                                                    disabled={true}
                                                                /></td>
                                                                <td>
                                                                    <Input
                                                                    name="metodepembayaran"
                                                                    type="text"
                                                                    id="metodepembayaran"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.metodepembayaran}
                                                                    disabled={x.nodocument == 'TOTAL'}
                                                                /></td>
                                                            </tr>
                                                        )
                                                    })
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