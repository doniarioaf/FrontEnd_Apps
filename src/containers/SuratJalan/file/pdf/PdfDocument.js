import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import GenerateSuratJalan from "./GenerateSuratJalan";
import logo from "./kseilogo.png";

const styles = StyleSheet.create({
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

const PdfDocument = ({ data }) => {
        return (
            <Document>
                <Page size="A4" style={styles.page} >
                <GenerateSuratJalan valuedata={data}/>
                </Page>
            </Document>
        )
    
    
}

export default PdfDocument;