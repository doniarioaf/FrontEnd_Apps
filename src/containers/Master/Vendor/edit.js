import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editVendor_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import momentLocalizer                 from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import Select from 'react-select';

export default function EditVendor(props) {
    reloadToHomeNotAuthorize(editVendor_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputAlias, setInputAlias] = useState('');
    const [ErrInputAlias, setErrInputAlias] = useState('');

    const [InputType, setInputType] = useState('');
    const [ErrInputType, setErrInputType] = useState('');

    const [InputPricebox, setInputPricebox] = useState('');
    const [InputPriceOngkos, setInputPriceOngkos] = useState('');

    const [InputPacking, setInputPacking] = useState('');
    const [InputKurir, setInputKurir] = useState('');
    const [InputKomisi, setInputKomisi] = useState('');
    const [InputProfit, setInputProfit] = useState('');
    const [InputValue1, setInputValue1] = useState('');

    const [InputBankName, setInputBankName] = useState('');
    const [InputNoAkunBank, setInputNoAkunBank] = useState('');
    const [InputNamaAkunBank, setInputNamaAkunBank] = useState('');

    const [SelectedVendorNotInlcueCategoryProd, setSelectedVendorNotInlcueCategoryProd] = useState([]);
    const [ListVendorNotInlcueCategoryProd, setListVendorNotInlcueCategoryProd] = useState([]);
    const [VendorNotInlcueCategoryProd, setVendorNotInlcueCategoryProd] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getVendorData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let val = data.data;
        dispatch(actions.getVendorData({url:'/template',propsdata:val},successHandlerTemplate, errorHandler));
    }

    function successHandlerTemplate(data,propsdata) {
        let val = propsdata;
        let template = data.data;

       
        setInputNama(val.nama);
        setInputAlias(val.alias);
        setInputType(val.type);
        setInputBankName(val.bank);
        setInputNoAkunBank(val.accountnobank);
        setInputNamaAkunBank(val.accountnamebank);
        setInputPriceOngkos(val.priceongkos?val.priceongkos:'0');
        setInputPricebox(val.pricebox?val.pricebox:'0');

        setInputPacking(val.packing?val.packing:'0');
        setInputKurir(val.kurir?val.kurir:'0');
        setInputKomisi(val.komisi?val.komisi:'0');
        setInputProfit(val.profit?val.profit:'0');
        setInputValue1(val.value1?val.value1:'0');

        let selectedData = [];
        let VendorNotInlcueCategoryProd = [];
        for(let i=0; i < val.items.length ; i++){
                let ven = val.items[i];
                const options = { value: ven.idcategoryproduct, label: ven.nama+' ('+ven.size+')' };
                selectedData.push(options);
                VendorNotInlcueCategoryProd.push(ven.idcategoryproduct);
        }
        // setVendorNotInlcueCategoryProd(VendorNotInlcueCategoryProd);
        // setSelectedVendorNotInlcueCategoryProd(selectedData);
        if(template.categoryProductOpt){
            const theData = template.categoryProductOpt.reduce((obj, el) => [
                ...obj,
                {
                    value:el.id,
                    label: el.nama+' ('+el.size+')',
                }
            ], []);
            setListVendorNotInlcueCategoryProd(theData);
        }

        setLoading(false);
    }
    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrInputNama('');
        setErrInputAlias('');
        setErrInputType('');
        if(values.nama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(values.alias == ''){
            setErrInputAlias(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(values.type == ''){
            setErrInputType(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const succesHandlerSubmit = (data,propsdata) => {
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
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = values.nama;
            obj.alias = values.alias;
            obj.type = values.type;
            obj.bank = values.bankname;
            obj.accountnobank = values.accnobank;
            obj.accountnamebank = values.accnamebank;
            obj.idcategoryproduct = VendorNotInlcueCategoryProd;
            obj.pricebox = new String(values.pricebox).replaceAll(".","") !== ''?new String(values.pricebox).replaceAll(".",""):0;
            obj.priceongkos = new String(values.priceongkos).replaceAll(".","") !== ''?new String(values.priceongkos).replaceAll(".",""):0;
            obj.packing = new String(values.packing).replaceAll(".","") !== ''?new String(values.packing).replaceAll(".",""):0;
            obj.kurir = new String(values.kurir).replaceAll(".","") !== ''?new String(values.kurir).replaceAll(".",""):0;
            obj.komisi = new String(values.komisi).replaceAll(".","") !== ''?new String(values.komisi).replaceAll(".",""):0;
            obj.profit = new String(values.profit).replaceAll(".","") !== ''?new String(values.profit).replaceAll(".",""):0;
            obj.value1 = new String(values.value1).replaceAll(".","") !== ''?new String(values.value1).replaceAll(".",""):0;
            dispatch(actions.submitVendorData({url:'/'+id,payload:obj,type:'EDIT'},succesHandlerSubmit, errorHandler));
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

    const handleCategoryProdChange = (data) =>{
        let temp = [];        
        if(data !== null && data.length > 0){
          for(var i=0; i < data.length ; i++){
            temp.push(data[i].value);
          }
        }
        setVendorNotInlcueCategoryProd(temp);
    }

    const errorHandler = (data,propsdata) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    function setValueOngkos(packing,kurir,komisi,profit,value1){
        let packingTemp = packing !== ''? parseFloat(new String(packing).replaceAll(".","")):0;
        let kurirTemp = kurir !== ''? parseFloat(new String(kurir).replaceAll(".","")):0;
        let komisiTemp = komisi !== ''? parseFloat(new String(komisi).replaceAll(".","")):0;
        let profitTemp = profit !== ''? parseFloat(new String(profit).replaceAll(".","")):0;
        let value1Temp = value1 !== ''? parseFloat(new String(value1).replaceAll(".","")):0;

        let ongkos = packingTemp+kurirTemp+komisiTemp+profitTemp+value1Temp;
        setInputPriceOngkos(ongkos);
        
    }
    return (
        <Formik
        initialValues={
            {
                nama:InputNama,
                alias:InputAlias,
                bankname:InputBankName,
                accnobank:InputNoAkunBank,
                accnamebank:InputNamaAkunBank,
                type:InputType,
                priceongkos:InputPriceOngkos,
                pricebox:InputPricebox,
                packing:InputPacking,
                kurir:InputKurir,
                komisi:InputKomisi,
                profit:InputProfit,
                value1:InputValue1
            }
        }
        validate={values => {
            const errors = {};
            setInputNama(values.nama);
            setInputAlias(values.alias)
            setInputBankName(values.bankname);
            setInputNoAkunBank(values.accnobank);
            setInputNamaAkunBank(values.accnamebank);
            setInputType(values.type);
            setInputPriceOngkos(values.priceongkos);
            setInputPricebox(values.pricebox);
            setInputPacking(values.packing);
            setInputKurir(values.kurir);
            setInputKomisi(values.komisi);
            setInputProfit(values.profit);
            setInputValue1(values.value1);
            setValueOngkos(values.packing,values.kurir,values.komisi,values.profit,values.value1);
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormVendor">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addVendor} label={'Add Vendor'} labeldefault={'Add Vendor'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                           
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nama"
                                maxLength={150}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNama}</div>

                            <label className="mt-3 form-label required" htmlFor="alias">
                                {i18n.t('Alias')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="alias"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="alias"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.alias}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlias}</div>

                            <label className="mt-3 form-label required" htmlFor="type">
                                {i18n.t('Type')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="type"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="type"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.type}
                            />
                            <div className="invalid-feedback-custom">{ErrInputType}</div>

                            <label className="mt-3 form-label required" htmlFor="pricebox">
                                {i18n.t('Price Box')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="pricebox"
                                type="text"
                                id="pricebox"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pricebox !== ''?numToMoney(parseFloat(new String(values.pricebox).replaceAll(".",""))):''}
                            />

                            <label className="mt-3 form-label required" htmlFor="packing">
                                {i18n.t('Packing')}
                            </label>
                            <Input
                                name="packing"
                                type="text"
                                id="packing"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.packing !== ''?numToMoney(parseFloat(new String(values.packing).replaceAll(".",""))):''}
                            />

                            <label className="mt-3 form-label required" htmlFor="kurir">
                                {i18n.t('Kurir')}
                            </label>
                            <Input
                                name="kurir"
                                type="text"
                                id="kurir"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.kurir !== ''?numToMoney(parseFloat(new String(values.kurir).replaceAll(".",""))):''}
                            />

                            <label className="mt-3 form-label required" htmlFor="komisi">
                                {i18n.t('Komisi')}
                            </label>
                            <Input
                                name="komisi"
                                type="text"
                                id="komisi"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.komisi !== ''?numToMoney(parseFloat(new String(values.komisi).replaceAll(".",""))):''}
                            />

                            
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="bankname">
                                {i18n.t('Bank')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="bankname"
                                type="text"
                                id="bankname"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bankname}
                            />

                            <label className="mt-3 form-label required" htmlFor="accnobank">
                                {i18n.t('label_ACC_NO')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="accnobank"
                                type="text"
                                id="accnobank"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accnobank}
                            />

                            <label className="mt-3 form-label required" htmlFor="accnamebank">
                                {i18n.t('label_ACC_NAME')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="accnamebank"
                                type="text"
                                id="accnamebank"
                                maxLength={100}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accnamebank}
                            />
                            <label className="mt-3 form-label required" htmlFor="role">
                                {i18n.t('Category Not Include')}
                            </label>
                            <Select
                                // defaultValue={[options[0], options[1]]}
                                defaultValue={SelectedVendorNotInlcueCategoryProd}
                                isMulti
                                name="colors"
                                options={ListVendorNotInlcueCategoryProd}
                                onChange={val => handleCategoryProdChange(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // placeholder={i18n.t('select.SELECT_OPTION')}
                            />

                            <label className="mt-3 form-label required" htmlFor="profit">
                                {i18n.t('Profit')}
                            </label>
                            <Input
                                name="profit"
                                type="text"
                                id="profit"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.profit !== ''?numToMoney(parseFloat(new String(values.profit).replaceAll(".",""))):''}
                            />

                            <label className="mt-3 form-label required" htmlFor="value1">
                                {i18n.t('Value 1')}
                            </label>
                            <Input
                                name="value1"
                                type="text"
                                id="value1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.value1 !== ''?numToMoney(parseFloat(new String(values.value1).replaceAll(".",""))):''}
                            />

                            <label className="mt-3 form-label required" htmlFor="priceongkos">
                                {i18n.t('Price Ongkos')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="priceongkos"
                                type="text"
                                id="priceongkos"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.priceongkos !== ''?numToMoney(parseFloat(new String(values.priceongkos).replaceAll(".",""))):''}
                                disabled={true}
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