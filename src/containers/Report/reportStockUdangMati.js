import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Button,Container, Card, CardBody } from 'reactstrap';
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
import { MenuReportStockUdangHidpuDanMati } from '../shared/permissionMenu';
import { formatdate , months} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

import { PDFViewer } from '@react-pdf/renderer';
import PdfDocumentStockUdangHidupDanMati from './PDF/PdfDocumentStockUdangHidupDanMati';
import '../Transaksi/PurchaseReceive/printNota/App.css';

export default function ReportPembelian(props) {
    reloadToHomeNotAuthorize(MenuReportStockUdangHidpuDanMati,'READ');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [output, setOutput] = useState('XLSX');
    const [listoutput, SetListOutPut] = useState([{value:'XLSX',label:'Excel'},{value:'PDF',label:'PDF'}]);
    const [loading, setLoading] = useState(false);


    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);
    const fileName = "ReportStockUdangHidupMati";
    

    const handleStartDate = (data) =>{
        // setStart(moment(data, "DD MMMM YYYY").toDate())
        if(data !== null){
            setStart(moment(data, formatdate).toDate());
            // setEnd(moment(data, formatdate).toDate());
        }else{
            setStart(new Date());
            // setEnd(new Date());
        }
        setIsReady(false);
    }

    const submitHandler = () => {
        if( start != null && end != null){
            setLoading(true);
            if(output == 'XLSX'){
                dispatch(actions.getReport({ url: '/reportstockudanghidupmati?from=' + start.getTime(),type:'GETFILE',typefile:'application/vnd.ms-excel' }, successHandlerReport, errorHandler));
            }else{
                dispatch(actions.getReport({ url: '/reportstockudanghidupmati/pdf?from=' + start.getTime(),type:'GET',typefile:'application/vnd.ms-excel' }, successHandlerPDF, errorHandler));
            }
            
            
            // dispatch(actions.submitPurchaseReceiveData({ url: '/reportpembelian', payload: obj, type: 'GETFILE',typefile:'application/vnd.ms-excel' }, succesHandlerSubmit, errorHandler));
        }
    }

    function successHandlerPDF(data,propsdata) {
        if (data.data) {
            getData(data);
        }
        setLoading(false);
    }
    function getData(data){
        let det = data.data;
        let dettemp = Object();
        dettemp.item = data.data
        dettemp.date = moment(new Date(start)).format(formatdate);
        // dettemp.currdatetime = moment(new Date()).format(formatdatetime);
        setValue(dettemp);

        setTimeout(() => {
            // generatePDF(det);
            setIsReady(true);
            // setFile(downloadLink(det));
        }, 1000);
        setLoading(false);
    }

    const successHandlerReport = (data) => {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = fileName+'.xlsx';
        fileLink.click();
        fileLink.remove();
        setLoading(false);
        
        
        // setFileDoc(data);
    }

    const handleSuccesPDF = (dataUrl, namaFile) => {
        // var blob = new Blob([data,{ type: 'application/pdf' }]);
        // var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;//URL.createObjectURL(dataUrl);

        // it forces the name of the downloaded file
        // fileLink.download = 'PackingList-'+moment(new Date()).format(formatdateYYYYMMDD)+'-'+namaFile + '.pdf';
        fileLink.download = namaFile + '.pdf';
        fileLink.click();
        fileLink.remove();

    }

    const handleEndDate = (data) =>{
        if(data !== null){
            setEnd(moment(data, formatdate).toDate());
        }else{
            setEnd(new Date());
        }
        setIsReady(false);
        // setEnd(moment(data, "DD MMMM YYYY").toDate())
    }

    const handleChangeTipeFile = (data) =>{
        let id = data?.value ? data.value : '';
        setIsReady(false);
        setOutput(id);
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
                typefile:output
                // vendor:SelVendor,
                // area:SelArea
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
                            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuReportStockUdangHidupMati} label={'Lprn Stock Hidup & Mati'} labeldefault={'Lprn Stock Hidup & Mati'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="startdate">
                                {i18n.t('label_DATE')}
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
                            <label className="mt-3 form-label required" htmlFor="typefile">
                                {i18n.t('File')}
                                
                            </label>

                                <DropdownList
                                    name="typefile"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeTipeFile(val)}
                                    onBlur={val => setFieldTouched("typefile", val?.value ? val.value : '')}
                                    data={listoutput}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.typefile}
                                />

                            </div>
                            </div>

                            {
                                values.typefile == 'PDF' && IsReady?
                                <Container fluid>
                                <Card>
                                <CardBody>
                                <Container fluid className="center-parent">
                                    {
                                        IsReady ?
                                        <div className="App">
                                                <div className='download-link'>
                                                    {/* <div onClick={() => handleSuccesPDF(localStorage.getItem("PdfDocument"), (Value != null ? 'SuratJalan-' + Value.nodocument : fileName))}>{"Download"}</div> */}
                                                    <div onClick={() => handleSuccesPDF(localStorage.getItem("PdfDocument"), fileName)}>{"Download"}</div>
                                                    {/* <div onClick={() => handleDownloadPDF()}>{"Download"}</div> */}
                                                </div>
                                                {/* <div style={{backgroundColor:'#343439',width:'20%',height:'9%',position:'absolute',right:'15px', display: visible ? 'block' : 'none' }}></div> */}
    
                                                <PDFViewer style={{
                                                    width: '100%',
                                                    height: '100vh',
                                                    border: 'none', // Remove any borders or default styles
                                                }} fileName={"myPdf.pdf"}
                                                    width={800} height={500} >
                                                    <PdfDocumentStockUdangHidupDanMati data={Value} />
    
                                                </PDFViewer>
    
    
                                            </div>
                                        :''
                                    }
                                </Container>
                                </CardBody>
                                </Card>
                                </Container>
                                :''
                            }
                            

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