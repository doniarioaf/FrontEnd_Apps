import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { decryptObjectNotLocalStorage, numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
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
                        'amount': el.amount,
                        'amountrp': amountRp,
                        'outstanding': parseFloat(el.outstanding).toFixed(2),
                        'biayabebanudangmati': 0,
                        'biayabank': 0,
                        'pembayaran': 0,
                        'pembayaranrp': 0,
                        'metodepembayaran': '',
                    }
                );
            }
            list.push(
                {
                    'idinvoice':0,
                    'nodocument': 'TOTAL',
                    'amount': parseFloat(totalAmount).toFixed(2),
                    'amountrp': parseFloat(totalAmountRp).toFixed(2),
                    'outstanding': parseFloat(totalOutstanding).toFixed(2),
                    'biayabebanudangmati': 0,
                    'biayabank': 0,
                    'pembayaran': 0,
                    'pembayaranrp': 0,
                    'metodepembayaran': '',
                }
            );
            
        }
        setListItems(list);

        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        setErrInputKurs('');
        setErrItems('')

        if (ListItems.length > 0) {
            for (let i = 0; i < ListItems.length; i++) {
                let det = ListItems[i];
                if (parseInt(det.pembayaranrp) <= 0) {
                    setErrItems(i18n.t('Pembayaran Harus diatas 0'));
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
            obj.kurs = new String(values.kurs).replaceAll('.', '') !== '' ? new String(values.kurs).replaceAll('.', '') : '0';
            let items = [];
            if (ListItems.length > 0) {
                let listitem = ListItems.filter(output => output.nodocument !== 'TOTAL');
                items = listitem.reduce((obj, el) => [
                    ...obj,
                    {
                        'idinvoice': el.idinvoice,
                        'biayabebanudangmati': new String(el.biayabebanudangmati).replaceAll('.', '') !== '' ? new String(el.biayabebanudangmati).replaceAll('.', '') : '0',
                        'biayabank': new String(el.biayabank).replaceAll('.', '') !== '' ? new String(el.biayabank).replaceAll('.', '') : '0',
                        'pembayaran': new String(el.pembayaran).replaceAll('.', '') !== '' ? new String(el.pembayaran).replaceAll('.', '') : '0',
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
        let kurs = InputKurs !== ''?parseFloat(new String(InputKurs).replaceAll('.','')):0;
        let flag = true;
        let subtotal = 0;
        if (name == 'biayabebanudangmati' || name == 'biayabank' || name == 'pembayaran' || name == 'pembayaranrp') {
            
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';
            if (isNaN(valPriceTemp) && valPriceTemp !== '' ) {
                flag = false;
            } 
            

        }
        if (flag) {
            
            const list = [...ListItems];
            let indexTotal = list.findIndex(obj => obj.nodocument == 'TOTAL');
            let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            list[index][name] = valPrice;
            if(name == 'pembayaran'){
                list[index]['pembayaranrp'] = parseFloat(valPrice !== ''?valPrice:0) * parseFloat(kurs);
            }
            let calc = calculateTotal(list);
            list[indexTotal]['biayabebanudangmati'] = calc.totalbiayaudangmati;
            list[indexTotal]['biayabank'] = calc.totalbiayabank;
            list[indexTotal]['pembayaran'] = calc.totalpembayaran;
            list[indexTotal]['pembayaranrp'] = calc.totalpembayaranrp;
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
            let biayabebanudangmati = det.biayabebanudangmati !== ''? parseFloat(new String(det.biayabebanudangmati).replaceAll('.','')):0;
            totalBebanBiayaUdangMati += biayabebanudangmati;

            let biayabank = det.biayabank !== ''? parseFloat(new String(det.biayabank).replaceAll('.','')):0;
            totalBiayaBank += biayabank;

            let pembayaran = det.pembayaran !== ''? parseFloat(new String(det.pembayaran).replaceAll('.','')):0;
            totalPembayaran += pembayaran;

            let pembayaranrp = det.pembayaranrp !== ''? parseFloat(new String(det.pembayaranrp).replaceAll('.','')):0;
            totalPembayaranrp += pembayaranrp;
        }
        let obj = new Object();
        obj.totalbiayaudangmati = totalBebanBiayaUdangMati;
        obj.totalbiayabank = totalBiayaBank;
        obj.totalpembayaran = totalPembayaran;
        obj.totalpembayaranrp = totalPembayaranrp;
        return obj;
    }
    const changeValueKurs = (value) => {
        let val = parseFloat(new String(value).replaceAll('.',''));
        return numToMoney( val )
    }

    const handleInputKurs = (data) =>{
        let val = data.target.value;
        let valKurs = val !== ''?parseFloat(new String(val).replaceAll('.','')):0;
        const list = [...ListItems];
        for(let i=0; i < list.length; i++){
            let valPrice = list[i]['pembayaran']
            valPrice = valPrice !== ''?valPrice:0
            list[i]['pembayaranrp'] = parseFloat(valPrice) * parseFloat(valKurs);
        }
        setListItems(list);

        setInputKurs(val)
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
                                        value={values.kurs !== ''?changeValueKurs(values.kurs):''}
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
                                                                        {x.amountrp !== ''?numToMoney(parseFloat(x.amountrp)):'' }
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
                                                                    value={x.pembayaranrp !== ''?numToMoney(parseFloat(x.pembayaranrp)):'' }
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