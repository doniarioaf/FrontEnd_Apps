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
// import { listTypeReport } from '../../shared/globalFunc';
import { reloadToHomeNotAuthorize } from '../shared/globalFunc';
import { MenuReportPurchaseReceive } from '../shared/permissionMenu';
import { formatdate , months} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

export default function ReportPembelian(props) {
    reloadToHomeNotAuthorize(MenuReportPurchaseReceive,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [ListArea, setListArea] = useState([]);
    const [SelArea, setSelArea] = useState('');
    const [ErrSelArea, setErrSelArea] = useState('');

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPurchaseReceiveData({ url: '/reporttemplate' }, successHandler, errorHandler));
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

            const theDataArea = data.data.areaOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            theDataArea.push(
                {
                    'value': 'nodata',
                    'label': 'No Data',
                    'data': []
                }
            );
            setListArea(theDataArea);
        }
        setLoading(false);
    }

    const handleChangeVendor = (data) =>{
        let id = data?.value ? data.value : '';
        setSelVendor(id);
    }

    const handleChangeArea = (data) =>{
        let id = data?.value ? data.value : '';
        setSelArea(id);
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
        if( start != null && end != null){
            let idvendor = SelVendor;
            if(SelVendor == '' || SelVendor == 'ALL'){
                idvendor = 0;
            }

            let idarea = SelArea;
            if(SelArea == '' || SelArea == 'nodata'){
                idarea = 0;
            }
            setLoading(true);
            dispatch(actions.getPurchaseReceiveData({ url: '/reportpembelian?from=' + start.getTime() + '&to=' + end.getTime()+'&idvendor='+idvendor+'&idarea='+idarea,type:'GETFILE',typefile:'application/vnd.ms-excel' }, successHandlerReport, errorHandler));
            // dispatch(actions.submitPurchaseReceiveData({ url: '/reportpembelian', payload: obj, type: 'GETFILE',typefile:'application/vnd.ms-excel' }, succesHandlerSubmit, errorHandler));
        }
    }

    const successHandlerReport = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'ReportPurchaseReceive.xlsx';
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
                area:SelArea
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
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menureportpurchasereceive} label={'Laporan Purchase Receive'} labeldefault={'Laporan Purchase Receive'} />
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

                                <DropdownList
                                    name="vendor"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeVendor(val)}
                                    onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                    data={ListVendor}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.vendor}
                                />

                            <label className="mt-3 form-label required" htmlFor="area">
                                {i18n.t('Area')}
                                
                            </label>

                                <DropdownList
                                    name="area"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeArea(val)}
                                    onBlur={val => setFieldTouched("area", val?.value ? val.value : '')}
                                    data={ListArea}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.area}
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