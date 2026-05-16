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
import { addPriceList_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker,DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';

export default function CancelPackingList(props) {
    reloadToHomeNotAuthorize(addPriceList_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [DateTrans, setDateTrans] = useState(new Date());
    const [ErrDateTrans, setErrDateTrans] = useState("");
    const [ListCategoryProduct, setListCategoryProduct] = useState([]);
    const [ListProduct, setListProduct] = useState([]);
    
    const [InputNotes, setInputNotes] = useState("");

    const [ListItems, setListItems] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPackingListData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data, propsdata) {
        let det = data.data;
        let listItems = det.items?det.items:[];
        let listDistinctItems = [];
        let listKey = [];
        for(let i=0; i < listItems.length > 0; i++){
            let detitems = listItems[i];
            let key = detitems.idproduct+"-"+detitems.idcategoryproduct;
            if(listKey.indexOf(key) == -1){
                listKey.push(key);
                let objItems = new Object();
                objItems.idproduct = detitems.idproduct;
                objItems.productName = detitems.productName;
                objItems.categoryProductName = detitems.categoryProductName;
                objItems.idcategoryproduct = detitems.idcategoryproduct;
                objItems.qty = 0;
                listDistinctItems.push(objItems);
            }
        }
        
        setListItems(listDistinctItems);
        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrDateTrans('');
        
        if (DateTrans == null) {
            setErrDateTrans(i18n.t('label_REQUIRED'));
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
                history.push(pathmenu.menupackinglist);
            }
        })
    }

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.idpackinglist = id;
            obj.datecancel = DateTrans.getTime();
            obj.keterangan = values.notes;
            let items = [];
            if (ListItems.length > 0) {
                items = ListItems.reduce((obj, el) => [
                    ...obj,
                    {
                        'idproduct':el.idproduct,
                        'idcategoryproduct': el.idcategoryproduct,
                        'qty': el.qty,
                        'box': '1',
                        'type':'M'
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitCancelPackingList({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        
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

    const handleChangeDateTrans = (data) => {
        if (data !== null) {
            let dateprice = moment(data, formatdate).toDate();
            setDateTrans(dateprice)
        } else {
            setDateTrans(null)
        }
    }

    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        
        if (flag) {
            const list = [...ListItems];
            if(name == 'qty'){
                if(!isNaN(value)){
                    list[index][name] = value;
                }
            }
            setListItems(list);
        }
    }

    const handleInputDropDownChange = (e, index, name) => {
        const list = [...ListCategoryProduct];
        list[index][name] = e.value;
        setListCategoryProduct(list);
    };

    return (
        <Formik
            initialValues={
                {
                    listCategoryProduct: ListCategoryProduct,
                    listitems: ListItems,
                    datetrans: DateTrans,
                    notes:InputNotes,
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
                                <ContentHeading history={history} link={pathmenu.cancelpackinglist+'/'+id} label={'Cancel Packing List'} labeldefault={'Cancel Packing List'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="datetrans">
                                            {i18n.t('Tanggal')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="datetrans"
                                            onChange={val => handleChangeDateTrans(val)}
                                            format={formatdate}
                                            value={values.datetrans}
                                            // max={values.datetrans}
                                        />
                                        <div className="invalid-feedback-custom">{ErrDateTrans}</div>

                                        

                                        <label className="mt-3 form-label required" htmlFor="notes">
                                            {i18n.t('Keterangan')}
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

                        
                                {
                                    values.listitems.length == 0 ? '' :
                                        <div className="row justify-content-center">
                                            <h4>{'Input Udang Mati'}</h4>
                                            <table id="tablegrid">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ width: '30%', textAlign: 'center' }}>{i18n.t('Product')}</th>
                                                        <th style={{ width: '30%', textAlign: 'center' }}>{i18n.t('Category Product')}</th>
                                                        <th style={{ width: '40%', textAlign: 'center' }}>Qty</th>
                                                    </tr>
                                                    {/* categoryproduct */}
                                                    {
                                                        values.listitems.map((x, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{x.productName}</td>
                                                                    <td>{x.categoryProductName}</td>
                                                                    <td>

                                                                        <Input
                                                                            name="qty"
                                                                            type="text"
                                                                            id="qty"
                                                                            onChange={val => handleInputChange(val, i)}
                                                                            onBlur={handleBlur}
                                                                            value={x.qty}
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