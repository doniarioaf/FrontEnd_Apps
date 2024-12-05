import React from "react";
import { Page, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
// import GenerateSuratJalan from "./GenerateSuratJalan";
import GenerateSupplier from "./GenerateSupplier";

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

const PdfDocument = ({ data }) => {

    return (
        <Document onRender={(blob) => onRenderDocument(blob, "")} title={(data != null ? data.nodocument : '')}>
            {/* <Page size="A5"   style={styles.page} > */}
            <Page size="letter" orientation="portrait" style={styles.page} >
                <GenerateSupplier valuedata={data} />

            </Page>
        </Document>
    )


}

export default PdfDocument;