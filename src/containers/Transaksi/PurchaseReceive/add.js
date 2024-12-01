import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Button, Input} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addPriceList_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker,DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';

export default function AddPurchaseReceive(props) {
    reloadToHomeNotAuthorize(addPriceList_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    
    const [ReceiveDate, setReceiveDate] = useState(new Date());
    const [ErrReceiveDate, setErrReceiveDate] = useState("");

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputBank, setInputBank] = useState('');
    const [ErrInputBank, setErrInputBank] = useState('');
    const [InputAccNoBank, setInputAccNoBank] = useState('');
    const [ErrInputAccNoBank, setErrInputAccNoBank] = useState('');
    const [InputAccNameBank, setInputAccNameBank] = useState('');
    const [ErrInputAccNameBank, setErrInputAccNameBank] = useState('');

    const [InputKoli, setInputKoli] = useState('');
    const [ErrInputKoli, setErrInputKoli] = useState('');

    const [InputNotes, setInputNotes] = useState('');

    const [PriceDate, setPriceDate] = useState(new Date());
    const [PriceData, setPriceData] = useState([]);
    const [ErrPriceDate, setErrPriceDate] = useState("");
    
    const [ListItemsPurchaseReceive, setListItemsPurchaseReceive] = useState([]);
    const [ListProduct, setListProduct] = useState([]);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPurchaseReceiveData({url:'/template?pricedate='+PriceDate.getTime()},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        if(data.data){
            const theData = data.data.vendorOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value':el.id,
                    'label': el.nama+' ('+el.alias+')',
                    'data':el
                }
            ], []);
            setListVendor(theData);

            const theDataProd = data.data.productOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value':el.id,
                    'label': el.nama,
                    'data':el
                }
            ], []);
            setListProduct(theDataProd);

            setPriceData(data.data.priceItems);
            setListItems(data.data.priceItems,theDataProd);
        }
        setLoading(false);
    }

    function setListItems(data,listprod){
            //{idproduct:'',idcategoryproduct:'',categoryproductname,qty:0,qtybonus:0,qtymati:0,itemsprice:0,subtotalprice:0}
            console.log('setListItems ',listprod);
            setListItemsPurchaseReceive([]);
            if(data != null && data.items){
                let idproduct = '';
                // console.log('idproduct ',listprod.get(0));
                if(listprod != null && listprod.length == 1){
                    
                    idproduct = listprod[0].value;
                    
                }
                const theData = data.items.reduce((obj, el) => [
                    ...obj,
                    {
                        'idproduct':idproduct,
                        'idcategoryproduct': el.categoryproductid,
                        'categoryproductname': el.categoryproductidName,
                        'qty':0,
                        'qtybonus':0,
                        'qtymati':0,
                        'itemsprice':el.amount?numToMoney(el.amount):0,
                        'subtotalprice':0
                    }
                ], []);
                setListItemsPurchaseReceive(theData);
            }
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrReceiveDate('');
        setErrSelVendor('');
        setErrInputKoli('');
        setErrInputBank('');
        setErrInputAccNoBank('');
        setErrInputAccNameBank('');
        setErrPriceDate('');
        if(ReceiveDate == null){
            setErrReceiveDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(PriceDate == null){
            setErrPriceDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelVendor == ''){
            setErrSelVendor(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputKoli == ''){
            setErrInputKoli(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputBank == ''){
            setErrInputBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputAccNoBank == ''){
            setErrInputAccNoBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputAccNameBank == ''){
            setErrInputAccNameBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        
        return flag;
    }

    const succesHandlerSubmit = (data,propsdata) => {
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
        if(AlreadyGeneratePrice){
            msgInfo();
        }else{
            let flag = checkColumnMandatory(values);
            if(flag){
                setLoading(true);
                let obj = new Object();

                // obj.pricedate = PriceDate.getTime();
                // let items = [];
                // if(ListCategoryProduct.length > 0){
                //     items = ListCategoryProduct.reduce((obj, el) => [
                //         ...obj,
                //         {
                //             'categoryproductid': el.categoryproductid,
                //             'amount': new String(el.price).replaceAll('.','') !== ''?new String(el.price).replaceAll('.',''):'0',
                //         }
                //     ], []);
                // }
                // obj.items = items;
                dispatch(actions.submitPriceListData({url:'',payload:obj,type:'ADD'},succesHandlerSubmit, errorHandler));
            }
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

    const errorHandler = (data,propsdata) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleChangeReceiveDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            let datetrans = moment(data, formatdate).toDate(); 
            setReceiveDate(datetrans)
        }else{
            setReceiveDate(null)
        }
    }

    const handleChangePriceDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            let datetrans = moment(data, formatdate).toDate(); 
            setPriceDate(datetrans)

            setLoading(true);
            dispatch(actions.getPurchaseReceiveData({url:'/searchpricelist?pricedate='+datetrans.getTime()},successHandlerPrice, errorHandler));
        }else{
            setPriceDate(null)
        }
    }

    function successHandlerPrice(data,propsdata){
        setPriceData(data.data);
        setListItems(data.data,ListProduct);
        setLoading(false);
    } 

    const handleInputChangePrice = (e, index) => {
        const { name, value } = e.target;
        const list = [...ListCategoryProduct];
        let valPrice = new String(value).replaceAll('.','') !== ''?new String(value).replaceAll('.',''):'0';
        list[index][name] = valPrice;
        setListCategoryProduct(list);
    }

    const handleChangeVendor = (data) =>{
        let id = data?.value ? data.value : '';
        setSelVendor(id);

        let valdata = data?.data ? data.data : '';

        setInputBank(valdata.bank);
        setInputAccNoBank(valdata.accountnobank);
        setInputAccNameBank(valdata.accountnamebank);
    }

    return (
        <Formik
        initialValues={
            {
                receivedate:ReceiveDate,
                pricedate:PriceDate,
                vendor:SelVendor,
                bank:InputBank,
                accnobank:InputAccNoBank,
                accnamabank:InputAccNameBank,
                koli:InputKoli,
                notes:InputNotes
            }
        }
        validate={values => {
            const errors = {};
            setInputBank(values.bank);
            setInputAccNoBank(values.accnobank);
            setInputAccNameBank(values.accnamabank)
            setInputKoli(values.koli);
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

                    return(
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormCustomer">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addpurchasereceive} label={'Add Purchase Receive'} labeldefault={'Add Purchase Receive'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            

                            <label className="mt-3 form-label required" htmlFor="vendor">
                                {i18n.t('Vendor')}
                            </label>
                            <span style={{color:'red'}}>*</span>

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

                            <label className="mt-3 form-label required" htmlFor="bank">
                                {i18n.t('Bank')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="bank"
                                type="text"
                                id="bank"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.bank}
                            />
                            <div className="invalid-feedback-custom">{ErrInputBank}</div>

                            <label className="mt-3 form-label required" htmlFor="accnobank">
                                {i18n.t('label_ACC_NO')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="accnobank"
                                type="text"
                                id="accnobank"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.accnobank}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAccNoBank}</div>

                            <label className="mt-3 form-label required" htmlFor="accnobank">
                                {i18n.t('label_ACC_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="accnamabank"
                                type="text"
                                id="accnamabank"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.accnamabank}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAccNameBank}</div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="receivedate">
                                {i18n.t('Receive Date')}
                            </label>
                            <span style={{color:'red'}}>*</span>

                            <DatePicker
                            name="receivedate"
                            onChange={val => handleChangeReceiveDate(val)}
                            format={formatdate}
                            value={values.receivedate}
                            />
                            <div className="invalid-feedback-custom">{ErrReceiveDate}</div>

                            <label className="mt-3 form-label required" htmlFor="pricedate">
                                {i18n.t('Price Date')}
                            </label>
                            <span style={{color:'red'}}>*</span>

                            <DatePicker
                            name="pricedate"
                            onChange={val => handleChangePriceDate(val)}
                            format={formatdate}
                            value={values.pricedate}
                            />
                            <div className="invalid-feedback-custom">{ErrPriceDate}</div>

                            <label className="mt-3 form-label required" htmlFor="koli">
                                {i18n.t('Koli')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="koli"
                                type="text"
                                id="koli"
                                maxLength={100}
                                
                                onChange={handleChange}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.koli}
                            />
                            <div className="invalid-feedback-custom">{ErrInputKoli}</div>

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

                            {/* <div hidden={AlreadyGeneratePrice} className="mt-2 col-lg-6 ft-detail mb-5">
                                {
                                    values.listCategoryProduct.length == 0?'':
                                    <div className="row justify-content-center">
                                        <table id="tablegrid">
                                        <tbody>
                                        <tr>
                                            <th style={{width:'60%',textAlign:'center'}}>{i18n.t('Category Product')}</th>
                                            <th style={{width:'40%',textAlign:'center'}}>Price</th>
                                        </tr>
                                        
                                        {
                                            values.listCategoryProduct.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td>{x.categoryproduct}</td>
                                                        <td>
                                                            
                                                            <Input
                                                                name="price"
                                                                type="text"
                                                                id="price"
                                                                onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.price !== ''?numToMoney(parseFloat(x.price)):''}
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
                            </div> */}
                            
                            </div>
                            

                            {
                                ListItemsPurchaseReceive.length == 0?'':
                                <div className="row justify-content-center">
                                    <table id="tablegrid">
                                        <tbody>
                                        <tr>
                                            <th >{i18n.t('Product')}</th>
                                            <th >{i18n.t('Category Product')}</th>
                                            <th >{i18n.t('Qty (Hidup)')}</th>
                                            <th >{i18n.t('Qty Bonus')}</th>
                                            <th >{i18n.t('Qty (Mati)')}</th>
                                            <th >{i18n.t('Price')}</th>
                                            <th >{i18n.t('Subtotal Price')}</th>
                                        </tr>
                                            {
                                                ListItemsPurchaseReceive.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td style={{width:'20%'}}>
                                                            <DropdownList
                                                                name="Product"
                                                                filter='contains'
                                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                                data={ListProduct}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                value={x.idproduct}
                                                                
                                                            />
                                                            </td>
                                                            <td><Input
                                                                name="categoryproductname"
                                                                type="text"
                                                                id="categoryproductname"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.categoryproductname}
                                                                /></td>
                                                            <td><Input
                                                                name="qty"
                                                                type="text"
                                                                id="qty"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.qty}
                                                                /></td>
                                                            <td><Input
                                                                name="qtybonus"
                                                                type="text"
                                                                id="qtybonus"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.qtybonus}
                                                                /></td>

                                                                <td><Input
                                                                name="qtymati"
                                                                type="text"
                                                                id="qtymati"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.qtymati}
                                                                /></td>

                                                                <td><Input
                                                                name="itemsprice"
                                                                type="text"
                                                                id="itemsprice"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.itemsprice}
                                                                /></td>

                                                                <td><Input
                                                                name="subtotalprice"
                                                                type="text"
                                                                id="subtotalprice"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.subtotalprice}
                                                                /></td>
                                                                
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                            {/* //{idproduct:'',idcategoryproduct:'',categoryproductname,qty:0,qtybonus:0,qtymati:0,itemsprice:0,subtotalprice:0} */}
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
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