import React from "react";
import { Page, Document, StyleSheet, Image, Font,Text } from "@react-pdf/renderer";
// import GenerateSuratJalan from "./GenerateSuratJalan";
import GenerateInternal from "./GenerateInternal";
import './App.css';
export const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 10,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    footer:{
        // position:'relative',
        // paddingTop:300,
        // // left:0,
        // // right:0,
        textAlign:'right',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const onRenderDocument = ({ blob, filename }) => {
    var blobUrl = URL.createObjectURL(blob);
    localStorage.setItem("PdfDocument", blobUrl);
    // saveDocument(blobUrl, filename);
};

const options = {
    showToolbar: false,
  };

  const handlePrint = () => {
    // Kode cetak kustom
    // window.print();
    console.log('handlePrint');
  };
const PdfDocument = ({ data }) => {

    return (
        <Document onPrint={handlePrint}  onRender={(blob) => onRenderDocument(blob, "")} title={(data != null ? data.nodocument : '')}>
            {/* <Page size="A5"   style={styles.page} > */}
            <Page size="letter" orientation="portrait" style={styles.page} wrap>
                <GenerateInternal valuedata={data} />
                {/* <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed /> */}
                {/* <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    // `${pageNumber} / ${totalPages}`
                    `Edit : ${(data != null?data.countEdit:'')} Print : ${(data != null?(data.countPrint?data.countPrint+1:1):'')} Dicetak Oleh: ${(data != null?data.namaUser+' ,'+data.currdatetime:'')}`
                )} fixed /> */}
            </Page>
        </Document>
    )


}

export default PdfDocument;