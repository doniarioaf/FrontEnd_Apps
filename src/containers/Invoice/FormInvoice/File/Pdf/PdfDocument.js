import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import GenerateInvoice from "./GenerateInvoice";
import GenerateSuratJalan from "./GenerateSuratJalan";
import logo from "./logoinvoice.png";

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
        width: '100%',
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const checkSJ = (items) =>{
    let flag = false;
    if(items.lampiransuratjalan){
        let lamp = items.lampiransuratjalan;
        if(lamp.suratjalan){
            if(Array.isArray(lamp.suratjalan)){
                if(lamp.suratjalan.length > 0){
                    flag = true
                }
            }
            
        }
    }

    return flag;
}

const PdfDocument = ({ data }) => {
        return (
            <Document>
                <Page size="A4" style={styles.page} >
                <Image style={styles.logo} src={logo} />
                <GenerateInvoice valuedata={data}/>
                </Page>

                {/* {
                    checkSJ(data) ?
                    <Page size="A4" style={styles.page} >
                    <GenerateSuratJalan valuedata={data}/>
                    </Page>:[]
                } */}
                
            </Document>
        )
    
    
}

export default PdfDocument;