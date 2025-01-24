import React, { useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Input, Button } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addCategoryProduct_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";

export default function AddCategoryProduct(props) {
    reloadToHomeNotAuthorize(addCategoryProduct_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');
    const [InputSize, setInputSize] = useState('');
    const [ErrInputSize, setErrInputSize] = useState('');
    const [InputWeight, setInputWeight] = useState('');
    const [ErrInputWeight, setErrInputWeight] = useState('');
    const [InputWeightFrom, setInputWeightFrom] = useState('');
    const [InputWeightTo, setInputWeightTo] = useState('');
    const [InputJumlahItemsPerKoli, setInputJumlahItemsPerKoli] = useState('');

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrInputNama('');
        setErrInputSize('');
        setErrInputWeight('');
        if (values.nama == '') {
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (values.size == '') {
            setErrInputSize(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (values.weight == '') {
            setErrInputWeight(i18n.t('label_REQUIRED'));
            flag = false;
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
            obj.nama = values.nama;
            obj.size = values.size;
            obj.weightfromingram = values.weightfrom !== '' ? values.weightfrom : 0;
            obj.weighttoingram = values.weightto !== '' ? values.weightto : 0;
            obj.jumlahitemsperkoli = values.jumlahitemsperkoli !== '' ? values.jumlahitemsperkoli : 0;
            dispatch(actions.submitCategoryProductData({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
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

    return (
        <Formik
            initialValues={
                {
                    nama: InputNama,
                    size: InputSize,
                    weightfrom: InputWeightFrom,
                    weightto: InputWeightTo,
                    jumlahitemsperkoli: InputJumlahItemsPerKoli,
                }
            }
            validate={values => {
                const errors = {};
                setInputNama(values.nama);
                setInputSize(values.size)
                setInputWeightFrom(values.weightfrom);
                setInputWeightTo(values.weightto);
                setInputJumlahItemsPerKoli(values.jumlahitemsperkoli);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormCustomer">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addcategoryproduct} label={'Add Category Product'} labeldefault={'Add Category Product'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">

                                        <label className="mt-3 form-label required" htmlFor="nama">
                                            {i18n.t('label_NAME')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="nama"
                                            type="text"
                                            id="nama"
                                            maxLength={150}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.nama}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputNama}</div>

                                        <label className="mt-3 form-label required" htmlFor="size">
                                            {i18n.t('Size')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="size"
                                            type="text"
                                            id="size"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.size}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputSize}</div>

                                        <label className="mt-3 form-label required" htmlFor="weightfrom">
                                            {i18n.t('Weight From')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="weightfrom"
                                            type="text"
                                            id="weightfrom"
                                            onChange={val => {
                                                let value = val.target.value;
                                                if (!isNaN(value) || value == '') {
                                                    setFieldValue("weightfrom", value);
                                                }
                                            }
                                            }
                                            onBlur={handleBlur}
                                            value={values.weightfrom}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="weightto">
                                            {i18n.t('Weight To')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="weightto"
                                            type="text"
                                            id="weightto"
                                            onChange={val => {
                                                let value = val.target.value;
                                                if (!isNaN(value) || value == '') {
                                                    setFieldValue("weightto", value);
                                                }
                                            }
                                            }
                                            onBlur={handleBlur}
                                            value={values.weightto}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="koli">
                                            {i18n.t('Jumlah Items per koli')}
                                            <span style={{ color: 'red' }}>{'*'}</span>
                                        </label>
                                        <Input
                                            name="jumlahitemsperkoli"
                                            type="text"
                                            id="jumlahitemsperkoli"
                                            onChange={val => {
                                                let value = val.target.value;
                                                if (!isNaN(value) || value == '') {
                                                    setFieldValue("jumlahitemsperkoli", value);
                                                }
                                            }
                                            }
                                            onBlur={handleBlur}
                                            value={values.jumlahitemsperkoli}
                                        />
                                        {/* <div className="invalid-feedback-custom">{ErrInputWeight}</div> */}

                                    </div>

                                </div>

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