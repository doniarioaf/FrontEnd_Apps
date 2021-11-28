import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button,Card, CardBody} from 'reactstrap';
import Grid                         from './gridCustomer';
import * as actions                 from '../../../store/actions';
import {DropdownList}      from 'react-widgets';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "react-widgets/dist/css/react-widgets.css";
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';

export default function EditFormCallPlan(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputDescription, setInputDescription] = useState('');
    const [ErrInputDescription, setErrInputDescription] = useState('');

    const [ListCustomer, setListCustomer] = useState([]);
    const [SelCustomer, setSelCustomer] = useState('');
    const [hiddenColumns] = useState(['id']);
    const [RowsCustomer, setRowsCustomer] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'address', title: i18n.t('label_ADDRESS')},
        {name: 'phone', title: i18n.t('label_CONTACT_NUMBER')},
    ]);
    const [StartdefaultHeight] = useState(250);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCallPlanData('/'+id,successHandler, errorHandler));
        dispatch(actions.getCallPlanData('/template',successHandlerTemplate, errorHandler));
    }, []);

    function successHandler(data) {
            setLoading(false);
            if(data.data){
                setInputName(data.data.nama);
                setInputDescription(data.data.description);
                if(data.data.customers){
                    let listcustomers = data.data.customers;
                    setRowsCustomer(listcustomers.reduce((obj, el) => (
                        [...obj, {
                            id: el.id,
                            name: el.nama,
                            address: el.address,
                            phone: el.phone
                        }]
                    ), []));
                    setHeightGridList(listcustomers);
                }
            }
    }

    function successHandlerTemplate(data) {
        if(data.data){
            setListCustomer(data.data.customerOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama,
                    customer:el
                }]
            ), []));

            // let arr = [];
            // for(let i=1; i < 2100; i++){
            //     arr.push({value:i,label:'Urutan Ke - '+i});
            // }
            // setListCustomer(arr);
        }
        setLoading(false);
    }

    const handleChangeCustomer = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCustomer(id);
    }

    const setHeightGridList = (dataval) =>{
        if(dataval.length > 2){
            let height = ( 50 * (dataval.length - 2) ) + StartdefaultHeight;
            if(height > 600){
                height = 600;
            }
            setdefaultHeight(height+'px');
        }
    }

    const handleAddList = () => {
        let dataval = [];
        let filterid = RowsCustomer.filter(output => output.id == SelCustomer);
        if(filterid.length == 0){
            let listfilteroutput = ListCustomer.filter(output => output.value == SelCustomer);
            if(listfilteroutput.length > 0){
                dataval = [...RowsCustomer];
                let filter = listfilteroutput[0];
                let obj = {
                    'id':filter.value,
                    'name':filter.label,
                    'address': '',//filter.customer.address,
                    'phone':'',//filter.customer.phone,
                };
                dataval.push(obj);
                setRowsCustomer(dataval);
                setHeightGridList(dataval);
            }
        }   
    }

    const handleSubstractListDetailTrans = (id) =>{
        let listfilter = RowsCustomer.filter(output => output.id !== id);
        let dataval = [...listfilter];
        setRowsCustomer(dataval);
        setHeightGridList(dataval);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputDescription('');
        
        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputDescription == ''){
            setErrInputDescription(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = InputName;
            obj.description = InputDescription;
            let listcustomer= [];
            for(let i=0; i < RowsCustomer.length > 0 ; i++){
                let rows = RowsCustomer[i];
                listcustomer.push(rows.id);
            }
            obj.customers = listcustomer;
            dispatch(actions.submitEditCallPlan(id,obj,succesHandlerSubmit, errorHandler));
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

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputDescription = (data) =>{
        let val = data.target.value;
        setInputDescription(val);
    }

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + data
        })
    }

    return (
        <Formik
        initialValues={
            {
            nama:InputName,
            description:InputDescription,
            customer:SelCustomer
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddCallPlan">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_EDIT_CALL_PLAN')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nama"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="namebranch">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="description"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="description"
                                onChange={val => handleInputDescription(val)}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDescription}</div>

                            <div className="row mt-0">
                            <div className="mt-0 col-lg-11 ft-detail mb-5" style={{paddingRight:'0px'}}>
                            <label className="mt-3 form-label required" htmlFor="customer">
                                {i18n.t('label_CUSTOMER')}
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
                                // disabled={values.isdisabledcountry}
                                value={values.customer}
                            />
                            </div>

                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{paddingLeft:'0px',paddingTop:'35px'}}>
                            <IconButton color={'primary'}
                                onClick={() => handleAddList()}
                            >
                                <AddIcon style={{ fontSize: 30 }}/>
                            </IconButton>
                            </div>

                            </div>

                            </div>
                            </div>

                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
                            <Button
                            // disabled={props.activeStep === 0}
                                style={{marginLeft:"20%"}}
                                onClick={() => history.goBack()}
                            >
                            {/* {i18n.t('common.BACK')} */}
                            {'Cancel'}
                            </Button>

                            <Button
                                style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                            >
                            {'Submit'}
                            </Button>
                            </div>

                            <Card>
                            <CardBody>
                            <div className="table-responsive" style={{height:defaultHeight}}>
                                <Grid
                                    rows={RowsCustomer}
                                    columns={columns}
                                    totalCounts={RowsCustomer.length}
                                    loading={loading}
                                    columnextension={[]}
                                    handleSubstractList={handleSubstractListDetailTrans}
                                />
                            </div>
                            </CardBody>
                            </Card>

                            </ContentWrapper>
                            {loading && <Loading/>}
                        </form>
                    )
                }
            }
        </Formik>

    )
}
