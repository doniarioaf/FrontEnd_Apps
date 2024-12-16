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
import { numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addPurchaseReceive_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DropdownList, DatePicker, DateTimePicker } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
// import { calculateTotalPrice, setPriceBoxOngkosByVendor } from './utilityPurchaseReceive';

export default function AddDraftPurchaseReceive(props) {
    reloadToHomeNotAuthorize(addPurchaseReceive_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [DraftReceiveDate, setDraftReceiveDate] = useState(new Date());
    const [ErrDraftReceiveDate, setErrDraftReceiveDate] = useState("");

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputArrivalHours, setInputArrivalHours] = useState('');
    const [InputArrivalMinute, setInputArrivalMinute] = useState('');
    const [ErrInputArrivalTime, setErrInputArrivalTime] = useState('');

    const [InputReceiveHours, setInputReceiveHours] = useState('');
    const [InputReceiveMinute, setInputReceiveMinute] = useState('');
    const [ErrInputReceiveMinute, setErrInputReceiveMinute] = useState('');

    const [InputSMU, setInputSMU] = useState('');

    const [InputGrandTotalKilo, setInputGrandTotalKilo] = useState(0);
    const [InputGrandTotalEkor, setInputGrandTotalEkor] = useState(0);

    const [ListCategory, setListCategory] = useState([{size:'A',weight:'0-50 Gram'},{size:'B',weight:'50-100 Gram'},{size:'C',weight:'100-150 Gram'}]);
    const [ListItems, setListItems] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getDraftPurchaseReceiveData({ url: '/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            const theData = data.data.vendorOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama + ' (' + el.alias + ')',
                    'data': el
                }
            ], []);
            setListVendor(theData);

        }

        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrDraftReceiveDate('');
        setErrSelVendor('');

        if (DraftReceiveDate == null) {
            setErrDraftReceiveDate(i18n.t('label_REQUIRED'));
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
            obj.date = DraftReceiveDate.getTime();
            obj.idvendor = SelVendor;
            obj.arriveltime = values.arrivalhours+':'+values.arrivalminute;
            obj.receivetime = values.receivehours+':'+values.receiveminute;
            obj.smu = values.smu;
            obj.totalekor = InputGrandTotalEkor !== ''?new String(InputGrandTotalEkor).replaceAll(".",""):0;
            obj.totalkg = InputGrandTotalKilo !== ''?new String(InputGrandTotalKilo).replaceAll(".",""):0;
        }

        // draftreceivedate: DraftReceiveDate,
        // vendor: SelVendor,
        // arrivalhours:InputArrivalHours,
        // arrivalminute:InputArrivalMinute,
        // receiveminute:InputReceiveMinute,
        // receivehours:InputReceiveHours,
        // smu:InputSMU
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

    const handleChangeDraftReceiveDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setDraftReceiveDate(datetrans)
        } else {
            setDraftReceiveDate(null)
        }
    }

    const handleChangeVendor = (data) => {
        let id = data?.value ? data.value : '';
        setSelVendor(id);
    }

    return (
        <Formik
            initialValues={
                {
                    draftreceivedate: DraftReceiveDate,
                    vendor: SelVendor,
                    arrivalhours:InputArrivalHours,
                    arrivalminute:InputArrivalMinute,
                    receiveminute:InputReceiveMinute,
                    receivehours:InputReceiveHours,
                    smu:InputSMU
                }
            }
            validate={values => {
                const errors = {};
                setInputArrivalHours(values.arrivalhours);
                setInputArrivalMinute(values.arrivalminute);
                setInputReceiveHours(values.receivehours);
                setInputReceiveMinute(values.receiveminute);
                setInputSMU(values.smu);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormDraftPurchaseReceive">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addpurchasereceive} label={'Add Draft Purchase Receive'} labeldefault={'Add Draft Purchase Receive'} />
                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
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
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.vendor}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelVendor}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Receive Date')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="draftreceivedate"
                                            onChange={val => handleChangeDraftReceiveDate(val)}
                                            format={formatdate}
                                            value={values.draftreceivedate}
                                        />
                                        <div className="invalid-feedback-custom">{ErrDraftReceiveDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Arrival Time (24 Hours)')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="arrivalhours"
                                                            type="number"
                                                            id="arrivalhours"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("arrivalhours", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 24) {
                                                                    setFieldValue("arrivalhours", value);
                                                                }
                                                            }
                                                            }
            
                                                            onBlur={handleBlur}
                                                            value={values.arrivalhours}
                                                            maxLength={2}
                                                            placeholder='Hours'
                                                        />
                                                    </td>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="arrivalminute"
                                                            type="number"
                                                            id="arrivalminute"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("arrivalminute", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 59) {
                                                                    setFieldValue("arrivalminute", value);
                                                                }
                                                            }
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.arrivalminute}
                                                            maxLength={2}
                                                            placeholder='Minute'
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Receive Time (24 Hours)')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="receivehours"
                                                            type="number"
                                                            id="receivehours"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("receivehours", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 24) {
                                                                    setFieldValue("receivehours", value);
                                                                }
                                                            }
                                                            }
            
                                                            onBlur={handleBlur}
                                                            value={values.receivehours}
                                                            // maxLength={2}
                                                            placeholder='Hours'
                                                        />
                                                    </td>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="receiveminute"
                                                            type="number"
                                                            id="receiveminute"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("receiveminute", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 59) {
                                                                    setFieldValue("receiveminute", value);
                                                                }
                                                            }
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.receiveminute}
                                                            // maxLength={2}
                                                            placeholder='Minute'
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="alias">
                                            {i18n.t('SMU')}
                                        </label>
                                        <Input
                                            name="smu"                                            
                                            type="text"
                                            id="smu"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.smu}
                                        />
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                <h4>{'Input Item'}</h4>
                                <table id="tablegrid">
                                    <tbody>
                                        <tr>
                                        <th style={{ width: '50px' }}>
                                                <IconButton
                                                style={{ color: 'white' }}
                                                // onClick={() => handleAddItemsHidup()}
                                                // hidden={values.vendor == ''}
                                            >
                                                <AddIcon style={{ fontSize: 25 }} />
                                            </IconButton>
                                        </th>
                                            {
                                                ListCategory.map((x, i) => {
                                                    return(
                                                        <th >{i18n.t(x.size)} <br></br>{x.weight} </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                </table>
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