import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { checkValuePDf } from '../../../../shared/globalFunc';
import moment                          from 'moment';
import { formatdate } from '../../../../shared/constantValue';

const borderColor = 'black';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // borderBottomColor: '#3778C2',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    nosuratjalan: {
        width: '20%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    gudang: {
        width: '35%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    // partai: {
    //     width: '15%',
    //     textAlign: 'left',
    //     paddingLeft:'4px',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // },
    nocontainer: {
        width: '25%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    tanggal: {
        width: '20%',
        textAlign: 'left',
        paddingLeft:'4px',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    }
});

const setItems = (items) =>{
    if(items.lampiransuratjalan){
        let lamp = items.lampiransuratjalan;
        let list = [];
        for(let i=0; i < lamp.suratjalan.length; i++){
            let det = lamp.suratjalan[i];

            let obj = new Object();
                obj.nosj = det.nodocument;
                obj.warehouse = det.warehousename;
                obj.nocontainer = det.nocontainer;
                obj.tanggal = det.tanggalkembali?moment (new Date(det.tanggalkembali)).format(formatdate):'';
            if(lamp.partaiwo){
                let listpartai = lamp.partaiwo.filter(output => output.nocontainer == det.nocontainer);
                if(listpartai.length > 0){
                    for(let j=0; j < listpartai.length ; j++){
                        let obj1 = new Object();
                            obj1 = obj;
                            obj1.partai = listpartai[j].partainame;
                            list.push(obj1);
                    }
                }else{
                    obj.partai = '';
                    list.push(obj);
                }
            }else{
                obj.partai = '';
                list.push(obj);
            }
        }


        if(list.length > 0){
            let rows = [];
            let no = 1;
            for(let i=0; i < list.length; i++){
                let rowItem = [];
                let det = list[i];

                rowItem.push(<Text style={styles.nosuratjalan}>{checkValuePDf(det.nosj,' ')}</Text>);
                rowItem.push(<Text style={styles.gudang}>{checkValuePDf(det.warehouse,' ')}</Text>);
                // rowItem.push(<Text style={styles.partai}>{checkValuePDf(det.partai,' ')}</Text>);
                rowItem.push(<Text style={styles.nocontainer}>{checkValuePDf(det.nocontainer,' ')}</Text>);
                rowItem.push(<Text style={styles.tanggal}>{checkValuePDf(det.tanggal,' ')}</Text>);
                rows.push(<View style={styles.row} key={no}>{rowItem}</View>);
                no++;
            }

            return rows;
        }

    }

    return [];
}

const ContainerTableItemsValue = ({ items }) => {
    return (<Fragment>{setItems(items)}</Fragment>)
};
export default ContainerTableItemsValue;