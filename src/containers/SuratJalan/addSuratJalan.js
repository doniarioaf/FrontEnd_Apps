import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
// import {Input,Button,FormGroup,Label} from 'reactstrap';
import {Input,Button,Label,FormGroup,Container} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../shared/globalFunc';
import { addSuratJalan_Permission} from '../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';

import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import '../CSS/table.css';
import { formatdate } from '../shared/constantValue';

export default function MenuAdd(props) {
    reloadToHomeNotAuthorize(addSuratJalan_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputTanggal] = useState(new Date());

    const [ListWorkOrder, setListWorkOrder] = useState([]);
    const [SelWorkOrder, setSelWorkOrder] = useState('');
    const [ErrSelWorkOrder, setErrSelWorkOrder] = useState('');

    const [InputCustomerID, setInputCustomerID] = useState('');
    const [InputCustomer, setInputCustomer] = useState('');

    const [ListWarehouse, setListWarehouse] = useState([]);
    const [SelWarehouse, setSelWarehouse] = useState('');
    const [ErrSelWarehouse, setErrSelWarehouse] = useState('');

    const [InputListContactHp, setInputListContactHp] = useState([{ contacthp: ""}]);
    const [InputListContactNumber, setInputListContactNumber] = useState([{ contactnumber: ""}]);

    const [InputContactAddress, setInputContactAddress] = useState('');

    const [InputNoBL, setInputNoBL] = useState('');
    const [InputNoAju, setInputNoAju] = useState('');
    const [InputBarang, setInputBarang] = useState('');

    const [ListContainer, setListContainer] = useState([]);
    const [SelContainer, setSelContainer] = useState('');
    const [ErrSelContainer, setErrSelContainer] = useState('');

    const [InputPartai, setInputPartai] = useState('');
    const [InputKoli, setInputKoli] = useState('');
    const [InputKg, setInputKg] = useState('');

    const [InputKeterangan, setInputKeterangan] = useState('');
    const [InputCatatan, setInputCatatan] = useState('');

    const [InputIsActive, setInputIsActive] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getSuratJalanData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setListWorkOrder(data.data.woOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument+' - '+el.namaCustomer+' - '+el.namacargo,
                    dataval:el
                }]
            ), []));
        }

        setLoading(false);
    }

    const handleChangeContainer = (data) =>{
        let id = data?.value ? data.value : '';
        let dataval = data?.dataval ? data.dataval : '';
        setSelContainer(id);
        setInputPartai(dataval.partainame);
        setInputKoli(dataval.jumlahkoli);
        setInputKg(dataval.jumlahkg);
    }

    const handleChangeWorkOrder = (data) =>{
        let id = data?.value ? data.value : '';
        let dataval = data?.dataval ? data.dataval : '';
        setSelWorkOrder(id);

        setInputNoBL(dataval.nobl);
        setInputNoAju(dataval.noaju);
        setInputBarang(dataval.namacargo);


        setInputCustomerID(dataval.idcustomer);
        setInputCustomer(dataval.namaCustomer);
        setListWarehouse([]);
        setSelWarehouse('');
        setInputListContactHp([{contacthp:""}]);
        setInputListContactNumber([{contactnumber:""}]);
        setInputContactAddress('');
        setListContainer([]);
        setSelContainer('');
        setInputPartai('');
        setInputKoli('');
        setInputKg('');

        setLoading(true);
        dispatch(actions.getWorkOrderData('/listcontainer/'+id+'/0',successHandlerContainer, errorHandler));
        dispatch(actions.getCustomerManggalaData('/warehouse/'+dataval.idcustomer,successHandlerWarehouse, errorHandler));
    }
    const successHandlerContainer = (data) =>{
        if(data.data){
            setListContainer(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.nocontainer,
                    label: el.nocontainer,
                    dataval:el
                }]
            ), []));
        }
        // setLoading(false);
    }
    const successHandlerWarehouse = (data) =>{
        
        if(data.data){
            setListWarehouse(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.namagudang,
                    dataval:el
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleChangeWarehouse = (data) =>{
        let id = data?.value ? data.value : '';
        let dataval = data?.dataval ? data.dataval : '';
        setSelWarehouse(id);

        // setInputContactName(dataval.kontakgudang);
        // setInputContactTlp(dataval.hpkontakgudang);

        let listcontactnumber = [];
        if(dataval.kontakgudang){
            let cek = new String(dataval.kontakgudang).includes(',');
            if(cek){
                let arrList = new String(dataval.kontakgudang).split(',');
                for(let i=0; i < arrList.length; i++){
                    listcontactnumber.push({ contactnumber: arrList[i]});
                }
            }else{
                listcontactnumber.push({ contactnumber: dataval.kontakgudang});
            }
            if(listcontactnumber.length > 0){
                setInputListContactNumber(listcontactnumber);
            }
            
        }

        let listcontacthp = [];
        if(dataval.hpkontakgudang){
            let cek = new String(dataval.hpkontakgudang).includes(',');
            if(cek){
                let arrList = new String(dataval.hpkontakgudang).split(',');
                for(let i=0; i < arrList.length; i++){
                    listcontacthp.push({ contacthp: arrList[i]});
                }
            }else{
                listcontacthp.push({ contacthp: dataval.hpkontakgudang});
            }
            if(listcontacthp.length > 0){
                setInputListContactHp(listcontacthp);
            }
            
        }

        setInputContactAddress(dataval.alamatgudang);
        
    }

    const handleInputKeterangan = (data) =>{
        let val = data.target.value;
        setInputKeterangan(val);
    }

    const handleInputCatatan = (data) =>{
        let val = data.target.value;
        setInputCatatan(val);
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

    const checkColumnMandatory = () => {
        let flag = true;
        setErrSelWorkOrder('');
        setErrSelWarehouse('');
        setErrSelContainer('');
        if(SelWorkOrder == ''){
            setErrSelWorkOrder(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelWarehouse == ''){
            setErrSelWarehouse(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelContainer == ''){
            setErrSelContainer(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.tanggal = moment(InputTanggal).toDate().getTime();
            obj.idworkorder = SelWorkOrder;
            obj.idcustomer = InputCustomerID;
            obj.keterangan = InputKeterangan;
            obj.idwarehouse = SelWarehouse;
            obj.catatan = InputCatatan;
            obj.nocantainer = SelContainer;
            obj.isactive = InputIsActive;
            dispatch(actions.submitAddSuratJalan('',obj,succesHandlerSubmit, errorHandler));
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

    return (
        <Formik
        initialValues={
            {
                tanggal:InputTanggal,
                workorder:SelWorkOrder,
                customer:InputCustomer,
                warehouse:SelWarehouse,
                contactaddress:InputContactAddress,
                nobl:InputNoBL,
                noaju:InputNoAju,
                barang:InputBarang,
                container:SelContainer,
                partai:InputPartai,
                jumlahkoli:InputKoli,
                jumlahkg:InputKg,
                keterangan:InputKeterangan,
                catatan:InputCatatan
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormMenuAdd">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addSuratJalan} label={'Add Surat Jalan'} labeldefault={'Add Surat Jalan'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="tanggal">
                                {i18n.t('label_DATE')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <DatePicker
                                    name="tanggal"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    // onChange={val => handleTanggalLahir(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.tanggal}
                                    // style={{width: '25%'}}
                                    disabled={true}                       
                            />

                            <label className="mt-3 form-label required" htmlFor="workorder">
                                {i18n.t('Work Order')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="workorder"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeWorkOrder(val)}
                                onBlur={val => setFieldTouched("workorder", val?.value ? val.value : '')}
                                data={ListWorkOrder}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.workorder}
                            />
                            <div className="invalid-feedback-custom">{ErrSelWorkOrder}</div>

                            <label className="mt-3 form-label required" htmlFor="customer">
                                {i18n.t('label_CUSTOMER')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="customer"
                                type="text"
                                id="customer"
                                maxLength={200}
                                disabled={true}
                                value={values.customer}
                            />

                            <label className="mt-3 form-label required" htmlFor="keterangan">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="keterangan"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="keterangan"
                                onChange={val => handleInputKeterangan(val)}
                                onBlur={handleBlur}
                                value={values.keterangan}
                            />

                            <label className="mt-3 form-label required" htmlFor="warehouse">
                                {i18n.t('label_WAREHOUSE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="warehouse"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeWarehouse(val)}
                                onBlur={val => setFieldTouched("warehouse", val?.value ? val.value : '')}
                                data={ListWarehouse}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.warehouse}
                            />
                            <div className="invalid-feedback-custom">{ErrSelWarehouse}</div>

                            <label className="mt-3 form-label required" htmlFor="contactnumber">
                                {i18n.t('label_CONTACT_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%',marginTop:'-5px'}}>
                                {
                                    InputListContactNumber.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="contactnumber"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="contactnumber"
                                                // mask="(9999)999-9999"
                                                // tag={InputMask}
                                                // onChange={val => handleInputChangeContactNumber(val,i)}
                                                // onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.contactnumber}
                                                disabled={true}
                                                />
                                                </td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </table>

                            <label className="mt-3 form-label required" htmlFor="contacthp">
                                {i18n.t('Contact Hp')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%',marginTop:'-5px'}}>
                                {
                                    InputListContactHp.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="contacthp"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="contacthp"
                                                // mask="9999-9999-9999"
                                                // tag={InputMask}
                                                // onChange={val => handleInputChangeContacthp(val,i)}
                                                // onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.contacthp}
                                                disabled={true}
                                                />
                                                </td>
                                               
                                            </tr>
                                        )
                                    })
                                }
                            </table>

                            <label className="mt-3 form-label required" htmlFor="contactaddress">
                                {i18n.t('label_WAREHOUSE_ADDRESS')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="contactaddress"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="contactaddress"
                                disabled={true}
                                value={values.contactaddress}
                            />

                            <label className="mt-3 form-label required" htmlFor="catatan">
                                {i18n.t('label_NOTE')}
                            </label>
                            <Input
                                name="catatan"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="catatan"
                                onChange={val => handleInputCatatan(val)}
                                onBlur={handleBlur}
                                value={values.catatan}
                            />

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nobl">
                                {i18n.t('label_BL_NUMBER')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nobl"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nobl"
                                disabled={true}
                                value={values.nobl}
                            />

                            <label className="mt-3 form-label required" htmlFor="noaju">
                                {i18n.t('label_AJU_NUMBER')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="noaju"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="noaju"
                                disabled={true}
                                value={values.noaju}
                            />

                            <label className="mt-3 form-label required" htmlFor="barang">
                                {i18n.t('Barang')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="barang"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="barang"
                                disabled={true}
                                value={values.barang}
                            />

                            <label className="mt-3 form-label required" htmlFor="container">
                                {i18n.t('No Container')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="container"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeContainer(val)}
                                onBlur={val => setFieldTouched("container", val?.value ? val.value : '')}
                                data={ListContainer}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.container}
                            />
                            <div className="invalid-feedback-custom">{ErrSelContainer}</div>

                            <label className="mt-3 form-label required" htmlFor="partai">
                                {i18n.t('Partai')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="partai"
                                type="text"
                                id="partai"
                                maxLength={200}
                                disabled={true}
                                value={values.partai}
                            />

                            <label className="mt-3 form-label required" htmlFor="jumlahkoli">
                                {i18n.t('Jumlah Koli')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="jumlahkoli"
                                type="text"
                                id="jumlahkoli"
                                maxLength={200}
                                disabled={true}
                                value={values.jumlahkoli}
                            />

                            <label className="mt-3 form-label required" htmlFor="jumlahkg">
                                {i18n.t('Jumlah Kg')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="jumlahkg"
                                type="text"
                                id="jumlahkg"
                                maxLength={200}
                                disabled={true}
                                value={values.jumlahkg}
                            />

                            </div>

                            </div>
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