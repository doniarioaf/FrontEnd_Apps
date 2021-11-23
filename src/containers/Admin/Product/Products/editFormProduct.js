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

export default function AddFormProduct(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputDescription, setInputDescription] = useState('');
    const [ErrInputDescription, setErrInputDescription] = useState('');

    const [ListProductType, setListProductType] = useState([]);
    const [SelProductType, setSelProductType] = useState('');
    const [ErrSelProductType, setErrSelProductType] = useState('');
    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getProductData('/'+id,successHandlerDetail, errorHandler));
        dispatch(actions.getProductType('',successHandlerProductType, errorHandler));
    }, []);
    function successHandlerDetail(data) {
        if(data.data){
            setInputName(data.data.nama);
            setInputDescription(data.data.description);
            setSelProductType(data.data.idproducttype);
        }
    }
    function successHandlerProductType(data) {
        if(data.data){
            setListProductType(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
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
        setErrSelProductType('')

        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputDescription == ''){
            setErrInputDescription(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelProductType == ''){
            setErrSelProductType(i18n.t('label_REQUIRED'));
            flag = false;
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
            obj.idproducttype = SelProductType;
            dispatch(actions.submitEditProduct(id,obj,succesHandlerSubmit, errorHandler));
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
                    description:InputDescription,
                    producttype:SelProductType
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
                            <span>{i18n.t('Add Product')}</span>
                            </div>

                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                className={
                                    touched.nama && errors.nama
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="nama"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="description">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="description"
                                className={
                                    touched.description && errors.description
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="description"
                                onChange={val => handleInputDescription(val)}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDescription}</div>

                            <label className="mt-3 form-label required" htmlFor="producttype">
                                {i18n.t('Product type')}
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
                            <div className="invalid-feedback-custom">{ErrSelProductType}</div>
                            </ContentWrapper>
                            {loading && <Loading/>}

                            <Button
                                // disabled={props.activeStep === 0}
                                    style={{marginLeft:"20%"}}
                                    onClick={() => history.goBack()}
                                >
                                {/* {i18n.t('common.BACK')} */}
                                {'Cancel'}
                                </Button>

                                <Button
                                    style={{marginLeft:"1%"}}
                                    onClick={() => submitHandler()}
                                >
                                {'Submit'}
                                </Button>
                        </form>

                    )

                }
            }

        </Formik>

      )
}