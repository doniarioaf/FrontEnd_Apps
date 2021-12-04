import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import "react-widgets/dist/css/react-widgets.css";
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DropdownList, DatePicker}      from 'react-widgets';
import { listTypeReport } from '../../shared/globalFunc';
import Select from 'react-select';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';

export default function ReportMobileMonitoring(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ListUserMobile, SetListUserMobile] = useState([]);
    const [SelUserMobile, SetSelUserMobile] = useState('');
    const [ErrSelUserMobile, SetErrSelUserMobile] = useState('');

    const [selectedUserMobile, setSelectedUserMobile] = useState([]);
    const [UserMobile, setUserMobile] = useState([]);

    useEffect(() => {
        SetListOutPut(listTypeReport);
        setLoading(true);
        dispatch(actions.getReportTemplateData('/monitoring/template',succesHandlerTemplate, errorHandler));
    }, []);
    const succesHandlerTemplate = (data) => {
        if(data.data){
            SetListUserMobile(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
            setLoading(false);
        }
    }

    const checkColumnMandatory = () => {
        let flag = true;
        SetErrSelUserMobile('');
        if(UserMobile.length == 0){
            SetErrSelUserMobile(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }
    const submitHandler = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let startDate = moment(start).format('YYYY-MM-DD');
            let thruDate = moment(end).format('YYYY-MM-DD');
            let listId = UserMobile.join(',');
            let pathURL = '/monitoring?idusermobile='+listId+'&from='+startDate+'&thru='+thruDate
            if(output == 'XLSX'){
                dispatch(actions.getReportData(pathURL,'application/vnd.ms-excel',succesHandlerSubmit, errorHandler));
            }
        }
        
        
    }

    const succesHandlerSubmit = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'ReportMonitoring.xlsx';
        fileLink.click();
        fileLink.remove();
        setLoading(false);
        
        
        // setFileDoc(data);
    }

    const handleChangeUserMobile = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUserMobile(id);
    }

    const handleChangeOutPut = (data) =>{
        let id = data?.value ? data.value : '';
        setOutput(id);
    }

    const handleStartDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        setStart(moment(data, "DD MMMM YYYY").toDate())
    }

    const handleEndDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        setEnd(moment(data, "DD MMMM YYYY").toDate())
    }

    const handleChangeUserMobileSelect = (data) =>{
        let temp = [];        
        if(data !== null && data.length > 0){
          for(var i=0; i < data.length ; i++){
            temp.push(data[i].value);
          }
        }
        setUserMobile(temp);
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
                usermobile:SelUserMobile,
                startdate:start !== null ? moment(start, "DD MMMM YYYY").toDate() : new Date(),
                enddate:end !== null ? moment(end, "DD MMMM YYYY").toDate(): new Date(),
                outputtype:output !== ''?output: 'XLSX',
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="formAddCustomer">
                            <ContentWrapper>
                            <div className="content-heading"  >
                                <span>{i18n.t('Monitoring')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="startdate">
                                {i18n.t('Start Date')}
                            </label>
                            <DatePicker
                                    name="startdate"
                                    onChange={(val) => {
                                            setFieldValue("startdate", val);
                                        }
                                    }
                                    onChange={val => handleStartDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={'DD MMMM YYYY'}
                                    value={values.startdate}
                                    // style={{width: '25%'}}
                                    // disabled={ values.allmember}                                    
                            />

                            <label className="mt-3 form-label required" htmlFor="startdate">
                                    {i18n.t('End Date')}
                                
                            </label>
                            <DatePicker
                                    name="enddate"
                                    onChange={(val) => {
                                            setFieldValue("enddate", val);
                                        }
                                    }
                                    onChange={val => handleEndDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={'DD MMMM YYYY'}
                                    value={values.enddate}
                                    // style={{width: '25%'}}
                                    // disabled={values.allmember}
                                    
                            />
                            </div>
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="customer">
                                {i18n.t('User Mobile')}
                            </label>
                            {/* <DropdownList
                                className={
                                    touched.usermobile && errors.usermobile
                                        ? "input-error" : ""
                                }
                                name="usermobile"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeUserMobile(val)}
                                onBlur={val => setFieldTouched("usermobile", val?.value ? val.value : '')}
                                data={ListUserMobile}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.usermobile}
                            /> */}

                            <Select
                                // defaultValue={[options[0], options[1]]}
                                defaultValue={selectedUserMobile}
                                isMulti
                                name="colors"
                                options={ListUserMobile}
                                onChange={val => handleChangeUserMobileSelect(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                // placeholder={i18n.t('select.SELECT_OPTION')}
                            />
                            <div className="invalid-feedback-custom">{ErrSelUserMobile}</div>

                            <label className="mt-3 form-label required" htmlFor="outputtype" >
                                {i18n.t('Output Type')}
                            </label>

                            <DropdownList
                                className={
                                    touched.outputtype && errors.outputtype
                                        ? "input-error" : ""
                                }
                                name="outputtype"
                                filter='contains'
                                // placeholder={'Choose country...'}
                                
                                onChange={val => handleChangeOutPut(val)}
                                // onBlur={val => setFieldTouched("identityCountryCodeValue", val?.value ? val.value : '')}
                                data={listoutput}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.outputtype}
                            />
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