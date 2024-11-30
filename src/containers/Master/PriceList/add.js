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
import {DatePicker}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';

export default function AddPriceList(props) {
    reloadToHomeNotAuthorize(addPriceList_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [PriceDate, setPriceDate] = useState(new Date());
    const [ErrPriceDate, setErrPriceDate] = useState("");
    const [ListCategoryProduct, setListCategoryProduct] = useState([]);
    const [AlreadyGeneratePrice, setAlreadyGeneratePrice] = useState(true);

    // const [SelCategoryProduct, setSelCategoryProduct] = useState('');
    // const [ErrSelCategoryProduct, setErrSelCategoryProduct] = useState('');
    // const [SelCategoryProductMapping, setSelCategoryProductMapping] = useState('');
    // const [ErrSelCategoryProductMapping, setErrSelCategoryProductMapping] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPriceListData({url:'/template'},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        if(data.data){
            const theData = data.data.categoryProductOpt.reduce((obj, el) => [
                ...obj,
                {
                    'categoryproductid':el.id,
                    'categoryproduct': el.nama+' ('+el.size+')',
                    'price': 0,
                }
            ], []);
            setListCategoryProduct(theData);
        }
        dispatch(actions.getPriceListData({url:'?from='+PriceDate.getTime()+'&to='+PriceDate.getTime()},successCheckData, errorHandler));
        // setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrPriceDate('');
        // setErrSelCategoryProductMapping('');
        if(PriceDate == null){
            setErrPriceDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        // if(SelCategoryProductMapping == ''){
        //     setErrSelCategoryProductMapping(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        // if(SelCategoryProduct !== '' && SelCategoryProductMapping !== ''){
        //     if(SelCategoryProduct ==  SelCategoryProductMapping){
        //         setErrSelCategoryProductMapping(i18n.t('Product Tidak Bisa Sama'));
        //         flag = false;
        //     }
        // }
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
                obj.pricedate = PriceDate.getTime();
                let items = [];
                if(ListCategoryProduct.length > 0){
                    items = ListCategoryProduct.reduce((obj, el) => [
                        ...obj,
                        {
                            'categoryproductid': el.categoryproductid,
                            'amount': new String(el.price).replaceAll('.','') !== ''?new String(el.price).replaceAll('.',''):'0',
                        }
                    ], []);
                }
                obj.items = items;
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

    const handleChangePriceDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            let dateprice = moment(data, formatdate).toDate(); 
            setPriceDate(dateprice)
            setLoading(true);
            dispatch(actions.getPriceListData({url:'?from='+dateprice.getTime()+'&to='+dateprice.getTime()},successCheckData, errorHandler));
        }else{
            setPriceDate(null)
        }
    }

    function successCheckData(data,propsdata){
        setAlreadyGeneratePrice(false);
        if(data.data){
            if(data.data.length > 0){
                setAlreadyGeneratePrice(true);
                msgInfo();
            }
        }
        setLoading(false);
    }

    function msgInfo(){
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: "harga sudah di generate untuk tanggal ini"
        })
    }

    const handleInputChangePrice = (e, index) => {
        const { name, value } = e.target;
        const list = [...ListCategoryProduct];
        let valPrice = new String(value).replaceAll('.','') !== ''?new String(value).replaceAll('.',''):'0';
        list[index][name] = valPrice;
        setListCategoryProduct(list);
    }

    return (
        <Formik
        initialValues={
            {
                listCategoryProduct:ListCategoryProduct,
                pricedate:PriceDate
            }
        }
        validate={values => {
            const errors = {};
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
                            <ContentHeading history={history} link={pathmenu.addpricelist} label={'Add Price List'} labeldefault={'Add Price List'} />

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
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
                            </div>

                            <div hidden={AlreadyGeneratePrice} className="mt-2 col-lg-6 ft-detail mb-5">
                                {
                                    values.listCategoryProduct.length == 0?'':
                                    <div className="row justify-content-center">
                                        <table id="tablegrid">
                                        <tbody>
                                        <tr>
                                            <th style={{width:'60%',textAlign:'center'}}>{i18n.t('Category Product')}</th>
                                            <th style={{width:'40%',textAlign:'center'}}>Price</th>
                                        </tr>
                                        {/* categoryproduct */}
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
                            </div>
                            
                            </div>
                            
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