import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button, Input} from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { numToMoney, reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addPurchaseReceive_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker, DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { calculateSetor, calculateTotalPrice, calculateTransfer, setPriceBox, setPriceBoxOngkosByVendor } from './utilityPurchaseReceive';

export default function AddPurchaseReceive(props) {
    reloadToHomeNotAuthorize(addPurchaseReceive_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [ReceiveDate, setReceiveDate] = useState(new Date());
    const [ErrReceiveDate, setErrReceiveDate] = useState("");

    const [ListVendor, setListVendor] = useState([]);
    const [SelVendor, setSelVendor] = useState('');
    const [ErrSelVendor, setErrSelVendor] = useState('');

    const [InputBank, setInputBank] = useState('');
    const [ErrInputBank, setErrInputBank] = useState('');
    const [InputAccNoBank, setInputAccNoBank] = useState('');
    const [ErrInputAccNoBank, setErrInputAccNoBank] = useState('');
    const [InputAccNameBank, setInputAccNameBank] = useState('');
    const [ErrInputAccNameBank, setErrInputAccNameBank] = useState('');

    const [InputKoli, setInputKoli] = useState('');
    const [ErrInputKoli, setErrInputKoli] = useState('');

    const [InputNotes, setInputNotes] = useState('');

    const [ListItemsPurchaseReceive, setListItemsPurchaseReceive] = useState([]);
    const [ListItemsPurchaseReceiveMati, setListItemsPurchaseReceiveMati] = useState([]);
    const [ListItemsPurchaseReceiveBiaya, setListItemsPurchaseReceiveBiaya] = useState([]);
    const [ListItemsPurchaseReceivePenguranganBiaya, setListItemsPurchaseReceivePenguranganBiaya] = useState([]);
    const [ListProduct, setListProduct] = useState([]);
    const [ListCategoryProduct, setListCategoryProduct] = useState([]);

    const [InputTotalPrice, setInputTotalPrice] = useState(0);
    const [IsDefaultSetorTotalPrice, setIsDefaultSetorTotalPrice] = useState(true);
    const [InputSetor, setInputSetor] = useState(0);
    const [InputSetorPinjaman, setInputSetorPinjaman] = useState(0);
    const [SisaDeposit, setSisaDeposit] = useState(0);
    const [SisaPinjaman, setSisaPinjaman] = useState(0);
    const [TambahDeposit, setTambahDeposit] = useState(0);
    const [IsTambahDeposit, setIsTambahDeposit] = useState(false);

    const [ListInventori, setListInventori] = useState([]);
    const [ListItemsInventori, setListItemsInventori] = useState([]);

    const [ErrItemsHidup, setErrItemsHidup] = useState("");

    const [ListDraftPurchaseReceive, setListDraftPurchaseReceive] = useState([]);
    const [SelDraftPurchaseReceive, setSelDraftPurchaseReceive] = useState('');
    const [ErrSelDraftPurchaseReceive, setErrSelDraftPurchaseReceive] = useState('');

    const [ListArea, setListArea] = useState([]);
    const [SelArea, setSelArea] = useState('');
    const [ErrSelArea, setErrSelArea] = useState('');

    const [InputTransfer, setInputTransfer] = useState(0);

    const [InputFlightNo, setInputFlightNo] = useState('');
    const [InputNotes2, setInputNotes2] = useState('');
    const [InputSMU, setInputSMU] = useState('');
    const [IdDraftPR, setIdDraftPR] = useState('');

    const fromtype = props.from?props.from:'';
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getPurchaseReceiveData({ url: '/template' }, successHandler, errorHandler));
    }, []);

    function successHandler(data, propsdata) {
        if (data.data) {
            let listfilteroutput = data.data.vendorOpt.filter(output => output.type == 'UDANG');
            const theDataVendor = listfilteroutput.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama + ' (' + el.alias + ')',
                    'data': el
                }
            ], []);
            setListVendor(theDataVendor);

            const theDataProd = data.data.productOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            setListProduct(theDataProd);

            const theDataCharge = data.data.chargeOpt.reduce((obj, el) => [
                ...obj,
                {
                    'idcharge': el.id,
                    'namabiaya': el.nama,
                    'namabiayacustom': el.nama,
                    'qty': el.nama == 'SETOR' ? 1 : 0,
                    'price': 0,
                    'subtotal': 0
                }
            ], []);
            let listPenambahanBiaya = theDataCharge.filter(output => output.namabiaya == 'BOX' || output.namabiaya == 'BOAT' || output.namabiaya == 'BANTUAN');
            setListItemsPurchaseReceiveBiaya(listPenambahanBiaya);

            let listPenguranganBiaya = theDataCharge.filter(output => output.namabiaya == 'ONGKOS' || output.namabiaya == 'SETOR' || output.namabiaya == 'SETORPINJAMAN');
            setListItemsPurchaseReceivePenguranganBiaya(listPenguranganBiaya);

            const theDataInventori = data.data.inventoriOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            setListInventori(theDataInventori);

            const theDataArea = data.data.areaOpt.reduce((obj, el) => [
                ...obj,
                {
                    'value': el.id,
                    'label': el.nama,
                    'data': el
                }
            ], []);
            setListArea(theDataArea);

            if(fromtype == "FROMDPR"){
                let value = localStorage.getItem("mxowe1I9ey");
                if(value !== null && value !== undefined && value !== ""){
                    let arrVal = new String(value).split("|");
                    
                    if(arrVal.length > 1){
                        let iddraft = parseInt(arrVal[0]);
                        let idvendor = parseInt(arrVal[1]);
                        setSelVendor(idvendor);
                        setSelDraftPurchaseReceive(iddraft);
                        let listfilteroutput = theDataVendor.filter(output => output.value == idvendor);
                        if(listfilteroutput.length > 0){
                            changeVendor(listfilteroutput[0],theDataCharge,[],theDataArea);
                        }else{
                            //kemungkinan di master vendor nya sudah di delete
                            setLoading(false);
                            msgInfoText("Vendor tidak ditemukan");
                            
                        }
                    }
                    
                }
            }else{
                setLoading(false);
            }

        }else{
            setLoading(false);   
        }

        
        
    }


    function setorValue(totalprice, isdefaultnota) {
        if (isdefaultnota) {
            setInputSetor(totalprice);
        }

    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrReceiveDate('');
        setErrSelVendor('');
        setErrInputKoli('');
        setErrInputBank('');
        setErrInputAccNoBank('');
        setErrInputAccNameBank('');
        setErrItemsHidup('');
        setErrSelArea('');
        setErrSelDraftPurchaseReceive('');

        if (ListItemsPurchaseReceive.length > 0) {
            // for (let i = 0; i < ListItemsPurchaseReceive.length; i++) {
            //     let det = ListItemsPurchaseReceive[i];
            //     if (parseInt(det.qty) <= 0) {
            //         setErrItemsHidup(i18n.t('Qty Harus diatas 0'));
            //         flag = false;
            //         break;
            //     } else if (det.itemsprice == '') {
            //         setErrItemsHidup(i18n.t('Price harus diatas 0'));
            //         flag = false;
            //         break;
            //     } else if (parseFloat(det.itemsprice) <= 0) {
            //         setErrItemsHidup(i18n.t('Price harus diatas 0'));
            //         flag = false;
            //         break;
            //     }
            // }
        } else {
            setErrItemsHidup(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (ReceiveDate == null) {
            setErrReceiveDate(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (SelVendor == '') {
            setErrSelVendor(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            let listfilterVendor = ListVendor.filter(output => output.value == SelVendor);
            if(listfilterVendor.length == 0){
                setErrSelVendor(i18n.t('Vendor Tidak Dikenal'));
                flag = false;
            }
        }
        if(SelDraftPurchaseReceive !== '' && SelDraftPurchaseReceive !== 'nodata') {
            let listfilterVendor = ListDraftPurchaseReceive.filter(output => output.value == SelDraftPurchaseReceive);
            if(listfilterVendor.length == 0){
                setErrSelDraftPurchaseReceive(i18n.t('Penerimaan Barang Tidak Dikenal'));
                flag = false;
            }
        }

        if (SelArea == '') {
            setErrSelArea(i18n.t('label_REQUIRED'));
            flag = false;
        }

        // if (InputKoli == '') {
        //     setErrInputKoli(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        if (InputBank == '') {
            setErrInputBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (InputAccNoBank == '') {
            setErrInputAccNoBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (InputAccNameBank == '') {
            setErrInputAccNameBank(i18n.t('label_REQUIRED'));
            flag = false;
        }
        // if(ListItemsPurchaseReceive.length == 0){
        //     setErrPriceDate(i18n.t('Silahkan pilih price list yang tersedia'));
        //     flag = false;
        // }

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
            setIsTambahDeposit(false);
            let totalprice = new String(values.totalprice).replaceAll('.', '') !== '' ? new String(values.totalprice).replaceAll('.', '') : 0;
            let sisadeposit = new String(SisaDeposit).replaceAll('.', '') !== '' ? new String(SisaDeposit).replaceAll('.', '') : 0;
            let tambahdeposit = new String(values.tambahdeposit).replaceAll('.', '') !== '' ? new String(values.tambahdeposit).replaceAll('.', '') : 0;
            let totaldeposit = parseFloat(sisadeposit) + parseFloat(tambahdeposit);
            if (parseFloat(totalprice) > totaldeposit) {
                let tambahdp = parseFloat(totalprice) - totaldeposit;
                setIsTambahDeposit(true);
                flag = false;
                msgInfo("Deposit Kurang " + numToMoney(tambahdp) + ", Apakah kamu yakin?",values);
                // window.scrollTo(0, 0);
            }

            submitPayload(flag,values);
        }
        

    }

    function submitPayload(flag,values){
        if (flag) {
            setLoading(true);
            
            //ada perubahan bisnis, di awal setor digunakan bisa full payment lewat deposit atau hanya sebagian lewat deposit.
            // sekarang full payment lewat deposit, jika kurang maka kekurangan itu dibayar lewat transfer
            let sisadeposit = values.sisadeposit;
            let sisapinjaman = values.sisapinjaman;
            let totalprice = new String(values.totalprice).replaceAll('.', '') !== '' ? new String(values.totalprice).replaceAll('.', '') : 0;
            let objCalc = calculateSetor(totalprice,sisadeposit,sisapinjaman);
            let setor = objCalc.setordeposit;
            let setorPinjaman = objCalc.setorpinjaman;

            let obj = new Object();
            obj.idvendor = SelVendor;
            obj.transactiondate = ReceiveDate.getTime();
            obj.koli = '';//values.koli;
            obj.notes = values.notes;
            obj.notes2 = values.notes2;
            obj.flightno = values.flightno;
            obj.smu = values.smu;
            obj.bank = values.bank;
            obj.accountnobank = values.accnobank;
            obj.accountnamebank = values.accnamabank;
            obj.totalprice = totalprice;//new String(values.totalprice).replaceAll('.', '') !== '' ? new String(values.totalprice).replaceAll('.', '') : 0;
            obj.setor = setor;//new String(values.setor).replaceAll('.', '') !== '' ? new String(values.setor).replaceAll('.', '') : 0;
            obj.setor_pinjaman = setorPinjaman;
            obj.isdefaultvaluesetor = IsDefaultSetorTotalPrice;
            obj.tambahdeposit = new String(values.tambahdeposit).replaceAll('.', '') !== '' ? new String(values.tambahdeposit).replaceAll('.', '') : 0;
            let items = [];
            if (ListItemsPurchaseReceive.length > 0) {
                for (let i = 0; i < ListItemsPurchaseReceive.length; i++) {
                    let el = ListItemsPurchaseReceive[i];
                    if (parseInt(el.qty) > 0 && el.idproduct !== 'TOTAL') {
                        items.push(
                            {
                                'idproduct': el.idproduct,
                                'idcategoryproduct': el.idcategoryproduct,
                                'qty': el.qty,
                                'qtybonus': el.qtybonus,
                                'qtynota': el.qtynota,
                                'price': new String(el.itemsprice).replaceAll('.', '') !== '' ? new String(el.itemsprice).replaceAll('.', '') : '0',
                                'subtotalprice': new String(el.subtotalprice).replaceAll('.', '') !== '' ? new String(el.subtotalprice).replaceAll('.', '') : '0',
                                'type': 'H'
                            }
                        );
                    }
                }
                // items = ListItemsPurchaseReceive.reduce((obj, el) => [
                //     ...obj,
                //     {
                //         'idproduct': el.idproduct,
                //         'idcategoryproduct': el.idcategoryproduct,
                //         'qty': el.qty,
                //         'qtybonus': el.qtybonus,
                //         'price': new String(el.itemsprice).replaceAll('.', '') !== '' ? new String(el.itemsprice).replaceAll('.', '') : '0',
                //         'subtotalprice': new String(el.subtotalprice).replaceAll('.', '') !== '' ? new String(el.subtotalprice).replaceAll('.', '') : '0',
                //         'type': 'H'
                //     }
                // ], []);

                for (let i = 0; i < ListItemsPurchaseReceiveMati.length; i++) {
                    let el = ListItemsPurchaseReceiveMati[i];
                    if (parseInt(el.qtymati) > 0) {
                        items.push(
                            {
                                'idproduct': el.idproduct,
                                'idcategoryproduct': el.idcategoryproduct,
                                'qty': el.qtymati,
                                'qtybonus': el.qtybonus,
                                'qtynota': 0,
                                'price': new String(el.itemsprice).replaceAll('.', '') !== '' ? new String(el.itemsprice).replaceAll('.', '') : '0',
                                'subtotalprice': new String(el.subtotalprice).replaceAll('.', '') !== '' ? new String(el.subtotalprice).replaceAll('.', '') : '0',
                                'type': 'M'
                            }
                        );
                    }
                }

            }
            obj.items = items;

            let charges = [];
            if (ListItemsPurchaseReceiveBiaya.length > 0) {
                for (let i = 0; i < ListItemsPurchaseReceiveBiaya.length; i++) {
                    let el = ListItemsPurchaseReceiveBiaya[i];
                    let namaCharge = null;
                    if(el.namabiayacustom !== ''){
                        if(new String(el.namabiayacustom).toLowerCase() !== new String(el.namabiaya).toLowerCase()){
                            namaCharge = el.namabiayacustom;
                        }
                    }
                    charges.push(
                        {
                            'idcharge': el.idcharge,
                            'qty': el.qty,
                            'price': new String(el.price).replaceAll('.', '') !== '' ? new String(el.price).replaceAll('.', '') : '0',
                            'subtotalprice': new String(el.subtotal).replaceAll('.', '') !== '' ? new String(el.subtotal).replaceAll('.', '') : '0',
                            'chargenamecustom':namaCharge
                        }
                    );
                }
            }
            obj.charges = charges;

            let inventori = [];
            if (ListItemsInventori.length > 0) {
                for (let i = 0; i < ListItemsInventori.length; i++) {
                    let el = ListItemsInventori[i];
                    inventori.push(
                        {
                            'idinventori': el.idinventori,
                            'qty': el.qty,
                            'price': new String(el.price).replaceAll('.', '') !== '' ? new String(el.price).replaceAll('.', '') : '0',
                            'subtotalprice': new String(el.subtotalprice).replaceAll('.', '') !== '' ? new String(el.subtotalprice).replaceAll('.', '') : '0'
                        }
                    );
                }
            }
            obj.inventori = inventori;
            obj.iddraftpurchasereceive = SelDraftPurchaseReceive == 'nodata' || SelDraftPurchaseReceive == ''?null:SelDraftPurchaseReceive;
            obj.idarea = SelArea;
            dispatch(actions.submitPurchaseReceiveData({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
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

    const msgInfoText = (text) => {

        Swal.fire({
            icon: 'info',
            title: 'Information',
            text: text,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Ok`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // submitPayload(true,values)
                // history.go
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const msgInfo = (text,values) => {

        Swal.fire({
            icon: 'info',
            title: 'Information',
            text: text,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Ok`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                submitPayload(true,values)
                // history.go
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const handleChangeReceiveDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setReceiveDate(datetrans)
        } else {
            setReceiveDate(null)
        }
    }


    const handleInputChangeItems = (e, index, type) => {
        const { name, value } = e.target;
        let flag = true;
        let subtotal = 0;
        if (name == 'qty' || name == 'qtynota' || name == 'qtybonus' || name == 'qtymati' || name == 'itemsprice') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';
            if (isNaN(valPriceTemp) && valPriceTemp !== '' && name !== 'qtybonus') {
                flag = false;
            } 
            if(name == 'qtybonus'){
                let strVal  = new String(valPriceTemp);
                let lg = strVal.split("-").length;
                if(lg < 3){
                    let tempReplace = strVal.replaceAll('-','');
                    if (isNaN(tempReplace) && tempReplace !== '') {
                        flag = false;
                    }
                }else{
                    flag = false;
                }
            }
            if(flag) {
                if (name == 'qty') {
                    const listTemp = [...ListItemsPurchaseReceive];
                    let pricetemp = new String(listTemp[index]['itemsprice']).replaceAll('.', '') !== '' ? new String(listTemp[index]['itemsprice']).replaceAll('.', '') : '0';

                    let qtybonustemp = new String(listTemp[index]['qtybonus']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qtybonus']).replaceAll('.', '') : '0';
                    let qtyTemp = parseInt(valPriceTemp) + parseInt(qtybonustemp);
                    subtotal = parseInt(qtyTemp) * parseFloat(pricetemp);
                }else if (name == 'qtynota') {
                    const listTemp = [...ListItemsPurchaseReceive];
                    let pricetemp = new String(listTemp[index]['itemsprice']).replaceAll('.', '') !== '' ? new String(listTemp[index]['itemsprice']).replaceAll('.', '') : '0';

                    // let qtytemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    // let qtyBonusTemp = parseInt(valPriceTemp) + parseInt(qtytemp);
                    subtotal = parseInt(valPriceTemp) * parseFloat(pricetemp);
                } else if (name == 'qtybonus') {
                    const listTemp = [...ListItemsPurchaseReceive];
                    let pricetemp = new String(listTemp[index]['itemsprice']).replaceAll('.', '') !== '' ? new String(listTemp[index]['itemsprice']).replaceAll('.', '') : '0';

                    let qtytemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    let qtyBonusTemp = parseInt(valPriceTemp) + parseInt(qtytemp);
                    subtotal = parseInt(qtyBonusTemp) * parseFloat(pricetemp);
                } else if (name == 'qtymati') {
                    const listTemp = [...ListItemsPurchaseReceiveMati];
                    let pricetemp = new String(listTemp[index]['itemsprice']).replaceAll('.', '') !== '' ? new String(listTemp[index]['itemsprice']).replaceAll('.', '') : '0';

                    subtotal = parseInt(valPriceTemp) * parseFloat(pricetemp);
                } else if (name == 'itemsprice') {
                    let listTemp = [];
                    let qtytemp = 0;
                    if (type == 'H') {
                        listTemp = [...ListItemsPurchaseReceive];
                        // qtytemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                        qtytemp = new String(listTemp[index]['qtynota']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qtynota']).replaceAll('.', '') : '0';
                    } else {
                        listTemp = [...ListItemsPurchaseReceiveMati];
                        qtytemp = new String(listTemp[index]['qtymati']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qtymati']).replaceAll('.', '') : '0';
                    }

                    let qtybonustemp = new String(listTemp[index]['qtybonus']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qtybonus']).replaceAll('.', '') : '0';
                    let totalQty = parseInt(qtytemp) + parseInt(qtybonustemp);

                    subtotal = parseInt(valPriceTemp) * parseFloat(totalQty);
                }
                //
            }

        }
        if (flag) {
            if (type == 'H') {
                const list = [...ListItemsPurchaseReceive];
                let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
                list[index][name] = valPrice;
                list[index]['subtotalprice'] = subtotal;
                
                let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
                let listCharge = [...ListItemsPurchaseReceiveBiaya];
                for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
                    listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
                }
                let objPrice = calculateTotalPrice(list, listCharge, ListItemsInventori);
                let totalPrice = objPrice.totalPrice;
                let totalPriceItemHidup = objPrice.totalPriceItemHidup;
                let totalqty = objPrice.totalqty;
                let totalqtynota = objPrice.totalqtynota;
                list[indexTotal]['qty'] = totalqty;
                list[indexTotal]['qtynota'] = totalqtynota;
                list[indexTotal]['subtotalprice'] = totalPriceItemHidup;
                setInputTotalPrice(totalPrice);
                // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(ListItemsPurchaseReceiveBiaya,totalPrice));
                setorValue(totalPrice, IsDefaultSetorTotalPrice);

                setListItemsPurchaseReceive(list);
            } else if (type == 'M') {
                const list = [...ListItemsPurchaseReceiveMati];
                let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
                list[index][name] = valPrice;
                list[index]['subtotalprice'] = subtotal;
                setListItemsPurchaseReceiveMati(list);
            }

        }
    }

    const handleInputChangeBiaya = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        let subtotal = 0;
        if (name == 'qty' || name == 'price') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';

            if (isNaN(valPriceTemp) && valPriceTemp !== '') {
                flag = false;
            } else {
                const listTemp = [...ListItemsPurchaseReceiveBiaya];

                if (name == 'qty') {
                    let namaBiaya = listTemp[index]['namabiaya'];
                    if (namaBiaya == 'SETOR' && valPriceTemp !== '') {
                        if (parseInt(valPriceTemp) > 1) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        let pricetemp = new String(listTemp[index]['price']).replaceAll('.', '') !== '' ? new String(listTemp[index]['price']).replaceAll('.', '') : '0';
                        subtotal = parseInt(valPriceTemp) * parseFloat(pricetemp);
                    }
                } else if (name == 'price') {
                    let qtyemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    subtotal = parseInt(qtyemp) * parseFloat(valPriceTemp);
                }
            }


        }
        if (name == 'namabiaya') {
            const list = [...ListItemsPurchaseReceiveBiaya];
            list[index]['namabiayacustom'] = value;
            setListItemsPurchaseReceiveBiaya(list);
            flag =false;
        }
        if (flag) {
            const list = [...ListItemsPurchaseReceiveBiaya];
            const listTemp = [...ListItemsPurchaseReceiveBiaya];
            let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            listTemp[index][name] = valPrice;
            listTemp[index]['subtotal'] = subtotal;

            list[index][name] = valPrice;
            list[index]['subtotal'] = subtotal;
            
            setListItemsPurchaseReceiveBiaya(list);
            
            let listCharge = listTemp;
            for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
                listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
            }
            let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, ListItemsInventori);
            let totalPrice = objPrice.totalPrice;
            let totalPriceItemHidup = objPrice.totalPriceItemHidup;
            setInputTotalPrice(totalPrice);
            // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(ListItemsPurchaseReceiveBiaya,totalPrice));
            setorValue(totalPrice, IsDefaultSetorTotalPrice);
        }

    }

    const handleInputChangePenguranganBiaya = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        let subtotal = 0;
        if (name == 'qty' || name == 'price') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';

            if (isNaN(valPriceTemp) && valPriceTemp !== '') {
                flag = false;
            } else {
                const listTemp = [...ListItemsPurchaseReceivePenguranganBiaya];

                if (name == 'qty') {
                    let namaBiaya = listTemp[index]['namabiaya'];
                    if (namaBiaya == 'SETOR' && valPriceTemp !== '') {
                        if (parseInt(valPriceTemp) > 1) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        let pricetemp = new String(listTemp[index]['price']).replaceAll('.', '') !== '' ? new String(listTemp[index]['price']).replaceAll('.', '') : '0';
                        subtotal = parseInt(valPriceTemp) * parseFloat(pricetemp);
                    }
                } else if (name == 'price') {
                    let qtyemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    subtotal = parseInt(qtyemp) * parseFloat(valPriceTemp);
                }
            }


        }
        if (name == 'namabiaya') {
            const list = [...ListItemsPurchaseReceivePenguranganBiaya];
            list[index]['namabiayacustom'] = value;
            setListItemsPurchaseReceivePenguranganBiaya(list);
            flag =false;
        }
        if (flag) {
            const list = [...ListItemsPurchaseReceivePenguranganBiaya];
            const listTemp = [...ListItemsPurchaseReceivePenguranganBiaya];
            let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            listTemp[index][name] = valPrice;
            listTemp[index]['subtotal'] = subtotal;

            list[index][name] = valPrice;
            list[index]['subtotal'] = subtotal;
            setListItemsPurchaseReceivePenguranganBiaya(list);

            let listCharge = [...ListItemsPurchaseReceiveBiaya];
            for(let i=0; i < listTemp.length; i++){
                listCharge.push(listTemp[i]);
            }
            let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, ListItemsInventori);
            let totalPrice = objPrice.totalPrice;
            let totalPriceItemHidup = objPrice.totalPriceItemHidup;
            setInputTotalPrice(totalPrice);
            // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(ListItemsPurchaseReceiveBiaya,totalPrice));
            setorValue(totalPrice, IsDefaultSetorTotalPrice);
        }

    }

    const handleInputDropDownChange = (e, index, name, type) => {
        if (type == 'H') {
            const list = [...ListItemsPurchaseReceive];
            list[index][name] = e.value;
            setListItemsPurchaseReceive(list);
        } else if (type == 'M') {
            const list = [...ListItemsPurchaseReceiveMati];
            list[index][name] = e.value;
            setListItemsPurchaseReceiveMati(list);
        }

    };

    const handleInputChangeInventori = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        let subtotal = 0;
        if (name == 'qty' || name == 'price') {
            let valPriceTemp = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '0';

            if (isNaN(valPriceTemp) && valPriceTemp !== '') {
                flag = false;
            } else {
                const listTemp = [...ListItemsInventori];

                if (name == 'qty') {
                    let pricetemp = new String(listTemp[index]['price']).replaceAll('.', '') !== '' ? new String(listTemp[index]['price']).replaceAll('.', '') : '0';
                    subtotal = parseInt(valPriceTemp) * parseFloat(pricetemp);
                } else if (name == 'price') {
                    let qtyemp = new String(listTemp[index]['qty']).replaceAll('.', '') !== '' ? new String(listTemp[index]['qty']).replaceAll('.', '') : '0';
                    subtotal = parseInt(qtyemp) * parseFloat(valPriceTemp);
                }
            }


        }
        if (flag) {
            const list = [...ListItemsInventori];
            let valPrice = new String(value).replaceAll('.', '') !== '' ? new String(value).replaceAll('.', '') : '';
            list[index][name] = valPrice;
            list[index]['subtotalprice'] = subtotal;
            setListItemsInventori(list);

            let listCharge = [...ListItemsPurchaseReceiveBiaya];
            for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
                listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
            }

            let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, list);
            let totalPrice = objPrice.totalPrice;
            let totalPriceItemHidup = objPrice.totalPriceItemHidup;
            setInputTotalPrice(totalPrice);
            setorValue(totalPrice, IsDefaultSetorTotalPrice);
        }

    }

    const handleInputDropDownChangeInventori = (e, index, name) => {
        const list = [...ListItemsInventori];
        list[index][name] = e.value;
        setListItemsInventori(list);
    };
    const handleChangeDraftPR = (data) => {
        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }
        changeDraftPR(data,listCharge,ListItemsInventori);
    }
    const changeDraftPR = (data,paramlistcharge,paramlistinventori) => {
        let id = data?.value ? data.value : '';
        let val = data?.data ? data.data : '';
        setSelDraftPurchaseReceive(id);

        setListItemsPurchaseReceive([]);
        setListItemsPurchaseReceiveMati([]);
        let qtyBox = 0;
        if(id !== 'nodata'){
            setInputNotes(val.notes1?val.notes1:'');
            setInputNotes2(val.notes2?val.notes2:'');
            setInputFlightNo(val.flightno?val.flightno:'');
            setInputSMU(val.smu?val.smu:'');
            setReceiveDate(val.date?new Date(val.date):new Date());
            qtyBox = val.box?val.box:'';
        }else{
            setInputNotes('');
            setInputNotes2('');
            setInputFlightNo('');
            setInputSMU('');
            setReceiveDate(new Date());
        }

        let listCharge = setPriceBox(paramlistcharge, qtyBox);

        let listPenambahanBiaya = listCharge.filter(output => output.namabiaya == 'BOX' || output.namabiaya == 'BOAT' || output.namabiaya == 'BANTUAN');
        setListItemsPurchaseReceiveBiaya(listPenambahanBiaya);

        let listPenguranganBiaya = listCharge.filter(output => output.namabiaya == 'ONGKOS' || output.namabiaya == 'SETOR' || output.namabiaya == 'SETORPINJAMAN');
        setListItemsPurchaseReceivePenguranganBiaya(listPenguranganBiaya);

        // setListItemsPurchaseReceiveBiaya(listCharge);

        let objPrice = calculateTotalPrice([], listCharge, paramlistinventori);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        if (IsDefaultSetorTotalPrice) {
            setInputSetor(totalPrice);
        }

        
        // let totalPrice = calculateTotalPrice([], listCharge, []);
        // setInputTotalPrice(totalPrice);
        // if (IsDefaultSetorTotalPrice) {
        //     setInputSetor(totalPrice);
        // }

        if(id !== 'nodata'){
            setLoading(true);
            dispatch(actions.getPurchaseReceiveData({ url: '/getitemdraft/' + id }, successHandlerItemDraft, errorHandler));
        }
        
    }
    function successHandlerItemDraft(data, propsdata) {
        let listItems = data.data;
        let listfilteroutputHidup = listItems.filter(output => output.type == 'H');
        let listfilteroutputMati = listItems.filter(output => output.type == 'M');

        let arrDistinctCP = [];
        let listitemhidup = [];
        let totalQty = 0;
        let totalQtyNota = 0;
        for(let i =0; i < listfilteroutputHidup.length; i++){
            let el = listfilteroutputHidup[i];
            let ekor = el.ekor?parseInt(el.ekor):0;
            if(ekor <= 0){
                continue;
            }

            
            let idcategoryproduct = el.idcategoryproduct;
            if(arrDistinctCP.indexOf(idcategoryproduct) == -1){
                let listfilteroutput = listfilteroutputHidup.filter(output => output.idcategoryproduct == idcategoryproduct);
                let totalekor = 0;
                let totalkg = 0;
                for(let x =0; x < listfilteroutput.length; x++){
                    let det = listfilteroutput[x];
                    let jumlahekor = det.ekor?parseInt(det.ekor):0;
                    let jumlahkilo = det.kilo?parseInt(det.kilo):0;

                    totalekor += jumlahekor;
                    totalkg += jumlahkilo;

                    totalQty += jumlahekor;
                    totalQtyNota += jumlahekor;
                }
                listitemhidup.push(
                    {
                        'idproduct': el.idproduct,
                        'idcategoryproduct': idcategoryproduct,
                        'categoryproductname': el.namacategoryproduct,
                        'qty': totalekor,
                        'qtybonus': 0,
                        'qtynota': totalekor,
                        'qtymati': 0,
                        'itemsprice': 0,
                        'subtotalprice': 0
                    }
                );
                arrDistinctCP.push(idcategoryproduct);
            }
        }
        if(listitemhidup.length > 0){
            listitemhidup.push(
                {
                    'idproduct': 'TOTAL',
                    'idcategoryproduct': '',
                    'categoryproductname': '',
                    'qty': totalQty,
                    'qtybonus': 0,
                    'qtynota': totalQtyNota,
                    'qtymati': 0,
                    'itemsprice': 0,
                    'subtotalprice': 0
                }
            );
        }
        setListItemsPurchaseReceive(listitemhidup);
        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }
        let objPrice = calculateTotalPrice(listitemhidup, listCharge, ListItemsInventori);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        if (IsDefaultSetorTotalPrice) {
            setInputSetor(totalPrice);
        }

        arrDistinctCP = [];
        let listitemmati = [];
        for(let i =0; i < listfilteroutputMati.length; i++){
            let el = listfilteroutputMati[i];
            let idcategoryproduct = el.idcategoryproduct;
            if(arrDistinctCP.indexOf(idcategoryproduct) == -1){
                let listfilteroutput = listfilteroutputMati.filter(output => output.idcategoryproduct == idcategoryproduct);
                let totalekor = 0;
                let totalkg = 0;
                for(let x =0; x < listfilteroutput.length; x++){
                    let det = listfilteroutput[x];
                    let jumlahekor = det.ekor?parseInt(det.ekor):0;
                    let jumlahkilo = det.kilo?parseInt(det.kilo):0;

                    totalekor += jumlahekor;
                    totalkg += jumlahkilo;
                }
                listitemmati.push(
                    {
                        'idproduct': el.idproduct,
                        'idcategoryproduct': idcategoryproduct,
                        'categoryproductname': el.namacategoryproduct,
                        'qty': 0,
                        'qtybonus': 0,
                        'qtymati': totalekor,
                        'itemsprice': 0,
                        'subtotalprice': 0
                    }
                );
                arrDistinctCP.push(idcategoryproduct);
            }
        }
        setListItemsPurchaseReceiveMati(listitemmati);

        setLoading(false);
    }
    const handleChangeVendor = (data) => {
        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }
        changeVendor(data,listCharge,ListItemsInventori,ListArea);
    }
    const changeVendor = (data,paramlistcharge,paramlistinventori,paramlistarea) => {
        
        let id = data?.value ? data.value : '';
        setSelVendor(id);

        let valdata = data?.data ? data.data : '';
        setInputSetor(0);
        setInputSetorPinjaman(0);

        setListCategoryProduct([]);
        setListItemsPurchaseReceive([]);
        setListItemsPurchaseReceiveMati([]);
        setListItemsInventori([]);
        setInputBank(valdata.bank);
        setInputAccNoBank(valdata.accountnobank);
        setInputAccNameBank(valdata.accountnamebank);
        setSelDraftPurchaseReceive('');
        setListDraftPurchaseReceive([]);
        setInputNotes('');
        setInputNotes2('');
        setInputFlightNo('');
        setInputSMU('');
        setIdDraftPR('');

        let idarea = valdata.idarea?valdata.idarea:'';
        let listfilteroutputarea = paramlistarea.filter(output => output.value == idarea);
        if(listfilteroutputarea.length > 0){
            setSelArea(idarea);
        }else{
            setSelArea('');
        }

        setLoading(true);
        let listCharge = setPriceBoxOngkosByVendor(paramlistcharge, valdata.pricebox, valdata.priceongkos);
        let listPenambahanBiaya = listCharge.filter(output => output.namabiaya == 'BOX' || output.namabiaya == 'BOAT' || output.namabiaya == 'BANTUAN');
        setListItemsPurchaseReceiveBiaya(listPenambahanBiaya);

        let listPenguranganBiaya = listCharge.filter(output => output.namabiaya == 'ONGKOS' || output.namabiaya == 'SETOR' || output.namabiaya == 'SETORPINJAMAN');
        setListItemsPurchaseReceivePenguranganBiaya(listPenguranganBiaya);
        // setListItemsPurchaseReceiveBiaya(listCharge);
        let objPrice = calculateTotalPrice([], listCharge, []);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        if (IsDefaultSetorTotalPrice) {
            setInputSetor(totalPrice);
        }
        

        dispatch(actions.getPurchaseReceiveData({ url: '/searchvendor?idvendor=' + id,propsdata:{charge:listCharge,inventory:paramlistinventori} }, successHandlerVendor, errorHandler));
    }
    function successHandlerVendor(data, propsdata) {
        //propsdata:{charge:listCharge,inventory:paramlistinventori}
        let listCharge = propsdata.charge?propsdata.charge:[];
        let listinventory = propsdata.inventory?propsdata.inventory:[];
        
        const theDataProd = data.data.categoryproductOpt.reduce((obj, el) => [
            ...obj,
            {
                'value': el.id,
                'label': el.nama,
                'data': el
            }
        ], []);
        setListCategoryProduct(theDataProd);
        setSisaDeposit(data.data.sisaDeposit ? data.data.sisaDeposit : 0);
        setSisaPinjaman(data.data.sisaPinjaman ? data.data.sisaPinjaman : 0);
        

        const theDataDraftPR = data.data.draftPurchaseReceiveOpt.reduce((obj, el) => [
            ...obj,
            {
                'value': el.id,
                'label': el.nodocument+''+(el.smu && el.smu !== ''?' - '+el.smu:''),
                'data':el
            }
        ], []);
        theDataDraftPR.push({
            'value': 'nodata',
            'label': 'No Data',
            'data':''
        });
        setListDraftPurchaseReceive(theDataDraftPR);
        

        if(fromtype == "FROMDPR"){
            let value = localStorage.getItem("mxowe1I9ey");
            if(value !== null && value !== undefined && value !== ""){
                let arrVal = new String(value).split("|");
                if(arrVal.length > 1){
                    let iddraft = parseInt(arrVal[0]);
                    let idvendor = parseInt(arrVal[1]);
                    setSelDraftPurchaseReceive(iddraft);

                    let listfilteroutput = theDataDraftPR.filter(output => output.value == iddraft);
                    if(listfilteroutput.length > 0){
                        //
                        changeDraftPR(listfilteroutput[0],listCharge,listinventory);
                    }else{
                        setLoading(false);
                        msgInfoText("Penerimaan barang tidak ditemukan");
                        
                    }
                }
                
            }
        }else{
            setLoading(false);
        }

        // setLoading(false);
    }

    const handleAddItemsHidup = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length == 1) {
            idproduct = ListProduct[0].value;
        }
        let list = [...ListItemsPurchaseReceive];
        let listAdd = [...ListItemsPurchaseReceive,
            {
                'idproduct': idproduct,
                'idcategoryproduct': '',
                'categoryproductname': '',
                'qty': 0,
                'qtybonus': 0,
                'qtynota': 0,
                'qtymati': 0,
                'itemsprice': 0,
                'subtotalprice': 0
            }];
        let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
        let totalPriceItemHidup = 0;
        if(indexTotal > -1){
            totalPriceItemHidup = list[indexTotal]['subtotalprice'];
            listAdd.splice(indexTotal, 1);   
        }
        listAdd.push(
            {
                'idproduct': 'TOTAL',
                'idcategoryproduct': '',
                'categoryproductname': '',
                'qty': 0,
                'qtybonus': 0,
                'qtynota': 0,
                'qtymati': 0,
                'itemsprice': 0,
                'subtotalprice': totalPriceItemHidup
            }
        );
        
        setListItemsPurchaseReceive(listAdd);
    };


    const handleRemoveItemsHidup = index => {
        const list = [...ListItemsPurchaseReceive];
        list.splice(index, 1);
        let indexTotal = list.findIndex(obj => obj.idproduct == 'TOTAL');
        
        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }
        let objPrice =calculateTotalPrice(list, listCharge, ListItemsInventori);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        list[indexTotal]['subtotalprice'] = totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        setListItemsPurchaseReceive(list);
        // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(ListItemsPurchaseReceiveBiaya,totalPrice));
        setorValue(totalPrice, IsDefaultSetorTotalPrice);
    };

    const handleRemoveItemsMati = index => {
        const list = [...ListItemsPurchaseReceiveMati];
        list.splice(index, 1);
        setListItemsPurchaseReceiveMati(list);
    };

    const handleAddItemsMati = () => {
        let idproduct = '';
        if (ListProduct != null && ListProduct.length == 1) {
            idproduct = ListProduct[0].value;
        }
        setListItemsPurchaseReceiveMati([...ListItemsPurchaseReceiveMati,
        {
            'idproduct': idproduct,
            'idcategoryproduct': '',
            'categoryproductname': '',
            'qty': 0,
            'qtybonus': 0,
            'qtymati': 0,
            'itemsprice': 0,
            'subtotalprice': 0
        }]);
    };

    const handleRemoveInventori = index => {
        const list = [...ListItemsInventori];
        list.splice(index, 1);
        setListItemsInventori(list);
        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }

        let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, list);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(ListItemsPurchaseReceiveBiaya,totalPrice));
        setorValue(totalPrice, IsDefaultSetorTotalPrice);
    };

    const handleAddItemsInventori = () => {
        setListItemsInventori([...ListItemsInventori,
        {
            'idinventori': '',
            'inventoriname': '',
            'qty': 0,
            'price': 0,
            'subtotalprice': 0
        }]);
    };

    // const handleAddBiaya = () => {
    //     setListItemsPurchaseReceiveBiaya([...ListItemsPurchaseReceiveBiaya, { namabiaya:"",qty: "",price:"",subtotal:""}]);
    // };

    const handleRemoveBiaya = index => {
        const list = [...ListItemsPurchaseReceiveBiaya];
        const listTemp = [...ListItemsPurchaseReceiveBiaya];

        list.splice(index, 1);
        listTemp.splice(index, 1);
        setListItemsPurchaseReceiveBiaya(list);

        let listCharge = listTemp;
        for(let i=0; i < ListItemsPurchaseReceivePenguranganBiaya.length; i++){
            listCharge.push(ListItemsPurchaseReceivePenguranganBiaya[i]);
        }
        let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, ListItemsInventori);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(list,totalPrice));
        setorValue(totalPrice, IsDefaultSetorTotalPrice);
    };

    const handleRemovePenguranganBiaya = index => {
        const list = [...ListItemsPurchaseReceivePenguranganBiaya];
        const listTemp = [...ListItemsPurchaseReceivePenguranganBiaya];
        list.splice(index, 1);
        listTemp.splice(index, 1);
        setListItemsPurchaseReceivePenguranganBiaya(list);

        let listCharge = [...ListItemsPurchaseReceiveBiaya];
        for(let i=0; i < listTemp.length; i++){
            listCharge.push(listTemp[i]);
        }
        let objPrice = calculateTotalPrice(ListItemsPurchaseReceive, listCharge, ListItemsInventori);
        let totalPrice = objPrice.totalPrice;
        let totalPriceItemHidup = objPrice.totalPriceItemHidup;
        setInputTotalPrice(totalPrice);
        // setListItemsPurchaseReceiveBiaya(setSetorValueTotalPrice(list,totalPrice));
        setorValue(totalPrice, IsDefaultSetorTotalPrice);
    };

    const handleChangeIsDefaultSetor = (data) => {
        let checked = data.target.checked;
        setIsDefaultSetorTotalPrice(checked);
        if (checked) {
            setorValue(InputTotalPrice, checked);
        }

    }

    const handleChangeArea = (data) => {
        let id = data?.value ? data.value : '';
        setSelArea(id);
    }

    return (
        <Formik
            initialValues={
                {
                    receivedate: ReceiveDate,
                    vendor: SelVendor,
                    bank: InputBank,
                    accnobank: InputAccNoBank,
                    accnamabank: InputAccNameBank,
                    koli: InputKoli,
                    notes: InputNotes,
                    totalprice: InputTotalPrice,
                    isdefaultsetortotalprice: IsDefaultSetorTotalPrice,
                    setorpinjaman: InputSetorPinjaman,
                    sisapinjaman: SisaPinjaman,
                    setor: InputSetor,
                    sisadeposit: SisaDeposit,
                    istambahdeposit: IsTambahDeposit,
                    tambahdeposit: TambahDeposit,
                    draftpurchasereceive: SelDraftPurchaseReceive,
                    area:SelArea,
                    transfer:InputTransfer,
                    smu:InputSMU,
                    flightno:InputFlightNo,
                    notes2:InputNotes2,
                }
            }
            validate={values => {
                const errors = {};
                setInputBank(values.bank);
                setInputAccNoBank(values.accnobank);
                setInputAccNameBank(values.accnamabank)
                setInputKoli(values.koli);
                setInputNotes(values.notes);
                setInputSetor(values.setor);
                setTambahDeposit(values.tambahdeposit);
                setInputSMU(values.smu);
                setInputFlightNo(values.flightno);
                setInputNotes2(values.notes2);
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormPurchaseReceive">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.addpurchasereceive} label={'Add Nota Pembelian'} labeldefault={'Add Nota Pembelian'} />

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
                                            disabled={fromtype == "FROMDPR"}
                                            value={values.vendor}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelVendor}</div>

                                        <label className="mt-3 form-label required" htmlFor="area">
                                            {i18n.t('Area')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="area"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeArea(val)}
                                            onBlur={val => setFieldTouched("area", val?.value ? val.value : '')}
                                            data={ListArea}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.area}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelArea}</div>

                                        <label className="mt-3 form-label required" htmlFor="bank">
                                            {i18n.t('Bank')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="bank"
                                            type="text"
                                            id="bank"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.bank}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputBank}</div>

                                        <label className="mt-3 form-label required" htmlFor="accnobank">
                                            {i18n.t('label_ACC_NO')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="accnobank"
                                            type="text"
                                            id="accnobank"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.accnobank}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputAccNoBank}</div>

                                        <label className="mt-3 form-label required" htmlFor="accnobank">
                                            {i18n.t('label_ACC_NAME')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="accnamabank"
                                            type="text"
                                            id="accnamabank"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            // onBlur={handleBlur}
                                            value={values.accnamabank}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputAccNameBank}</div>

                                        <label className="mt-3 form-label required" htmlFor="draftpurchasereceive">
                                            {i18n.t('SPB')}
                                        </label>

                                        <DropdownList
                                            name="draftpurchasereceive"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeDraftPR(val)}
                                            onBlur={val => setFieldTouched("draftpurchasereceive", val?.value ? val.value : '')}
                                            data={ListDraftPurchaseReceive}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '25%'}}
                                            disabled={fromtype == "FROMDPR"}
                                            value={values.draftpurchasereceive}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelDraftPurchaseReceive}</div>

                                        {
                                            values.istambahdeposit ?
                                                <table width={'100%'}>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <label className="mt-3 form-label required" htmlFor="sisadeposit">
                                                                    {i18n.t('Sisa Deposit')}
                                                                </label>
                                                                <Input
                                                                    name="sisadeposit"
                                                                    type="text"
                                                                    id="sisadeposit"
                                                                    maxLength={100}

                                                                    onChange={handleChange}
                                                                    // onChange={val => handleInputNama(val)}
                                                                    onBlur={handleBlur}
                                                                    value={values.sisadeposit !== '' ? numToMoney(values.sisadeposit) : ''}
                                                                    disabled={true}
                                                                />
                                                            </td>
                                                            <td>
                                                                <label className="mt-3 form-label required" htmlFor="tambahdeposit">
                                                                    {i18n.t('Tambah Deposit')}
                                                                </label>
                                                                <Input
                                                                    name="tambahdeposit"
                                                                    type="text"
                                                                    id="tambahdeposit"
                                                                    maxLength={100}

                                                                    onChange={handleChange}
                                                                    // onChange={val => handleInputNama(val)}
                                                                    onBlur={handleBlur}
                                                                    value={new String(values.tambahdeposit).replaceAll(".", "") !== '' ? numToMoney(parseFloat(new String(values.tambahdeposit).replaceAll(".", ""))) : ''}
                                                                    disabled={false}
                                                                    style={{ borderColor: 'red' }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                :
                                                <div>
                                                    <label className="mt-3 form-label required" htmlFor="sisadeposit">
                                                        {i18n.t('Sisa Deposit')}
                                                    </label>
                                                    <Input

                                                        name="sisadeposit"
                                                        type="text"
                                                        id="sisadeposit"
                                                        maxLength={100}

                                                        onChange={handleChange}
                                                        // onChange={val => handleInputNama(val)}
                                                        onBlur={handleBlur}
                                                        value={values.sisadeposit !== '' ? numToMoney(values.sisadeposit) : ''}
                                                        disabled={true}
                                                    />
                                                </div>
                                        }

                            
                                        <label className="mt-3 form-label required" htmlFor="sisapinjaman">
                                            {i18n.t('Sisa Pinjaman')}
                                        </label>
                                        <Input

                                            name="sisapinjaman"
                                            type="text"
                                            id="sisapinjaman"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.sisapinjaman !== '' ? numToMoney(values.sisapinjaman) : ''}
                                            disabled={true}
                                        />

                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="receivedate">
                                            {i18n.t('Receive Date')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="receivedate"
                                            onChange={val => handleChangeReceiveDate(val)}
                                            format={formatdate}
                                            value={values.receivedate}
                                            disabled={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}
                                        />
                                        <div className="invalid-feedback-custom">{ErrReceiveDate}</div>

                                        {/* <label className="mt-3 form-label required" htmlFor="koli">
                                            {i18n.t('Koli')}
                                            <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            name="koli"
                                            type="text"
                                            id="koli"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.koli}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputKoli}</div> */}
                                        <label className="mt-3 form-label required" htmlFor="smu">
                                            {i18n.t('SMU')}
                                        </label>
                                        <Input

                                            name="smu"
                                            type="text"
                                            id="smu"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.smu}
                                            disabled={values.draftpurchasereceive !== '' && values.draftpurchasereceive !== 'nodata'}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="flightno">
                                            {i18n.t('Flight No')}
                                        </label>
                                        <Input

                                            name="flightno"
                                            type="text"
                                            id="flightno"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.flightno}
                                            disabled={values.draftpurchasereceive !== '' && values.draftpurchasereceive !== 'nodata'}
                                        />

                                        <label className="mt-3 form-label required" htmlFor="notes">
                                            {i18n.t('Notes 1')}
                                        </label>
                                        <Input

                                            name="notes"
                                            type="text"
                                            id="notes"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.notes}
                                            disabled={values.draftpurchasereceive !== '' && values.draftpurchasereceive !== 'nodata'}
                                        />
                                        <label className="mt-3 form-label required" htmlFor="notes2">
                                            {i18n.t('Notes 2')}
                                        </label>
                                        <Input

                                            name="notes2"
                                            type="text"
                                            id="notes2"
                                            // maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.notes2}
                                            disabled={values.draftpurchasereceive !== '' && values.draftpurchasereceive !== 'nodata'}
                                        />
                                        

                                        <label className="mt-3 form-label required" htmlFor="totalprice">
                                            {i18n.t('Total Nota')}
                                        </label>
                                        <Input
                                            name="totalprice"
                                            type="text"
                                            id="totalprice"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.totalprice !== '' ? numToMoney(values.totalprice) : ''}
                                            disabled={true}
                                        />

                                        {/* <label className="mt-3 form-label required" htmlFor="totalprice">
                                            {i18n.t('Setor')}
                                        </label>
                                        <table width={'100%'}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Input
                                                            name="setor"
                                                            type="text"
                                                            id="setor"
                                                            maxLength={100}

                                                            onChange={handleChange}
                                                            // onChange={val => handleInputNama(val)}
                                                            onBlur={handleBlur}
                                                            value={new String(values.setor).replaceAll(".", "") !== '' ? numToMoney(parseFloat(new String(values.setor).replaceAll(".", ""))) : ''}
                                                            disabled={values.isdefaultsetortotalprice}
                                                        />
                                                    </td>
                                                    <td style={{ paddingLeft: '10px' }}>
                                                        <FormGroup check >
                                                            <Input type="checkbox" name="check"
                                                                id="isdefaultsetortotalprice"
                                                                onChange={val => handleChangeIsDefaultSetor(val)}
                                                                defaultChecked={values.isdefaultsetortotalprice}
                                                                checked={values.isdefaultsetortotalprice}
                                                                style={{ transform: 'scale(1.5)' }}
                                                            />
                                                            <Label for="isdefaultsetortotalprice" check style={{ transform: 'scale(1.5)', marginLeft: '30px' }}>{i18n.t('Default Total Nota?')}</Label>
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table> */}

                                        <label className="mt-3 form-label required" htmlFor="transfer">
                                            {i18n.t('Transfer')}
                                        </label>
                                        <Input
                                            name="transfer"
                                            type="text"
                                            id="transfer"
                                            maxLength={100}

                                            onChange={handleChange}
                                            // onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={calculateTransfer(values.totalprice,values.sisadeposit,values.sisapinjaman)?numToMoney(calculateTransfer(values.totalprice,values.sisadeposit,values.sisapinjaman)):0}
                                            disabled={true}
                                        />
                                    </div>

                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItemsHidup}</div>
                                {
                                    // ListItemsPurchaseReceive.length == 0?'':

                                    <div className="row justify-content-center">
                                        <h4>{'Input Item Hidup'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '50px' }}>
                                                        <IconButton
                                                            style={{ color: 'white' }}
                                                            onClick={() => handleAddItemsHidup()}
                                                            hidden={values.vendor == '' || (values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== '')}
                                                        >
                                                            <AddIcon style={{ fontSize: 25 }} />
                                                        </IconButton>
                                                    </th>
                                                    <th >{i18n.t('Product')}</th>
                                                    <th >{i18n.t('Category Product')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    {/* <th >{i18n.t('Qty Bonus')}</th> */}
                                                    <th >{i18n.t('Qty Nota')}</th>
                                                    <th >{i18n.t('Price')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItemsPurchaseReceive.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemoveItemsHidup(i)}
                                                                        hidden={(values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== '') || x.idproduct == 'TOTAL'}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        
                                                                            <DropdownList
                                                                                name="idproduct"
                                                                                filter='contains'
                                                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                                                onChange={val => handleInputDropDownChange(val, i, 'idproduct', 'H')}
                                                                                data={ListProduct}
                                                                                textField={'label'}
                                                                                valueField={'value'}
                                                                                value={x.idproduct}
                                                                                disabled={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}
                                                                            />
                                                                        :x.idproduct
                                                                    }
                                                                    
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <DropdownList
                                                                        name="idcategoryproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idcategoryproduct', 'H')}
                                                                        data={ListCategoryProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idcategoryproduct}
                                                                        disabled={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}

                                                                    />:''
                                                                    }
                                                                    
                                                                    {/* <Input
                                                                name="categoryproductname"
                                                                type="text"
                                                                id="categoryproductname"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.categoryproductname}
                                                                disabled={true}
                                                                /> */}
                                                                </td>
                                                                <td>
                                                                    
                                                                        <Input
                                                                        name="qty"
                                                                        type="text"
                                                                        id="qty"
                                                                        onChange={val => handleInputChangeItems(val, i, 'H')}
                                                                        // onBlur={handleBlur}
                                                                        value={x.qty}
                                                                        disabled={values.draftpurchasereceive !== 'nodata'}
                                                                    />
                                                                    
                                                                    </td>
                                                                <td>
                                                                    {/* {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <Input
                                                                        name="qtybonus"
                                                                        type="text"
                                                                        id="qtybonus"
                                                                        onChange={val => handleInputChangeItems(val, i, 'H')}
                                                                        // onBlur={handleBlur}
                                                                        value={x.qtybonus}
                                                                        />
                                                                        :''
                                                                    } */}

                                                                        <Input
                                                                        name="qtynota"
                                                                        type="text"
                                                                        id="qtynota"
                                                                        onChange={val => handleInputChangeItems(val, i, 'H')}
                                                                        // onBlur={handleBlur}
                                                                        value={x.qtynota}
                                                                        disabled={x.idproduct == 'TOTAL'}
                                                                        />
                                                                </td>

                                                                <td style={{ width: '15%' }}>
                                                                    {
                                                                        x.idproduct !== 'TOTAL'?
                                                                        <Input
                                                                        name="itemsprice"
                                                                        type="text"
                                                                        id="itemsprice"
                                                                        onChange={val => handleInputChangeItems(val, i, 'H')}
                                                                        // onBlur={handleBlur}
                                                                        value={x.itemsprice !== '' ? numToMoney(parseFloat(x.itemsprice)) : ''}
                                                                        disabled={false}
                                                                    />:''
                                                                    }
                                                                    
                                                                    </td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotalprice"
                                                                        type="text"
                                                                        id="subtotalprice"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        // onBlur={handleBlur}
                                                                        // value={x.subtotalprice}
                                                                        value={x.subtotalprice !== '' ? numToMoney(parseFloat(x.subtotalprice)) : ''}
                                                                        disabled={true}
                                                                    /></td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }


                                {
                                    // ListItemsPurchaseReceiveMati.length == 0?'':
                                    <div className="row justify-content-center">
                                        <h4>{'Input Item Mati'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '50px' }}>
                                                        <IconButton
                                                            style={{ color: 'white' }}
                                                            onClick={() => handleAddItemsMati()}
                                                            hidden={values.vendor == '' || (values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== '')}
                                                        >
                                                            <AddIcon style={{ fontSize: 25 }} />
                                                        </IconButton>
                                                    </th>
                                                    <th >{i18n.t('Product')}</th>
                                                    <th >{i18n.t('Category Product')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Price')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItemsPurchaseReceiveMati.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemoveItemsMati(i)}
                                                                        hidden={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    <DropdownList
                                                                        name="idproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idproduct', 'M')}
                                                                        data={ListProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idproduct}
                                                                        disabled={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}

                                                                    />
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    <DropdownList
                                                                        name="idcategoryproduct"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChange(val, i, 'idcategoryproduct', 'M')}
                                                                        data={ListCategoryProduct}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idcategoryproduct}
                                                                        disabled={values.draftpurchasereceive !== 'nodata' && values.draftpurchasereceive !== ''}

                                                                    />
                                                                    {/* <Input
                                                                name="categoryproductname"
                                                                type="text"
                                                                id="categoryproductname"
                                                                // onChange={val => handleInputChangePrice(val,i)}
                                                                onBlur={handleBlur}
                                                                value={x.categoryproductname}
                                                                disabled={true}
                                                                /> */}
                                                                </td>
                                                                <td><Input
                                                                    name="qtymati"
                                                                    type="text"
                                                                    id="qtymati"
                                                                    onChange={val => handleInputChangeItems(val, i, 'M')}
                                                                    // onBlur={handleBlur}
                                                                    value={x.qtymati}
                                                                /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="itemsprice"
                                                                        type="text"
                                                                        id="itemsprice"
                                                                        onChange={val => handleInputChangeItems(val, i, 'M')}
                                                                        // onBlur={handleBlur}
                                                                        value={x.itemsprice !== '' ? numToMoney(parseFloat(x.itemsprice)) : ''}
                                                                        disabled={false}
                                                                    /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotalprice"
                                                                        type="text"
                                                                        id="subtotalprice"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        // onBlur={handleBlur}
                                                                        value={x.subtotalprice !== '' ? numToMoney(parseFloat(x.subtotalprice)) : ''}
                                                                        disabled={true}
                                                                    /></td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }



                                {
                                    // ListItemsPurchaseReceiveBiaya.length == 0?'':
                                    <div className="row justify-content-center">
                                        <h4>{'Input Penambahan Biaya'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        {/* <IconButton 
                                            style={{color:'white'}}
                                                onClick={() => handleAddBiaya()}
                                            >
                                                <AddIcon style={{ fontSize: 25 }}/>
                                            </IconButton> */}
                                                    </th>
                                                    <th >{i18n.t('Nama')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Price')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItemsPurchaseReceiveBiaya.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemoveBiaya(i)}
                                                                    // hidden={showplusdebit}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td><Input
                                                                    name="namabiaya"
                                                                    type="text"
                                                                    id="namabiaya"
                                                                    // onChange={val => handleInputChangeBiaya(val,i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.namabiayacustom}
                                                                    onChange={val => handleInputChangeBiaya(val, i)}
                                                                    disabled={x.namabiaya == 'BOAT' || x.namabiaya == 'BANTUAN'?false:true}
                                                                /></td>
                                                                <td><Input
                                                                    name="qty"
                                                                    type="text"
                                                                    id="qty"
                                                                    onChange={val => handleInputChangeBiaya(val, i)}
                                                                    onBlur={handleBlur}
                                                                    value={x.qty}
                                                                /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="price"
                                                                        type="text"
                                                                        id="price"
                                                                        onChange={val => handleInputChangeBiaya(val, i)}
                                                                        onBlur={handleBlur}
                                                                        value={x.price !== '' ? numToMoney(parseFloat(x.price)) : ''}
                                                                        disabled={x.namabiaya == 'BOX' || x.namabiaya == 'ONGKOS'}
                                                                    /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotal"
                                                                        type="text"
                                                                        id="subtotal"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        onBlur={handleBlur}
                                                                        value={x.subtotal !== '' ? numToMoney(parseFloat(x.subtotal)) : ''}
                                                                        disabled={true}
                                                                    /></td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }

                                {
                                    // ListItemsPurchaseReceiveBiaya.length == 0?'':
                                    <div className="row justify-content-center">
                                        <h4>{'Input Pengurangan Biaya'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        {/* <IconButton 
                                            style={{color:'white'}}
                                                onClick={() => handleAddBiaya()}
                                            >
                                                <AddIcon style={{ fontSize: 25 }}/>
                                            </IconButton> */}
                                                    </th>
                                                    <th >{i18n.t('Nama')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Price')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItemsPurchaseReceivePenguranganBiaya.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemovePenguranganBiaya(i)}
                                                                    // hidden={showplusdebit}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td><Input
                                                                    name="namabiaya"
                                                                    type="text"
                                                                    id="namabiaya"
                                                                    // onChange={val => handleInputChangeBiaya(val,i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.namabiayacustom}
                                                                    onChange={val => handleInputChangePenguranganBiaya(val, i)}
                                                                    disabled={x.namabiaya == 'BOAT' || x.namabiaya == 'BANTUAN'?false:true}
                                                                /></td>
                                                                <td><Input
                                                                    name="qty"
                                                                    type="text"
                                                                    id="qty"
                                                                    onChange={val => handleInputChangePenguranganBiaya(val, i)}
                                                                    onBlur={handleBlur}
                                                                    value={x.qty}
                                                                /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="price"
                                                                        type="text"
                                                                        id="price"
                                                                        onChange={val => handleInputChangePenguranganBiaya(val, i)}
                                                                        onBlur={handleBlur}
                                                                        value={x.price !== '' ? numToMoney(parseFloat(x.price)) : ''}
                                                                        disabled={x.namabiaya == 'BOX' || x.namabiaya == 'ONGKOS'}
                                                                    /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotal"
                                                                        type="text"
                                                                        id="subtotal"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        onBlur={handleBlur}
                                                                        value={x.subtotal !== '' ? numToMoney(parseFloat(x.subtotal)) : ''}
                                                                        disabled={true}
                                                                    /></td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }


                                {
                                    // ListItemsPurchaseReceiveMati.length == 0?'':
                                    <div className="row justify-content-center">
                                        <h4>{'Input Item Inventori'}</h4>
                                        <table id="tablegrid">
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: '50px' }}>
                                                        <IconButton
                                                            style={{ color: 'white' }}
                                                            onClick={() => handleAddItemsInventori()}
                                                            hidden={values.vendor == ''}
                                                        >
                                                            <AddIcon style={{ fontSize: 25 }} />
                                                        </IconButton>
                                                    </th>
                                                    <th >{i18n.t('Nama')}</th>
                                                    <th >{i18n.t('Qty')}</th>
                                                    <th >{i18n.t('Price')}</th>
                                                    <th >{i18n.t('Subtotal Price')}</th>
                                                </tr>
                                                {
                                                    ListItemsInventori.map((x, i) => {
                                                        return (
                                                            <tr>
                                                                <td >
                                                                    <IconButton
                                                                        color={'primary'}
                                                                        // style={{color:'white'}}
                                                                        onClick={() => handleRemoveInventori(i)}
                                                                    // hidden={showplusdebit}
                                                                    >
                                                                        <DeleteIcon style={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </td>
                                                                <td style={{ width: '20%' }}>
                                                                    <DropdownList
                                                                        name="idinventori"
                                                                        filter='contains'
                                                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                                                        onChange={val => handleInputDropDownChangeInventori(val, i, 'idinventori')}
                                                                        data={ListInventori}
                                                                        textField={'label'}
                                                                        valueField={'value'}
                                                                        value={x.idinventori}

                                                                    />
                                                                </td>
                                                                <td><Input
                                                                    name="qty"
                                                                    type="text"
                                                                    id="qty"
                                                                    onChange={val => handleInputChangeInventori(val, i)}
                                                                    // onBlur={handleBlur}
                                                                    value={x.qty}
                                                                /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="price"
                                                                        type="text"
                                                                        id="price"
                                                                        onChange={val => handleInputChangeInventori(val, i)}
                                                                        // onBlur={handleBlur}
                                                                        value={x.price !== '' ? numToMoney(parseFloat(x.price)) : ''}
                                                                        disabled={false}
                                                                    /></td>

                                                                <td style={{ width: '15%' }}>
                                                                    <Input
                                                                        name="subtotalprice"
                                                                        type="text"
                                                                        id="subtotalprice"
                                                                        // onChange={val => handleInputChangePrice(val,i)}
                                                                        // onBlur={handleBlur}
                                                                        value={x.subtotalprice !== '' ? numToMoney(parseFloat(x.subtotalprice)) : ''}
                                                                        disabled={true}
                                                                    /></td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }

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