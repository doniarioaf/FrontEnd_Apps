import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import {Input,Button} from 'reactstrap';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import * as actions                 from '../../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';
import  {numToMoney} from '../../../shared/globalFunc';

export default function AddFormProduct(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputShortName, setInputShortName] = useState('');
    const [ErrInputShortName, setErrInputShortName] = useState('');
    const [InputProductCode, setInputProductCode] = useState('');
    const [ErrInputProductCode, setErrInputProductCode] = useState('');
    const [InputBarcode1, setInputBarcode1] = useState('');
    const [ErrInputBarcode1, setErrInputBarcode1] = useState('');
    const [InputBarcode2, setInputBarcode2] = useState('');
    const [ErrInputBarcode2, setErrInputBarcode2] = useState('');
    const [InputBarcode3, setInputBarcode3] = useState('');
    const [ErrInputBarcode3, setErrInputBarcode3] = useState('');
    const [InputBarcode4, setInputBarcode4] = useState('');
    const [ErrInputBarcode4, setErrInputBarcode4] = useState('');
    const [InputPriceBuy, setInputPriceBuy] = useState('');
    const [ErrInputPriceBuy, setErrInputPriceBuy] = useState('');
    const [InputPriceSell, setInputPriceSell] = useState('');
    const [ErrInputPriceSell, setErrInputPriceSell] = useState('');
    const [InputPriceSellUOM2, setInputPriceSellUOM2] = useState('');
    const [ErrInputPriceSellUOM2, setErrInputPriceSellUOM2] = useState('');
    const [InputPriceSellUOM3, setInputPriceSellUOM3] = useState('');
    const [ErrInputPriceSellUOM3, setErrInputPriceSellUOM3] = useState('');
    const [InputPriceSellUOM4, setInputPriceSellUOM4] = useState('');
    const [ErrInputPriceSellUOM4, setErrInputPriceSellUOM4] = useState('');
    const [InputDescription, setInputDescription] = useState('');
    const [ErrInputDescription, setErrInputDescription] = useState('');
    const [InputUom1, setInputUom1] = useState('PCS');
    const [ErrInputUom1, setErrInputUom1] = useState('');
    const [InputUom2, setInputUom2] = useState('PCS');
    const [ErrInputUom2, setErrInputUom2] = useState('');
    const [InputUom3, setInputUom3] = useState('PCS');
    const [ErrInputUom3, setErrInputUom3] = useState('');
    const [InputUom4, setInputUom4] = useState('PCS');
    const [ErrInputUom4, setErrInputUom4] = useState('');
    const [InputConvertion1to4, setInputConvertion1to4] = useState('1');
    const [ErrInputConvertion1to4, setErrInputConvertion1to4] = useState('');
    const [InputConvertion2to4, setInputConvertion2to4] = useState('1');
    const [ErrInputConvertion2to4, setErrInputConvertion2to4] = useState('');
    const [InputConvertion3to4, setInputConvertion3to4] = useState('1');
    const [ErrInputConvertion3to4, setErrInputConvertion3to4] = useState('');

    const [ListProductType, setListProductType] = useState([]);
    const [SelProductType, setSelProductType] = useState('');
    const [ErrSelProductType, setErrSelProductType] = useState('');

    useEffect(() => {
        // setLoading(true);
        // dispatch(actions.getProductType('',successHandlerProductType, errorHandler));
    }, []);

    // function successHandlerProductType(data) {
    //     if(data.data){
    //         setListProductType(data.data.reduce((obj, el) => (
    //             [...obj, {
    //                 value: el.id,
    //                 label: el.nama
    //             }]
    //         ), []));
    //     }
    //     setLoading(false);
    // }

    const handleInputUom1 = (data) =>{
        let val = data.target.value;
        setInputUom1(val);
    }
    const handleInputUom2 = (data) =>{
        let val = data.target.value;
        setInputUom2(val);
    }
    const handleInputUom3 = (data) =>{
        let val = data.target.value;
        setInputUom3(val);
    }
    const handleInputUom4 = (data) =>{
        let val = data.target.value;
        setInputUom4(val);
    }
    const handleInputConvertion1to4 = (data) =>{
        let val = data.target.value;
        if(val == ''){
            setInputConvertion1to4('');
        }else if(!isNaN(val)){
            setInputConvertion1to4(val);
        }
        
    }
    const handleInputConvertion2to4 = (data) =>{
        let val = data.target.value;
        if(val == ''){
            setInputConvertion2to4('');
        }else if(!isNaN(val)){
            setInputConvertion2to4(val);
        }
    }
    const handleInputConvertion3to4 = (data) =>{
        let val = data.target.value;
        if(val == ''){
            setInputConvertion3to4('');
        }else if(!isNaN(val)){
            setInputConvertion3to4(val);
        }
    }
    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputShortName = (data) =>{
        let val = data.target.value;
        setInputShortName(val);
    }

    const handleInputPriceBuy = (data) =>{
        let val = data.target.value;
        setInputPriceBuy(val.replaceAll('.',''));
    }

    const handleInputPriceSell = (data) =>{
        let val = data.target.value;
        setInputPriceSell(val.replaceAll('.',''));
    }

    const handleInputPriceSellUom2 = (data) =>{
        let val = data.target.value;
        setInputPriceSellUOM2(val.replaceAll('.',''));
    }

    const handleInputPriceSellUom3 = (data) =>{
        let val = data.target.value;
        setInputPriceSellUOM3(val.replaceAll('.',''));
    }

    const handleInputPriceSellUom4 = (data) =>{
        let val = data.target.value;
        setInputPriceSellUOM4(val.replaceAll('.',''));
    }

    const handleInputProductCode = (data) =>{
        let val = data.target.value;
        setInputProductCode(val);
    }

    const handleInputBarcode1 = (data) =>{
        let val = data.target.value;
        setInputBarcode1(val);
    }

    const handleInputBarcode2 = (data) =>{
        let val = data.target.value;
        setInputBarcode2(val);
    }

    const handleInputBarcode3 = (data) =>{
        let val = data.target.value;
        setInputBarcode3(val);
    }

    const handleInputBarcode4 = (data) =>{
        let val = data.target.value;
        setInputBarcode4(val);
    }

    const handleInputDescription = (data) =>{
        let val = data.target.value;
        setInputDescription(val);
    }
    const handleChangeProductType = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelProductType(selValue);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputDescription('');
        setErrSelProductType('');
        setErrInputShortName('');
        setErrInputProductCode('');
        setErrInputPriceBuy('');
        setErrInputPriceSell('');
        setErrInputUom1('');
        setErrInputUom2('');
        setErrInputUom3('');
        setErrInputUom4('');
        setErrInputConvertion1to4('');
        setErrInputConvertion2to4('');
        setErrInputConvertion3to4('');
        setErrInputPriceSellUOM2('');
        setErrInputPriceSellUOM3('');
        setErrInputPriceSellUOM4('');
        setErrInputBarcode1('');
        setErrInputBarcode2('');
        setErrInputBarcode3('');
        setErrInputBarcode4('');

        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputDescription == ''){
            setErrInputDescription(i18n.t('label_REQUIRED'));
            flag = false;
        }
        // if(SelProductType == ''){
        //     setErrSelProductType(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        if(InputShortName == ''){
            setErrInputShortName(i18n.t('label_REQUIRED'));
            flag = false;
        }

        // if(InputProductCode == ''){
        //     setErrInputProductCode(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        if(InputPriceBuy == ''){
            setErrInputPriceBuy(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let temp = InputPriceBuy.replaceAll('.','');
            if(!isNaN(temp)){
                if(parseInt(temp) <= 0){
                    setErrInputPriceBuy(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        if(InputPriceSell == ''){
            setErrInputPriceSell(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let temp = InputPriceSell.replaceAll('.','');
            if(!isNaN(temp)){
                if(parseInt(temp) <= 0){
                    setErrInputPriceSell(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        if(InputPriceSellUOM2 == ''){
            setErrInputPriceSellUOM2(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let temp = InputPriceSellUOM2.replaceAll('.','');
            if(!isNaN(temp)){
                if(parseInt(temp) <= 0){
                    setErrInputPriceSellUOM2(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        if(InputPriceSellUOM3 == ''){
            setErrInputPriceSellUOM3(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let temp = InputPriceSellUOM3.replaceAll('.','');
            if(!isNaN(temp)){
                if(parseInt(temp) <= 0){
                    setErrInputPriceSellUOM3(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        if(InputPriceSellUOM4 == ''){
            setErrInputPriceSellUOM4(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let temp = InputPriceSellUOM4.replaceAll('.','');
            if(!isNaN(temp)){
                if(parseInt(temp) <= 0){
                    setErrInputPriceSellUOM4(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        if(InputUom1 == ''){
            setErrInputUom1(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputUom2 == ''){
            setErrInputUom2(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputUom3 == ''){
            setErrInputUom3(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputUom4 == ''){
            setErrInputUom4(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputConvertion1to4 == ''){
            setErrInputConvertion1to4(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(!isNaN(InputConvertion1to4)){
                if(parseInt(InputConvertion1to4) <= 0){
                    setErrInputConvertion1to4(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }
        if(InputConvertion2to4 == ''){
            setErrInputConvertion2to4(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(!isNaN(InputConvertion2to4)){
                if(parseInt(InputConvertion2to4) <= 0){
                    setErrInputConvertion2to4(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }
        if(InputConvertion3to4 == ''){
            setErrInputConvertion3to4(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(!isNaN(InputConvertion3to4)){
                if(parseInt(InputConvertion3to4) <= 0){
                    setErrInputConvertion3to4(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }
        }

        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = InputName;
            obj.description = InputDescription;
            obj.idproducttype = 0;
            obj.shortname = InputShortName;
            obj.productcode = InputProductCode;
            obj.pricebuy = InputPriceBuy.replaceAll('.','');
            obj.pricesell = InputPriceSell.replaceAll('.','');
            obj.priceselluom2 = InputPriceSellUOM2.replaceAll('.','');
            obj.priceselluom3 = InputPriceSellUOM3.replaceAll('.','');
            obj.priceselluom4 = InputPriceSellUOM4.replaceAll('.','');
            obj.uom1 = InputUom1;
            obj.uom2 = InputUom2;
            obj.uom3 = InputUom3;
            obj.uom4 = InputUom4;
            obj.conversion1to4 = InputConvertion1to4;
            obj.conversion2to4 = InputConvertion2to4;
            obj.conversion3to4 = InputConvertion3to4;
            obj.barcode1 = InputBarcode1;
            obj.barcode2 = InputBarcode2;
            obj.barcode3 = InputBarcode3;
            obj.barcode4 = InputBarcode4;
            dispatch(actions.submitAddProduct(obj,succesHandlerSubmit, errorHandler));
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

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + data
        })
      }

      return (
        <Formik
            initialValues={
                {
                    nama:InputName,
                    shortnama:InputShortName,
                    productcode:InputProductCode,
                    barcode1:InputBarcode1,
                    barcode2:InputBarcode2,
                    barcode3:InputBarcode3,
                    barcode4:InputBarcode4,
                    description:InputDescription,
                    producttype:SelProductType,
                    pricebuy:InputPriceBuy,
                    pricesell:InputPriceSell,
                    priceselluom2:InputPriceSellUOM2,
                    priceselluom3:InputPriceSellUOM3,
                    priceselluom4:InputPriceSellUOM4,
                    uom1:InputUom1,
                    uom2:InputUom2,
                    uom3:InputUom3,
                    uom4:InputUom4,
                    convertion1to4:InputConvertion1to4,
                    convertion2to4:InputConvertion2to4,
                    convertion3to4:InputConvertion3to4,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBranch">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_ADD_PRODUCT')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nama"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="shortnama">
                                {i18n.t('label_SHORT_NAME')}
                            </label>
                            <Input
                                name="shortnama"
                                // className={
                                //     touched.shortnama && errors.shortnama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="shortnama"
                                onChange={val => handleInputShortName(val)}
                                onBlur={handleBlur}
                                value={values.shortnama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputShortName}</div>

                            

                            <label className="mt-3 form-label required" htmlFor="pricebuy">
                                {i18n.t('label_PRICE_BUY')}
                            </label>
                            <Input
                                name="pricebuy"
                                // className={
                                //     touched.pricebuy && errors.pricebuy
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="pricebuy"
                                onChange={val => handleInputPriceBuy(val)}
                                onBlur={handleBlur}
                                value={values.pricebuy !== ''?numToMoney(parseFloat(values.pricebuy.replaceAll('.',''))):'' }
                            />
                            <div className="invalid-feedback-custom">{ErrInputPriceBuy}</div>

                            <label className="mt-3 form-label required" htmlFor="pricesell">
                                {i18n.t('Price UOM 1')}
                            </label>
                            <Input
                                name="pricesell"
                                // className={
                                //     touched.pricesell && errors.pricesell
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="pricesell"
                                onChange={val => handleInputPriceSell(val)}
                                onBlur={handleBlur}
                                value={values.pricesell !== ''?numToMoney(parseFloat(values.pricesell.replaceAll('.',''))):'' }
                            />
                            <div className="invalid-feedback-custom">{ErrInputPriceSell}</div>

                            <label className="mt-3 form-label required" htmlFor="priceselluom2">
                                {i18n.t('Price UOM 2')}
                            </label>
                            <Input
                                name="priceselluom2"
                                // className={
                                //     touched.pricesell && errors.pricesell
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="priceselluom2"
                                onChange={val => handleInputPriceSellUom2(val)}
                                onBlur={handleBlur}
                                value={values.priceselluom2 !== ''?numToMoney(parseFloat(values.priceselluom2.replaceAll('.',''))):'' }
                            />
                            <div className="invalid-feedback-custom">{ErrInputPriceSellUOM2}</div>

                            <label className="mt-3 form-label required" htmlFor="priceselluom3">
                                {i18n.t('Price UOM 3')}
                            </label>
                            <Input
                                name="priceselluom3"
                                // className={
                                //     touched.pricesell && errors.pricesell
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="priceselluom3"
                                onChange={val => handleInputPriceSellUom3(val)}
                                onBlur={handleBlur}
                                value={values.priceselluom3 !== ''?numToMoney(parseFloat(values.priceselluom3.replaceAll('.',''))):'' }
                            />
                            <div className="invalid-feedback-custom">{ErrInputPriceSellUOM3}</div>

                            <label className="mt-3 form-label required" htmlFor="priceselluom4">
                                {i18n.t('Price UOM 4')}
                            </label>
                            <Input
                                name="priceselluom4"
                                // className={
                                //     touched.pricesell && errors.pricesell
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="priceselluom4"
                                onChange={val => handleInputPriceSellUom4(val)}
                                onBlur={handleBlur}
                                value={values.priceselluom4 !== ''?numToMoney(parseFloat(values.priceselluom4.replaceAll('.',''))):'' }
                            />
                            <div className="invalid-feedback-custom">{ErrInputPriceSellUOM4}</div>
                            </div>
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="barcode1">
                                {i18n.t('Barcode 1')}
                            </label>
                            <Input
                                name="barcode1"
                                // className={
                                //     touched.productcode && errors.productcode
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="barcode1"
                                onChange={val => handleInputBarcode1(val)}
                                onBlur={handleBlur}
                                value={values.barcode1}
                            />
                            <div className="invalid-feedback-custom">{ErrInputBarcode1}</div>

                            <label className="mt-3 form-label required" htmlFor="barcode2">
                                {i18n.t('Barcode 2')}
                            </label>
                            <Input
                                name="barcode2"
                                // className={
                                //     touched.productcode && errors.productcode
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="barcode2"
                                onChange={val => handleInputBarcode2(val)}
                                onBlur={handleBlur}
                                value={values.barcode2}
                            />
                            <div className="invalid-feedback-custom">{ErrInputBarcode2}</div>

                            <label className="mt-3 form-label required" htmlFor="barcode3">
                                {i18n.t('Barcode 3')}
                            </label>
                            <Input
                                name="barcode3"
                                // className={
                                //     touched.productcode && errors.productcode
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="barcode3"
                                onChange={val => handleInputBarcode3(val)}
                                onBlur={handleBlur}
                                value={values.barcode3}
                            />
                            <div className="invalid-feedback-custom">{ErrInputBarcode3}</div>

                            <label className="mt-3 form-label required" htmlFor="barcode4">
                                {i18n.t('Barcode 4')}
                            </label>
                            <Input
                                name="barcode4"
                                // className={
                                //     touched.productcode && errors.productcode
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="barcode4"
                                onChange={val => handleInputBarcode4(val)}
                                onBlur={handleBlur}
                                value={values.barcode4}
                            />
                            <div className="invalid-feedback-custom">{ErrInputBarcode4}</div>

                            <label className="mt-3 form-label required" htmlFor="description">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="description"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="description"
                                onChange={val => handleInputDescription(val)}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDescription}</div>
                            
                            <div className="row mt-0">
                            <div className="mt-0 col-lg-3 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="uom1">
                                {i18n.t('UOM 1')}
                            </label>
                            <Input
                                name="uom1"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="uom1"
                                onChange={val => handleInputUom1(val)}
                                onBlur={handleBlur}
                                value={values.uom1}
                            />
                            <div className="invalid-feedback-custom">{ErrInputUom1}</div>
                            </div>

                            <div className="mt-0 col-lg-3 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="uom2">
                                {i18n.t('UOM 2')}
                            </label>
                            <Input
                                name="uom2"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="uom2"
                                onChange={val => handleInputUom2(val)}
                                onBlur={handleBlur}
                                value={values.uom2}
                            />
                            <div className="invalid-feedback-custom">{ErrInputUom2}</div>
                            </div>

                            <div className="mt-0 col-lg-3 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="uom3">
                                {i18n.t('UOM 3')}
                            </label>
                            <Input
                                name="uom3"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="uom3"
                                onChange={val => handleInputUom3(val)}
                                onBlur={handleBlur}
                                value={values.uom3}
                            />
                            <div className="invalid-feedback-custom">{ErrInputUom3}</div>
                            </div>

                            <div className="mt-0 col-lg-3 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="uom4">
                                {i18n.t('UOM 4')}
                            </label>
                            <Input
                                name="uom4"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="uom4"
                                onChange={val => handleInputUom4(val)}
                                onBlur={handleBlur}
                                value={values.uom4}
                            />
                            <div className="invalid-feedback-custom">{ErrInputUom4}</div>
                            </div>
                            </div>

                            <div style={{marginTop:'-47px'}}>
                            <div className="row mt-0" >
                            <div className="mt-0 col-lg-4 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="convertion1to4">
                                {i18n.t('label_CONVERTION1TO4')}
                            </label>
                            <Input
                                name="convertion1to4"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="convertion1to4"
                                onChange={val => handleInputConvertion1to4(val)}
                                onBlur={handleBlur}
                                value={values.convertion1to4}
                            />
                            <div className="invalid-feedback-custom">{ErrInputConvertion1to4}</div>
                            </div>

                            <div className="mt-0 col-lg-4 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="convertion2to4">
                                {i18n.t('label_CONVERTION2TO4')}
                            </label>
                            <Input
                                name="convertion2to4"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="convertion2to4"
                                onChange={val => handleInputConvertion2to4(val)}
                                onBlur={handleBlur}
                                value={values.convertion2to4}
                            />
                            <div className="invalid-feedback-custom">{ErrInputConvertion2to4}</div>
                            </div>

                            <div className="mt-0 col-lg-4 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="convertion3to4">
                                {i18n.t('label_CONVERTION3TO4')}
                            </label>
                            <Input
                                name="convertion3to4"
                                // className={
                                //     touched.description && errors.description
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="convertion3to4"
                                onChange={val => handleInputConvertion3to4(val)}
                                onBlur={handleBlur}
                                value={values.convertion3to4}
                            />
                            <div className="invalid-feedback-custom">{ErrInputConvertion3to4}</div>
                            </div>

                            </div>
                            </div>

                            </div>
                            </div>
                            
                            {/* <label className="mt-3 form-label required" htmlFor="producttype">
                                {i18n.t('label_PRODUCT_TYPE')}
                            </label>

                            <DropdownList
                                className={
                                    touched.producttype && errors.producttype
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                name="producttype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeProductType(val)}
                                onBlur={val => setFieldTouched("producttype", val?.value ? val.value : '')}
                                data={ListProductType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.producttype}
                            />
                            <div className="invalid-feedback-custom">{ErrSelProductType}</div> */}
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