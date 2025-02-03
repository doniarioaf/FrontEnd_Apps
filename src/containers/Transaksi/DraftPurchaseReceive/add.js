import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { formatRupiah, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { addDraftPurchaseReceive_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DropdownList, DatePicker } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
// import { calculateTotalPrice, setPriceBoxOngkosByVendor } from './utilityPurchaseReceive';

export default function AddDraftPurchaseReceive(props) {
    reloadToHomeNotAuthorize(addDraftPurchaseReceive_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [DraftReceiveDate, setDraftReceiveDate] = useState(new Date());
    const [ErrDraftReceiveDate, setErrDraftReceiveDate] = useState("");

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputArrivalHours, setInputArrivalHours] = useState('');
    const [InputArrivalMinute, setInputArrivalMinute] = useState('');
    const [ErrInputArrivalTime, setErrInputArrivalTime] = useState('');

    const [InputReceiveHours, setInputReceiveHours] = useState('');
    const [InputReceiveMinute, setInputReceiveMinute] = useState('');
    const [ErrInputReceiveTime, setErrInputReceiveTime] = useState('');

    const [InputSMU, setInputSMU] = useState('');

    const [InputGrandTotalKilo, setInputGrandTotalKilo] = useState(0);
    const [InputGrandTotalEkor, setInputGrandTotalEkor] = useState(0);
    const [InputPersentase, setInputPersentase] = useState(0);

    // const [ListCategory, setListCategory] = useState([{idcategoryproduct:1,size:'A',weight:'0-50 Gram',listtotal:[{label:'Total Ekor',code:'totalekor',total:0},{label:'Total Kg',code:'totalkg',total:0}] },{idcategoryproduct:2,size:'B',weight:'50-100 Gram',listtotal:[{label:'Total Ekor',code:'totalekor',total:0},{label:'Total Kg',code:'totalkg',total:0}]},{idcategoryproduct:3,size:'C',weight:'100-150 Gram',listtotal:[{label:'Total Ekor',code:'totalekor',total:0},{label:'Total Kg',code:'totalkg',total:0}]}]);
    const [ListCategory, setListCategory] = useState([]);
    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState('');
    const [ListItemsMati, setListItemsMati] = useState([]);
    const [ErrItemsMati, setErrItemsMati] = useState('');

    const [ListProduct, setListProduct] = useState([]);

    const [InputFlightNo, setInputFlightNo] = useState('');
    const [InputNotes1, setInputNotes1] = useState('');
    const [InputNotes2, setInputNotes2] = useState('');
    const [InputBox, setInputBox] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getDraftPurchaseReceiveData({ url: '/template' }, successHandler, errorHandler));
    }, []);
    function successHandler(data, propsdata) {
        if (data.data) {
            let listfilteroutput = data.data.vendorOpt.filter(output => output.type == 'UDANG');
            const theData = listfilteroutput.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama + ' (' + el.alias + ')',
                    'data': el
                }
            ], []);
            setListVendor(theData);

            const theDataProd = data.data.productOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            setListProduct(theDataProd);

        }

        setLoading(false);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrDraftReceiveDate('');
        setErrSelVendor('');
        setErrInputArrivalTime('');
        setErrInputReceiveTime('');
        setErrItems('');
        setErrItemsMati('');

        if(values.arrivalhours == '' || values.arrivalminute == ''){
            setErrInputArrivalTime(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(values.receivehours == '' || values.receiveminute == ''){
            setErrInputReceiveTime(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(values.grandtotalekor == ''){
            setErrItems('Item '+i18n.t('label_REQUIRED'));
            flag = false;
        }else if(parseInt(values.grandtotalekor) == 0){
            setErrItems('Item '+i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (DraftReceiveDate == null) {
            setErrDraftReceiveDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (SelVendor == '') {
            setErrSelVendor(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const succesHandlerSubmit = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.goBack();
            }
        })
    }

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            let obj = new Object();
            obj.date = DraftReceiveDate.getTime();
            obj.idvendor = SelVendor;
            obj.arriveltime = values.arrivalhours+':'+values.arrivalminute;
            obj.receivetime = values.receivehours+':'+values.receiveminute;
            obj.smu = values.smu;
            obj.totalekor = InputGrandTotalEkor !== ''?removeFormatRupiah(InputGrandTotalEkor):0;
            obj.totalkg = InputGrandTotalKilo !== ''?removeFormatRupiah(InputGrandTotalKilo):0;
            obj.persentase = removeFormatRupiah(InputPersentase);
            let items = [];
            let no = 1;
            if(ListItems.length > 0){
                for(let i=0; i < ListItems.length; i++){
                    let detItems = ListItems[i];
                    for(let x=0; x < ListCategory.length; x++){
                        let detCp = ListCategory[x];
                        let listfilteroutput = detItems.items.filter(output => output.idcategoryproduct == detCp.idcategoryproduct);
                        let det = listfilteroutput[0];
                        let indexItemsEkor = listfilteroutput.findIndex(obj => obj.jumlahtype == 'EKOR');
                        let indexItemsKg = listfilteroutput.findIndex(obj => obj.jumlahtype == 'KG');
                        let jumlahEkor = listfilteroutput[indexItemsEkor]['jumlah'];
                        jumlahEkor = jumlahEkor && jumlahEkor !== ''?jumlahEkor:0;

                        let jumlahKg = listfilteroutput[indexItemsKg]['jumlah'];
                        jumlahKg = jumlahKg && jumlahKg !== ''?jumlahKg:0;

                        let objItem = new Object();
                        objItem.idproduct = det.idproduct;
                        objItem.idcategoryproduct = det.idcategoryproduct;
                        objItem.ekor = removeFormatRupiah(jumlahEkor);
                        objItem.kilo = removeFormatRupiah(jumlahKg);
                        objItem.boxsequence = no;
                        objItem.type = 'H';
                        items.push(objItem);
                    }
                    no++;
                }
            }
            if(ListItemsMati.length > 0){
                for(let i=0; i < ListItemsMati.length; i++){
                    let detItems = ListItemsMati[i];
                    for(let y=0; y < detItems.items.length; y++){
                        let det = detItems.items[y];

                        let objItem = new Object();
                        objItem.idproduct = det.idproduct;
                        objItem.idcategoryproduct = det.idcategoryproduct;
                        objItem.ekor = det.jumlah && det.jumlah !== ''?removeFormatRupiah(det.jumlah):0;
                        objItem.kilo = 0;
                        objItem.boxsequence = no;
                        objItem.type = 'M';
                        items.push(objItem);
                    }
                    no++;
                }
            }
            obj.items = items;
            obj.flightno = values.flightno;
            obj.notes1 = values.notes1;
            obj.notes2 = values.notes2;
            obj.box = values.box !== ''?values.box:0;
            // console.log('OBJ ',obj);
            dispatch(actions.submitDraftPurchaseReceive({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }
    }

    const submitHandler = (values) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit(values);
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleChangeDraftReceiveDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setDraftReceiveDate(datetrans)
        } else {
            setDraftReceiveDate(null)
        }
    }

    const handleChangeVendor = (data) => {
        let id = data?.value ? data.value : '';
        setSelVendor(id);
        setListItems([]);
        setListCategory([]);

        setLoading(true);
        dispatch(actions.getDraftPurchaseReceiveData({ url: '/searchvendor?idvendor=' + id }, successHandlerVendor, errorHandler));
    }

    function successHandlerVendor(data, propsdata) {
        const theDataCategoryProd = data.data.categoryproductOpt.reduce((obj, el) => [
            ...obj,
            {
                'idcategoryproduct': el.id,
                'size': el.size,
                'weight': el.weightfromingram+'-'+el.weighttoingram+' Gram',
                'listtotal':[{label:'Total Ekor',code:'totalekor',total:0},{label:'Total Kg',code:'totalkg',total:0}]
            }
        ], []);
        setListCategory(theDataCategoryProd);
        // let list = [];
        // for(let i=0;i < 3; i++){
        //     for(let y=0;y < data.data.categoryproductOpt.length; y++){
        //         let el = data.data.categoryproductOpt[y];
        //         list.push(
        //             {
        //                 'idcategoryproduct': el.id,
        //                 'size': el.size,
        //                 'weight': el.weightfromingram+'-'+el.weighttoingram+' Gram',
        //                 'listtotal':[{label:'Total Ekor',code:'totalekor',total:0},{label:'Total Kg',code:'totalkg',total:0}]
        //             }
        //         );
        //     }
        // }
        // setListCategory(list);
        setLoading(false);
    }
    const handleAddItemsMati = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length > 0) {
            idproduct = ListProduct[0].value;
        }
        let listitems = [...ListItemsMati];
        let temp = [];
        for(let i=0; i < ListCategory.length; i++){
            let det = ListCategory[i];
            temp.push(
                {
                    'idproduct': idproduct,
                    'idcategoryproduct': det.idcategoryproduct,
                    'jumlah':'',
                }
            );
        }
        listitems.push(
            {
                'items':temp
            }
        )
        setListItemsMati(listitems);
    }
    const handleAddItems = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length > 0) {
            idproduct = ListProduct[0].value;
        }
        let listitems = [...ListItems];
        let no = listitems.length + 1;
        let temp = [];
        for(let i=0; i < ListCategory.length; i++){
            let det = ListCategory[i];
            temp.push(
                {
                    'idproduct': idproduct,
                    'idcategoryproduct': det.idcategoryproduct,
                    'jumlah':'',
                    'jumlahtype':'EKOR'
                }
            );

            temp.push(
                {
                    'idproduct': idproduct,
                    'idcategoryproduct': det.idcategoryproduct,
                    'jumlah':'',
                    'jumlahtype':'KG'
                }
            );
        }
        listitems.push(
            {
                'no':no,
                'items':temp
            }
        )
        setListItems(listitems);
        
    };
    const handleInputChangeItemsMati = (e, index, indexcol) => {
        const { name, value } = e.target;

        let flag = true;
        let valTemp = '';
        if(new String(value).includes(',')){
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            valTemp = removeFormatRupiah(angka)+'.'+desimal;
        }else{
            valTemp = removeFormatRupiah(value);
        }
        if(isNaN(valTemp) || new String(value).endsWith('.') || new String(value).includes(',')){
            flag = false;
        }
        if(flag){
        const list = [...ListItemsMati];
        const listitems = list[index]['items'];
        listitems[indexcol][name] = value;
        list[index]['items'] = listitems;
        setListItemsMati(list);
        calculatePersentase(InputGrandTotalEkor,list);
        }
    }
    const handleRemoveItemsMati = (index) => {
        const list = [...ListItemsMati];
        list.splice(index, 1);
        setListItemsMati(list);
        calculatePersentase(InputGrandTotalEkor,list);
    }
    const handleInputChangeItems = (e, index, indexcol,idcategoryproduct) => {
        const { name, value } = e.target;

        let flag = true;
        let valTemp = '';
        if(new String(value).includes(',')){
            let valEndSubstring = 2;
            if(name == 'KG'){
                valEndSubstring = 3;
            }
            let splitComma = new String(value).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,valEndSubstring):'';
            valTemp = removeFormatRupiah(angka)+'.'+desimal;
        }else{
            valTemp = removeFormatRupiah(value);
        }
        if(name == 'EKOR'){
            if(isNaN(valTemp) || new String(value).endsWith('.') || new String(value).includes(',')){
                flag = false;
            }
        }
        if(name == 'KG'){
            if(isNaN(valTemp) || new String(value).includes('.')){
                flag = false;
            }else if (isNaN(value) && value !== '') {
                flag = false;
                if(new String(value).split(',').length >= 3){
                    flag = false;
                }else{
                    flag = true;
                    let arr = new String(value).split(',');
                    if(arr.length > 0){
                        let valArr1 = arr[1];
                        if(new String(valArr1).length > 3){
                            flag = false;
                        }
                    }
                }
            }
        }
        if(flag){
            const list = [...ListItems];
            const listitems = list[index]['items'];
            // listitems[indexcol]['jumlah'] = formatRupiah(value,2);
            listitems[indexcol]['jumlah'] = value;
            list[index]['items'] = listitems;
            setListItems(list);

            let totalekor = 0;
            let totalkg = 0;
            for(let i=0; i < list.length; i++){
                let det = list[i];
                let listfilteroutput = det.items.filter(output => output.idcategoryproduct == idcategoryproduct && output.jumlahtype == name);
                for(let y=0; y < listfilteroutput.length; y++){
                    let detItems = listfilteroutput[y];
                    let jumlah = detItems.jumlah && detItems.jumlah !== ''?detItems.jumlah:0;
                    let valTemp = '';
                    if(new String(jumlah).includes(',')){
                        let valEndSubstring = 2;
                        if(name == 'KG'){
                            valEndSubstring = 3;
                        }

                        let splitComma = new String(jumlah).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,valEndSubstring):'';
                        valTemp = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        valTemp = removeFormatRupiah(jumlah);
                    }
                    if(name == 'EKOR'){
                        totalekor += parseFloat(valTemp);
                    }else if(name == 'KG'){
                        totalkg += parseFloat(valTemp);
                    }
                }
            }

            
            let listtotal = [...ListCategory];
            let indexItems = listtotal.findIndex(obj => obj.idcategoryproduct == idcategoryproduct);
            const listtotalitems = listtotal[indexItems]['listtotal'];
            let indexTotalItems = -1;
            if(name == 'EKOR'){
                indexTotalItems = listtotalitems.findIndex(obj => obj.code == 'totalekor');
                listtotalitems[indexTotalItems]['total'] = formatRupiah(totalekor,2);
            }else if(name == 'KG'){
                indexTotalItems = listtotalitems.findIndex(obj => obj.code == 'totalkg');
                listtotalitems[indexTotalItems]['total'] = formatRupiah(new String(totalkg.toFixed(3)).replaceAll('.',','),3);
            }
            listtotal[indexItems]['listtotal'] = listtotalitems;
            let obj = calculateGrandTotal(listtotal);
            calculatePersentase(obj.grandTotalEkor,ListItemsMati);
            setListCategory(listtotal);
        }
    }

    const handleRemoveItems = (index) => {
        const list = [...ListItems];
        // const listitems = list[index]['items'];

        let listtotal = [...ListCategory];

        // for(let i=0; i < list.length; i++){
            let det = list[index];
            let listfilteroutput = det.items;
            for(let y=0; y < listfilteroutput.length; y++){
                let detItems = listfilteroutput[y];
                let jumlah = detItems.jumlah && detItems.jumlah !== ''?detItems.jumlah:0;
                if(new String(jumlah).includes(',')){
                    let splitComma = new String(jumlah).split(','); 
                    let angka = splitComma[0];
                    let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                    jumlah = removeFormatRupiah(angka)+'.'+desimal;
                }else{
                    jumlah = removeFormatRupiah(jumlah);
                }

                let indexItems = listtotal.findIndex(obj => obj.idcategoryproduct == detItems.idcategoryproduct);
                const listtotalitems = listtotal[indexItems]['listtotal'];
                let indexTotalItems = -1;
                if(detItems.jumlahtype == 'EKOR'){
                    indexTotalItems = listtotalitems.findIndex(obj => obj.code == 'totalekor');
                    let totalekor = listtotalitems[indexTotalItems]['total'];
                    totalekor = totalekor && totalekor !== ''?totalekor:0;
                    if(new String(totalekor).includes(',')){
                        let splitComma = new String(totalekor).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                        totalekor = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        totalekor = removeFormatRupiah(totalekor);
                    }

                    listtotalitems[indexTotalItems]['total'] = formatRupiah(parseFloat(totalekor) - parseFloat(jumlah),2);
                }else if(detItems.jumlahtype == 'KG'){
                    indexTotalItems = listtotalitems.findIndex(obj => obj.code == 'totalkg');
                    let totalkg = listtotalitems[indexTotalItems]['total'];
                    totalkg = totalkg && totalkg !== ''?totalkg:0;
                    if(new String(totalkg).includes(',')){
                        let splitComma = new String(totalkg).split(','); 
                        let angka = splitComma[0];
                        let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                        totalkg = removeFormatRupiah(angka)+'.'+desimal;
                    }else{
                        totalkg = removeFormatRupiah(totalkg);
                    }

                    listtotalitems[indexTotalItems]['total'] = formatRupiah(parseFloat(totalkg) - parseFloat(jumlah),2);
                }
                listtotal[indexItems]['listtotal'] = listtotalitems;
            }
        // }
        setListCategory(listtotal);

        list.splice(index, 1);
        let obj = calculateGrandTotal(listtotal);
        calculatePersentase(obj.grandTotalEkor,ListItemsMati);
        setListItems(list);
    }

    function calculateGrandTotal(listcategory){
        let grandTotalEkor = 0;
        let grandTotalKg = 0;
        for(let i=0; i < listcategory.length; i++){
            let det = listcategory[i];
            let indexTotalItemsEkor = det.listtotal.findIndex(obj => obj.code == 'totalekor');
            let indexTotalItemsKg = det.listtotal.findIndex(obj => obj.code == 'totalkg');
            let totalEkor = det.listtotal[indexTotalItemsEkor]['total'];
            totalEkor = totalEkor && totalEkor !== ''?totalEkor:0;

            if(new String(totalEkor).includes(',')){
                let splitComma = new String(totalEkor).split(','); 
                let angka = splitComma[0];
                let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                totalEkor = removeFormatRupiah(angka)+'.'+desimal;
            }else{
                totalEkor = removeFormatRupiah(totalEkor);
            }

            let totalKg = det.listtotal[indexTotalItemsKg]['total'];
            totalKg = totalKg && totalKg !== ''?totalKg:0;

            if(new String(totalKg).includes(',')){
                let splitComma = new String(totalKg).split(','); 
                let angka = splitComma[0];
                let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,3):'';
                totalKg = removeFormatRupiah(angka)+'.'+desimal;
            }else{
                totalKg = removeFormatRupiah(totalKg);
            }

            grandTotalEkor += parseFloat(totalEkor);
            grandTotalKg += parseFloat(totalKg);
        }
        
        setInputGrandTotalEkor(formatRupiah(grandTotalEkor,2));
        setInputGrandTotalKilo(formatRupiah(new String(grandTotalKg.toFixed(3)).replaceAll('.',','),3));

        return {'grandTotalEkor':grandTotalEkor,'grandTotalKg':grandTotalKg}
    }

    function calculatePersentase(grandtotalekor,listitemmati){
        let totalItemMati = 0;
        for(let i=0; i < listitemmati.length; i++){
            let det = listitemmati[i];
            for(let y=0; y < det.items.length; y++){
                let detItems = det.items[y];
                    //items
                let jumlah = detItems.jumlah?detItems.jumlah:0;
                let valTemp = '';
                if(new String(jumlah).includes(',')){
                    let splitComma = new String(jumlah).split(','); 
                    let angka = splitComma[0];
                    let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
                    valTemp = removeFormatRupiah(angka)+'.'+desimal;
                }else{
                    valTemp = removeFormatRupiah(jumlah);
                }
                totalItemMati += parseFloat(valTemp);
            }
        }
        let grandtotalekorTemp = grandtotalekor && grandtotalekor !== ''?grandtotalekor:0
        if(new String(grandtotalekorTemp).includes(',')){
            let splitComma = new String(grandtotalekorTemp).split(','); 
            let angka = splitComma[0];
            let desimal = splitComma[1] !== undefined?new String(splitComma[1]).substring(0,2):'';
            grandtotalekorTemp = removeFormatRupiah(angka)+'.'+desimal;
        }else{
            grandtotalekorTemp = removeFormatRupiah(grandtotalekorTemp);
        }
        let persentase = 0;
        if(totalItemMati > 0 && grandtotalekorTemp > 0){
            persentase = (parseFloat(totalItemMati / grandtotalekorTemp)) * 100;
        }else if(totalItemMati > 0){
            persentase = 100;
        }
         
        setInputPersentase(formatRupiah(persentase,2));
    }

    return (
        <Formik
            initialValues={
                {
                    draftreceivedate: DraftReceiveDate,
                    vendor: SelVendor,
                    arrivalhours:InputArrivalHours,
                    arrivalminute:InputArrivalMinute,
                    receiveminute:InputReceiveMinute,
                    receivehours:InputReceiveHours,
                    grandtotalekor:InputGrandTotalEkor,
                    grandtotalkilo:InputGrandTotalKilo,
                    persentase:InputPersentase,
                    smu:InputSMU,
                    flightno:InputFlightNo,
                    notes1:InputNotes1,
                    notes2:InputNotes2,
                    box:InputBox
                }
            }
            validate={values => {
                const errors = {};
                setInputArrivalHours(values.arrivalhours);
                setInputArrivalMinute(values.arrivalminute);
                setInputReceiveHours(values.receivehours);
                setInputReceiveMinute(values.receiveminute);
                setInputSMU(values.smu);
                setInputFlightNo(values.flightno);
                setInputNotes1(values.notes1);
                setInputNotes2(values.notes2);
                setInputBox(values.box);
                return errors;
            }}
            enableReinitialize="true"
            onSubmit={(values) => {

            }}
        >
            {
                formikProps => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldTouched,
                        setFieldValue,
                    } = formikProps;

                    return (
                        <form className="mb-6" onSubmit={handleSubmit} name="FormDraftPurchaseReceive">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addpurchasereceive} label={'Add Input Penerimaan Barang'} labeldefault={'Add Input Penerimaan Barang'} />
                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="vendor">
                                            {i18n.t('Vendor')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="vendor"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeVendor(val)}
                                            onBlur={val => setFieldTouched("vendor", val?.value ? val.value : '')}
                                            data={ListVendor}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.vendor}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelVendor}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Receive Date')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="draftreceivedate"
                                            onChange={val => handleChangeDraftReceiveDate(val)}
                                            format={formatdate}
                                            value={values.draftreceivedate}
                                        />
                                        <div className="invalid-feedback-custom">{ErrDraftReceiveDate}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Arrival Time (24 Hours)')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="arrivalhours"
                                                            type="number"
                                                            id="arrivalhours"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("arrivalhours", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 24) {
                                                                    setFieldValue("arrivalhours", value);
                                                                }
                                                            }
                                                            }
            
                                                            onBlur={handleBlur}
                                                            value={values.arrivalhours}
                                                            maxLength={2}
                                                            placeholder='Hours'
                                                        />
                                                    </td>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="arrivalminute"
                                                            type="number"
                                                            id="arrivalminute"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("arrivalminute", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 59) {
                                                                    setFieldValue("arrivalminute", value);
                                                                }
                                                            }
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.arrivalminute}
                                                            maxLength={2}
                                                            placeholder='Minute'
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="invalid-feedback-custom">{ErrInputArrivalTime}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftreceivedate">
                                            {i18n.t('Receive Time (24 Hours)')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="receivehours"
                                                            type="number"
                                                            id="receivehours"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("receivehours", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 24) {
                                                                    setFieldValue("receivehours", value);
                                                                }
                                                            }
                                                            }
            
                                                            onBlur={handleBlur}
                                                            value={values.receivehours}
                                                            // maxLength={2}
                                                            placeholder='Hours'
                                                        />
                                                    </td>
                                                    <td width={"100px"}>
                                                        <Input
                                                            name="receiveminute"
                                                            type="number"
                                                            id="receiveminute"
                                                            // onChange={handleChange}
                                                            onChange={val => {
                                                                let value = val.target.value;
                                                                if(value == ''){
                                                                    setFieldValue("receiveminute", value);
                                                                }else if (value.length <= 2 && parseInt(value) <= 59) {
                                                                    setFieldValue("receiveminute", value);
                                                                }
                                                            }
                                                            }
                                                            onBlur={handleBlur}
                                                            value={values.receiveminute}
                                                            // maxLength={2}
                                                            placeholder='Minute'
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="invalid-feedback-custom">{ErrInputReceiveTime}</div>
                                        
                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="box">
                                            {i18n.t('Box')}
                                        </label>
                                        <Input
                                            name="box"                                            
                                            type="text"
                                            id="box"
                                            // onChange={handleChange}
                                            onChange={val => {
                                                let value = val.target.value;
                                                if (!isNaN(value)) {
                                                    setFieldValue("box", value);
                                                }
                                            }
                                            }
                                            onBlur={handleBlur}
                                            value={values.box}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="alias">
                                            {i18n.t('SMU')}
                                        </label>
                                        <Input
                                            name="smu"                                            
                                            type="text"
                                            id="smu"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.smu}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="flightno">
                                            {i18n.t('Flight No')}
                                        </label>
                                        <Input
                                            name="flightno"                                            
                                            type="text"
                                            id="flightno"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.flightno}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="notes1">
                                            {i18n.t('Notes 1')}
                                        </label>
                                        <Input
                                            name="notes1"                                            
                                            type="text"
                                            id="notes1"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.notes1}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="notes2">
                                            {i18n.t('Notes 2')}
                                        </label>
                                        <Input
                                            name="notes2"                                            
                                            type="text"
                                            id="notes2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.notes2}
                                        />                                        

                                        <label className="mt-3 form-label required" htmlFor="grandtotalekor">
                                            {i18n.t('Total Ekor')}
                                        </label>
                                        <Input
                                            name="grandtotalekor"                                            
                                            type="text"
                                            id="grandtotalekor"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            value={values.grandtotalekor}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="grandtotalkilo">
                                            {i18n.t('Total Kg')}
                                        </label>
                                        <Input
                                            name="grandtotalkilo"                                            
                                            type="text"
                                            id="grandtotalkilo"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            value={values.grandtotalkilo}
                                            disabled={true}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="grandtotalkilo">
                                            {i18n.t('Persentase')}
                                        </label>
                                        <Input
                                            name="persentase"                                            
                                            type="text"
                                            id="persentase"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            value={values.persentase}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                
                                <div className="invalid-feedback-custom">{ErrItems}</div>
                                <div hidden={ListCategory.length == 0}  className="row justify-content-center">
                                <h4>{'Input Item'}</h4>
                                <div style={{overflowX:'auto'}}>
                                <table id="tablegrid" style={{tableLayout:'fixed'}}>
                                    <tbody>
                                        <tr>
                                        <th style={{ width: '50px' }}>
                                                <IconButton
                                                style={{ color: 'white' }}
                                                onClick={() => handleAddItems()}
                                                // hidden={values.vendor == ''}
                                            >
                                                <AddIcon style={{ fontSize: 25 }} />
                                            </IconButton>
                                        </th>
                                            {
                                                ListCategory.map((x, i) => {
                                                    return(
                                                        <th colSpan={2} style={{textAlign:'center',width:'220px'}}>{i18n.t(x.size)} <br></br>{x.weight} </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <td></td>
                                            {
                                                ListCategory.map((x, i) => {
                                                    return(
                                                        x.listtotal.map((xx, ii) => {
                                                            return(
                                                                <td width={xx.label == 'Total Kg'?'55%':'45%' }>{xx.label+' : '+xx.total} </td>
                                                            )
                                                            
                                                        })
                                                    )
                                                })
                                            }
                                        </tr>
                                        {
                                            ListItems.map((x, i) => {
                                                return (<tr>
                                                    <td>
                                                    <IconButton
                                                        color={'primary'}
                                                        // style={{color:'white'}}
                                                        onClick={() => handleRemoveItems(i)}
                                                    // hidden={showplusdebit}
                                                    >
                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                    </IconButton>
                                                    </td>
                                                    {
                                                        x.items.map((xx, ii) => {
                                                            return(
                                                                <td >
                                                                    <Input
                                                                        name={xx.jumlahtype}
                                                                        type="text"
                                                                        id={xx.jumlahtype}
                                                                        onChange={val => handleInputChangeItems(val, i, ii,xx.idcategoryproduct)}
                                                                        // onBlur={handleBlur}
                                                                        value={xx.jumlah}
                                                                    />
                                                                </td>
                                                            )
                                                        })   
                                                    }
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                                </div>
                                </div>

                                <div hidden={ListCategory.length == 0}  className="row justify-content-center">
                                <h4>{'Input Item Mati'}</h4>
                                <div style={{overflowX:'auto'}}>
                                <table id="tablegrid" style={{tableLayout:'fixed'}}>
                                <tbody>
                                <tr>
                                <th style={{ width: '50px' }}>
                                        <IconButton
                                        style={{ color: 'white' }}
                                        onClick={() => handleAddItemsMati()}
                                        // hidden={values.vendor == ''}
                                    >
                                        <AddIcon style={{ fontSize: 25 }} />
                                    </IconButton>
                                </th>
                                    {
                                        ListCategory.map((x, i) => {
                                            return(
                                                <th style={{textAlign:'center',width:'100px'}}>{i18n.t(x.size)} <br></br>{x.weight} </th>
                                            )
                                        })
                                    }
                                </tr>

                                {
                                    ListItemsMati.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <IconButton
                                                        color={'primary'}
                                                        // style={{color:'white'}}
                                                        onClick={() => handleRemoveItemsMati(i)}
                                                    // hidden={showplusdebit}
                                                    >
                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                    </IconButton>
                                                </td>
                                                {
                                                        x.items.map((xx, ii) => {
                                                            return(
                                                                <td >
                                                                    <Input
                                                                        name={'jumlah'}
                                                                        type="text"
                                                                        id={'jumlah'}
                                                                        onChange={val => handleInputChangeItemsMati(val, i, ii)}
                                                                        // onBlur={handleBlur}
                                                                        value={xx.jumlah}
                                                                    />
                                                                </td>
                                                            )
                                                        })   
                                                    }
                                            </tr>
                                        )
                                    })   
                                }
                                </tbody>
                                </table>
                                </div>
                                </div>
                            </ContentWrapper>
                            {loading && <Loading />}
                            <div className="row justify-content-center" style={{ marginTop: '-30px', marginBottom: '20px' }}>
                                <Button
                                    // disabled={props.activeStep === 0}
                                    // style={{marginLeft:"20%"}}
                                    onClick={() => history.goBack()}
                                >
                                    {/* {i18n.t('common.BACK')} */}
                                    {'Cancel'}
                                </Button>

                                <Button
                                    // style={{marginLeft:"1%"}}
                                    color={'primary'}
                                    onClick={() => submitHandler(values)}
                                >
                                    {'Submit'}
                                </Button>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>

    )
}