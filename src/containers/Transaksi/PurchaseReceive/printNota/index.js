import React, { useState } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../../components/Layout/ContentHeading';
import { Button } from 'reactstrap';
import * as actions from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../../shared/globalFunc';
import { MenuPurchaseReceive } from '../../../shared/permissionMenu';
import * as pathmenu from '../../../shared/pathMenu';
import { DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

import { PDFViewer } from '@react-pdf/renderer';
import PdfDocumentSupplier from './PdfDocumentSupplier';
import PdfDocumentSupplierLegal from './PdfDocumentSupplierLegal';
import PdfDocumentPajak from './PdfDocumentPajak';
// import PdfDocumentPajak from './PdfDocumentPajak';

import { formatdate, formatdatetime, formattimeHHmm } from '../../../shared/constantValue';
import moment from 'moment';
import './App.css';


export default function PrintNota(props) {
    reloadToHomeNotAuthorize(MenuPurchaseReceive, 'READ');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ListPrintType, setListPrintType] = useState([{ value: 'SUPPLIER', label: 'Supplier' }, { value: 'PAJAK', label: 'Pajak' }]);
    const [SelPrintType, setSelPrintType] = useState('SUPPLIER');

    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);

    const [visible, setVisible] = useState(false);


    const id = props.match.params.id;

    const fileName = "PurchaseReceive";

    const handleChangePrintType = (data) => {
        let id = data?.value ? data.value : '';
        setIsReady(false);
        setSelPrintType(id);
    }

    function generatePDF() {
        setLoading(true);
        setIsReady(false);
        setVisible(false);
        dispatch(actions.getPurchaseReceiveData({ url: '/printnota/' + id+'/'+SelPrintType }, successHandler, errorHandler));
    }

    function successHandler(data, propsdata) {
        if (data.data) {
            getData(data);
        }
        setLoading(false);
    }

    function getData(data){
        let det = data.data;

            let dettemp = data.data;
            dettemp.notatype = SelPrintType;
            dettemp.transactiondate = det.transactiondate ? moment(new Date(det.transactiondate)).format(formatdate) : '';
            dettemp.currdatetime = moment(new Date()).format(formatdatetime) ;
            dettemp.currtime = moment(new Date()).format(formattimeHHmm);
            dettemp.currdate = moment(new Date()).format(formatdate) ;
            let deposits = [];
            if(det.deposits){
                for(let i=0; i < det.deposits.length; i++){
                    let detDepo = det.deposits[i];
                    let dettempDepo = det.deposits[i];
                    dettempDepo.date = detDepo.date ? moment(new Date(detDepo.date)).format(formatdate) : '';
                    deposits.push(dettempDepo);
                }
            }
            dettemp.deposits = deposits;

            let items = det.items;
            let charges = det.charges;
            let inventori = det.inventori;
            let totalData = 0;
            //jika data diatas 10, maka dibikin 2 halaman
            if(items){
                let listfilteroutput = items.filter(output => output.qtynota > 0 && output.type == 'H');
                totalData = totalData + listfilteroutput.length;
            }
            if(charges){
                let listfilteroutputcharges = charges.filter(output => output.qty > 0 && output.chargename !== 'SETORPINJAMAN');
                totalData = totalData + listfilteroutputcharges.length;
            }
            if(inventori){
                let listfilteroutputinventori = inventori.filter(output => output.qty > 0);
                totalData = totalData + listfilteroutputinventori.length;
            }
            
            if(totalData > 10){
                dettemp.totalpage = 2; 
            }else{
                dettemp.totalpage = 1; 
            }

            setValue(dettemp);

            setTimeout(() => {
                // generatePDF(det);
                setIsReady(true);
                // setFile(downloadLink(det));
            }, 1000);

            setTimeout(() => {
                setVisible(true);
              }, 950); // timeout 2 detik
    }

    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const viewPdfDocument = (printType, value) => {

        // return <PdfDocumentSupplier data={value} />
        if(printType == 'SUPPLIER'){
            if(value.totalpage == 1){
                return <PdfDocumentSupplier data={value} />
            }else{
                return <PdfDocumentSupplierLegal data={value} />
            }
            
        }else if(printType == 'PAJAK'){
            return <PdfDocumentPajak data={value} />
        }
        // else if(printType == 'PAJAK'){
        //     return <PdfDocumentPajak data={value} />
        // }
        return '';
    }

    const handleSuccesPDF = (dataUrl, namaFile) => {
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;//URL.createObjectURL(dataUrl);

        // it forces the name of the downloaded file
        fileLink.download = namaFile + '.pdf';
        fileLink.click();
        fileLink.remove();

    }

    function handleDownloadPDF() {
        // generatePDF();
    // const handleDownloadPDF = () => {
        setLoading(true);
        setIsReady(false);
        setVisible(false);
        localStorage.removeItem('PdfDocument');
        // dispatch(actions.getPurchaseReceiveData({ url: '/printnota/' + id+'/'+SelPrintType }, successHandlerAfterDownload, errorHandler));
        dispatch(actions.getPurchaseReceiveData({ url: '/catatdownload/' + id }, successHandlerDownload, errorHandler));
    }
    function successHandlerDownload(data, propsdata){
        dispatch(actions.getPurchaseReceiveData({ url: '/printnota/' + id+'/'+SelPrintType }, successHandlerAfterDownload, errorHandler));
    }

    function successHandlerAfterDownload(data, propsdata) {
        if (data.data) {
            getData(data);
        }
        
        setTimeout(() => {
            // generatePDF(det);
            handleSuccesPDF(localStorage.getItem("PdfDocument"), (data.data != null ? data.data.nodocument : fileName));
            setLoading(false);
            // setFile(downloadLink(det));
        }, 2000);
    }

    return (
        <div>
            <ContentWrapper>
                <ContentHeading history={history} link={pathmenu.printnota + '/' + id} label={'Print'} labeldefault={'Print'} />
                <div className="row mt-2">
                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                        <label className="mt-3 form-label required" htmlFor="SelPrintType">
                            {i18n.t('Jenis Nota')}
                        </label>
                        <DropdownList
                            name="SelPrintType"
                            filter='contains'
                            placeholder={i18n.t('select.SELECT_OPTION')}

                            onChange={val => handleChangePrintType(val)}
                            // onBlur={val => setFieldTouched("CategoryProduct", val?.value ? val.value : '')}
                            data={ListPrintType}
                            textField={'label'}
                            valueField={'value'}
                            value={SelPrintType}
                        />
                    </div>
                </div>
                <div className="row justify-content-center" style={{ marginTop: '-30px', marginBottom: '20px' }}>
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
                        color={'primary'}
                        onClick={() => generatePDF()}
                    >
                        {'Generate'}
                    </Button>

                    {/* <Button
                        // style={{marginLeft:"1%"}}
                        color={'primary'}
                        onClick={() => handleDownloadPDF()}
                    >
                        {'Download'}
                    </Button> */}
                </div>

                <Container fluid>
                    <Card>
                        <CardBody>
                            <Container fluid className="center-parent">
                                {
                                    IsReady ?
                                        <div className="App">
                                            <div className='download-link'>
                                                {/* <div onClick={() => handleSuccesPDF(localStorage.getItem("PdfDocument"), (Value != null ? 'SuratJalan-' + Value.nodocument : fileName))}>{"Download"}</div> */}
                                                <div onClick={() => handleSuccesPDF(localStorage.getItem("PdfDocument"), (Value != null ? Value.nodocument : fileName))}>{"Download"}</div>
                                                {/* <div onClick={() => handleDownloadPDF()}>{"Download"}</div> */}
                                            </div>
                                            {/* <div style={{backgroundColor:'#343439',width:'20%',height:'9%',position:'absolute',right:'15px', display: visible ? 'block' : 'none' }}></div> */}

                                            <PDFViewer style={{
                                                width: '100%',
                                                height: '100vh',
                                                border: 'none', // Remove any borders or default styles
                                            }} fileName={"myPdf.pdf"}
                                                width={800} height={500} >
                                                {viewPdfDocument(SelPrintType, Value)}

                                            </PDFViewer>


                                        </div>
                                        : ''
                                }
                            </Container>
                        </CardBody>
                    </Card>
                </Container>
            </ContentWrapper>
            {loading && <Loading />}
        </div>
    )


}