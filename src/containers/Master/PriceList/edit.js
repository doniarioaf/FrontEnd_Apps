import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { formatRupiah, numToMoney, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { editPriceList_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker ,DropdownList} from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';

export default function EditPriceList(props) {
    reloadToHomeNotAuthorize(editPriceList_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [PriceDate, setPriceDate] = useState(null);
    const [PriceThruDate, setPriceThruDate] = useState(null);
    const [ErrPriceDate, setErrPriceDate] = useState("");
    const [ErrPriceThruDate, setErrPriceThruDate] = useState("");
    const [ListCategoryProduct, setListCategoryProduct] = useState([]);
    const [AlreadyGeneratePrice, setAlreadyGeneratePrice] = useState(false);

    const [ListProduct, setListProduct] = useState([]);
        
    const [InputNotes, setInputNotes] = useState("");

    const [ListCustomer, setListCustomer] = useState([]);
    const [SelCustomer, setSelCustomer] = useState('');
    const [ErrSelCustomer, setErrSelCustomer] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPriceListData({ url: '/' + id }, successHandler, errorHandler));

    }, []);

    function successHandler(data, propsdata) {
        dispatch(actions.getPriceListData({ url: '/template', propsdata: data.data }, successHandlerTemplate, errorHandler));
    }

    function successHandlerTemplate(data, propsdata) {
        let template = data.data;
        let det = propsdata;
        const theDataProduct = template.productOpt.reduce((obj, el) => [
            ...obj,
            {
                    
                'value': el.id,
                'label': el.nama,
            }
        ], []);
        setListProduct(theDataProduct);

        const theDataCust = data.data.custopt.reduce((obj, el) => [
            ...obj,
            {
                    
                'value': el.id,
                'label': el.nama,
            }
        ], []);
        setListCustomer(theDataCust);

        let theData = [];
        if (det.items && template.categoryProductOpt) {
            for (let i = 0; i < template.categoryProductOpt.length; i++) {
                let valCategoryProductOpt = template.categoryProductOpt[i];
                let listfilteroutput = det.items.filter(output => output.categoryproductid == valCategoryProductOpt.id);
                if (listfilteroutput.length > 0) {
                    let el = listfilteroutput[0];
                    //karena disiini sudah pasti bilangan angka, jadi jika ada titik dianggap desimal
                    let allowance = el.allowance?new String(el.allowance).replaceAll('.',','):'';
                    theData.push(
                        {
                            'idproduct':el.idproduct,
                            'categoryproductid': el.categoryproductid,
                            'categoryproduct': valCategoryProductOpt.nama + ' (' + valCategoryProductOpt.size + ')',
                            'price': el.amount,
                            'allowance':el.allowance?formatRupiah(allowance,1):''
                        }
                    );
                }
            }
        }
        setListCategoryProduct(theData);
        setPriceDate(det.pricedate ? new Date(det.pricedate) : null);
        setPriceThruDate(det.pricedatethru ? new Date(det.pricedatethru) : null);
        setInputNotes(det.notes);
        setSelCustomer(det.idcustomer?det.idcustomer:'');
        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrPriceDate('');
        setErrPriceThruDate('');
        setErrSelCustomer('');
        if (PriceDate == null) {
            setErrPriceDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (PriceThruDate == null) {
            setErrPriceThruDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (SelCustomer == '') {
            setErrSelCustomer(i18n.t('label_REQUIRED'));
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
            obj.pricedate = PriceDate.getTime();
            obj.pricedatethru = PriceThruDate.getTime();
            obj.notes = values.notes;
            obj.idcustomer = SelCustomer;
            let items = [];
            if (ListCategoryProduct.length > 0) {
                items = ListCategoryProduct.reduce((obj, el) => [
                    ...obj,
                    {
                        'idproduct':el.idproduct,
                        'categoryproductid': el.categoryproductid,
                        'amount': new String(el.price).replaceAll('.', '') !== '' ? new String(el.price).replaceAll('.', '') : '0',
                        // 'allowance': new String(el.allowance).replaceAll('.', '') !== '' ? new String(el.allowance).replaceAll('.', '') : '0',
                        'allowance': removeFormatRupiah(el.allowance) !== '' ? removeFormatRupiah(el.allowance) : '0',
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitPriceListData({ url: '/' + id, payload: obj, type: 'EDIT' }, succesHandlerSubmit, errorHandler));
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

    const handleChangePriceDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let dateprice = moment(data, formatdate).toDate();
            setPriceDate(dateprice)
            setLoading(true);
            dispatch(actions.getPriceListData({ url: '?from=' + dateprice.getTime() + '&to=' + dateprice.getTime() }, successCheckData, errorHandler));
        } else {
            setPriceDate(null)
        }
    }

    const handleChangeCustomer = (data) => {
        let id = data?.value ? data.value : '';
        setSelCustomer(id);
    }

    function successCheckData(data, propsdata) {
        setAlreadyGeneratePrice(false);
        if (data.data) {
            if (data.data.length > 0) {
                setAlreadyGeneratePrice(true);
                msgInfo();
            }
        }
        setLoading(false);
    }

    function msgInfo() {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "harga sudah di generate untuk tanggal ini"
        })
    }

    const handleInputChangePrice = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        if(name == 'allowance'){
            if (isNaN(value) && value !== '') {
                flag = false;
                if(new String(value).split(',').length >= 3){
                    flag = false;
                }else{
                    flag = true;
                }
            }
        }
        if (flag) {
            const list = [...ListCategoryProduct];
            if(name == 'allowance'){
            let valAllowanceTemp = '';
            if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,1):'';
            valAllowanceTemp = removeFormatRupiah(angka)+','+desimal;
            }else{
                valAllowanceTemp = removeFormatRupiah(value);
            }
                list[index][name] = formatRupiah(valAllowanceTemp,1);
            }else{
                let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';
                list[index][name] = valPrice;
            }
            setListCategoryProduct(list);
        }
    }

    return (
        <Formik
            initialValues={
                {
                    listCategoryProduct: ListCategoryProduct,
                    pricedate: PriceDate,
                    pricethrudate: PriceThruDate,
                    notes:InputNotes,
                    customer:SelCustomer
                }
            }
            validate={values => {
                const errors = {};
                setInputNotes(values.notes);
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
                                <ContentHeading history={history} link={pathmenu.editpricelist + '/' + id} label={'Edit Price List'} labeldefault={'Edit Price List'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="pricedate">
                                            {i18n.t('Dari Tanggal')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="pricedate"
                                            // onChange={val => handleChangePriceDate(val)}
                                            format={formatdate}
                                            value={values.pricedate}
                                            disabled={true}

                                        />
                                        <div className="invalid-feedback-custom">{ErrPriceDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="pricethrudate">
                                            {i18n.t('Sampai Tanggal')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="pricethrudate"
                                            // onChange={val => handleChangePriceDate(val)}
                                            format={formatdate}
                                            value={values.pricethrudate}
                                            disabled={true}

                                        />
                                        <div className="invalid-feedback-custom">{ErrPriceThruDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="customer">
                                            {i18n.t('Customer')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <DropdownList
                                            name="customer"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeCustomer(val)}
                                            onBlur={val => setFieldTouched("customer", val?.value ? val.value : '')}
                                            data={ListCustomer}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.customer}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelCustomer}</div>

                                        <label className="mt-3 form-label required" htmlFor="notes">
                                            {i18n.t('Notes')}
                                        </label>
                                        <Input

                                            name="notes"
                                            type="text"
                                            id="notes"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.notes}
                                        />
                                    </div>

                                </div>

                                <div >
                                        {
                                            values.listCategoryProduct.length == 0 ? '' :
                                                <div className="row justify-content-center">
                                                    <table id="tablegrid">
                                                        <tbody>
                                                            <tr>
                                                            <th style={{ width: '30%', textAlign: 'center' }}>{i18n.t('Product')}</th>
                                                            <th style={{ width: '30%', textAlign: 'center' }}>{i18n.t('Category Product')}</th>
                                                            <th style={{ width: '20%', textAlign: 'center' }}>Price</th>
                                                            <th style={{ width: '20%', textAlign: 'center' }}>Allowance</th>
                                                            </tr>
                                                            {/* categoryproduct */}
                                                            {
                                                                values.listCategoryProduct.map((x, i) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                            <DropdownList
                                                                                name="idproduct"
                                                                                filter='contains'
                                                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                                                // onChange={val => handleInputDropDownChange(val, i, 'idproduct')}
                                                                                data={ListProduct}
                                                                                textField={'label'}
                                                                                valueField={'value'}
                                                                                value={x.idproduct}
                                                                                disabled={true}
                                                                            
                                                                            />
                                                                            </td>
                                                                            <td>{x.categoryproduct}</td>
                                                                            <td>

                                                                                <Input
                                                                                    name="price"
                                                                                    type="text"
                                                                                    id="price"
                                                                                    onChange={val => handleInputChangePrice(val, i)}
                                                                                    onBlur={handleBlur}
                                                                                    value={x.price !== '' ? numToMoney(parseFloat(x.price)) : ''}
                                                                                />

                                                                            </td>
                                                                            <td>
                                                                                <Input
                                                                                    name="allowance"
                                                                                    type="text"
                                                                                    id="allowance"
                                                                                    onChange={val => handleInputChangePrice(val, i)}
                                                                                    onBlur={handleBlur}
                                                                                    value={x.allowance}
                                                                                    // value={x.allowance !== '' ? numToMoney(parseFloat(x.allowance)) : ''}
                                                                                />

                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                        }
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