import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
// import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../../../components/Layout/ContentHeading';
import * as pathmenu           from '../../../../shared/pathMenu';
import { Loading } from '../../../../../components/Common/Loading';
import PdfDocument from './PdfDocument';
import './App.css';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {useHistory}                 from 'react-router-dom';
import {useDispatch}   from 'react-redux';
import * as actions                 from '../../../../../store/actions';
import Swal             from "sweetalert2";
import { formatdate } from '../../../../shared/constantValue';
import moment                          from 'moment';

const CetakInvoiceIndex = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [Value, setValue] = useState(null);
    const [IsReady, setIsReady] = useState(false);
    const fileName = "Invoice.pdf";

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInvoiceData('/printinvoice/'+id,successHandler, errorHandler));
    }, [dispatch]);

    const successHandler = (data) =>{
        if(data.data){
            let dettemp = data.data;
            let det = data.data;
            det.tanggal = dettemp.tanggal ?moment (new Date(dettemp.tanggal)).format(formatdate):'';
            det.deliverydate = dettemp.deliverydate ?moment (new Date(dettemp.deliverydate)).format(formatdate):'';

            let flag = true;
            // if(det.idwo != undefined && det.idwo != null && det.idinvoicetype !== 'DP'){
            //     if(det.idwo > 0){
            //         flag = false;
            //         dispatch(actions.getInvoiceDataParam('/suratjalan/'+det.idwo,det,successHandlerSJ, errorHandlerSJ));
            //     }
            // }

            if(flag){
                setValue(det);

            // setIsReady(true);
                setTimeout(() => {
                    setIsReady(true);
                    
                }, 1000);

                setLoading(false);
            }
            

        }
    }

    function successHandlerSJ(data,param) {
        let det = param;
        det.lampiransuratjalan = data.data;
        setValue(det);

    // setIsReady(true);
        setTimeout(() => {
            setIsReady(true);
            
        }, 1000);

        setLoading(false);
    }
    const errorHandlerSJ = (data,param) => {
        setValue(param);

    // setIsReady(true);
        setTimeout(() => {
            setIsReady(true);
            
        }, 1000);

        setLoading(false);
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
            <ContentHeading history={history} link={pathmenu.printInvoice+'/'+id} label={'Print Invoice'} labeldefault={'Print Invoice'} />
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
                    fileName={Value != null?'Invoice-'+Value.nodocument+'.pdf':fileName}
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
export default CetakInvoiceIndex;