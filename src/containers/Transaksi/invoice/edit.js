import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input} from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { formatRupiah, numToMoney, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { editInvoice_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
// import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
export default function AddPackingList(props) {
    reloadToHomeNotAuthorize(editInvoice_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [ListPackingList, setListPackingList] = useState([]);
    const [SelPackingList, setSelPackingList] = useState("");
    const [ErrSelPackingList, setErrSelPackingList] = useState("");

    const [TransDate, setTransDate] = useState(null);
    const [ErrTransDate, setErrTransDate] = useState("");

    const [InputCustomer, setInputCustomer] = useState("");
    const [InputCustomerID, setInputCustomerID] = useState("");
    const [InputCustomerAddress, setInputCustomerAddress] = useState("");
    const [InputPhone, setInputPhone] = useState("");
    const [InputVendorUPI, setInputVendorUPI] = useState("");
    const [InputAttention, setInputAttention] = useState("");
    const [InputKurs, setInputKurs] = useState(1);
    const [ErrInputKurs, setErrInputKurs] = useState("");

    const [ListItems, setListItems] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceData({ url: '/'+id }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        let det = data.data;
        let packinglist = det.packinglist;
        let listItems = packinglist.items?packinglist.items:[];
        setListItems(listItems);

        let theDataProd = []
        theDataProd.push({
            'value':packinglist.id,
            'label':packinglist.nodocument,
        });
        setListPackingList(theDataProd);
        setSelPackingList(det.idpackinglist);
        setInputPhone(det.phone);
        setInputKurs(det.kurs?numToMoney(parseFloat(det.kurs)):'');
        setTransDate(det.date?new Date(det.date):null);
        setInputCustomer(packinglist.customerName+'/'+packinglist.customerAlias);
        setInputCustomerAddress(packinglist.customerAddress);
        setInputAttention(packinglist.attention);
        setInputVendorUPI(packinglist.vendorAlias?packinglist.vendorAlias:'')
        setLoading(false);
    }
    // function successHandler(data, propsdata) {
    //     let theDataProd = []
    //     if (data.data) {
    //         theDataProd = data.data.packingListOpt.reduce((obj, el) => [
    //             ...obj,
    //             {
    //                 'value': el.id,
    //                 'label': el.nodocument,
    //                 'data': el
    //             }
    //         ], []);
    //         setListPackingList(theDataProd);
    //     }
    //     setLoading(false);
    // }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        setErrSelPackingList('');
        setErrInputKurs('')

        if (TransDate == null) {
            setErrTransDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        
        if (SelPackingList == '') {
            setErrSelPackingList(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (values.kurs == '') {
            setErrInputKurs(i18n.t('label_REQUIRED'));
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
            obj.date = TransDate.getTime();
            obj.kurs = values.kurs !== ''?removeFormatRupiah(values.kurs):1;
            obj.idpackinglist = SelPackingList;
            obj.phone = values.phone;
            dispatch(actions.submitInvoice({ url: '/'+id, payload: obj, type: 'EDIT' }, succesHandlerSubmit, errorHandler));
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


    const handleChangePackingList = (data) => {
        let id = data?.value ? data.value : '';
        let val = data?.data ? data.data : [];
        setSelPackingList(id);
        setListItems([]);
        setTransDate(val.date?new Date(val.date):null);
        setInputCustomerID(val.idcustomer);
        setInputCustomer(val.customerName+'/'+val.customerALias);
        setInputCustomerAddress(val.customerAddress);
        setInputAttention(val.attention);

        setLoading(true);
        dispatch(actions.getInvoiceData({ url: '/getpackinglist/'+id }, successHandlerPackingList, errorHandler));
    }

    function successHandlerPackingList(data, propsdata) {
        let det = data.data;
        let listItems = det.items?det.items:[];
        setListItems(listItems);
        setLoading(false);
    }
    
    const handleChangeInputKurs = (val) => {
        let value = val.target.value;
        let flag = true;
        if (isNaN(value) && value !== '') {
            flag = false;
            if(new String(value).split(',').length >= 3){
                flag = false;
            }else{
                flag = true;
            }
        }
        let valPriceTemp = '';
        if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valPriceTemp = removeFormatRupiah(angka)+','+desimal;
        }else{
            valPriceTemp = removeFormatRupiah(value);
        }
        if (flag) {
            setInputKurs(formatRupiah(valPriceTemp,2));
        }
    }
    return (
        <Formik
            initialValues={
                {
                    packinglist:SelPackingList,
                    transdate: TransDate,
                    kurs: InputKurs,
                    phone: InputPhone,
                    VendorUPI:InputVendorUPI,
                    customer: InputCustomer,
                    address: InputCustomerAddress,
                    attention: InputAttention,
                }
            }
            validate={values => {
                const errors = {};
                setInputKurs(values.kurs);
                setInputPhone(values.phone);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="editinvoice">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.editinvoice+'/'+id} label={'Edit Invoice'} labeldefault={'Edit Invoice'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                    <label className="mt-3 form-label required" htmlFor="customer">
                                            {i18n.t('Packing List')}
                                        </label>
                                    <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="packinglist"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            // onChange={val => handleChangePackingList(val)}
                                            // onBlur={val => setFieldTouched("packinglist", val?.value ? val.value : '')}
                                            data={ListPackingList}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.packinglist}
                                            disabled={true}
                                        />
                                    <div className="invalid-feedback-custom">{ErrSelPackingList}</div>

                                    <label className="mt-3 form-label required" htmlFor="city">
                                        {i18n.t('Phone')}
                                    </label>
                                    <Input

                                        name="phone"
                                        type="text"
                                        id="phone"
                                        // maxLength={100}

                                        onChange={handleChange}
                                        // onChange={val => handleInputNama(val)}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        disabled={true}
                                    />

                                    <label className="mt-3 form-label required" htmlFor="VendorUPI">
                                        {i18n.t('Vendor UPI')}
                                    </label>
                                    <Input

                                        name="VendorUPI"
                                        type="text"
                                        id="VendorUPI"
                                        // maxLength={100}

                                        // onChange={handleChange}
                                        // onChange={val => handleInputNama(val)}
                                        // onBlur={handleBlur}
                                        value={values.VendorUPI}
                                        disabled={true}
                                    />

                                    <label className="mt-3 form-label required" htmlFor="kurs">
                                        {i18n.t('kurs')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>
                                    <Input

                                        name="kurs"
                                        type="text"
                                        id="kurs"
                                        // maxLength={100}

                                        // onChange={handleChange}
                                        onChange={val => handleChangeInputKurs(val)}
                                        onBlur={handleBlur}
                                        value={values.kurs }
                                        // value={values.kurs !== ''?numToMoney(parseFloat(new String(values.kurs).replaceAll('.',''))):''}
                                        // disabled={true}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputKurs}</div>

                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="transdate">
                                            {i18n.t('Tanggal')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="transdate"
                                            // onChange={val => handleChangeTransDate(val)}
                                            format={formatdate}
                                            value={values.transdate}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrTransDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="city">
                                            {i18n.t('Customer')}
                                        </label>
                                        <Input

                                            name="customer"
                                            type="text"
                                            id="customer"
                                            // maxLength={100}

                                            // onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.customer}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="city">
                                            {i18n.t('Address')}
                                        </label>
                                        <Input

                                            name="address"
                                            type="text"
                                            id="address"
                                            // maxLength={100}

                                            // onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.address}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="city">
                                            {i18n.t('Attention')}
                                        </label>
                                        <Input

                                            name="attention"
                                            type="text"
                                            id="attention"
                                            // maxLength={100}

                                            // onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.attention}
                                            disabled={true}
                                        />

                                    </div>

                                </div>

                                {
                                    <div className="row justify-content-center">
                                    <h4>{'Item'}</h4>
                                    <table id="tablegrid">
                                    <tbody>
                                        <tr>
                                        <th >{i18n.t('Box')}</th>
                                        <th >{i18n.t('Product')}</th>
                                        <th >{i18n.t('Category Product')}</th>
                                        <th >{i18n.t('Qty')}</th>
                                        <th >{i18n.t('Bruto Weight')}</th>
                                        <th >{i18n.t('Allowance')}</th>
                                        <th >{i18n.t('Netto Weight')}</th>
                                        <th >{i18n.t('Price')}</th>
                                        <th >{i18n.t('Subtotal Price')}</th>
                                        </tr>
                                        {
                                            ListItems.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td>{x.box}</td>
                                                        <td>{x.productName}</td>
                                                        <td>{x.categoryProductName +' ('+x.categoryProductSize+')'}</td>
                                                        <td>{x.qty}</td>
                                                        <td>{x.brutoweight?numToMoney(x.brutoweight):0}</td>
                                                        <td>{x.allowance?numToMoney(x.allowance):0}</td>
                                                        <td>{x.nettoweight?formatRupiah(new String(x.nettoweight).replaceAll('.',','),1):0}</td>
                                                        <td>{x.price?numToMoney(x.price):0}</td>
                                                        <td>{x.totalprice?formatRupiah(new String(x.totalprice).replaceAll('.',','),1):0}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                }

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