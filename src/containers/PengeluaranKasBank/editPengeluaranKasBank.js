import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize,inputJustNumberAndCommaDot,formatMoney, numToMoney } from '../shared/globalFunc';
import { editPengeluaranKasBank_Permission} from '../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import '../CSS/table.css';

import SearchIcon from '@material-ui/icons/Search';
import FormSearch from '../../components/FormSearch';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;

export default function EditForm(props) {
    reloadToHomeNotAuthorize(editPengeluaranKasBank_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ShowQuickSearch, setShowQuickSearch] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);
    const [SelPaymentTo, setSelPaymentTo] = useState('');
    const [ListPaymentTo, setListPaymentTo] = useState([]);

    const [InputNoDoc, setInputNoDoc] = useState('');
    const [InputPaymentDate, setInputPaymentDate] = useState(new Date());
    const [ErrInputPaymentDate, setErrInputPaymentDate] = useState('');

    const [InputPaymentTo, setInputPaymentTo] = useState('');
    const [InputPaymentToName, setInputPaymentToName] = useState('');
    const [ErrInputPaymentTo, setErrInputPaymentTo] = useState('');

    const [ListCOA, setListCOA] = useState([]);
    const [SelCOA, setSelCOA] = useState('');
    const [ErrSelCOA, setErrSelCOA] = useState('');

    const [ListWO, setListWO] = useState([]);
    const [SelWO, setSelWO] = useState('');

    const [ListInvoiceItem, setListInvoiceItem] = useState([]);

    const [ListBank, setListBank] = useState([]);
    const [SelBank, setSelBank] = useState('');
    const [ErrSelBank, setErrSelBank] = useState('');

    const [InputKeterangan, setInputKeterangan] = useState('');

    const [ListChooseYN, setListChooseYN] = useState([]);
    const [ListAsset, setListAsset] = useState([]);
    const [ListDataAssetOptions, setListDataAssetOptions] = useState([]);

    const [ListCategory, setListCategory] = useState([]);
    const [SelCategory, setSelCategory] = useState([]);
    const [ErrSelCategory, setErrSelCategory] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idcoa:"",catatan: "",amount:"",idasset:"",idinvoiceitem:"",idpaymentitem:"",idassetsparepart:"",sparepartassettype:""}]);
    const [ErrSelDetailCOA, setErrSelDetailCOA] = useState('');
    const [ErrInputCatatan, setErrInputCatatan] = useState('');
    const [ErrInputAmount, setErrInputAmount] = useState('');
    const [ErrItems, setErrItems] = useState('');
    const [ErrSelInvoiceItem, setErrSelInvoiceItem] = useState('');
    const [ErrSelPaymentitemItem, setErrSelPaymentitemItem] = useState('');
    const [ErrSelAsset, setErrSelAsset] = useState('');
    const [ErrSelSparepartType, setErrSelSparepartType] = useState('');

    const [ListPaymentItems, setListPaymentItems] = useState([]);
    const [ListDataPaymentItems, setListDataPaymentItems] = useState([]);
    const [ListSparePartType, setListSparePartType] = useState([]);
    const [ListAssetSparePart, setListAssetSparePart] = useState([]);
    const [ListDataAssetSparePart, setListDataAssetSparePart] = useState([]);

    const [InputListBank, setInputListBank] = useState([{ norek:"",atasnama: "",bank:""}]);

    const id = props.match.params.id;
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPengeluaranKasBankData('/template/'+id,successHandlerTemplate, errorHandler));
    }, []);

    const getPaymentToName = (data) =>{
        if(data.paymentto){
            if(data.paymentto == 'EMPLOYEE'){
                setInputPaymentTo(data.idemployee);
                setInputPaymentToName(data.employeeName?data.employeeName:'');
            }else if(data.paymentto == 'CUSTOMER'){
                setInputPaymentTo(data.idcustomer);
                setInputPaymentToName(data.customerName?data.customerName:'');
            }else if(data.paymentto == 'VENDOR'){
                setInputPaymentTo(data.idvendor);
                setInputPaymentToName(data.vendorName?data.vendorName:'');
            }
        }
        return '';
    }

    const successHandlerTemplate = (data) =>{
        if(data.data){

            let det = data.data;
            let template = det.template;
            let listBank = det.listBank;

            if(listBank != null && listBank != undefined){
                if(listBank.length > 0){
                    setInputListBank(listBank);
                }
            }
            

            let listPaymentTo = [{value:'EMPLOYEE',label:'Employee'},{value:'CUSTOMER',label:'Customer'},{value:'VENDOR',label:'Vendor'}];
            setListPaymentTo(listPaymentTo);
            setListDataAssetSparePart(template.assetSparePartOptions);
            setListDataPaymentItems(template.paymentItemOptions);

            setInputNoDoc(det.nodocument);
            setInputPaymentDate(det.paymentdate?moment(new Date(det.paymentdate), formatdate).toDate():null);
            getPaymentToName(det);

            setSelPaymentTo(det.paymentto);
            setSelCOA(det.idcoa);
            setSelBank(det.idbank);
            setInputKeterangan(det.keterangan);
            setSelWO(det.idwo?det.idwo:'');
            let category = det.idpaymenttype?det.idpaymenttype:'';
            setSelCategory(category);

            let listPaymentItems = template.paymentItemOptions.filter(output => output.paymenttype == category);
            if(listPaymentItems.length > 0){
                let listData = listPaymentItems.reduce((obj, el) => (
                    [...obj, {
                        value: el.id,
                        label: el.nama,
                        idcoa:el.idcoa
                    }]
                ), []);
                listData.push({
                    value: 'nodata',
                    label: 'No Data',
                    idcoa:''
                });
                setListPaymentItems(listData);
            }

            let listitems = [];
            if(data.data.details){
                for(let i=0; i < data.data.details.length; i++){
                    let det = data.data.details[i];
                    //idcoa:"",catatan: "",amount:"",idasset:""
                    listitems.push({ idcoa:det.idcoa,catatan: det.catatan,amount:numToMoney(parseFloat(det.amount)),idasset:(det.idasset || det.idasset !== 0?det.idasset:''),idinvoiceitem:(det.idinvoiceitem || det.idinvoiceitem !== 0?det.idinvoiceitem:''),idpaymentitem:(det.idpaymentitem || det.idpaymentitem !== 0?det.idpaymentitem:''),idassetsparepart:(det.idassetsparepart || det.idassetsparepart !== 0?det.idassetsparepart:''),sparepartassettype:(det.sparepartassettype?det.sparepartassettype:'')});
                    // listitems.push({ idcoa:det.idcoa,catatan: det.catatan,amount:numToMoney(parseFloat(det.amount)),idasset:(det.idasset || det.idasset !== 0?det.idasset:''),idinvoiceitem:(det.idinvoiceitem?det.idinvoiceitem:'')});
                }
            }
            if(listitems.length > 0){
                let detval = listitems[0];
                setInputListItem(listitems);

                let idasset = detval.idasset;
                let sparepartType = detval.sparepartassettype;
                if(idasset !== '' && (sparepartType !== '' && sparepartType !== 'nodata')){
                    let detasset = template.assetOptions.filter(output => output.id == idasset);
                    if(detasset.length > 0){
                        let val = detasset[0];
                        let jenisAsset = val.assettype;
                        if(jenisAsset == 'KEPALA'){
                            let assetSpareparts = template.assetSparePartOptions.filter(output => output.assettype == 'SP_KEPALA' && output.sparepartkepala_jenis == sparepartType);
                            //sparepartkepala_jenis
                            setListAssetSparePart(assetSpareparts.reduce((obj, el) => (
                                [...obj, {
                                    value: el.id,
                                    label: el.sparepartkepala_nama
                                }]
                            ), []));
                        }else if(jenisAsset == 'BUNTUT'){
                            let assetSpareparts = template.assetSparePartOptions.filter(output => output.assettype == 'SP_BUNTUT' && output.sparepartbuntut_jenis == sparepartType);
                            setListAssetSparePart(assetSpareparts.reduce((obj, el) => (
                                [...obj, {
                                    value: el.id,
                                    label: el.sparepartbuntut_nama
                                }]
                            ), []));
                        }else{
                            setListAssetSparePart([]);
                        }
                    }
                }else{
                    setListAssetSparePart([]);
                }
            }

            let listCOA = template.coaOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama+' ('+el.code+')'
                }]
            ), []);
            
            listCOA.push(
                {
                    value: 'nodata',
                    label: 'No Data'
                }
            );

            setListCOA(listCOA);

            setListBank(template.bankOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.namabank
                }]
            ), []));

            // setListInvoiceItem(template.invoiceItemOptions.reduce((obj, el) => (
            //     [...obj, {
            //         value: el.id,
            //         label: el.nama
            //     }]
            // ), []));

            let listInvItem = template.invoiceItemOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama,
                    idcoa: el.idcoa
                }]
            ), []);
            listInvItem.push(
                {
                    value: 'nodata',
                    label: 'No Data',
                    idcoa: ''
                }
            );
            setListInvoiceItem(listInvItem);

            let listWO = template.woOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nodocument+' - AJU '+el.noaju
                }]
            ), []);
            listWO.push(
                {
                    value: 'nodata',
                    label: 'No Data',
                    idcoa: ''
                }
            );
            setListWO(listWO);

            // setListWO(template.woOptions.reduce((obj, el) => (
            //     [...obj, {
            //         value: el.id,
            //         label: el.nodocument
            //     }]
            // ), []));

            setListAsset(template.assetOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: getAssetName(el)
                }]
            ), []));
            setListDataAssetOptions(template.assetOptions);

            setListCategory(template.paymenttypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            let listSparePartType = template.spareparttypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []);
            listSparePartType.push({value: 'nodata',label: 'No Data'});
            setListSparePartType(listSparePartType);

            setListChooseYN([{value:'Y',label:'Yes'},{value:'N',label:'No'}])
        }
        setLoading(false);
    }

    const getAssetName = (data) =>{
        if(data.kepala_nama){
            if(data.kepala_nama !== ''){
                return data.kepala_nama +' (Kepala)';
            }
        }
        if(data.buntut_nama){
            if(data.buntut_nama !== ''){
                return data.buntut_nama+' (Buntut)';
            }
        }
    }

    const handleInputPaymentTo = (data) =>{
        let val = data.target.value;
        setInputPaymentTo(val)
    }

    const handleInputKeterangan = (data) =>{
        let val = data.target.value;
        setInputKeterangan(val)
    }

    const handleChangeWO = (data) =>{
        let id = data?.value ? data.value : '';
        setSelWO(id);
    }

    const handleChangeListPaymentTo = (data) =>{
        let id = data?.value ? data.value : '';
        setSelPaymentTo(id);
        setInputPaymentTo('');
        setInputPaymentToName('');
        setInputListBank([{ norek:"",atasnama: "",bank:""}]);
    }

    const handleShowQuickSearch = () =>{
        if(SelPaymentTo !== ''){
            setShowQuickSearch(true);
        }
    }

    const handleChangeCoa = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCOA(id);
    }

    const handleChangeCategory = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCategory(id);

        let list = ListDataPaymentItems.filter(output => output.paymenttype == id);
        setInputListItem([{ idcoa:"",catatan: "",amount:"",idasset:"",idinvoiceitem:"",idpaymentitem:"",idassetsparepart:"",sparepartassettype:""}]);
        setListPaymentItems([]);
        if(list.length > 0){
            let listData = list.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama,
                    idcoa:el.idcoa
                }]
            ), []);
            listData.push({
                value: 'nodata',
                label: 'No Data',
                idcoa:''
            });
            setListPaymentItems(listData);
        }
    }

    const handleChangeBank = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBank(id);
    }

    const handleChangePaymentDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputPaymentDate(moment(data, formatdate).toDate())
        }else{
            setInputPaymentDate(null);
        }
    }

    const checkCategory = (data,type) =>{
        if(type == 'invoiceitem' || type == 'wo'){
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                return false;
            }
            // if(type == 'wo' && data == 'OPTIONS_PAYMENTITEM_TYPE_2'){
            //     return false;
            // }

            // if(type == 'wo' && data == 'OPTIONS_PAYMENTITEM_TYPE_4'){
            //     return false;
            // }
        }else if(type == 'asset'){
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_3'){
                return false;
            }
        }else if(type == 'all'){
            return false;
        }else if(type == 'invoiceitemtable'){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[0];
                let flag = true;
                if(det.idpaymentitem !== ''){
                    flag = true;
                    // return true;

                    // break;
                    if(det.idpaymentitem == 'nodata'){
                        if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                            flag = false;
                            // return false;
                        }
                    }
                }else{
                    if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                        flag = false;
                    }
                }

                return flag;
            }
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                return false;
            }
            return true;
        }else if(type == 'paymentitemtable'){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[0];
                let flag = false;
                if(det.idinvoiceitem !== ''){
                    flag = true;
                    // return true;
                    // break;
                    if(det.idinvoiceitem == 'nodata'){
                        // return false;
                        flag = false;
                    }
                }
                return flag;
            }
            return false;
        }

        return true;
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputPaymentDate('');
        setErrInputPaymentTo('');
        setErrSelCOA('');
        setErrSelBank('');
        setErrInputCatatan('');
        setErrInputAmount('');
        setErrItems('');
        setErrSelInvoiceItem('');
        setErrSelCategory('');
        // setErrSelPaymentitemItem('');
        setErrSelAsset('');
        setErrSelDetailCOA('')
        // setErrSelSparepartType('');
        
        if(SelCategory == ''){
            setErrSelCategory(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let listitems = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];
                    if( (det.idcoa !== '' || det.idcoa !== 'nodata') || det.catatan !== '' || det.amount !== '' || (det.idinvoiceitem !== '' || det.idinvoiceitem !== 'nodata') || (det.idpaymentitem !== '' || det.idpaymentitem !== 'nodata') || (det.idasset !== '' || det.idasset !== 'nodata') ){
                        // if(det.catatan == ''){
                        //     setErrInputCatatan(i18n.t('Catatan')+' '+i18n.t('label_REQUIRED'));
                        //     flag = false;
                        // }

                        if(det.amount == ''){
                            setErrInputAmount(i18n.t('Amount')+' '+i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(det.idcoa == '' || det.idcoa == 'nodata'){
                            setErrSelDetailCOA(i18n.t('COA')+' '+i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                        if(SelWO !== '' && !checkCategory(SelCategory,'invoiceitem')){
                            if( (det.idinvoiceitem == '' || det.idinvoiceitem == 'nodata') && (det.idpaymentitem == '' || det.idpaymentitem == 'nodata')){
                                setErrSelInvoiceItem(i18n.t('Non/Reimbursement Item')+' '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                            // else if((det.idinvoiceitem !== '' || det.idinvoiceitem !== 'nodata') && (det.idpaymentitem !== '' || det.idpaymentitem !== 'nodata')){
                            //     setErrSelInvoiceItem(i18n.t('Non/Reimbursement Item')+' '+i18n.t('label_REQUIRED'));
                            //     flag = false;
                            // }
                        }

                        if(!checkCategory(SelCategory,'asset')){
                            // console.log('det.idasset ',det.idasset);
                            // console.log('det.sparepartassettype ',det.sparepartassettype);
                            // console.log('det.idassetsparepart ',det.idassetsparepart);
                            if(det.idasset == ''){
                                setErrSelAsset(i18n.t('Asset')+' '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }

                            if(det.sparepartassettype !== '' && det.sparepartassettype !== 'nodata'){
                                if(det.idassetsparepart == '' || det.idassetsparepart == 'nodata'){
                                    setErrSelAsset(i18n.t('Asset')+' '+i18n.t('label_REQUIRED'));
                                    flag = false;
                                }
                            }
                            
                        }

                        listitems.push(det);
                    }
                }
            }

            if(listitems.length == 0){
                setErrItems(i18n.t('Items')+' '+i18n.t('label_REQUIRED'));
                flag = false;
            }
        }

        
        if(InputPaymentDate == null){
            setErrInputPaymentDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputPaymentTo == ''){
            setErrInputPaymentTo(i18n.t('label_REQUIRED'));
            flag = false;
        }

        // if(SelCOA == ''){
        //     setErrSelCOA(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }

        if(SelBank == ''){
            setErrSelBank(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.paymentdate = moment(InputPaymentDate).toDate().getTime();
            obj.paymentto = SelPaymentTo;
            obj.idpaymenttype = SelCategory;
            if(SelPaymentTo == 'EMPLOYEE'){
                obj.idemployee = InputPaymentTo;
                obj.idcustomer = null;
                obj.idvendor = null;
            }else if(SelPaymentTo == 'CUSTOMER'){
                obj.idemployee = null;
                obj.idcustomer = InputPaymentTo;
                obj.idvendor = null;
            }else if(SelPaymentTo == 'VENDOR'){
                obj.idemployee = null;
                obj.idcustomer = null;
                obj.idvendor = InputPaymentTo;
            }
            
            let idcoa = '';
            if(SelCOA == '' || SelCOA == 'nodata'){
                idcoa = null;
            }else{
                idcoa = SelCOA;
            }
            obj.idcoa = idcoa;

            obj.idbank = SelBank;
            obj.keterangan = InputKeterangan;

            let idwo = '';
            if(SelWO == '' || SelWO == 'nodata'){
                idwo = null;
            }else{
                idwo = SelWO;
            }
            if(checkCategory(SelCategory,'wo')){
                idwo = null;
            }
            obj.idwo = idwo;//SelWO !== ''?SelWO:null;
            obj.isactive = true;
            let listdetails = [];
            if(InputListItem.length > 0){
                for(let i=0; i < InputListItem.length; i++){
                    let det = InputListItem[i];
                    if( det.amount !== "" ){
                        let objDet = new Object();
                        objDet.idcoa = det.idcoa !== "" && det.idcoa !== 'nodata' ? det.idcoa:null;
                        objDet.catatan = det.catatan;
                        objDet.amount = new String(det.amount).replaceAll('.','').replaceAll(',','.');
                        objDet.idasset = det.idasset !== '' && det.idasset !== 'nodata' ? det.idasset:null;
                        objDet.idinvoiceitem = det.idinvoiceitem !== '' && det.idinvoiceitem !== 'nodata' ? det.idinvoiceitem:null;
                        objDet.idpaymentitem = det.idpaymentitem !== '' && det.idpaymentitem !== 'nodata' ? det.idpaymentitem:null;
                        objDet.idassetsparepart = det.idassetsparepart !== '' && det.idassetsparepart !== 'nodata' ? det.idassetsparepart:null;
                        objDet.sparepartassettype = det.sparepartassettype !== '' && det.sparepartassettype !== 'nodata' ? det.sparepartassettype:null;
                        listdetails.push(objDet);
                    }
                }
            }
            obj.details = listdetails;
            dispatch(actions.submitEditPengeluaranKasBank('/'+id,obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
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

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let valTemp = value;
        const list = [...InputListItem];
        if(name == 'amount'){
            let flagReg = inputJustNumberAndCommaDot(value);
            if(flagReg){
                valTemp = formatMoney(value);
                list[index][name] = valTemp;
            }
        }else{
            // const list = [...InputListItem];
            list[index][name] = valTemp;
        }
        setInputListItem(list);
    };

    const handleInputDropDownChange = (e, index,name) => {
        const list = [...InputListItem];
        list[index][name] = e.value;
        if(name == 'sparepartassettype' || name == 'idasset'){
            let idasset = list[index]['idasset'];
            let sparepartType = list[index]['sparepartassettype'];
            if(idasset !== '' && (sparepartType !== '' && sparepartType !== 'nodata')){
                let detasset = ListDataAssetOptions.filter(output => output.id == idasset);
                if(detasset.length > 0){
                    let val = detasset[0];
                    let jenisAsset = val.assettype;
                    if(jenisAsset == 'KEPALA'){
                        let assetSpareparts = ListDataAssetSparePart.filter(output => output.assettype == 'SP_KEPALA' && output.sparepartkepala_jenis == sparepartType);
                        //sparepartkepala_jenis
                        setListAssetSparePart(assetSpareparts.reduce((obj, el) => (
                            [...obj, {
                                value: el.id,
                                label: el.sparepartkepala_nama
                            }]
                        ), []));
                    }else if(jenisAsset == 'BUNTUT'){
                        let assetSpareparts = ListDataAssetSparePart.filter(output => output.assettype == 'SP_BUNTUT' && output.sparepartbuntut_jenis == sparepartType);
                        setListAssetSparePart(assetSpareparts.reduce((obj, el) => (
                            [...obj, {
                                value: el.id,
                                label: el.sparepartbuntut_nama
                            }]
                        ), []));
                    }else{
                        setListAssetSparePart([]);
                        list[index]['idassetsparepart'] = '';
                    }
                }
            }else{
                setListAssetSparePart([]);
                list[index]['idassetsparepart'] = '';
            }

        }

        if(name == 'idinvoiceitem'){
            let idinvoiceitem = list[index]['idinvoiceitem'];
            if(idinvoiceitem !== undefined && idinvoiceitem !== null && idinvoiceitem !== 0 && idinvoiceitem !== ''){
                let listtemp = ListInvoiceItem.filter(output => output.value == idinvoiceitem);
                if(listtemp.length > 0){
                    list[index]['idcoa'] = listtemp[0].idcoa == 0?'':listtemp[0].idcoa;
                }
            }
            
        }

        if(name == 'idpaymentitem'){
            let idpaymentitem = list[index]['idpaymentitem'];
            if(idpaymentitem !== undefined && idpaymentitem !== null && idpaymentitem !== 0 && idpaymentitem !== ''){
                let listtemp = ListPaymentItems.filter(output => output.value == idpaymentitem);
                if(listtemp.length > 0){
                    list[index]['idcoa'] = listtemp[0].idcoa == 0?'':listtemp[0].idcoa;
                }
            }
        }

        //idinvoiceitem, idpaymentitem, idcoa
        setInputListItem(list);
    };    


    const handleAddClick = () => {
        setInputListItem([...InputListItem, { idcoa:"",catatan: "",amount:"",idasset:"",idinvoiceitem:"",idpaymentitem:"",idassetsparepart:"",sparepartassettype:""}]);
    };

    const handleQuickSeacrh = (data) =>{
        setShowQuickSearch(false);
        setInputPaymentTo(data.id);
        setInputListBank([{ norek:"",atasnama: "",bank:""}]);
        if(SelPaymentTo == 'EMPLOYEE'){
            setInputPaymentToName(data.nama);
            setLoading(true);
            dispatch(actions.getPengeluaranKasBankData('/listbankemployee/'+data.id,successHandlerListBankVendor, errorHandler));
        }else if(SelPaymentTo == 'CUSTOMER'){
            setInputPaymentToName(data.customername);
        }else if(SelPaymentTo == 'VENDOR'){
            setInputPaymentToName(data.nama);
            setLoading(true);
            dispatch(actions.getPengeluaranKasBankData('/listbankvendor/'+data.id,successHandlerListBankVendor, errorHandler));
        }
        // setInputCustomer(data.customername);
        // setInputCustomerID(data.id);
    }

    const successHandlerListBankVendor = (data) =>{
        if(data.data.length > 0){
            setInputListBank(data.data);
        }
        setLoading(false);
    }
    
    const handleRemoveClick = index => {
        const list = [...InputListItem];
        list.splice(index, 1);
        setInputListItem(list);
    };

    return (
        <Formik
        initialValues={
            {
                nodoc:InputNoDoc,
                paymentdate:InputPaymentDate,
                paymentto:InputPaymentToName,
                paymentotype:SelPaymentTo,
                coa:SelCOA,
                bank:SelBank,
                keterangan:InputKeterangan,
                items:InputListItem,
                idwo:SelWO,
                category:SelCategory
            }
        }
        validate={values => {
            const errors = {};
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

                    return(
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddPengeluaranKasBank">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editpengeluarankasbank+'/'+id} label={'Edit Pengeluaran Kas/Bank'} labeldefault={'Edit Pengeluaran Kas/Bank'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nodoc">
                                {i18n.t('label_NO_DOCUMENT')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nodoc"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nodoc"
                                maxLength={30}
                                // onChange={val => handleInput(val)}
                                onBlur={handleBlur}
                                value={values.nodoc}
                                disabled={true}
                            />

                            <label className="mt-3 form-label required" htmlFor="paymentdate">
                                {i18n.t('Payment Date')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DatePicker
                                    name="paymentdate"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangePaymentDate(val)}
                                    onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={values.paymentdate}
                                    max={new Date()}
                                    // style={{width: '25%'}}
                            />
                            <div className="invalid-feedback-custom">{ErrInputPaymentDate}</div>

                            <label className="mt-3 form-label required" htmlFor="category">
                                {i18n.t('Category')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="category"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeCategory(val)}
                                onBlur={val => setFieldTouched("category", val?.value ? val.value : '')}
                                data={ListCategory}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.category}
                            />
                            <div className="invalid-feedback-custom">{ErrSelCategory}</div>

                            <label className="mt-3 form-label required" htmlFor="paymentto">
                                {i18n.t('Payment To')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'100%'}}>
                            <tbody>
                                <td style={{width:'70%'}}>
                                <Input
                                    name="paymentto"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="paymentto"
                                    maxLength={200}
                                    // onChange={val => handleInputPaymentTo(val)}
                                    onBlur={handleBlur}
                                    disabled={true}
                                    value={values.paymentto}
                                />
                                </td>
                                <td style={{width:'30%'}}>
                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="paymentotype"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeListPaymentTo(val)}
                                    onBlur={val => setFieldTouched("paymentotype", val?.value ? val.value : '')}
                                    data={ListPaymentTo}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.paymentotype}
                                />
                                </td>
                                <td>
                                <IconButton color={'primary'}
                                    onClick={() =>handleShowQuickSearch()}
                                >
                                    <SearchIcon/>
                                </IconButton>
                                </td>
                            </tbody>
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputPaymentTo}</div>

                            {/* <label className="mt-3 form-label required" htmlFor="coa">
                                {i18n.t('COA')}
                            </label>

                                <DropdownList
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeCoa(val)}
                                    onBlur={val => setFieldTouched("coa", val?.value ? val.value : '')}
                                    data={ListCOA}
                                    textField={'label'}
                                    valueField={'value'}
                                    value={values.coa}
                                />
                                <div className="invalid-feedback-custom">{ErrSelCOA}</div> */}

                            <label className="mt-3 form-label required" htmlFor="bank">
                                {i18n.t('From Kas/Bank')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="coa"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeBank(val)}
                                    onBlur={val => setFieldTouched("bank", val?.value ? val.value : '')}
                                    data={ListBank}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.bank}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBank}</div>

                            <label className="mt-3 form-label required" htmlFor="keterangan">
                                {i18n.t('Keterangan')}
                            </label>
                            <Input
                                name="keterangan"
                                type="textarea"
                                id="keterangan"
                                maxLength={200}
                                onChange={val => handleInputKeterangan(val)}
                                onBlur={handleBlur}
                                value={values.keterangan}
                            />

                            <div hidden={checkCategory(values.category,'wo')}>
                            <label className="mt-3 form-label required" htmlFor="idwo">
                                {i18n.t('WO Number')}
                            </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="idwo"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeWO(val)}
                                    onBlur={val => setFieldTouched("idwo", val?.value ? val.value : '')}
                                    data={ListWO}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.idwo}
                                />
                                </div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5" hidden={!(SelPaymentTo == 'EMPLOYEE' || SelPaymentTo == 'VENDOR')}>
                            <div style={{marginTop:'0px'}}><h3>{i18n.t('Bank')}</h3></div>
                                    {
                                        InputListBank.length == 0?'':
                                        <table id="tablegrid">
                                            <tr>
                                                <th>{i18n.t('Bank')}</th>
                                                <th>{i18n.t('label_ACCOUNT_NAME')}</th>
                                                <th>{i18n.t('label_NUMBER_ACCOUNT')}</th>
                                            </tr>
                                            <tbody>
                                                {
                                                    InputListBank.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td>
                                                        <Input
                                                            name="bank"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="bank"
                                                            // onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.bank}
                                                            disabled={true}
                                                        />
                                                        </td>
                                                        
                                                        <td>
                                                        <Input
                                                            name="atasnama"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="atasnama"
                                                            // onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.atasnama}
                                                            disabled={true}
                                                        />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="norek"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="norek"
                                                            // onChange={val => handleInputChangeBank(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.norek}
                                                            disabled={true}
                                                        />
                                                        </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    }
                            </div>
                            
                            </div>

                            <div className="invalid-feedback-custom">{ErrItems}</div>
                            <div className="invalid-feedback-custom">{ErrInputCatatan}</div>
                            <div className="invalid-feedback-custom">{ErrInputAmount}</div>
                            <div className="invalid-feedback-custom">{ErrSelInvoiceItem}</div>
                            <div className="invalid-feedback-custom">{ErrSelAsset}</div>
                            <div className="invalid-feedback-custom">{ErrSelDetailCOA}</div>
                            {
                                InputListItem.length == 0?'':
                                <table id="tablegrid">
                                    <tr>
                                    <th  hidden={checkCategory(values.category,'invoiceitemtable')}>{i18n.t('Reimbursement')}</th>
                                        <th  hidden={checkCategory(values.category,'paymentitemtable')}>{i18n.t('Non Reimbursement')}</th>
                                        <th hidden={checkCategory(values.category,'asset')}>{i18n.t('Kepala/Buntut')}</th>
                                        <th hidden={checkCategory(values.category,'asset')}>{i18n.t('Jenis Sparepart')}</th>
                                        <th hidden={checkCategory(values.category,'asset')}>{i18n.t('Asset Sparepart')}</th>
                                        <th>{i18n.t('Amount')}</th>
                                        {/* <th>{i18n.t('label_NOTE')}</th> */}
                                        <th>{i18n.t('COA')}</th>
                                        <th hidden={true}>{i18n.t('Action')}</th>
                                    </tr>
                                    <tbody>
                                        {
                                            InputListItem.map((x, i) => {
                                                return(
                                                    <tr>
                                                        <td style={{width: '170px'}} hidden={checkCategory(values.category,'invoiceitemtable')}>
                                                    <DropdownList
                                                        name="idinvoiceitem"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idinvoiceitem')}
                                                        data={ListInvoiceItem}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '170px'}}
                                                        value={x.idinvoiceitem}
                                                    />
                                                    </td>

                                                    <td style={{width: '170px'}} hidden={checkCategory(values.category,'paymentitemtable')}>
                                                    <DropdownList
                                                        name="idpaymentitem"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idpaymentitem')}
                                                        data={ListPaymentItems}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '170px'}}
                                                        value={x.idpaymentitem}
                                                    />
                                                    </td>

                                                    <td hidden={checkCategory(values.category,'asset')}>
                                                    <DropdownList
                                                        name="idasset"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idasset')}
                                                        data={ListAsset}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.idasset}
                                                    />
                                                    </td>

                                                    <td hidden={checkCategory(values.category,'asset')}>
                                                    <DropdownList
                                                        name="sparepartassettype"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'sparepartassettype')}
                                                        data={ListSparePartType}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.sparepartassettype}
                                                    />
                                                    </td>

                                                    <td hidden={checkCategory(values.category,'asset')}>
                                                    <DropdownList
                                                        name="idassetsparepart"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idassetsparepart')}
                                                        data={ListAssetSparePart}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '130px'}}
                                                        value={x.idassetsparepart}
                                                    />
                                                    </td>

                                                    <td>
                                                    <Input
                                                        name="amount"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="text"
                                                        id="amount"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.amount}
                                                        disabled={false}
                                                    />
                                                    </td>
                                                    
                                                    {/* <td>
                                                    <Input
                                                        name="catatan"
                                                        // className={
                                                        //     touched.amount && errors.amount
                                                        //         ? "w-50 input-error"
                                                        //         : "w-50"
                                                        // }
                                                        type="textarea"
                                                        id="catatan"
                                                        onChange={val => handleInputChange(val,i)}
                                                        onBlur={handleBlur}
                                                        // placeholder={i18n.t('label_AMOUNT')}
                                                        // style={{width: '25%'}}
                                                        // value={values.amount}
                                                        value={x.catatan}
                                                        disabled={false}
                                                    />
                                                    </td> */}
                                                    
                                                    <td style={{width: '300px'}}>
                                                    <DropdownList
                                                        name="idcoa"
                                                        filter='contains'
                                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                                        
                                                        onChange={val => handleInputDropDownChange(val,i,'idcoa')}
                                                        data={ListCOA}
                                                        textField={'label'}
                                                        valueField={'value'}
                                                        style={{width: '300px'}}
                                                        value={x.idcoa}
                                                    />
                                                    </td>
                                                    
                                                    
                                                    <td hidden={true}>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClick()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClick(i)}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>    
                                                    </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
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
                                    onClick={() => submitHandler()}
                                >
                                {'Submit'}
                                </Button>
                                </div>

                                <StyledDialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            maxWidth="md"
                            fullWidth={true}
                            // style={{height: '80%'}}
                            open={ShowQuickSearch}
                        >
                                <FormSearch
                                    showflag = {setShowQuickSearch}
                                    flagloadingsend = {setLoadingSend}
                                    seacrhtype = {'PENGELUAARAN-KAS-BANK'}
                                    seacrhtype1 = {SelPaymentTo}
                                    errorHandler = {errorHandler}
                                    handlesearch = {handleQuickSeacrh}
                                    placeholder = {SelPaymentTo == 'CUSTOMER' || SelPaymentTo == 'VENDOR' ?'Pencarian Berdasarkan Nama Atau Alias':'Pencarian Berdasarkan Nama'}

                                ></FormSearch>
                                {LoadingSend && <Loading/>}
                        </StyledDialog>
                        </form>

                    )
                }
            }
        </Formik>

    )
}