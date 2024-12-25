import React, { useState , useEffect} from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../../components/Layout/ContentHeading';
import * as actions from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../../shared/globalFunc';
import { MenuInvoice } from '../../../shared/permissionMenu';
import * as pathmenu from '../../../shared/pathMenu';
import "react-widgets/dist/css/react-widgets.css";

import { PDFViewer } from '@react-pdf/renderer';
import PdfDocumentInvoice from './PdfDocumentInvoice';

import { formatdate } from '../../../shared/constantValue';
import moment from 'moment';
import '../../PurchaseReceive/printNota/App.css';

export default function PrintNotaInvoice(props) {
    reloadToHomeNotAuthorize(MenuInvoice, 'READ');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);

    const [visible, setVisible] = useState(false);


    const id = props.match.params.id;

    const fileName = "Invoice";

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceData( {url:'/print/'+id},successHandler, errorHandler));
    }, [dispatch]);

    function successHandler(data,propsdata) {
        let det = data.data;
        let dettemp = data.data;
        dettemp.date = det.date ? moment(new Date(det.date)).format(formatdate) : '';
        setValue(dettemp);

        setTimeout(() => {
            // generatePDF(det);
            setIsReady(true);
            // setFile(downloadLink(det));
        }, 1000);

        setTimeout(() => {
            setVisible(true);
          }, 950);
          setLoading(false);
    }

    const handleSuccesPDF = (dataUrl, namaFile) => {
        // var blob = new Blob([data,{ type: 'application/pdf' }]);
        // var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;//URL.createObjectURL(dataUrl);

        // it forces the name of the downloaded file
        fileLink.download = namaFile + '.pdf';
        fileLink.click();
        fileLink.remove();

    }

    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    return (
            <div>
                <ContentWrapper>
                    <ContentHeading history={history} link={pathmenu.printpdfinvoice + '/' + id} label={'PDF Invoice'} labeldefault={'PDF Invoice'} />
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
                                                <div style={{backgroundColor:'#343439',width:'20%',height:'9%',position:'absolute',right:'15px', display: visible ? 'block' : 'none' }}></div>
    
                                                <PDFViewer style={{
                                                    width: '100%',
                                                    height: '100vh',
                                                    border: 'none', // Remove any borders or default styles
                                                }} fileName={"myPdf.pdf"}
                                                    width={800} height={500} >
                                                    <PdfDocumentInvoice data={Value} />
    
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