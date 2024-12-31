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
import { editCargo_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';

export default function EditCargo(props) {
    reloadToHomeNotAuthorize(editCargo_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputDate, setInputDate] = useState(new Date());
    const [ErrInputDate, setErrInputDate] = useState("");

    const [InputInvoiceNumber, setInputInvoiceNumber] = useState('');
    const [ErrInputInvoiceNumber, setErrInputInvoiceNumber] = useState('');

    const [InputSmu, setInputSmu] = useState('');
    const [InputAwb, setInputAwb] = useState('');

    const [InputKoli, setInputKoli] = useState('');
    const [ErrInputKoli, setErrInputKoli] = useState('');

    const [InputGrossAmount, setInputGrossAmount] = useState('');
    const [ErrInputGrossAmount, setErrInputGrossAmount] = useState('');

    const [InputPPNAmount, setInputPPNAmount] = useState('');

    const [InputPPN23Amount, setInputPPN23Amount] = useState('');

    const [InputNetAmount, setInputNetAmount] = useState('');
    const [ErrInputNetAmount, setErrInputNetAmount] = useState('');

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [FileName, setFileName] = useState();

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCargoData({ url: '/template' }, successHandlerTemplate, errorHandler));
    }, []);
    function successHandlerTemplate(data, propsdata) {
        if (data.data) {
            //type
            let listfilteroutput = data.data.vendorOpt.filter(output => output.type !== 'UDANG');
            const theData = listfilteroutput.reduce((obj, el) => [
                ...obj,
                {
                    value: el.id,
                    label: el.nama,
                }
            ], []);
            setListVendor(theData);
        }
        dispatch(actions.getCargoData( {url:'/'+id},successHandler, errorHandler));
        // setLoading(false);
    }

    function successHandler(data, propsdata) {
        let det = data.data;
        setSelVendor(det.idvendor);
        setInputDate(det.date?new Date(det.date):null);
        setInputInvoiceNumber(det.invoicenumber);
        setInputSmu(det.smunumber);
        setInputAwb(det.awbnumber);
        setInputKoli(det.koli);
        setInputGrossAmount(det.grossamount?det.grossamount:0);
        setInputPPNAmount(det.ppnamount?det.ppnamount:0);
        setInputPPN23Amount(det.ppn23amount?det.ppn23amount:0);
        setInputNetAmount(det.netamount?det.netamount:0);
        setFileName(det.fileName ?det.fileName:'');

        setLoading(false);
    }


    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrSelVendor('');
        setErrInputDate('');
        setErrInputInvoiceNumber('');
        
        if (InputDate == null) {
            setErrInputDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (SelVendor == '') {
            setErrSelVendor(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (values.invoicenumber == '') {
            setErrInputInvoiceNumber(i18n.t('label_REQUIRED'));
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

    const succesHandlerSubmitData = (data, propsdata) => {
        let iddata = data.data;
        if(isSelected && selectedFile !== undefined && selectedFile !== null){
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            dispatch(actions.submitCargo({ url: '/file/'+iddata, payload: formData, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }else{
            succesHandlerSubmit(data,propsdata);
        }
        
    }

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.idvendor = SelVendor;
            obj.date = new Date(values.date).getTime();
            obj.invoicenumber = values.invoicenumber;
            obj.smunumber = values.smu;
            obj.awbnumber = values.awb;
            obj.koli = values.koli !== ''?values.koli:0;
            obj.grossamount = new String(values.grossamount).replaceAll(".", "") !== '' ? new String(values.grossamount).replaceAll(".", "") : 0;
            obj.ppnamount = new String(values.ppnamount).replaceAll(".", "") !== '' ? new String(values.ppnamount).replaceAll(".", "") : 0;
            obj.ppn23amount = new String(values.ppn23amount).replaceAll(".", "") !== '' ? new String(values.ppn23amount).replaceAll(".", "") : 0;
            obj.netamount = new String(values.netamount).replaceAll(".", "") !== '' ? new String(values.netamount).replaceAll(".", "") : 0;

            dispatch(actions.submitCargo({ url: '/'+id, payload: obj, type: 'EDIT' }, succesHandlerSubmitData, errorHandler));
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

    const handleChangeDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setInputDate(datetrans)
        } else {
            setInputDate(null)
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
                    date: InputDate,
                    invoicenumber:InputInvoiceNumber,
                    smu:InputSmu,
                    awb:InputAwb,
                    koli:InputKoli,
                    grossamount:InputGrossAmount,
                    ppnamount:InputPPNAmount,
                    ppn23amount:InputPPN23Amount,
                    netamount:InputNetAmount
                }
            }
            validate={values => {
                const errors = {};
                setInputInvoiceNumber(values.invoicenumber);
                setInputSmu(values.smu);
                setInputAwb(values.awb);
                setInputKoli(values.koli);
                setInputGrossAmount(values.grossamount);
                setInputPPNAmount(values.ppnamount);
                setInputPPN23Amount(values.ppn23amount);
                setInputNetAmount(values.netamount);
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
                                <ContentHeading history={history} link={pathmenu.editcargo+'/'+id} label={'Edit Cargo'} labeldefault={'Edit Cargo'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">

                                        
                                        <label className="mt-3 form-label required" htmlFor="date">
                                            {i18n.t('Tanggal')}
                                        </label>
                                        <span style={{color:'red'}}>*</span>

                                        <DatePicker
                                        name="date"
                                        onChange={val => handleChangeDate(val)}
                                        format={formatdate}
                                        value={values.date}
                                        // disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputDate}</div>

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
                                            {i18n.t('Invoice Number')}
                                        </label>
                                        <Input
                                            name="invoicenumber"
                                            type="text"
                                            id="invoicenumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.invoicenumber}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputInvoiceNumber}</div>

                                        <label className="mt-3 form-label required" htmlFor="smu">
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

                                        <label className="mt-3 form-label required" htmlFor="smu">
                                            {i18n.t('AWB')}
                                        </label>
                                        <Input
                                            name="awb"
                                            type="text"
                                            id="awb"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.awb}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="koli">
                                            {i18n.t('Koli')}
                                        </label>
                                        <Input
                                            name="koli"
                                            type="number"
                                            id="koli"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.koli}
                                        />
                                        </div>
                                        <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="grossamount">
                                            {i18n.t('Gross Amount')}
                                        </label>
                                        <Input
                                            name="grossamount"
                                            type="text"
                                            id="grossamount"

                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.grossamount !== '' ? numToMoney(parseFloat(new String(values.grossamount).replaceAll(".", ""))) : ''}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="ppnamount">
                                            {i18n.t('PPN Amount')}
                                        </label>
                                        <Input
                                            name="ppnamount"
                                            type="text"
                                            id="ppnamount"

                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ppnamount !== '' ? numToMoney(parseFloat(new String(values.ppnamount).replaceAll(".", ""))) : ''}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="ppn23amount">
                                            {i18n.t('PPN23 Amount')}
                                        </label>
                                        <Input
                                            name="ppn23amount"
                                            type="text"
                                            id="ppn23amount"

                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ppn23amount !== '' ? numToMoney(parseFloat(new String(values.ppn23amount).replaceAll(".", ""))) : ''}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="netamount">
                                            {i18n.t('Net Amount')}
                                        </label>
                                        <Input
                                            name="netamount"
                                            type="text"
                                            id="netamount"

                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.netamount !== '' ? numToMoney(parseFloat(new String(values.netamount).replaceAll(".", ""))) : ''}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="FileName">
                                            {i18n.t('File')}
                                        </label>
                                        <Input
                                            name="FileName"
                                            type="text"
                                            id="FileName"

                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            value={FileName}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="netamount">
                                            {i18n.t('Upload File')}
                                        </label>
                                        <br/>
                                        {/* <div style={{backgroundColor:'#343439',width:'20%',height:'5%',position:'absolute',right:'15px' }}></div> */}
                                        <input type="file" name={"file"}  onChange={changeHandlerFIle} />
                                        
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