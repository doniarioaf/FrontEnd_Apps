import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button,FormGroup,Label,Card, CardBody} from 'reactstrap';
import Grid                         from './gridBranch';
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

export default function AddFormCompany(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputCode, setInputCode] = useState('');
    const [ErrInputCode, setErrInputCode] = useState('');
    const [InputContactNumber, setInputContactNumber] = useState('');
    const [ErrInputContactNumber, setErrInputContactNumber] = useState('');
    const [InputDisplayName, setInputDisplayName] = useState('');
    const [ErrInputDisplayName, setErrInputDisplayName] = useState('');
    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');
    const [InputEmail, setInputEmail] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');
    const [CheckIsActived, setCheckIsActived] = useState(true);
    // const [ListSelectedBranches, setListSelectedBranches] = useState([]);
    const [ListBranch, setListBranch] = useState([]);
    const [SelBranch, setSelBranch] = useState('');
    const [hiddenColumns] = useState(['id']);
    const [RowsBranch, setRowsBranch] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getBranchData('/getlistbranchnotexistincompany',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            setListBranch(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.name
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputCode = (data) =>{
        let val = data.target.value;
        setInputCode(val);
    }

    const handleInputContactNumber = (data) =>{
        let val = data.target.value;
        if(!isNaN(val)){
            setInputContactNumber(val);
        }
    }

    const handleInputDisplayName = (data) =>{
        let val = data.target.value;
        setInputDisplayName(val)
    }

    const handleInputAddrees = (data) =>{
        let val = data.target.value;
        setInputAddress(val)
    }

    const handleInputEmail = (data) =>{
        let val = data.target.value;
        setInputEmail(val)
    }

    const handleChangeIsActive = (data) =>{
        setCheckIsActived(data.target.checked);
    }

    const handleChangeBranche = (data) =>{
        let idbranch = data?.value ? data.value : '';
        setSelBranch(idbranch);
    }
    const setHeightGridListCharges = (dataval) =>{
        if(dataval.length > 2){
            let height = ( 50 * (dataval.length - 2) ) + StartdefaultHeight;
            if(height > 600){
                height = 600;
            }
            setdefaultHeight(height+'px');
        }
    }
    const handleAddListBranch = () => {
        let dataval = [];
        let filterid = RowsBranch.filter(output => output.id == SelBranch);
        if(filterid.length == 0){
            let listfilteroutput = ListBranch.filter(output => output.value == SelBranch);
            if(listfilteroutput.length > 0){
                dataval = [...RowsBranch];
                let filter = listfilteroutput[0];
                let obj = {
                    'id':filter.value,
                    'name':filter.label
                };
                dataval.push(obj);
                setRowsBranch(dataval);
                setHeightGridListCharges(dataval);
            }
        }
        
    }
    const handleSubstractListDetailTrans = (id) =>{
        let listfilter = RowsBranch.filter(output => output.id !== id);
        let dataval = [...listfilter];
        setRowsBranch(dataval);
        setHeightGridListCharges(dataval);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputCode('');
        setErrInputContactNumber('');
        setErrInputDisplayName('');
        setErrInputAddress('');
        setErrInputEmail('')
        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputCode == ''){
            setErrInputCode(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputContactNumber == ''){
            setErrInputContactNumber(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputDisplayName == ''){
            setErrInputDisplayName(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAddress == ''){
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputEmail == ''){
            setErrInputEmail(i18n.t('label_REQUIRED'));
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
            obj.code = InputCode;
            obj.contactnumber = InputContactNumber;
            obj.displayname = InputDisplayName;
            obj.address = InputAddress;
            obj.email = InputEmail;
            obj.isactive = CheckIsActived;
            let listbranch = [];
            for(let i=0; i < RowsBranch.length > 0 ; i++){
                let rows = RowsBranch[i];
                listbranch.push(rows.id);
            }
            obj.branches = listbranch;
            dispatch(actions.submitAddCompany(obj,succesHandlerSubmit, errorHandler));
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
            namebranch:InputName,
            code:InputCode,
            contactnumber:InputContactNumber,
            displayname:InputDisplayName,
            address:InputAddress,
            email:InputEmail,
            isactived:CheckIsActived,
            branch:SelBranch
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBranch">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_ADD_COMPANY')}</span>
                            </div>
                            <div className="row mt-2">

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="namebranch">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="namebranch"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="namebranch"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.namebranch}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="displayname">
                                {i18n.t('label_DISPLAY_NAME')}
                            </label>
                            <Input
                                name="displayname"
                                // className={
                                //     touched.displayname && errors.displayname
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="displayname"
                                onChange={val => handleInputDisplayName(val)}
                                onBlur={handleBlur}
                                value={values.displayname}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDisplayName}</div>

                            <label className="mt-3 form-label required" htmlFor="code">
                                {i18n.t('label_CODE')}
                            </label>
                            <Input
                                name="code"
                                // className={
                                //     touched.code && errors.code
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="code"
                                onChange={val => handleInputCode(val)}
                                onBlur={handleBlur}
                                value={values.code}
                            />
                            <div className="invalid-feedback-custom">{ErrInputCode}</div>
                            
                            <div className="row mt-0">
                            <div className="mt-0 col-lg-11 ft-detail mb-5" style={{paddingRight:'0px'}}>
                            <label className="mt-3 form-label required" htmlFor="branch">
                                {i18n.t('label_BRANCH')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="branch"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeBranche(val)}
                                onBlur={val => setFieldTouched("branch", val?.value ? val.value : '')}
                                data={ListBranch}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.branch}
                            />
                            </div>

                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{paddingLeft:'0px',paddingTop:'35px'}}>
                            <IconButton color={'primary'}
                                onClick={() => handleAddListBranch()}
                            >
                                <AddIcon style={{ fontSize: 30 }}/>
                            </IconButton>
                            </div>

                            </div>

                            </div>
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="contactnumber">
                                {i18n.t('label_CONTACT_NUMBER')}
                            </label>
                            <Input
                                name="contactnumber"
                                // className={
                                //     touched.contactnumber && errors.contactnumber
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="contactnumber"
                                onChange={val => handleInputContactNumber(val)}
                                onBlur={handleBlur}
                                value={values.contactnumber}
                            />
                            <div className="invalid-feedback-custom">{ErrInputContactNumber}</div>

                            <label className="mt-3 form-label required" htmlFor="address">
                                {i18n.t('label_ADDRESS')}
                            </label>
                            <Input
                                name="address"
                                // className={
                                //     touched.address && errors.address
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="address"
                                onChange={val => handleInputAddrees(val)}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAddress}</div>

                            <label className="mt-3 form-label required" htmlFor="email">
                                {i18n.t('Email')}
                            </label>
                            <Input
                                name="email"
                                // className={
                                //     touched.email && errors.email
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="email"
                                onChange={val => handleInputEmail(val)}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <div className="invalid-feedback-custom">{ErrInputEmail}</div>


                            <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactived}
                            checked={values.isactived}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>
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
                                    rows={RowsBranch}
                                    columns={columns}
                                    totalCounts={RowsBranch.length}
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
