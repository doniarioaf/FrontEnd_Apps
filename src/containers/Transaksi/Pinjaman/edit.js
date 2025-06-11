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
import { editPinjaman_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';

export default function EditDeposit(props) {
    reloadToHomeNotAuthorize(editPinjaman_Permission, 'TRANSACTION');
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

    const [InputDepositDate, setInputDepositDate] = useState(null);
    const [ErrInputDepositDate, setErrInputDepositDate] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [ErrUploadFile, setErrUploadFile] = useState("");

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPinjamanData({ url: '/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            let listfilteroutput = data.data.vendorOpt.filter(output => output.type == 'UDANG');
            const theData = listfilteroutput.reduce((obj, el) => [
                ...obj,
                {
                    value: el.id,
                    label: el.nama+' ('+el.alias+')',
                }
            ], []);
            setListVendor(theData);
        }
        dispatch(actions.getPinjamanData({ url: '/' + id }, successHandlerDetail, errorHandler));
        // setLoading(false);
    }

    function successHandlerDetail(data, propsdata) {
        let det = data.data;

        setSelVendor(det.idvendor);
        setInputDepositDate(det.date ? new Date(det.date) : null);
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

    const succesHandlerSubmitData = (data, propsdata) => {
        let iddata = data.data;
        if(isSelected && selectedFile !== undefined && selectedFile !== null){
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            dispatch(actions.submitPinjaman({ url: '/file/'+iddata, payload: formData, type: 'ADD' }, succesHandlerSubmit, errorHandlerFile));
        }else{
            succesHandlerSubmit(data,propsdata);
        }
        
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
            obj.date = new Date(values.depositdate).getTime();
            obj.idvendor = SelVendor;
            obj.amount = new String(values.amount).replaceAll(".", "") !== '' ? new String(values.amount).replaceAll(".", "") : 0;
            dispatch(actions.submitPinjaman({ url: '/' + id, payload: obj, type: 'EDIT' }, succesHandlerSubmitData, errorHandler));
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

    const changeHandlerFIle = (event) => {
    
        setSelectedFile(event.target.files[0]);

        setIsSelected(true);

    };
    function cancelFile(){
        setSelectedFile(null);

        setIsSelected(false);
    }

    const errorHandlerFile = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops Gagal Upload File...',
            text: data.msg
        }).then((result) => {
            if (result.isConfirmed) {
                history.goBack();
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
                                <ContentHeading history={history} link={pathmenu.editpinjaman + '/' + id} label={'Edit Pinjaman'} labeldefault={'Edit Pinjaman'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">

                                        {/* deposit date di disbaled dulu, bisa bikin rancu untuk parameter perhitungan deposit, karena di takutkan admin bisa ubah2 tanggal. bisa beda dengan tanggal pembuatan */}

                                    <label className="mt-3 form-label required" htmlFor="depositdate">
                                        {i18n.t('Date')}
                                    </label>
                                    <span style={{color:'red'}}>*</span>

                                    <DatePicker
                                    name="depositdate"
                                    onChange={val => handleChangeDepositDate(val)}
                                    format={formatdate}
                                    value={values.depositdate}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputDepositDate}</div>

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

                                        <label className="mt-3 form-label required" htmlFor="netamount">
                                            {i18n.t('Upload File')}
                                        </label>
                                        <br/>
                                        {/* <div style={{backgroundColor:'#343439',width:'20%',height:'5%',position:'absolute',right:'15px' }}></div> */}
                                        <input type="file" name={"file"} 
                                        accept='.pdf, .jpg, .png, .jpeg' 
                                        onChange={changeHandlerFIle} />
                                        
                                        {isSelected && selectedFile !== undefined && selectedFile !== null ? 
                                        <div>
                                            <p>Nama File: {selectedFile.name || selectedFile.name !== undefined?selectedFile.name:''}</p>

                                            <p>Tipe File: {selectedFile.type || selectedFile.type !== undefined?selectedFile.type:''}</p>

                                            <p>Ukuran Dalam KB: {selectedFile.size || selectedFile.size !== undefined?selectedFile.size / 1024:0}</p>
                                            <Button
                                    // style={{marginLeft:"1%"}}
                                                color={'primary'}
                                                onClick={() => cancelFile()}
                                            >
                                                {'Cancel File'}
                                            </Button>
                                        </div>

                                        
                                        :<p>Silahkan Pilih File</p> }
                                        <div className="invalid-feedback-custom">{ErrUploadFile}</div>
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