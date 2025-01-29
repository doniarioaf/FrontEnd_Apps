import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Button} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import { DatePicker,DropdownList}      from 'react-widgets';
import Select from 'react-select';
// import { listTypeReport } from '../../shared/globalFunc';
import { reloadToHomeNotAuthorize } from '../shared/globalFunc';
import { MenuReportKomisi } from '../shared/permissionMenu';
import { formatdate } from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

export default function ReportKomisi(props) {
    reloadToHomeNotAuthorize(MenuReportKomisi,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [selectedVendor, setSelectedVendor] = useState([]);
    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState([]);
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getReport({ url: '/reportkomisi/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            const theData = data.data.vendorOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama + ' (' + el.alias + ')',
                    'data': el
                }
            ], []);
            theData.push(
                {
                    'value': 'ALL',
                    'label': 'All',
                    'data': []
                }
            );
            setListVendor(theData);
        }
        setLoading(false);
    }

    const handleChangeVendor = (data) =>{
        let temp = [];
        if (data !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].value);
            }
        }
        setSelVendor(temp);
    }

    const handleStartDate = (data) =>{
        // setStart(moment(data, "DD MMMM YYYY").toDate())
        if(data !== null){
            setStart(moment(data, formatdate).toDate());
            // setEnd(moment(data, formatdate).toDate());
        }else{
            setStart(new Date());
            // setEnd(new Date());
        }
    }

    const submitHandler = () => {
        if( start != null && end != null && SelVendor.length > 0){
            let idvendor = 0;
            if(SelVendor.indexOf('ALL') > -1){
                idvendor = 'ALL'
            }else{
                idvendor = SelVendor.join(',');
            }
            
            setLoading(true);
            dispatch(actions.getReport({ url: '/reportkomisi?from=' + start.getTime() + '&to=' + end.getTime()+'&idvendorbrokers='+idvendor,type:'GETFILE',typefile:'application/vnd.ms-excel' }, successHandlerReport, errorHandler));
            // dispatch(actions.submitPurchaseReceiveData({ url: '/reportpembelian', payload: obj, type: 'GETFILE',typefile:'application/vnd.ms-excel' }, succesHandlerSubmit, errorHandler));
        }
    }

    const successHandlerReport = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'ReportKomisi.xlsx';
        fileLink.click();
        fileLink.remove();
        setLoading(false);
        
        
        // setFileDoc(data);
    }

    const handleEndDate = (data) =>{
        if(data !== null){
            setEnd(moment(data, formatdate).toDate());
        }else{
            setEnd(new Date());
        }
        // setEnd(moment(data, "DD MMMM YYYY").toDate())
    }

    const errorHandler = (data, propsdata) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    return(
        
        <Formik
        initialValues={
            {
                startdate:start !== null ? moment(start, formatdate).toDate() : new Date(),
                enddate:end !== null ? moment(end, formatdate).toDate(): new Date(),
                vendor:SelVendor,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="menuReportKomisi">
                            <ContentWrapper>
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuReportKomisi} label={'Laporan Komisi'} labeldefault={'Laporan Komisi'} />
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
                                    max={values.enddate}
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
                                    min={values.startdate}
                                    
                            />
                            </div>
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="vendor">
                                {i18n.t('Vendor')}
                                
                            </label>
                            <Select
                                defaultValue={selectedVendor}
                                isMulti
                                name="colors"
                                options={ListVendor}
                                onChange={val => handleChangeVendor(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            // placeholder={i18n.t('select.SELECT_OPTION')}
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