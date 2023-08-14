import React, {useState}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import "react-widgets/dist/css/react-widgets.css";
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import { DatePicker}      from 'react-widgets';
// import { listTypeReport } from '../../shared/globalFunc';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuReportStatusInvoice } from '../../shared/permissionMenu';
import { formatdate,months } from '../../shared/constantValue';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

export default function ReportStatusInvoice(props) {
    reloadToHomeNotAuthorize(MenuReportStatusInvoice,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [ListStatus, setListStatus] = useState([{value:'OPEN',label:'Open'},{value:'CLOSE',label:'Close'}]);
    const [SelStatus, setSelStatus] = useState('');
    const [ErrSelStatus, setErrSelStatus] = useState('');

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ListMonth] = useState(months);
    const [SelMonth, SetSelMonth] = useState(-1);//isNaN(moment(new Date()).format('M'))?'':parseInt(moment(new Date()).format('M')));

    const handleStartDate = (data) =>{
        // setStart(moment(data, "DD MMMM YYYY").toDate())
        if(data !== null){
            setStart(moment(data, formatdate).toDate())
        }else{
            setStart(new Date())
        }
    }

    const handleChangeStatus = (data) =>{
        let id = data?.value ? data.value : '';
        setSelStatus(id);
    }

    const submitHandler = () => {
        if( start != null && end != null && SelStatus !== ''){
            
            setLoading(true);
            // let year = moment(new Date()).format('yy');
            // let month = SelMonth - 1;
            let startDate = moment(start).toDate().getTime();//moment(new Date(year, month, 1)).toDate().getTime();//moment(start).format('YYYY-MM-DD');
            let thruDate = moment(end).toDate().getTime();//moment(new Date(year, month + 1, 0)).toDate().getTime();//moment(end).format('YYYY-MM-DD');
            // console.log('year ',year);
            // console.log('Start ',moment(new Date(year, month, 1)).format('YYYY-MM-DD'));
            // console.log('End ',moment(new Date(year, month + 1, 0)).format('YYYY-MM-DD'));

            let typereport = output; 
            let pathURL = '/manggala/statusinvoice?from='+startDate+'&thru='+thruDate+'&type='+typereport+'&status='+SelStatus;
            if(output == 'XLSX'){
                dispatch(actions.getReportData(pathURL,'application/vnd.ms-excel',succesHandlerSubmit, errorHandler));
            }
            // else if(output == 'PPT'){
            //     dispatch(actions.getReportData(pathURL,'application/vnd.ms-powerpoint',succesHandlerSubmitPPT, errorHandler));
            // }else{
            //     dispatch(actions.getReportData(pathURL,'application/pdf',succesHandlerSubmitPDF, errorHandler));
            // }
        }
    }

    const succesHandlerSubmit = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'ReportStatusInvoice.xlsx';
        fileLink.click();
        fileLink.remove();
        setLoading(false);
        
        
        // setFileDoc(data);
    }


    const handleEndDate = (data) =>{
        if(data !== null){
            setEnd(moment(data, formatdate).toDate())
        }else{
            setEnd(new Date())
        }
        // setEnd(moment(data, "DD MMMM YYYY").toDate())
    }

    const handleChangeMonth = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelMonth(id);
        if(id > 0){
            let year = moment(new Date()).format('yy');
            let month = id - 1;

            let startDate = moment(new Date(year, month, 1)).toDate();
            let thruDate = moment(new Date(year, month + 1, 0)).toDate();

            setStart(startDate);
            setEnd(thruDate);
        }else{
            setStart(new Date());
            setEnd(new Date());
        }
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
                startdate:start !== null ? moment(start, formatdate).toDate() : new Date(),
                enddate:end !== null ? moment(end, formatdate).toDate(): new Date(),
                status:SelStatus,
                month:SelMonth !== -1?SelMonth:-1// isNaN(moment(new Date()).format('M'))?'':parseInt(moment(new Date()).format('M')),
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="formReportStatusInvoice">
                            <ContentWrapper>
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.reportstatusinvoice} label={'Report Status Invoice'} labeldefault={'Report Status Invoice'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="month">
                                    {i18n.t('Bulan')}
                            </label>
                            <DropdownList
                                className={
                                    touched.month && errors.month
                                        ? "input-error" : ""
                                }
                                name="month"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeMonth(val)}
                                // onChange={val => setFieldValue("month", val?.value ? val.value : '')}
                                // onBlur={val => setFieldTouched("identityCountryCodeValue", val?.value ? val.value : '')}
                                data={ListMonth}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.month}
                            />
                            
                            <label className="mt-3 form-label required" htmlFor="startdate">
                                {i18n.t('label_FROM_DATE')}
                            </label>
                            <DatePicker
                                    name="startdate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleStartDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.startdate}
                                    // style={{width: '25%'}}
                                    // disabled={ values.allmember}                                    
                            />

                            <label className="mt-3 form-label required" htmlFor="startdate">
                                    {i18n.t('label_THRU_DATE')}
                                
                            </label>
                            <DatePicker
                                    name="enddate"
                                    // onChange={(val) => {
                                    //         setFieldValue("enddate", val);
                                    //     }
                                    // }
                                    onChange={val => handleEndDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.enddate}
                                    // style={{width: '25%'}}
                                    // disabled={values.allmember}
                                    
                            />

                            

                            <label className="mt-3 form-label required" htmlFor="status">
                                {i18n.t('Status')}
                                
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="wotype"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeStatus(val)}
                                    onBlur={val => setFieldTouched("status", val?.value ? val.value : '')}
                                    data={ListStatus}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.status}
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