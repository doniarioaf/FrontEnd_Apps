import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button,Label,FormGroup,Container} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,inputJustNumberAndCommaDot,formatMoney } from '../shared/globalFunc';
import { addPenerimaanKasBank_Permission} from '../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import '../CSS/table.css';


export default function AddForm(props) {
    reloadToHomeNotAuthorize(addPenerimaanKasBank_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputReceiveDate, setInputReceiveDate] = useState(new Date());
    const [ErrInputReceiveDate, setErrInputReceiveDate] = useState('');

    const [InputReceiveFrom, setInputReceiveFrom] = useState('');
    const [ErrInputReceiveFrom, setErrInputReceiveFrom] = useState('');

    const [ListCOA, setListCOA] = useState([]);
    const [SelCOA, setSelCOA] = useState('');
    const [ErrSelCOA, setErrSelCOA] = useState('');

    const [ListBank, setListBank] = useState([]);
    const [SelBank, setSelBank] = useState('');
    const [ErrSelBank, setErrSelBank] = useState('');

    const [InputKeterangan, setInputKeterangan] = useState('');

    const [ListWO, setListWO] = useState([]);
    const [ListChooseYN, setListChooseYN] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idcoa:"",catatan: "",amount:"",isdownpayment:"",idinvoice:"",idworkorder:""}]);
    const [ErrInputCatatan, setErrInputCatatan] = useState('');
    const [ErrInputAmount, setErrInputAmount] = useState('');
    const [ErrIsDownPayment, setErrIsDownPayment] = useState('');
    const [ErrItems, setErrItems] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPenerimaanKasBankData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setListCOA(data.data.coaOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama+' ('+el.code+')'
                }]
            ), []));

            setListBank(data.data.bankOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.namabank
                }]
            ), []));

            setListWO(data.data.woOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument+' ('+el.namaCustomer+')'
                }]
            ), []));

            setListChooseYN([{value:'Y',label:'Yes'},{value:'N',label:'No'}])
        }
        setLoading(false);
    }

    const handleInputReceiveFrom = (data) =>{
        let val = data.target.value;
        setInputReceiveFrom(val)
    }

    const handleInputKeterangan = (data) =>{
        let val = data.target.value;
        setInputKeterangan(val)
    }

    const handleChangeCoa = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCOA(id);
    }

    const handleChangeBank = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBank(id);
    }

    const handleChangeReceiveDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputReceiveDate(moment(data, formatdate).toDate())
        }else{
            setInputReceiveDate(null)
        }
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputReceiveDate('');
        setErrInputReceiveFrom('');
        setErrSelCOA('');
        setErrSelBank('');
        setErrInputCatatan('');
        setErrInputAmount('');
        setErrIsDownPayment('');
        setErrItems('');

        let listitems = [];
        if(InputListItem.length > 0){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[i];
                if(det.idcoa !== '' || det.catatan !== '' || det.amount !== '' || det.isdownpayment !== '' || det.idinvoice !== '' || det.idworkorder !== '' ){
                    if(det.catatan == ''){
                        setErrInputCatatan(i18n.t('Catatan')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.amount == ''){
                        setErrInputAmount(i18n.t('Amount')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.isdownpayment == ''){
                        setErrIsDownPayment(i18n.t('DP')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                    listitems.push(det);
                }
            }
        }

        if(listitems.length == 0){
            setErrItems(i18n.t('Items')+' '+i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputReceiveDate == null){
            setErrInputReceiveDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputReceiveFrom == ''){
            setErrInputReceiveFrom(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCOA == ''){
            setErrSelCOA(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelBank == ''){
            setErrSelBank(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.receivedate = moment(InputReceiveDate).toDate().getTime();
            obj.receivefrom = InputReceiveFrom;
            obj.idcoa = SelCOA;
            obj.idbank = SelBank;
            obj.keterangan = InputKeterangan;
            obj.isactive = true;
            let listdetails = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];
                    if(det.catatan !== '' && det.amount !== '' && det.isdownpayment !== ''){
                        let objDet = new Object();
                        objDet.idcoa = det.idcoa !== '' ? det.idcoa:null;
                        objDet.catatan = det.catatan;
                        objDet.amount = new String(det.amount).replaceAll('.','').replaceAll(',','.');
                        objDet.isdownpayment = det.isdownpayment;
                        objDet.idinvoice = det.idinvoice !== '' ? det.idinvoice:null;
                        objDet.idworkorder = det.idworkorder !== '' ? det.idworkorder:null;
                        listdetails.push(objDet);
                    }
                }
            }
            obj.details = listdetails;
            dispatch(actions.submitAddPenerimaanKasBank('',obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
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

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let valTemp = value;
        const list = [...InputListItem];
        if(name == 'amount'){
            let flagReg = inputJustNumberAndCommaDot(value);
            if(flagReg){
                valTemp = formatMoney(value);
                list[index][name] = valTemp;
            }
        }else{
            // const list = [...InputListItem];
            list[index][name] = valTemp;
        }
        setInputListItem(list);
    };

    const handleInputDropDownChange = (e, index,name) => {
        const list = [...InputListItem];
        list[index][name] = e.value;
        setInputListItem(list);
    };    

    const handleAddClick = () => {
        setInputListItem([...InputListItem, { idcoa:"",catatan: "",amount:"",isdownpayment:"",idinvoice:"",idworkorder:""}]);
    };
    
    const handleRemoveClick = index => {
        const list = [...InputListItem];
        list.splice(index, 1);
        setInputListItem(list);
    };

    return (
        <Formik
        initialValues={
            {
                receivedate:InputReceiveDate,
                receivefrom:InputReceiveFrom,
                coa:SelCOA,
                bank:SelBank,
                keterangan:InputKeterangan,
                items:InputListItem
            }
        }
        validate={values => {
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

                    return(
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddPenerimaanKasBank">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addpenerimaankasbank} label={'Add Penerimaan Kas/Bank'} labeldefault={'Add Penerimaan Kas/Bank'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="receivedate">
                                {i18n.t('label_RECEIVE_DATE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DatePicker
                                    name="receivedate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeReceiveDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.receivedate}
                                    max={new Date()}
                                    // style={{width: '25%'}}
                            />
                            <div className="invalid-feedback-custom">{ErrInputReceiveDate}</div>

                            <label className="mt-3 form-label required" htmlFor="receivefrom">
                                {i18n.t('label_RECEIVE_FROM')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="receivefrom"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="receivefrom"
                                maxLength={200}
                                onChange={val => handleInputReceiveFrom(val)}
                                onBlur={handleBlur}
                                value={values.receivefrom}
                            />
                            <div className="invalid-feedback-custom">{ErrInputReceiveFrom}</div>

                            <label className="mt-3 form-label required" htmlFor="coa">
                                {i18n.t('COA')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeCoa(val)}
                                    onBlur={val => setFieldTouched("coa", val?.value ? val.value : '')}
                                    data={ListCOA}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.coa}
                                />
                                <div className="invalid-feedback-custom">{ErrSelCOA}</div>

                            <label className="mt-3 form-label required" htmlFor="bank">
                                {i18n.t('To Kas/Bank')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeBank(val)}
                                    onBlur={val => setFieldTouched("bank", val?.value ? val.value : '')}
                                    data={ListBank}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.bank}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBank}</div>

                            <label className="mt-3 form-label required" htmlFor="keterangan">
                                {i18n.t('Keterangan')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="keterangan"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="textarea"
                                id="keterangan"
                                maxLength={200}
                                onChange={val => handleInputKeterangan(val)}
                                onBlur={handleBlur}
                                value={values.keterangan}
                            />

                            </div>
                            </div>

                            <div className="invalid-feedback-custom">{ErrItems}</div>
                            <div className="invalid-feedback-custom">{ErrInputCatatan}</div>
                            <div className="invalid-feedback-custom">{ErrInputAmount}</div>
                            <div className="invalid-feedback-custom">{ErrIsDownPayment}</div>
                            {
                                InputListItem.length == 0?'':
                                <table id="tablegrid">
                                    <tr>
                                        <th>{i18n.t('COA')}</th>
                                        <th>{i18n.t('label_NOTE')}</th>
                                        <th>{i18n.t('Amount')}</th>
                                        <th>{i18n.t('DP')}</th>
                                        <th>{i18n.t('Invoice Number')}</th>
                                        <th>{i18n.t('label_WO_NUMBER')}</th>
                                        <th>{i18n.t('Action')}</th>
                                    </tr>
                                    <tbody>
                                        {
                                            InputListItem.map((x, i) => {
                                                return(
                                                    <tr>
                                                    <td>
                                                    <DropdownList
                                                        name="idcoa"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idcoa')}
                                                        data={ListCOA}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.idcoa}
                                                    />
                                                    </td>
                                                    <td>
                                                    <Input
                                                        name="catatan"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="textarea"
                                                        id="catatan"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.catatan}
                                                        disabled={false}
                                                    />
                                                    </td>
                                                    <td>
                                                    <Input
                                                        name="amount"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="amount"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.amount}
                                                        disabled={false}
                                                    />
                                                    </td>
                                                    <td>
                                                    <DropdownList
                                                        name="isdownpayment"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'isdownpayment')}
                                                        data={ListChooseYN}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.isdownpayment}
                                                    />
                                                    </td>
                                                    <td>
                                                    <DropdownList
                                                        name="idinvoice"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idinvoice')}
                                                        data={[]}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.idinvoice}
                                                    />
                                                    </td>
                                                    <td>
                                                    <DropdownList
                                                        name="idworkorder"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idworkorder')}
                                                        data={ListWO}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.idworkorder}
                                                    />
                                                    </td>
                                                    <td>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClick()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClick(i)}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>    
                                                    </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
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
                                    onClick={() => submitHandler()}
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