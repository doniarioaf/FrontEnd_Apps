import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import PdfDocument from './PdfDocument';
import InvoiceData from './InvoiceData';
import './App.css';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const InvoiceIndex = () => {
    const fileName = "Invoice.pdf";

    return (
        <ContentWrapper>
            <div className="content-heading">
                {/* <span><Trans t={t} i18nKey={'label_CUSTOMER'}>Customer</Trans></span> */}
            </div>
            <Container fluid>
            <Card>
            <CardBody>
            <Container fluid className="center-parent">
            <div className="App">
            <PDFViewer width={800} height={500} showToolbar={false}>
                <PdfDocument invoicedata={InvoiceData} />
            </PDFViewer>

            <div className='download-link'>
                <PDFDownloadLink
                document={<PdfDocument invoicedata={InvoiceData} />}
                fileName={fileName}
                >
                {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : "Download Invoice"
                }
                </PDFDownloadLink>
            </div>
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default InvoiceIndex;