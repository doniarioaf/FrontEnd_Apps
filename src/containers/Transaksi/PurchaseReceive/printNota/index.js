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
// import PdfDocumentInternal from './PdfDocumentInternal';
// import PdfDocumentPajak from './PdfDocumentPajak';

import { formatdate, formatdatetime } from '../../../shared/constantValue';
import moment from 'moment';
import './App.css';

export default function PrintNota(props) {
    reloadToHomeNotAuthorize(MenuPurchaseReceive, 'READ');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ListPrintType, setListPrintType] = useState([{ value: 'SUPPLIER', label: 'Supplier' }, { value: 'INTERNAL', label: 'Internal' }, { value: 'PAJAK', label: 'Pajak' }]);
    const [SelPrintType, setSelPrintType] = useState('SUPPLIER');

    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);

    const [visible, setVisible] = useState(false);


    const id = props.match.params.id;

    const fileName = "PurchaseReceive";

    const handleChangePrintType = (data) => {
        let id = data?.value ? data.value : '';
        setSelPrintType(id);
    }

    function generatePDF() {
        setLoading(true);
        setIsReady(false);
        dispatch(actions.getPurchaseReceiveData({ url: '/printnota/' + id }, successHandler, errorHandler));
    }

    function successHandler(data, propsdata) {
        if (data.data) {
            let det = data.data;

            let dettemp = data.data;
            dettemp.notatype = SelPrintType;
            dettemp.transactiondate = det.transactiondate ? moment(new Date(det.transactiondate)).format(formatdate) : '';
            dettemp.currdatetime = moment(new Date()).format(formatdatetime) ;
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
        setLoading(false);
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

        return <PdfDocumentSupplier data={value} />
        // if(printType == 'SUPPLIER'){
        //     return <PdfDocumentSupplier data={value} />
        // }else if(printType == 'INTERNAL'){
        //     return <PdfDocumentInternal data={value} />
        // }else if(printType == 'PAJAK'){
        //     return <PdfDocumentPajak data={value} />
        // }
        // return '';
    }

    const handleSuccesPDF = (dataUrl, namaFile) => {
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;//URL.createObjectURL(dataUrl);

        // it forces the name of the downloaded file
        fileLink.download = namaFile + '.pdf';
        fileLink.click();
        fileLink.remove();

    }

    return (
        <div>
            <ContentWrapper>
                <ContentHeading history={history} link={pathmenu.printnota + '/' + id} label={'Nota'} labeldefault={'Nota'} />
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
                                            </div>
                                            <div style={{backgroundColor:'#343439',width:'20%',height:'9%',position:'absolute',right:'15px', display: visible ? 'block' : 'none' }}></div>

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