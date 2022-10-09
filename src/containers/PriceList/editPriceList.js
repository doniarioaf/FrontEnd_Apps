import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {DropdownList}      from 'react-widgets';
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,numToMoney } from '../shared/globalFunc';
import { editPriceList_Permission } from '../shared/permissionMenu';
import * as pathmenu           from '../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

import Paper                        from '@material-ui/core/Paper';
import Tabs            from '@material-ui/core/Tabs';
import Tab             from '@material-ui/core/Tab';
import TabPanel        from '../../components/Common/TabPanel';
import SwipeableViews  from 'react-swipeable-views';

import IndexjalurHijau                        from './indexjalurHijau';
import IndexjalurMerah                        from './indexjalurMerah';

export default function AddFormIndex(props) {
    reloadToHomeNotAuthorize(editPriceList_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [tabValue, setTabValue] = useState(0);

    const [ListInvoiceType, setListInvoiceType] = useState([]);
    const [ListWarehouse, setListWarehouse] = useState([]);
    const [ListIsMandatory, setListIsMandatory] = useState([]);

    const [ListCustomer, setListCustomer] = useState([]);
    const [SelCustomer, setSelCustomer] = useState('');
    const [ErrSelCustomer, setErrSelCustomer] = useState('');

    // const [InputListMerah, setInputListMerah] = useState([{"idwarehouse":"","idinvoicetype":"", "price":0.0 ,"ismandatory":"","jalur":"MERAH"}]);
    // const [InputListHijau, setInputListHijau] = useState([{"idwarehouse":"","idinvoicetype":"", "price":0.0 ,"ismandatory":"","jalur":"HIJAU"}]);
    const [InputListHijau, setInputListHijau] = useState([]);
    const [ErrInputListHijau, setErrInputListHijau] = useState('');
    const [InputListMerah, setInputListMerah] = useState([]);
    const [ErrInputListMerah, setErrInputListMerah] = useState('');

    const [InputIsActive, setInputIsActive] = useState(true);
    const [InputNoDoc, setInputNoDoc] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPriceListData('/template/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            let det = data.data;
            let template = det.template;

            setInputNoDoc(det.nodocument);
            setSelCustomer(det.idcustomer);

            setListCustomer(template.customerOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.customername
                }]
            ), []));

            setListInvoiceType(template.biayaJasaOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            let listmandatory = [{value:'Y',label:'Yes'},{value:'N',label:'No'}];
            setListIsMandatory(listmandatory);

            let details = det.details;
            let listfilterhijau = details.filter(output => output.jalur == 'HIJAU');
            let listhijau = [];
            if(listfilterhijau.length > 0){
                for(let i =0; i < listfilterhijau.length; i++){
                    let detlist = listfilterhijau[i];
                    
                    listhijau.push({"idwarehouse":detlist.idwarehouse,"idinvoicetype":detlist.idinvoicetype, "price":numToMoney(parseFloat(detlist.price)) ,"ismandatory":detlist.ismandatory,"jalur":"HIJAU"});
                }
            }
            setInputListHijau(listhijau);

            let listfiltermerah = details.filter(output => output.jalur == 'MERAH');
            let listmerah = [];
            if(listfiltermerah.length > 0){
                for(let i =0; i < listfiltermerah.length; i++){
                    let detlist = listfiltermerah[i];
                    listmerah.push({"idwarehouse":detlist.idwarehouse,"idinvoicetype":detlist.idinvoicetype, "price":numToMoney(parseFloat(detlist.price)) ,"ismandatory":detlist.ismandatory,"jalur":"MERAH"});
                }
            }
            setInputListMerah(listmerah);
            
            dispatch(actions.getCustomerManggalaData('/warehouse/'+det.idcustomer,successHandlerCustomer, errorHandler));
        }else{
            setLoading(false);
        }

        // setLoading(false);
    }

    const handleChangeCustomer = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCustomer(id);
        setInputListHijau([]);
        setInputListMerah([]);
        setLoading(true);
        dispatch(actions.getCustomerManggalaData('/warehouse/'+id,successHandlerCustomer, errorHandler));
    }
    function successHandlerCustomer(data) {
        setListWarehouse(data.data.reduce((obj, el) => (
            [...obj, {
                value: el.id,
                label: el.namagudang
            }]
        ), []));
        setLoading(false);
    }
    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    function handleChangeTabIndex(index) {
        setTabValue(index);
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }
    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrSelCustomer('');
        setErrInputListHijau('');
        setErrInputListMerah('');
        if(SelCustomer == ''){
            setErrSelCustomer(i18n.t('label_REQUIRED'));
            flag = false;
        }
        let msgErrorHijau = '';
        let msgErrorMerah = '';
        for(let i=0; i < ListWarehouse.length ; i++){
            let det = ListWarehouse[i];
            let id = det.value;
            let name = det.label;

            let listfilterhijau = InputListHijau.filter(output => output.idwarehouse == id);
            if(listfilterhijau.length == 0){
                msgErrorHijau = 'Ada Gudang yang belum di set pada jalur hijau';
            }
            let listfilterMerah = InputListMerah.filter(output => output.idwarehouse == id);
            if(listfilterMerah.length == 0){
                msgErrorMerah = 'Ada Gudang yang belum di set pada jalur merah';
            }
        }

        if(msgErrorHijau !== ''){
            flag = false;
            setErrInputListHijau(msgErrorHijau);
        }

        if(msgErrorMerah !== ''){
            flag = false;
            setErrInputListMerah(msgErrorMerah);
        }

        return flag;

    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.idcustomer = SelCustomer;
            obj.isactive = InputIsActive;

            // list.push({"idwarehouse":data.idwarehouse,"idinvoicetype":data.idinvoicetype, "price":data.price ,"ismandatory":data.ismandatory,"jalur":"MERAH"})
            let listdetailpricelist = [];
            for(let i=0; i < InputListHijau.length; i++){
                let det = InputListHijau[i];

                let price = new String(det.price).replaceAll('.','');
                price = new String(price).replaceAll(',','.');

                let objdetail = new Object();
                objdetail.idwarehouse = det.idwarehouse;
                objdetail.idinvoicetype = det.idinvoicetype;
                objdetail.jalur = 'HIJAU';
                objdetail.price = price;
                objdetail.ismandatory = det.ismandatory;

                listdetailpricelist.push(objdetail);
            }

            for(let i=0; i < InputListMerah.length; i++){
                let det = InputListMerah[i];

                let price = new String(det.price).replaceAll('.','');
                price = new String(price).replaceAll(',','.');

                let objdetail = new Object();
                objdetail.idwarehouse = det.idwarehouse;
                objdetail.idinvoicetype = det.idinvoicetype;
                objdetail.jalur = 'MERAH';
                objdetail.price = price;
                objdetail.ismandatory = det.ismandatory;

                listdetailpricelist.push(objdetail);
            }
            obj.detailpricelist = listdetailpricelist;

            dispatch(actions.submitEditPriceList('/'+id,obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
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

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleInputChangeHijau = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        if(name == 'price'){
            flag = false;
            let split = new String(value).replaceAll('.','');
            split = new String(split).replaceAll(',','.');
            if(!isNaN(split)){
                flag = true;
            }
        }
        if(flag){
            const list = [...InputListHijau];
            list[index][name] = value;
            setInputListHijau(list);
        }
        
    };

    const handleInputChangeMerah = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        if(name == 'price'){
            flag = false;
            let split = new String(value).replaceAll('.','');
            split = new String(split).replaceAll(',','.');
            if(!isNaN(split)){
                flag = true;
            }
        }
        if(flag){
            const list = [...InputListMerah];
            list[index][name] = value;
            setInputListMerah(list);
        }
        
    };

    const handleInputDropDownChangeHijau = (e, index,name) => {
        const list = [...InputListHijau];
        list[index][name] = e.value;
        setInputListHijau(list);
    };

    const handleRemoveClickHijau = index => {
        const list = [...InputListHijau];
        list.splice(index, 1);
        setInputListHijau(list);
    };

    const addToListHijau = (data) => {
        let flag = true;
        if(InputListHijau.length > 0){
            let listfilteroutput = InputListHijau.filter(output => output.idwarehouse == data.idwarehouse && output.idinvoicetype == data.idinvoicetype);
            if(listfilteroutput.length > 0){
                flag = false;
            }
        }
        if(flag){
            const list = [...InputListHijau];
            list.push({"idwarehouse":data.idwarehouse,"idinvoicetype":data.idinvoicetype, "price":data.price ,"ismandatory":data.ismandatory,"jalur":"HIJAU"})
            setInputListHijau(list);
        }
        
    }

    const handleInputDropDownChangeMerah = (e, index,name) => {
        const list = [...InputListMerah];
        list[index][name] = e.value;
        setInputListMerah(list);
    };

    const handleRemoveClickMerah = index => {
        const list = [...InputListMerah];
        list.splice(index, 1);
        setInputListMerah(list);
    };

    const addToListMerah = (data) => {
        let flag = true;
        if(InputListMerah.length > 0){
            let listfilteroutput = InputListMerah.filter(output => output.idwarehouse == data.idwarehouse && output.idinvoicetype == data.idinvoicetype);
            if(listfilteroutput.length > 0){
                flag = false;
            }
        }
        if(flag){
            const list = [...InputListMerah];
            list.push({"idwarehouse":data.idwarehouse,"idinvoicetype":data.idinvoicetype, "price":data.price ,"ismandatory":data.ismandatory,"jalur":"MERAH"})
            setInputListMerah(list);
        }
        
    }
    return (
        <Formik
        initialValues={
            {
                customer:SelCustomer,
                nodoc:InputNoDoc,
                isactive:InputIsActive
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddPriceList">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editpricelist+'/'+id} label={'label_EDIT_PRICE_LIST'} labeldefault={'Edit Price List'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="nodoc">
                                {i18n.t('label_NO_DOCUMENT')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nodoc"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nodoc"
                                disabled={true}
                                // maxLength={200}
                                // onChange={val => handleInputNama(val)}
                                onBlur={handleBlur}
                                value={values.nodoc}
                            />
                                <label className="mt-3 form-label required" htmlFor="customer">
                                {i18n.t('label_CUSTOMER')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="customer"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeCustomer(val)}
                                    onBlur={val => setFieldTouched("customer", val?.value ? val.value : '')}
                                    data={ListCustomer}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    disabled={true}
                                    value={values.customer}
                                />
                                <div className="invalid-feedback-custom">{ErrSelCustomer}</div>
                                

                                {/* <FormGroup check style={{marginTop:'20px'}}>
                                <Input type="checkbox" name="check" 
                                id="isactived" 
                                onChange={val => handleChangeIsActive(val)}
                                defaultChecked={values.isactive}
                                checked={values.isactive}
                                style={{transform:'scale(1.5)'}}
                                />
                                <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                                </FormGroup> */}
                            </div>
                            
                            </div>
                            
                            <div className="invalid-feedback-custom">{ErrInputListHijau}</div>
                            <div className="invalid-feedback-custom">{ErrInputListMerah}</div>
                            <div className="row mt-3" style={{padding: '0 15px 0 15px'}}>
                            <Paper style={{flexGrow: 1}}>
                            <Tabs
                                value={tabValue}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label={i18n.t('Hijau') }/>
                                <Tab label={i18n.t('Merah') }/>
                            </Tabs>
                            </Paper>
                            </div>

                            <SwipeableViews
                                axis={'x'}
                                index={tabValue}
                                onChangeIndex={handleChangeTabIndex}
                                style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}
                            >
                                <TabPanel index={tabValue} value={0}>
                                <IndexjalurHijau
                                listjasa={ListInvoiceType}
                                listgudang={ListWarehouse}
                                listdata={InputListHijau}
                                listmandatory={ListIsMandatory}
                                handleinputchange={handleInputChangeHijau}
                                handleInputDropDownChange = {handleInputDropDownChangeHijau}
                                handleRemoveClick = {handleRemoveClickHijau}
                                addtolist = {addToListHijau}
                                />
                                </TabPanel>

                                <TabPanel index={tabValue} value={1}>
                                <IndexjalurMerah
                                    listjasa={ListInvoiceType}
                                    listgudang={ListWarehouse}
                                    listdata={InputListMerah}
                                    listmandatory={ListIsMandatory}
                                    handleinputchange={handleInputChangeMerah}
                                    handleInputDropDownChange = {handleInputDropDownChangeMerah}
                                    handleRemoveClick = {handleRemoveClickMerah}
                                    addtolist = {addToListMerah}
                                />
                                </TabPanel>
                            </SwipeableViews>
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'0px',marginBottom:'20px'}}>
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
                                onClick={() => submitHandler()}
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