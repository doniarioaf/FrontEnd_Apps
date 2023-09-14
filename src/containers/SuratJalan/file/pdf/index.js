import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
// import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../../components/Layout/ContentHeading';
import * as pathmenu           from '../../../shared/pathMenu';
import { Loading } from '../../../../components/Common/Loading';
import PdfDocument from './PdfDocument';
import './App.css';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {useHistory}                 from 'react-router-dom';
import {useDispatch}   from 'react-redux';
import * as actions                 from '../../../../store/actions';
import Swal             from "sweetalert2";
import { formatdate } from '../../../shared/constantValue';
import moment                          from 'moment';
import { jsPDF } from "jspdf";

const SuratJalanIndex = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);
    const fileName = "SuratJalan.pdf";

    const id = props.match.params.id;
    
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getSuratJalanData('/print/'+id,successHandler, errorHandler));
    }, [dispatch]);

    const successHandler = (data) =>{
        if(data.data){
            let dettemp = data.data;
            let det = data.data;
            det.tanggal = dettemp.tanggal ?moment (new Date(dettemp.tanggal)).format(formatdate):'';
            setValue(det);
            

            // setIsReady(true);
            setTimeout(() => {
                // generatePDF(det);
                setIsReady(true);
            }, 1000);
        }
        
        setLoading(false);
    }

    const generatePDF = (value) =>{
        console.log("generatePDF ",value);
        //http://raw.githack.com/MrRio/jsPDF/master/index.html
        //http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#setFont
        let fontSizeNormal = 10;
        let fontSizeBig = 15;
        let spaceaddUpDown = 0.6;
        let spaceUpDown = 1;
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "cm",
            format: [21.5, 14]
        });
        doc.setFont("", "bold");
        doc.setFontSize(fontSizeNormal);
        doc.text(value.companyname, 1, spaceUpDown); doc.text("SURAT JALAN", 18, 1);
        spaceUpDown = spaceUpDown + spaceaddUpDown;
        doc.text(value.compaddress, 1, spaceUpDown); 
        
        doc.setFont("", "normal");
        doc.text("No. SJ  : "+value.nodocument, 16, spaceUpDown);
        spaceUpDown = spaceUpDown + spaceaddUpDown;
        doc.text("No. AJU  : "+value.noajuWO, 16, spaceUpDown);


        spaceUpDown = spaceUpDown + spaceaddUpDown;
        doc.text("Customer : "+value.customertype+". "+value.namacustomer, 1, spaceUpDown);

        doc.save("SuratJalan-"+value.nodocument+".pdf");
    }

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }
    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.printSuratJalan} label={'Print Surat Jalan'} labeldefault={'Print Surat Jalan'} />
            <Container fluid>
            <Card>
            <CardBody>
            <Container fluid className="center-parent">
                {
                    IsReady?
                    <div className="App">
                <div className='download-link'>
                <PDFDownloadLink
                    document={<PdfDocument data={Value} />}
                    fileName={Value != null?'SuratJalan-'+Value.nodocument+'.pdf':fileName}
                    >
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading..." : "Download"
                    }
                    </PDFDownloadLink>
                </div>

                <PDFViewer width={800} height={500} showToolbar={false}>
                <PdfDocument data={Value} />
                </PDFViewer>
                </div>:''
                }
                
            
            </Container>
            </CardBody>
            </Card>
            </Container>
            {loading && <Loading/>}    
        </ContentWrapper>
        
    )
};
export default SuratJalanIndex;