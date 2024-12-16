import React, { useState, useEffect } from 'react';
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
import { numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editDeposit_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';

export default function EditDeposit(props) {
    reloadToHomeNotAuthorize(editDeposit_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputAmount, setInputAmount] = useState('');
    const [ErrInputAmount, setErrInputAmount] = useState('');

    const [InputDepositDate, setInputDepositDate] = useState(new Date());
    const [ErrInputDepositDate, setErrInputDepositDate] = useState("");

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getDepositData({ url: '/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            const theData = data.data.vendorOpt.reduce((obj, el) => [
                ...obj,
                {
                    value: el.id,
                    label: el.nama,
                }
            ], []);
            setListVendor(theData);
        }
        dispatch(actions.getDepositData({ url: '/' + id }, successHandlerDetail, errorHandler));
        // setLoading(false);
    }

    function successHandlerDetail(data, propsdata) {
        let det = data.data;

        setSelVendor(det.idvendor);
        setInputDepositDate(det.depositdate ? new Date(det.depositdate) : null);
        setInputAmount(det.amount ? det.amount : 0);

        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrSelVendor('');
        setErrInputDepositDate('');
        setErrInputAmount('');
        if (values.amount == '') {
            setErrInputAmount(i18n.t('label_REQUIRED'));
            flag = false;
        } else {
            let amount = parseFloat(new String(values.amount).replaceAll(".", ""));
            if (amount <= 0) {
                setErrInputAmount(i18n.t('Amount Harus Lebih besar dari 0'));
                flag = false;
            }
        }
        if (InputDepositDate == null) {
            setErrInputDepositDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (SelVendor == '') {
            setErrSelVendor(i18n.t('label_REQUIRED'));
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
            obj.depositdate = new Date(values.depositdate).getTime();
            obj.idvendor = SelVendor;
            obj.amount = new String(values.amount).replaceAll(".", "") !== '' ? new String(values.amount).replaceAll(".", "") : 0;
            dispatch(actions.submitDeposit({ url: '/' + id, payload: obj, type: 'EDIT' }, succesHandlerSubmit, errorHandler));
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

    const handleChangeDepositDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setInputDepositDate(datetrans)
        } else {
            setInputDepositDate(null)
        }
    }

    const handleChangeVendor = (data) => {
        let id = data?.value ? data.value : '';
        setSelVendor(id);

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
                    vendor: SelVendor,
                    depositdate: InputDepositDate,
                    amount: InputAmount,
                }
            }
            validate={values => {
                const errors = {};
                setInputAmount(values.amount);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormVendor">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.editdeposit + '/' + id} label={'Edit Deposit'} labeldefault={'Edit Deposit'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">

                                        {/* sementara deposit date di hilangkan dulu, bisa bikin rancu untuk parameter perhitungan deposit, karena di takutkan admin bisa ubah2 tanggal. bisa beda dengan tanggal pembuatan */}

                                        {/* <label className="mt-3 form-label required" htmlFor="depositdate">
                                {i18n.t('Deposit Date')}
                            </label>
                            <span style={{color:'red'}}>*</span>

                            <DatePicker
                            name="depositdate"
                            onChange={val => handleChangeDepositDate(val)}
                            format={formatdate}
                            value={values.depositdate}
                            disabled={true}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDepositDate}</div> */}

                                        <label className="mt-3 form-label required" htmlFor="vendor">
                                            {i18n.t('Vendor')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="vendor"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeVendor(val)}
                                            onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                            data={ListVendor}
                                            textField={'label'}
                                            valueField={'value'}
                                            value={values.vendor}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelVendor}</div>

                                        <label className="mt-3 form-label required" htmlFor="amount">
                                            {i18n.t('Amount')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="amount"
                                            type="text"
                                            id="amount"
                                            maxLength={150}

                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.amount !== '' ? numToMoney(parseFloat(new String(values.amount).replaceAll(".", ""))) : ''}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputAmount}</div>
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