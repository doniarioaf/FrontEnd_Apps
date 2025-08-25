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
import { convertGramToKG, formatRupiah, numToMoney, pembulatanNilai, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { addPackingList_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function AddPackingList(props) {
    reloadToHomeNotAuthorize(addPackingList_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [TransDate, setTransDate] = useState(new Date());
    const [ErrTransDate, setErrTransDate] = useState("");

    const [ListCustomer, setListCustomer] = useState([]);
    const [SelCustomer, setSelCustomer] = useState("");
    const [ErrSelCustomer, setErrSelCustomer] = useState("");

    const [InputCity, setInputCity] = useState('');
    const [InputAttention, setInputAttention] = useState('');
    const [InputFlightNumber, setInputFlightNumber] = useState('');
    const [InputAwbNumber, setInputAwbNumber] = useState('');

    const [Netto, setNetto] = useState(0);
    const [Koli, setKoli] = useState(0);

    const [ListCategoryProduct, setListCategoryProduct] = useState([]);

    const [PriceList, setPriceList] = useState(null);

    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState("");
    const [ListProduct, setListProduct] = useState([]);
    // const [ListCategoryProduct, setListCategoryProduct] = useState([]);

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState("");
    const [ErrSelVendor, setErrSelVendor] = useState("");


    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPackingListData({ url: '/template' }, successHandler, errorHandler));
    }, []);

    function successHandler(data, propsdata) {
        let theDataProd = []
        if (data.data) {
            theDataProd = data.data.productOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            setListProduct(theDataProd);

            theDataProd = data.data.customerOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama+' / '+el.alias,
                    'data': el
                }
            ], []);
            setListCustomer(theDataProd);

            theDataProd = data.data.vendorOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama+' / '+el.alias,
                    'data': el
                }
            ], []);
            setListVendor(theDataProd);
        }

        // dispatch(actions.getPackingListData({ url: '/pricelist?pricedate=' + TransDate.getTime() }, successHandlerPriceList, errorHandler));
        setLoading(false);
    }

    function successHandlerPriceList(data, propsdata) {
        if(data.data){
            let items = data.data.items?data.data.items:[]; 
            
            if(items.length == 0){
                msgInfo("Tidak ada dokumen pricelist pada tanggal tersebut");
            }else{
                let theDataProd = items.reduce((obj, el) => [
                    ...obj,
                    {
                        'value': el.categoryproductid,
                        'label': el.categoryproductidName+' ('+el.categoryproductSize+') ('+el.jumlahitemsperkoli+')',
                        'data': el
                    }
                ], []);
                setListCategoryProduct(theDataProd);

                setPriceList(data.data);
            }
        }else{
            msgInfo("Tidak ada dokumen pricelist pada tanggal tersebut");
        }
        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        setErrSelCustomer('');
        setErrSelVendor('');
        setErrItems('')

        let listCatogry = [];
        let listBox = [];
        if (ListItems.length > 0) {
            for (let i = 0; i < ListItems.length; i++) {
                let det = ListItems[i];
                let keyProd = det.idproduct+'-'+det.idcategoryproduct;
                if (parseInt(det.qty) <= 0) {
                    setErrItems(i18n.t('Qty Harus diatas 0'));
                    flag = false;
                    break;
                }
                // if(listCatogry.includes(keyProd)){
                //     setErrItems(i18n.t('Product Category Tidak boleh sama'));
                //     flag = false;
                //     break;
                // }else{
                //     listCatogry.push(keyProd);
                // }
                // if(det.box == ''){
                //     setErrItems(i18n.t('Box Tidak boleh Kosong'));
                //     flag = false;
                //     break;
                // }
                // if(listBox.includes(det.box)){
                //     setErrItems(i18n.t('Box Tidak boleh sama'));
                //     flag = false;
                //     break;
                // }else{
                //     listBox.push(det.box);
                // }
            }
        } else {
            setErrItems(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (TransDate == null) {
            setErrTransDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        

        if (SelCustomer == '') {
            setErrSelCustomer(i18n.t('label_REQUIRED'));
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
            let idpricelist = PriceList !== null?PriceList.id:null;
            let obj = new Object();
            obj.date = TransDate.getTime();
            obj.idcustomer = SelCustomer;
            obj.city = values.city;
            obj.attention = values.attention;
            obj.flightnumber = values.flightnumber;
            obj.awbnumber = values.awbnumber;
            obj.netto = removeFormatRupiah(values.netto);
            obj.koli = values.koli;
            obj.idpricelist = idpricelist;
            let items = [];
            if (ListItems.length > 0) {
                items = ListItems.reduce((obj, el) => [
                    ...obj,
                    {
                        'idproduct': el.idproduct,
                        'idcategoryproduct': el.idcategoryproduct,
                        'qty': el.qty,
                        'allowance': removeFormatRupiah(el.allowance) !== '' ? removeFormatRupiah(el.allowance) : '0',
                        'brutoweight': removeFormatRupiah(el.brutoweight) !== '' ? removeFormatRupiah(el.brutoweight) : '0',
                        'nettoweight': removeFormatRupiah(el.nettoweight) !== '' ? removeFormatRupiah(el.nettoweight) : '0',
                        'price': removeFormatRupiah(el.itemsprice) !== '' ? removeFormatRupiah(el.itemsprice) : '0',
                        'totalprice': removeFormatRupiah(el.subtotalprice),
                        'box': el.box
                    }
                ], []);
            }
            obj.items = items;
            obj.idvendor = SelVendor;
            dispatch(actions.submitPackingList({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
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

    const handleChangeTransDate = (data) => {
        setPriceList(null);
        setListCategoryProduct([]);
        setListItems([]);
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setTransDate(datetrans);

            if(SelCustomer !== ''){
                setLoading(true);
                dispatch(actions.getPackingListData({ url: '/pricelist?pricedate=' + datetrans.getTime()+'&idcustomer='+SelCustomer }, successHandlerPriceList, errorHandler));
            }
            // setLoading(true);
            // dispatch(actions.getPackingListData({ url: '/pricelist?pricedate=' + datetrans.getTime() }, successHandlerPriceList, errorHandler));
        } else {
            setTransDate(null)
        }
    }

    const handleInputChangeItems = (e, index) => {
        const { name, value } = e.target;
        const list = [...ListItems];
        let flag = true;
        let subtotal = 0;
        let netto = 0 ;
        if (name == 'qty' || name == 'brutoweight') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';
            if(name == 'qty'){
                if (isNaN(valPriceTemp) && valPriceTemp !== '' ) {
                    flag = false;
                } 
            }
            
            if(name == 'brutoweight'){
                if (isNaN(value) && value !== '') {
                    flag = false;
                    if(new String(value).split(',').length >= 3){
                        flag = false;
                    }else{
                        flag = true;
                    }
                }
            }
            
            if(flag) {
                if (name == 'qty') {
                    // const listTemp = [...ListItems];
                    // let pricetemp = new String(listTemp[index]['itemsprice']) !== '' ? listTemp[index]['itemsprice'] : '0';
                    // let valTemp = '';
                    // if(new String(pricetemp).includes(',')){
                    //     let splitComma = new String(pricetemp).split(','); 
                    //     let angka = splitComma[0];
                    //     let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                    //     valTemp = removeFormatRupiah(angka)+'.'+desimal;
                    // }else{
                    //     valTemp = removeFormatRupiah(pricetemp);
                    // }
                    // let qtyTemp = parseInt(valPriceTemp);
                    // subtotal = parseInt(qtyTemp) * parseFloat(valTemp);
                    // console.log('subtotal ',subtotal);
                    // console.log('subtotal ',formatRupiah(subtotal,2));
                    // list[index]['subtotalprice'] = formatRupiah(subtotal,2);
                } else if(name == 'brutoweight'){
                    const listTemp = [...ListItems];
                    // let pricetemp = new String(listTemp[index]['itemsprice']).replaceAll('.', '') !== '' ? new String(listTemp[index]['itemsprice']).replaceAll('.', '') : '0';
                    let allowance = listTemp[index]['allowance']; //InPersen
                    let valTemp = '';
                    if(new String(allowance).includes(',')){
                        let splitComma = new String(allowance).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                        valTemp = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        valTemp = removeFormatRupiah(allowance);
                    }
                    allowance = parseFloat(valTemp) / 100.0;

                    valTemp = '';
                    if(new String(value).includes(',')){
                        let splitComma = new String(value).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                        valTemp = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        valTemp = removeFormatRupiah(value);
                    }
                    let netto = parseFloat(valTemp) - (parseFloat(valTemp) * allowance);
                    let pembulatannilai = pembulatanNilai(netto,{isdown:false,numberdesimal:1});
                    let valKg = convertGramToKG({nilaigr:pembulatannilai});
                    valKg = pembulatanNilai(valKg,{isdown:false,numberdesimal:1});

                    let pricetemp = new String(listTemp[index]['itemsprice']) !== '' ? listTemp[index]['itemsprice'] : '0';
                    let valPriceTemp = '';
                    if(new String(pricetemp).includes(',')){
                        let splitComma = new String(pricetemp).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                        valPriceTemp = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        valPriceTemp = removeFormatRupiah(pricetemp);
                    }
                    subtotal = valKg * parseFloat(valPriceTemp);
                    subtotal = pembulatanNilai(subtotal,{isdown:false,numberdesimal:1});
                    
                    list[index]['subtotalprice'] = formatRupiah(new String(subtotal).replaceAll('.',','),1);
                    list[index]['nettoweight'] = formatRupiah(new String(valKg).replaceAll('.',','),1);
                }
                //
            }

        }
        if (flag) {
            
            // let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            list[index][name] = value;
            setNetto(calculateNetto(list));
            setListItems(list);
            if(name == 'box'){
                let arrkoli = list.filter(output => output.box !== '');
                setKoli(arrkoli.length);
            }
        }
    }

    const handleInputDropDownChange = (e, index, name) => {
        const list = [...ListItems];
        let items = PriceList.items?PriceList.items:[];

        let listfilteroutput = [];
        
        if(name == 'idproduct'){
            let idcategoryproduct = list[index]['idcategoryproduct'];
            listfilteroutput = items.filter(output => output.categoryproductid == idcategoryproduct && output.idproduct == e.value);
        }else if(name == 'idcategoryproduct'){
            let idproduct = list[index]['idproduct'];
            
            listfilteroutput = items.filter(output => output.categoryproductid == e.value && output.idproduct == idproduct);
        }
        let allowance = 0;
        let amount = 0
        
        if(listfilteroutput.length > 0){
            let det = listfilteroutput[0];
            allowance = det.allowance;
            amount = det.amount;
        }
        let qty = list[index]['qty'];
        let brutoweight = list[index]['brutoweight'];
        qty = qty !== ''?qty:0;
        brutoweight = brutoweight !== ''?brutoweight:0;
        brutoweight = new String(brutoweight).replaceAll(',','.');

        let hasil = allowance / 100.0;
        let netto = parseFloat(brutoweight) + (parseFloat(brutoweight) * hasil);
        // netto = netto.toFixed(2);
        list[index]['nettoweight'] = formatRupiah(netto,2);
        let subtotal = parseFloat(qty) * parseFloat(amount);
        list[index]['subtotalprice'] = formatRupiah(subtotal,2);
        list[index]['allowance'] = formatRupiah(allowance,2);
        list[index]['itemsprice'] = formatRupiah(amount,2);
        list[index][name] = e.value;

        setNetto(calculateNetto(list));
        setListItems(list);
    };
    

    const handleAddItems = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length == 1) {
            idproduct = ListProduct[0].value;
        }
        let list = [...ListItems,
            {
                'box':'',
                'idproduct': idproduct,
                'idcategoryproduct': '',
                'categoryproductname': '',
                'qty': 0,
                'brutoweight': 0,
                'allowance': 0,
                'nettoweight': 0,
                'itemsprice': 0,
                'subtotalprice': 0
            }];
        setListItems(list);
        // setKoli(list.length);
    };

    const calculateNetto = (list) => {
        let totalnetto = 0;
        for(let i =0; i < list.length; i++){
            let det = list[i];
            let netto = det.nettoweight?det.nettoweight:0;
            let valTemp = '';
            if(new String(netto).includes(',')){
                let splitComma = new String(netto).split(','); 
                let angka = splitComma[0];
                let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                valTemp = removeFormatRupiah(angka)+'.'+desimal;
            }else{
                valTemp = removeFormatRupiah(netto);
            }
            totalnetto += parseFloat(valTemp);
        }
        return formatRupiah(new String(totalnetto).replaceAll(".",','),1);
    }

    const handleRemoveItems = index => {
        const list = [...ListItems];
        list.splice(index, 1);
        setNetto(calculateNetto(list));
        let arrkoli = list.filter(output => output.box !== '');
        setKoli(arrkoli.length);
        setListItems(list);
    };

    const handleChangeCustomer = (data) => {
        setPriceList(null);
        setListCategoryProduct([]);
        setListItems([]);
        
        let id = data?.value ? data.value : '';
        setSelCustomer(id);
        setLoading(true);
        dispatch(actions.getPackingListData({ url: '/pricelist?pricedate=' + TransDate.getTime()+'&idcustomer='+id }, successHandlerPriceList, errorHandler));
    }

    const handleChangeVendor = (data) => {
        let id = data?.value ? data.value : '';
        setSelVendor(id);
    }

    const msgInfo = (text) => {
    
        Swal.fire({
            icon: 'info',
            title: 'Information',
            text: text,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Ok`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                // history.go
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    
    return (
        <Formik
            initialValues={
                {
                    transdate: TransDate,
                    customer: SelCustomer,
                    city: InputCity,
                    attention: InputAttention,
                    flightnumber: InputFlightNumber,
                    awbnumber: InputAwbNumber,
                    netto: Netto,
                    koli: Koli,
                    vendor:SelVendor,
                }
            }
            validate={values => {
                const errors = {};
                setInputCity(values.city);
                setInputAttention(values.attention);
                setInputFlightNumber(values.flightnumber);
                setInputAwbNumber(values.awbnumber);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="addpackinglist">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addpackinglist} label={'Add Packing List'} labeldefault={'Add Packing List'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                    <label className="mt-3 form-label required" htmlFor="transdate">
                                        {i18n.t('Tanggal')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>

                                    <DatePicker
                                        name="transdate"
                                        onChange={val => handleChangeTransDate(val)}
                                        format={formatdate}
                                        value={values.transdate}
                                    />
                                    <div className="invalid-feedback-custom">{ErrTransDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="vendor">
                                            {i18n.t('Vendor UPI')}
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

                                        <label className="mt-3 form-label required" htmlFor="customer">
                                            {i18n.t('Customer')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

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



                                        {/* <label className="mt-3 form-label required" htmlFor="city">
                                            {i18n.t('City')}
                                        </label>
                                        <Input

                                            name="city"
                                            type="text"
                                            id="city"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.city}
                                        /> */}

                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        {/* <label className="mt-3 form-label required" htmlFor="attention">
                                            {i18n.t('Attention')}
                                        </label>
                                        <Input

                                            name="attention"
                                            type="text"
                                            id="attention"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.attention}
                                        /> */}

                                        <label className="mt-3 form-label required" htmlFor="flightnumber">
                                            {i18n.t('Flight Number')}
                                        </label>
                                        <Input

                                            name="flightnumber"
                                            type="text"
                                            id="flightnumber"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.flightnumber}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="awbnumber">
                                            {i18n.t('AWB Number')}
                                        </label>
                                        <Input

                                            name="awbnumber"
                                            type="text"
                                            id="awbnumber"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.awbnumber}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="netto">
                                            {i18n.t('Netto')}
                                        </label>
                                        <Input

                                            name="netto"
                                            type="text"
                                            id="netto"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.netto}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="koli">
                                            {i18n.t('Koli')}
                                        </label>
                                        <Input

                                            name="koli"
                                            type="text"
                                            id="koli"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.koli}
                                            disabled={true}
                                        />
                                    </div>

                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItems}</div>
                                {
                                    // ListItemsPurchaseReceive.length == 0?'':

                                    <div hidden={PriceList == null} className="row justify-content-center">
                                        <h4>{'Input Item'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '50px' }}>
                                                        <IconButton
                                                            style={{ color: 'white' }}
                                                            onClick={() => handleAddItems()}
                                                            // hidden={values.vendor == '' || (values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== '')}
                                                        >
                                                            <AddIcon style={{ fontSize: 25 }} />
                                                        </IconButton>
                                                    </th>
                                                    <th >{i18n.t('Box')}</th>
                                                    <th >{i18n.t('Product')}</th>
                                                    <th >{i18n.t('Category Product')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Bruto Weight(Gr)')}</th>
                                                    <th >{i18n.t('Allowance(%)')}</th>
                                                    <th >{i18n.t('Netto Weight(Kg)')}</th>
                                                    <th >{i18n.t('Price(USD)')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItems.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemoveItems(i)}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td style={{ width: '7%' }}>
                                                                    <Input
                                                                    name="box"
                                                                    type="text"
                                                                    id="box"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.box}
                                                                /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <DropdownList
                                                                        name="idproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idproduct')}
                                                                        data={ListProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idproduct}
                                                                        
                                                                    />
                                                                </td>
                                                                <td style={{ width: '18%' }}>
                                                                    <DropdownList
                                                                        name="idcategoryproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idcategoryproduct')}
                                                                        data={ListCategoryProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idcategoryproduct}

                                                                    />
                                                                </td>
                                                                <td style={{ width: '7%' }}>
                                                                    <Input
                                                                    name="qty"
                                                                    type="text"
                                                                    id="qty"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.qty}
                                                                    disabled={x.idcategoryproduct == '' || x.idproduct == ''}
                                                                /></td>

                                                                <td style={{ width: '9%' }}>
                                                                    <Input
                                                                    name="brutoweight"
                                                                    type="text"
                                                                    id="brutoweight"
                                                                    onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.brutoweight}
                                                                    disabled={x.idcategoryproduct == '' || x.idproduct == ''}
                                                                /></td>

                                                                <td style={{ width: '10%' }}>
                                                                    <Input
                                                                    name="allowance"
                                                                    type="text"
                                                                    id="allowance"
                                                                    // onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.allowance}
                                                                    disabled={true}
                                                                /></td>

                                                                <td style={{ width: '10%' }}>
                                                                    <Input
                                                                    name="nettoweight"
                                                                    type="text"
                                                                    id="nettoweight"
                                                                    // onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.nettoweight}
                                                                    disabled={true}
                                                                /></td>

                                                                <td style={{ width: '11%' }}>
                                                                    <Input
                                                                        name="itemsprice"
                                                                        type="text"
                                                                        id="itemsprice"
                                                                        onChange={val => handleInputChangeItems(val, i)}
                                                                        // onBlur={handleBlur}
                                                                        value={x.itemsprice}
                                                                        disabled={true}
                                                                    /></td>

                                                                <td style={{ width: '13%' }}>
                                                                    <Input
                                                                        name="subtotalprice"
                                                                        type="text"
                                                                        id="subtotalprice"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        // onBlur={handleBlur}
                                                                        // value={x.subtotalprice}
                                                                        value={x.subtotalprice}
                                                                        disabled={true}
                                                                    /></td>

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