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
import { formatRupiah, isValidNumber, numToMoney, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { editStockAdjusment_Permission } from '../../shared/permissionMenu';
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

export default function EditStockAdjusment(props) {
    reloadToHomeNotAuthorize(editStockAdjusment_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [PriceDate, setPriceDate] = useState(new Date());
    const [ErrPriceDate, setErrPriceDate] = useState("");
    const [InputPriceID, setInputPriceID] = useState("");

    const [StockDate, setStockDate] = useState(new Date());
    const [ErrStockDate, setErrStockDate] = useState("");

    const ListType = [{'value':'H','label':'Hidup'},{'value':'M','label':'Mati'}]
    const [SelType, setSelType] = useState('');
    const [ErrSelType, setErrSelType] = useState('');

    const [InputNotes, setInputNotes] = useState('');

    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState("");
    const [ListProduct, setListProduct] = useState([]);
    const [ListCategoryProduct, setListCategoryProduct] = useState([]);

    const id = props.match.params.id;

    const LisTime = [
        {'value':'00:00-02:00','label':'00:00-02:00'},
        {'value':'02:00-04:00','label':'02:00-04:00'},
        {'value':'04:00-06:00','label':'04:00-06:00'},
        {'value':'06:00-08:00','label':'06:00-08:00'},
        {'value':'08:00-10:00','label':'08:00-10:00'},
        {'value':'10:00-12:00','label':'10:00-12:00'},
        {'value':'12:00-14:00','label':'12:00-14:00'},
        {'value':'14:00-16:00','label':'14:00-16:00'},
        {'value':'16:00-18:00','label':'16:00-18:00'},
        {'value':'18:00-20:00','label':'18:00-20:00'},
        {'value':'20:00-22:00','label':'20:00-22:00'},
        {'value':'22:00-24:00','label':'22:00-24:00'},
        ];

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getStockAdjusmentData({ url: '/template' }, successHandler, errorHandler));
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

            let theDataCpProd = data.data.categoryProductOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama+' ('+el.size+')',
                    'data': el
                }
            ], []);
            setListCategoryProduct(theDataCpProd);
        }
        dispatch(actions.getStockAdjusmentData( {url:'/'+id},successHandlerDetail, errorHandler));
        // dispatch(actions.getStockAdjusmentData({ url: '/pricelist?pricedate=' + PriceDate.getTime(),propsdata:theDataProd }, successHandlerPriceList, errorHandler));
        // setLoading(false);
    }

    function successHandlerDetail(data,propsdata) {
        let det = data.data;
        setStockDate(det.date ? new Date(det.date) : null);
        setPriceDate(det.date ? new Date(det.date) : null);
        setSelType(det.type);
        setInputNotes(det.note);

        let listItems = det.items?det.items:[];
        let list = listItems.reduce((obj, el) => [
            ...obj,
            {
                'idproduct': el.idproduct,
                'idcategoryproduct': el.idcategoryproduct,
                'categoryproductname': el.categoryProductName,
                'stocktime':el.stocktime?el.stocktime:'',
                'qty': el.qty,
                'itemsprice': el.price?formatRupiah(new String(el.price).replaceAll('.',','),2):0,
                'subtotalprice': el.subtotalprice?formatRupiah(new String(el.subtotalprice).replaceAll('.',','),2):0
            }
        ], []);

        let objCalc = calculateTotal(list);
        let totalPriceItem = objCalc.totalPriceItem;
        let totalSubPriceItem = objCalc.totalSubPriceItem;
        list.push(
            {
                'idproduct': 'TOTAL',
                'idcategoryproduct': '',
                'categoryproductname': '',
                'stocktime':'',
                'qty': 0,
                'itemsprice': totalPriceItem,
                'subtotalprice': totalSubPriceItem
            }
        );

        setListItems(list);

        setLoading(false);
    }

    // function successHandlerPriceList(data, propsdata) {
    //     if(data.data){
    //         let idproduct = '';
    //         if (propsdata != null && propsdata.length == 1) {
    //             idproduct = propsdata[0].value;
    //         }
    //         setInputPriceID(data.data.id?data.data.id:'');
    //         let items = data.data.items?data.data.items:[]; 
    //         let list = items.reduce((obj, el) => [
    //             ...obj,
    //             {
    //                 'idproduct': idproduct,
    //                 'idcategoryproduct': el.categoryproductid,
    //                 'categoryproductname': el.categoryproductidName,
    //                 'qty': 0,
    //                 'itemsprice': el.amount?el.amount:0,
    //                 'subtotalprice': 0
    //             }
    //         ], []);
    //         setListItems(list);
    //     }
    //     setLoading(false);
    // }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrStockDate('');
        setErrPriceDate('');
        setErrSelType('');
        setErrItems('')

        if (ListItems.length > 0) {
            // for (let i = 0; i < ListItems.length; i++) {
            //     let det = ListItems[i];
            //     if(det.idproduct !== 'TOTAL'){
            //         if (parseInt(det.qty) <= 0) {
            //             setErrItems(i18n.t('Qty Harus diatas 0'));
            //             flag = false;
            //             break;
            //         }
            //     }
            // }
        } else {
            setErrItems(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (StockDate == null) {
            setErrStockDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (PriceDate == null) {
            setErrPriceDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (SelType == '') {
            setErrSelType(i18n.t('label_REQUIRED'));
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
            obj.date = StockDate.getTime();
            obj.pricedate = PriceDate.getTime();
            obj.note = values.notes;
            obj.type = SelType;
            obj.idpricelist = 0;
            let items = [];
            if (ListItems.length > 0) {
                let listfilteroutput = ListItems.filter(output => output.idproduct !== 'TOTAL');
                items = listfilteroutput.reduce((obj, el) => [
                    ...obj,
                    {
                        'idproduct': el.idproduct,
                        'idcategoryproduct': el.idcategoryproduct,
                        'stocktime':el.stocktime,
                        'qty': el.qty,
                        'price': el.itemsprice !== '' ? removeFormatRupiah(el.itemsprice) : '0',
                        'subtotalprice': el.subtotalprice !== '' ? removeFormatRupiah(el.subtotalprice) : '0',
                        'type': SelType
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitStockAdjusment({ url: '/'+id, payload: obj, type: 'EDIT' }, succesHandlerSubmit, errorHandler));
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
    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleChangeStockDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setStockDate(datetrans)
        } else {
            setStockDate(null)
        }
    }

    // const handleChangePriceDate = (data) => {
    //     //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
    //     setInputPriceID("");
    //     setListItems([]);
    //     if (data !== null) {
    //         let datetrans = moment(data, formatdate).toDate();
    //         setPriceDate(datetrans);
    //         setLoading(true);
    //         dispatch(actions.getStockAdjusmentData({ url: '/pricelist?pricedate=' + datetrans.getTime(),propsdata:ListProduct }, successHandlerPriceList, errorHandler));

    //     } else {
    //         setPriceDate(null)
    //     }
    // }


    const handleInputChangeItems = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        let subtotal = 0;
        if (name == 'qty' || name == 'itemsprice') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';
            flag = isValidNumber(valPriceTemp);
            // if (isNaN(valPriceTemp) && valPriceTemp !== '' ) {
            //     flag = false;
            // } 
            
            if(flag) {
                if (name == 'qty') {
                    const listTemp = [...ListItems];
                    let pricetemp = listTemp[index]['itemsprice'] !== '' ? removeFormatRupiah(listTemp[index]['itemsprice']) : '0';
                    
                    let qtyTemp = parseInt(valPriceTemp)
                    subtotal = parseInt(Math.abs(qtyTemp)) * parseFloat(pricetemp);
                } else if (name == 'itemsprice') {
                    let listTemp = [...ListItems];
                    let qtytemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    let totalQty = parseInt(qtytemp) ;

                    subtotal = parseInt(valPriceTemp) * parseFloat(Math.abs(totalQty));
                }
                //
            }

        }
        if (flag) {
            const list = [...ListItems];
            let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            list[index][name] = valPrice;
            list[index]['subtotalprice'] = formatRupiah(new String(subtotal).replaceAll('.',','),2);

            let objCalc = calculateTotal(list);
            let totalPriceItem = objCalc.totalPriceItem;
            let totalSubPriceItem = objCalc.totalSubPriceItem;
            let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
            if(indexTotal > -1){
                list[indexTotal]['itemsprice'] = totalPriceItem;
                list[indexTotal]['subtotalprice'] = totalSubPriceItem;
            };
            setListItems(list);
        }
    }

    const handleInputDropDownChange = (e, index, name) => {
        const list = [...ListItems];
        let idproduct = '';
        let idcategoryproduct = '';
        if(name == 'idproduct'){
            idproduct = e.value;    
            idcategoryproduct = list[index]['idcategoryproduct'];
        }else if(name == 'idcategoryproduct'){
            idproduct = list[index]['idproduct'];    
            idcategoryproduct = e.value;
        }
        list[index][name] = e.value;
        setListItems(list);
        if(name == 'idproduct' || name == 'idcategoryproduct'){
            setLoading(true);
            dispatch(actions.getStockAdjusmentData({ url: '/getitems/'+idproduct+'/'+idcategoryproduct,propsdata:{index:index,list:list} }, successHandlerGetItem, errorHandler));
        }
    };

    function successHandlerGetItem(data, propsdata) {
        let det = data.data;
        let price = 0;
        if(det.length > 0){
            let totalQty = 0;
            let totalSubtotalPrice = 0;
            for(let i=0; i < det.length; i++){
                let val = det[i];
                let qty = val.qty?Math.abs(val.qty):0;
                let priceitem = val.price?val.price:0;
                let subtotalPrice = parseFloat(qty) * parseFloat(priceitem);

                totalQty = totalQty + parseInt(qty);
                totalSubtotalPrice = totalSubtotalPrice + subtotalPrice;
            }

            price = totalSubtotalPrice / totalQty;
            price = formatRupiah(new String(price).replaceAll('.',','),2);
        }
        price = parseFloat(removeFormatRupiah(price));

        let index = propsdata.index;
        let list = propsdata.list;
        let qty = list[index]['qty'];
        // let price = det.price?det.price:0;
        let subprice = Math.abs(qty) * price;

        price = formatRupiah(new String(price).replaceAll('.',','),2);
        subprice = formatRupiah(new String(subprice).replaceAll('.',','),2);
        list[index]['itemsprice'] = price;
        list[index]['subtotalprice'] = subprice;
        
        let objCalc = calculateTotal(list);
        let totalPriceItem = objCalc.totalPriceItem;
        let totalSubPriceItem = objCalc.totalSubPriceItem;
        let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
        if(indexTotal > -1){
            list[indexTotal]['itemsprice'] = totalPriceItem;
            list[indexTotal]['subtotalprice'] = totalSubPriceItem;
        };
        setListItems(list);

        setLoading(false);
    }
    

    const handleAddItems = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length == 1) {
            idproduct = ListProduct[0].value;
        }
        let list = [...ListItems];
        let listAdd = [...ListItems,
            {
                'idproduct': idproduct,
                'idcategoryproduct': '',
                'categoryproductname': '',
                'stocktime':'',
                'qty': 0,
                'itemsprice': 0,
                'subtotalprice': 0
            }];

        let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
        let totalSubPriceItem = 0;
        let totalPriceItem = 0;
        if(indexTotal > -1){
            totalPriceItem = list[indexTotal]['itemsprice'];
            totalSubPriceItem = list[indexTotal]['subtotalprice'];
            listAdd.splice(indexTotal, 1);   
        };
        listAdd.push(
            {
                'idproduct': 'TOTAL',
                'idcategoryproduct': '',
                'categoryproductname': '',
                'stocktime':'',
                'qty': 0,
                'itemsprice': totalPriceItem,
                'subtotalprice': totalSubPriceItem
            }
        );
        setListItems(listAdd);
    };

    const calculateTotal = (list) => {
        let totalSubPriceItem = 0;
        let totalPriceItem = 0;
        for(let i=0; i < list.length; i++){
            let det = list[i];
            if(det.idproduct !== 'TOTAL'){
                totalSubPriceItem = totalSubPriceItem + (det.subtotalprice?parseFloat(removeFormatRupiah(det.subtotalprice)):0);
                totalPriceItem = totalPriceItem + (det.itemsprice?parseFloat(removeFormatRupiah(det.itemsprice)):0);
            }
            
        }
        totalSubPriceItem = formatRupiah(new String(totalSubPriceItem).replaceAll('.',','),2);
        totalPriceItem = formatRupiah(new String(totalPriceItem).replaceAll('.',','),2);
        return {'totalSubPriceItem':totalSubPriceItem,'totalPriceItem':totalPriceItem}
    }


    const handleRemoveItems = index => {
        const list = [...ListItems];
        list.splice(index, 1);

        let objCalc = calculateTotal(list);
        let totalPriceItem = objCalc.totalPriceItem;
        let totalSubPriceItem = objCalc.totalSubPriceItem;
        let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
        if(indexTotal > -1){
            list[indexTotal]['itemsprice'] = totalPriceItem;
            list[indexTotal]['subtotalprice'] = totalSubPriceItem;
        };
        setListItems(list);
    };

    const handleChangeType = (data) => {
        let id = data?.value ? data.value : '';
        setSelType(id);

    }

    
    return (
        <Formik
            initialValues={
                {
                    stockdate: StockDate,
                    pricedate: PriceDate,
                    type: SelType,
                    notes: InputNotes,
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
                        <form className="mb-6" onSubmit={handleSubmit} name="addstockadjusment">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.editstockadjusment+'/'+id} label={'Edit Stock Adjusment'} labeldefault={'Edit Stock Adjusment'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                    <label className="mt-3 form-label required" htmlFor="stockdate">
                                        {i18n.t('Tanggal')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>

                                    <DatePicker
                                        name="stockdate"
                                        onChange={val => handleChangeStockDate(val)}
                                        format={formatdate}
                                        value={values.stockdate}
                                        disabled={true}
                                    />
                                    <div className="invalid-feedback-custom">{ErrStockDate}</div>

                                    {/* <label className="mt-3 form-label required" htmlFor="pricedate">
                                        {i18n.t('Price Date')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>

                                    <DatePicker
                                        name="pricedate"
                                        onChange={val => handleChangePriceDate(val)}
                                        format={formatdate}
                                        value={values.pricedate}
                                    />
                                    <div className="invalid-feedback-custom">{ErrPriceDate}</div> */}

                                        <label className="mt-3 form-label required" htmlFor="vendor">
                                            {i18n.t('Type')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="type"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeType(val)}
                                            onBlur={val => setFieldTouched("type", val?.value ? val.value : '')}
                                            data={ListType}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.type}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelType}</div>

                                        <label className="mt-3 form-label required" htmlFor="notes">
                                            {i18n.t('Notes')}
                                        </label>
                                        <Input

                                            name="notes"
                                            type="text"
                                            id="notes"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.notes}
                                        />

                                    </div>

                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItems}</div>
                                {
                                    // ListItemsPurchaseReceive.length == 0?'':

                                    <div className="row justify-content-center">
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
                                                    <th >{i18n.t('Product')}</th>
                                                    <th >{i18n.t('Category Product')}</th>
                                                    <th hidden={values.type == 'H'}>{i18n.t('Time')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Price')}</th>
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
                                                                        hidden={x.idproduct == 'TOTAL'}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <DropdownList
                                                                        name="idproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idproduct')}
                                                                        data={ListProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idproduct}
                                                                        disabled={true}

                                                                        />:x.idproduct
                                                                    }
                                                                    
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                {/* <Input
                                                                    name="categoryproductname"
                                                                    type="text"
                                                                    id="categoryproductname"
                                                                    // onChange={val => handleInputChangeItems(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.categoryproductname}
                                                                    disabled={true}
                                                                /> */}
                                                                {
                                                                    x.idproduct !== 'TOTAL'?
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
                                                                    :''
                                                                }
                                                                    
                                                                </td>

                                                                <td style={{ width: '12%' }} hidden={values.type == 'H'}>
                                                                {
                                                                    x.idproduct !== 'TOTAL'?
                                                                    <DropdownList
                                                                        name="stocktime"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'stocktime')}
                                                                        data={LisTime}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.stocktime}

                                                                    />

                                                                    :''
                                                                }
                                                                    
                                                                </td>
                                                                <td>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <Input
                                                                            name="qty"
                                                                            type="text"
                                                                            id="qty"
                                                                            onChange={val => handleInputChangeItems(val, i)}
                                                                            // onBlur={handleBlur}
                                                                            value={x.qty}
                                                                            // disabled={values.draftpurchasereceive !== 'nodata'}
                                                                        />:''
                                                                    }
                                                                    </td>

                                                                <td style={{ width: '15%' }}>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <Input
                                                                        name="itemsprice"
                                                                        type="text"
                                                                        id="itemsprice"
                                                                        // onChange={val => handleInputChangeItems(val, i)}
                                                                        // onBlur={handleBlur}
                                                                        value={x.itemsprice !== '' ? x.itemsprice : ''}
                                                                        disabled={true}
                                                                    />:''
                                                                    }
                                                                    </td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotalprice"
                                                                        type="text"
                                                                        id="subtotalprice"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        // onBlur={handleBlur}
                                                                        // value={x.subtotalprice}
                                                                        value={x.subtotalprice !== '' ? x.subtotalprice : ''}
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