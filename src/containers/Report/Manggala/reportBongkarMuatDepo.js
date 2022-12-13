import React, {useState, useEffect}    from 'react';
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
import { MenuReportBongkarMuat } from '../../shared/permissionMenu';
import { formatdate } from '../../shared/constantValue';
import * as pathmenu           from '../../shared/pathMenu';

export default function ReportBongkarMuatDepo(props) {
    reloadToHomeNotAuthorize(MenuReportBongkarMuat,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleStartDate = (data) =>{
        // setStart(moment(data, "DD MMMM YYYY").toDate())
        if(data !== null){
            setStart(moment(data, formatdate).toDate())
        }else{
            setStart(new Date())
        }
    }

    const submitHandler = () => {
        if(start != null && end != null){
            setLoading(true);
            let startDate = moment(start).toDate().getTime();//moment(start).format('YYYY-MM-DD');
            let thruDate = moment(end).toDate().getTime();//moment(end).format('YYYY-MM-DD');
            let typereport = output; 
            let pathURL = '/manggala/bongkarmuatdepo?from='+startDate+'&thru='+thruDate+'&type='+typereport;
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
        fileLink.download = 'ReportBongkarMuatDepo.xlsx';
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="formReportBongkarMuatDepo">
                            <ContentWrapper>
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuemployeeManggala} label={'Employee'} labeldefault={'Employee'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
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