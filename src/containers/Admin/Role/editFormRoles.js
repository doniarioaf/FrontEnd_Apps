import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button,Card, CardBody} from 'reactstrap';
import Grid                         from './gridPermissions';
import * as actions                 from '../../../store/actions';
import {DropdownList}      from 'react-widgets';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "react-widgets/dist/css/react-widgets.css";
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editRole_Permission } from '../../shared/permissionMenu';


export default function EditFormRole(props) {
    reloadToHomeNotAuthorize(editRole_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputDescriptions, setInputDescriptions] = useState('');
    const [ErrInputDescriptions, setErrInputDescriptions] = useState('');
    const [ListPermissions, setListPermissions] = useState([]);
    const [SelPermissions, setSelPermissions] = useState('');
    const [RowsPermissions, setRowsPermissions] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'descriptions', title: i18n.t('label_DESCRIPTION')},
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getRoleData('/template',successHandler, errorHandler));
        dispatch(actions.getRoleData('/'+id,successHandlerDetail, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            setListPermissions(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.descriptions
                }]
            ), []));
        }
        
    }

    function successHandlerDetail(data) {
        if(data.data){
            setInputName(data.data.role.nama);
            setInputDescriptions(data.data.role.descriptions);
            const theData = data.data.permissions.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'descriptions':el.descriptions?el.descriptions:''
                }
            ], []);
            setHeightGridList(theData);
            setRowsPermissions(theData);
        }     
        setLoading(false);
    }
    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputDescriptions = (data) =>{
        let val = data.target.value;
        setInputDescriptions(val);
    }

    const handleChangePermission = (data) =>{
        let id = data?.value ? data.value : '';
        setSelPermissions(id);
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

    const handleAddListPermissions = () => {
        let dataval = [];
        let filterid = RowsPermissions.filter(output => output.id == SelPermissions);
        if(filterid.length == 0){
            let listfilteroutput = ListPermissions.filter(output => output.value == SelPermissions);
            if(listfilteroutput.length > 0){
                dataval = [...RowsPermissions];
                let filter = listfilteroutput[0];
                let obj = {
                    'id':filter.value,
                    'descriptions':filter.label
                };
                dataval.push(obj);
                setRowsPermissions(dataval);
                setHeightGridList(dataval);
            }
        }
        
    }

    const handleSubstractListDetailTrans = (id) =>{
        let listfilter = RowsPermissions.filter(output => output.id !== id);
        let dataval = [...listfilter];
        setRowsPermissions(dataval);
        setHeightGridList(dataval);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputDescriptions('');
        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputDescriptions == ''){
            setErrInputDescriptions(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
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

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = InputName;
            obj.descriptions = InputDescriptions;
            let listpermissions = [];
            for(let i=0; i < RowsPermissions.length > 0 ; i++){
                let rows = RowsPermissions[i];
                listpermissions.push(rows.id);
            }
            obj.permissions = listpermissions;
            dispatch(actions.submitEditRole(id,obj,succesHandlerSubmit, errorHandler));
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
            text: '' + data
        })
    }

    return (
        <Formik
        initialValues={
            {
                nama:InputName,
                descriptions:InputDescriptions,
                permissions:SelPermissions,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddPermissions">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_EDIT_ROLE')}</span>
                            </div>
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="name">
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

                            <label className="mt-3 form-label required" htmlFor="descriptions">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="descriptions"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="descriptions"
                                onChange={val => handleInputDescriptions(val)}
                                onBlur={handleBlur}
                                value={values.descriptions}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDescriptions}</div>

                            <div className="row mt-0">
                            <div className="mt-0 col-lg-11 ft-detail mb-5" style={{paddingRight:'0px'}}>
                            <label className="mt-3 form-label required" htmlFor="Permissions">
                                {i18n.t('Permissions')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="permissions"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangePermission(val)}
                                onBlur={val => setFieldTouched("permissions", val?.value ? val.value : '')}
                                data={ListPermissions}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.permissions}
                            />
                            </div>

                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{paddingLeft:'0px',paddingTop:'35px'}}>
                            <IconButton color={'primary'}
                                onClick={() => handleAddListPermissions()}
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
                                    rows={RowsPermissions}
                                    columns={columns}
                                    totalCounts={RowsPermissions.length}
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