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
import { MenuReportHutang } from '../shared/permissionMenu';
import { formatdate } from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

export default function ReportHutang(props) {
    reloadToHomeNotAuthorize(MenuReportHutang,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [DataVendor, setDataVendor] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState([]);
    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState([]);
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [selectedVendorType, setSelectedVendorType] = useState([]);
    const [ListVendorType, setListVendorType] = useState([{value:'ALL',label:'All'},{value:'UDANG',label:'Udang'},{value:'CARGO',label:'Cargo'},{value:'UPI',label:'UPI'}]);
    const [SelVendorType, setSelVendorType] = useState([]);
    const [ErrSelVendorType, setErrSelVendorType] = useState('');

    const [ListStatus, setListStatus] = useState([{value:'ALL',label:'All'},{value:'LUNAS',label:'Lunas'},{value:'BELUMLUNAS',label:'Belum Lunas'}]);
    const [SelStatus, setSelStatus] = useState('BELUMLUNAS');

    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getReport({ url: '/reporthutang/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            setDataVendor(data.data.vendorOpt);
        }
        setLoading(false);
    }
    function vendorList(vendortype) {
        let theData = [];
        if (vendortype !== null && vendortype.length > 0) {
            if(vendortype.indexOf("ALL") > -1 ){
                theData = DataVendor.reduce((obj, el) => [
                    ...obj,
                    {
                        'value': el.id,
                        // 'label': el.nama + ' (' + el.alias + ')',
                        'label': el.alias,
                        'data': el
                    }
                ], []);
            }else{
                if(vendortype.indexOf("UDANG") > -1 ){
                    let filterudang = DataVendor.filter(output => output.type == 'UDANG');
                    if(filterudang.length > 0){
                        for(let i=0; i < filterudang.length; i++){
                            let el = filterudang[i];
                            theData.push(
                                {
                                    'value': el.id,
                                    // 'label': el.nama + ' (' + el.alias + ')',
                                    'label': el.alias,
                                    'data': el
                                }
                            );
                        }
                    }
                }

                if(vendortype.indexOf("CARGO") > -1 ){
                    let filtercargo = DataVendor.filter(output => output.type == 'CARGO');
                    if(filtercargo.length > 0){
                        for(let i=0; i < filtercargo.length; i++){
                            let el = filtercargo[i];
                            theData.push(
                                {
                                    'value': el.id,
                                    // 'label': el.nama + ' (' + el.alias + ')',
                                    'label': el.alias,
                                    'data': el
                                }
                            );
                        }
                    }
                }

                if(vendortype.indexOf("UPI") > -1 ){
                    let filterUpi = DataVendor.filter(output => output.type == 'UPI');
                    if(filterUpi.length > 0){
                        for(let i=0; i < filterUpi.length; i++){
                            let el = filterUpi[i];
                            theData.push(
                                {
                                    'value': el.id,
                                    // 'label': el.nama + ' (' + el.alias + ')',
                                    'label': el.alias,
                                    'data': el
                                }
                            );
                        }
                    }
                }
            }

        }
            
        if(theData.length > 0){
            theData.push(
                {
                    'value': 'ALL',
                    'label': 'All',
                    'data': []
                }
            );
        }
        
            setListVendor(theData);
    }

    const handleChangeVendor = (data) =>{
        let temp = [];
        if (data !== null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                temp.push(data[i].value);
            }
        }
        setSelVendor(temp);
    }

    const handleChangeVendorType = (data) =>{
        let temp = [];
        if (data !== null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                temp.push(data[i].value);
            }
        }
        setSelVendor([]);
        vendorList(temp);
        setSelVendorType(temp);
    }

    const handleChangeStatus = (data) =>{
        let id = data?.value ? data.value : '';
        setSelStatus(id);
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
        let flag = true;
        if(SelVendor.length == 0){
            setErrSelVendor(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelVendorType.length == 0){
            setErrSelVendorType(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if( start != null && end != null && flag){
            let idvendor = 0;
            if(SelVendor.indexOf('ALL') > -1){
                idvendor = 'ALL'
            }else{
                idvendor = SelVendor.join(',');
            }

            let idvendortype = 0;
            if(SelVendorType.indexOf('ALL') > -1){
                idvendortype = 'ALL'
            }else{
                idvendortype = SelVendorType.join(',');
            }
            
            setLoading(true);
            dispatch(actions.getReport({ url: '/reporthutang?from=' + start.getTime() + '&to=' + end.getTime()+'&idvendors='+idvendor+'&vendorttypes='+idvendortype+'&status='+SelStatus,type:'GETFILE',typefile:'application/vnd.ms-excel' }, successHandlerReport, errorHandler));
            // dispatch(actions.submitPurchaseReceiveData({ url: '/reportpembelian', payload: obj, type: 'GETFILE',typefile:'application/vnd.ms-excel' }, succesHandlerSubmit, errorHandler));
        }
    }

    const successHandlerReport = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'ReportHutang.xlsx';
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
                vendortype:SelVendorType,
                status:SelStatus
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
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuReportHutang} label={'Laporan Hutang'} labeldefault={'Laporan Hutang'} />
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
                                {i18n.t('Vendor Type')}
                                
                            </label>
                            <Select
                                defaultValue={selectedVendorType}
                                isMulti
                                name="colors"
                                options={ListVendorType}
                                onChange={val => handleChangeVendorType(val)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            // placeholder={i18n.t('select.SELECT_OPTION')}
                            />

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

                            <label className="mt-3 form-label required" htmlFor="status">
                                {i18n.t('Status')}
                                
                            </label>

                                <DropdownList
                                    name="status"
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