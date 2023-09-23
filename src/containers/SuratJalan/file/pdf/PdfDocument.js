import React from "react";
import { Page, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
// import GenerateSuratJalan from "./GenerateSuratJalan";
import GenerateSuratJalanV1 from "./GenerateSuratJalanV1";
// import logo from "./kseilogo.png";


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

// const saveDocument = (dataUrl, namaFile) => {
//     // var blob = new Blob([data,{ type: 'application/pdf' }]);
//     // var dataUrl = URL.createObjectURL(blob);

//     var fileLink = document.createElement('a');
//     fileLink.href = dataUrl;

//     // it forces the name of the downloaded file
//     fileLink.download = namaFile + '.pdf';
//     fileLink.click();
//     fileLink.remove();

// }
// const saveDocument = (function () {
//     var a = document.createElement("a");
//     document.body.appendChild(a);
//     a.style = "display: none";
//     return function (blob, fileName) {
//         a.href = blob;
//         a.download = fileName;
//         a.click();
//         window.URL.revokeObjectURL(blob);
//     };
// }());

const PdfDocument = ({ data }) => {

    return (
        <Document onRender={(blob) => onRenderDocument(blob, "")} title={(data != null ? data.nodocument : '')}>
            {/* <Page size="A5"   style={styles.page} > */}
            <Page size="letter" orientation="portrait" style={styles.page} >
                <GenerateSuratJalanV1 valuedata={data} />
            </Page>
        </Document>
    )


}

export default PdfDocument;