import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
// import {Input,Button,FormGroup,Label} from 'reactstrap';
import {Input,Button,Label,FormGroup} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addCustomerManggala_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import '../../CSS/table.css';
import InputMask                    from 'react-input-mask';

export default function AddCustomerManggala(props) {
    reloadToHomeNotAuthorize(addCustomerManggala_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListCustomerType, setListCustomerType] = useState([]);
    const [SelCustomerType, setSelCustomerType] = useState('');
    const [ErrSelCustomerType, setErrSelCustomerType] = useState('');

    const [InputCustomerName, setInputCustomerName] = useState('');
    const [ErrInputCustomerName, setErrInputCustomerName] = useState('');

    const [InputAlis, setInputAlias] = useState('');
    const [ErrInputAlis, setErrInputAlias] = useState('');
    const [InputAlamat, setInputAlamat] = useState('');
    const [ErrInputAlamat, setErrInputAlamat] = useState('');

    const [ListProvinsi, setListProvinsi] = useState([]);
    const [SelProvinsi, setSelProvinsi] = useState('');
    const [ErrSelProvinsi, setErrSelProvinsi] = useState('');

    const [ListCity, setListCity] = useState([]);
    const [SelCity, setSelCity] = useState('');
    const [ErrSelCity, setErrSelCity] = useState('');

    const [ListKodePos, setListKodePos] = useState([]);
    const [SelKodePos, setSelKodePos] = useState('');
    const [ErrSelKodePos, setErrSelKodePos] = useState('');
    const [InputNpwp, setInputNpwp] = useState('');
    const [ErrInputNpwp, setErrInputNpwp] = useState('');
    const [InputNib, setInputNib] = useState('');
    const [ErrInputNib, setErrInputNib] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);
    const [InputListNoKantor, setInputListNoKantor] = useState([{ nokantor: ""}]);

    const [InputListInfoKementerian, setInputListInfoKementerian] = useState([{ kementerian:"",alamat_email: "", password_email: ""}]);
    const [ErrInputKementtrian, setErrInputKementtrian] = useState('');
    const [ErrInputAlamatEmail, setErrInputAlamatEmail] = useState('');
    const [ErrInputPasswordEmail, setErrInputPasswordEmail] = useState('');
    
    const [InputListInfoContact, setInputListInfoContact] = useState([{ panggilan:"",namakontak: "", listnotelepon: [{notelepon:""}],email:"",noext:""}]);
    const [ErrInputPanggilan, setErrInputPanggilan] = useState('');
    const [ErrInputNamaKontak, setErrInputNamaKontak] = useState('');
    const [ErrInputNotelepon, setErrInputNotelepon] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');
    const [ErrInputNoExt, setErrInputNoExt] = useState('');

    const [ListPanggilan, setListPanggilan] = useState([]);

    const [DataTemplate, setDataTemplate] = useState([]);

    const [ListAreaKirim, setListAreaKirim] = useState([]);
    // const [InputListInfoGudang, setInputListInfoGudang] = useState([{ namagudang:"",areakirim: "",alamatgudang:"",ancerancer:"", listkontakgudang: [{kontakgudang:""}],listhpkontakgudang: [{hpkontakgudang:""}],note:""}]);
    const [InputListInfoGudang, setInputListInfoGudang] = useState([]);
    const [ErrInputNamaGudang, setErrInputNamaGudang] = useState('');
    const [ErrInputAreaKirim, setErrInputAreaKirim] = useState('');
    const [ErrInputAlamatGudang, setErrInputAlamatGudang] = useState('');
    const [ErrInputAncerAncer, setErrInputAncerAncer] = useState('');
    const [ErrInputKontakGudang, setErrInputKontakGudang] = useState('');
    const [ErrInputHpKontakGudang, setErrInputHpKontakGudang] = useState('');
    const [ErrInputNote, setErrInputNote] = useState('');

    const [ListGudang, setListGudang] = useState([]);
    const [SelGudang, setSelGudang] = useState('');
    const [DataGudang, setDataGudang] = useState('');
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCustomerManggalaData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setDataTemplate(data.data);
            setListCustomerType(data.data.customertypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListPanggilan(data.data.panggilanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            

            setListProvinsi(data.data.provinceOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.prov_id,
                    label: el.prov_name
                }]
            ), []));

            setListGudang(data.data.warehouseOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama,
                    detail: el
                }]
            ), []));
        }
        setLoading(false);
    }
    const handleChangeCustomerType = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCustomerType(id);
    }

    const handleInputCustomerName = (data) =>{
        let val = data.target.value;
        setInputCustomerName(val)
    }

    const handleInputAlias = (data) =>{
        let val = data.target.value;
        setInputAlias(val)
    }

    const handleInputAlamat = (data) =>{
        let val = data.target.value;
        setInputAlamat(val)
    }

    const handleChangeProvinsi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelProvinsi(id);
        setSelKodePos('');
        setListKodePos([]);
        setSelCity('');
        setKosongAreaKirim();
        let listfilteroutput = DataTemplate.cityOptions.filter(output => output.prov_id == id);
        if(listfilteroutput.length > 0){
            setListCity(listfilteroutput.reduce((obj, el) => (
                [...obj, {
                    value: el.city_id,
                    label: el.city_name
                }]
            ), []));
        }else{
            setListCity([]);
        }
        
    }

    const handleChangeKota = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCity(id);
        setSelKodePos('');
        setListKodePos([]);
        setKosongAreaKirim();
        setLoading(true);
        dispatch(actions.getAddressData('/postalcodebycityandprovince?cityid='+id+'&provid='+SelProvinsi,successHandlerPostalCode, errorHandler));
    }
    const successHandlerPostalCode = (data) =>{
        const result = Object.values(
            data.data.reduce((acc, obj) => ({ ...acc, [obj.postal_code]: obj }), {})
        );
        setListKodePos(result.reduce((obj, el) => (
            [...obj, {
                value: el.postal_code,
                label: el.postal_code
            }]
        ), []));
        setLoading(false);
    }

    const handleChangeKodePos = (data) =>{
        let id = data?.value ? data.value : '';
        setSelKodePos(id);
        setKosongAreaKirim();
        setLoading(true);
        dispatch(actions.getAddressData('/districtbypostalcode?postalcode='+id,successHandlerDistrictPostalCode, errorHandler));
    }

    const successHandlerDistrictPostalCode = (data) =>{
        setListAreaKirim(data.data.reduce((obj, el) => (
            [...obj, {
                value: el.dis_id,
                label: el.dis_name
            }]
        ), []));
        setLoading(false);
    }

    const handleInputNpwp = (data) =>{
        let val = data.target.value;
        setInputNpwp(val)
    }

    const handleInputNib = (data) =>{
        let val = data.target.value;
        setInputNib(val)
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    const setKosongAreaKirim = () =>{
        const list = [...InputListInfoGudang];
        for(let index=0; index < list.length; index++){
            list[index]['areakirim'] = '';
        }
        
        // setInputListInfoGudang(list);
    }

    const handleChangeGudang = (data) =>{
        let id = data?.value ? data.value : '';
        let detail = data?.detail ? data.detail : [];
        setSelGudang(id);
        setDataGudang(detail)
    }

    const handleAddGudang = () => {
        let listfilteroutput = InputListInfoGudang.filter(output => output.id == SelGudang);
        if(listfilteroutput.length <= 0){
            const list = [...InputListInfoGudang];

            let cek = new String(DataGudang.contactnumber).includes(',');
            let listkontakgudang = [];
            if(cek){
                let arrList = new String(DataGudang.contactnumber).split(',');
                for(let j=0; j < arrList.length; j++){
                    listkontakgudang.push({ kontakgudang: arrList[j]});
                }
            }else{
                listkontakgudang.push({ kontakgudang: DataGudang.contactnumber});
            }

            cek = new String(DataGudang.contacthp).includes(',');
            let listhpkontakgudang = [];
            if(cek){
                let arrList = new String(DataGudang.contacthp).split(',');
                for(let j=0; j < arrList.length; j++){
                    listhpkontakgudang.push({ hpkontakgudang: arrList[j]});
                }
            }else{
                listhpkontakgudang.push({ hpkontakgudang: DataGudang.contacthp});
            }

            let obj = {id:DataGudang.id, namagudang:DataGudang.nama,areakirim: DataGudang.kecamatanname,alamatgudang:DataGudang.alamat,ancerancer:DataGudang.ancerancer, listkontakgudang: listkontakgudang,listhpkontakgudang: listhpkontakgudang,note:DataGudang.note}
            list.push(obj);
            // list[index][name] = e.value;
            setInputListInfoGudang(list);
            //id:"", namagudang:"",areakirim: "",alamatgudang:"",ancerancer:"", listkontakgudang: [{kontakgudang:""}],listhpkontakgudang: [{hpkontakgudang:""}],note:""}

        }
    }
    

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNib('');
        setErrInputCustomerName('');
        setErrInputNpwp('');
        setErrSelProvinsi('');
        setErrSelCity('');
        setErrSelKodePos('');
        setErrSelCustomerType('');
        setErrInputKementtrian('');
        setErrInputAlamatEmail('');
        setErrInputPasswordEmail('');
        setErrInputPanggilan('');
        setErrInputNamaKontak('');
        setErrInputNotelepon('');
        setErrInputEmail('');
        setErrInputNoExt('');

        setErrInputNamaGudang('');
        setErrInputAreaKirim('');
        setErrInputAlamatGudang('');
        setErrInputKontakGudang('');
        setErrInputHpKontakGudang('');
        
        // if(InputListInfoGudang.length > 0){
        //     for(let i=0; i < InputListInfoGudang.length; i++){
        //         let det = InputListInfoGudang[i];
        //         if(det.namagudang !== '' || det.areakirim !== '' || det.alamatgudang !== '' ){
        //             if(det.namagudang == ''){
        //                 setErrInputNamaGudang(i18n.t('label_NAME')+' '+i18n.t('label_REQUIRED'));
        //                 flag = false;
        //             }

        //             if(det.areakirim == ''){
        //                 setErrInputAreaKirim(i18n.t('label_SEND_AREA')+' '+i18n.t('label_REQUIRED'));
        //                 flag = false;
        //             }

        //             if(det.alamatgudang == ''){
        //                 setErrInputAlamatGudang(i18n.t('label_ADDRESS')+' '+i18n.t('label_REQUIRED'));
        //                 flag = false;
        //             }

        //             if(det.listkontakgudang.length > 0){
        //                 for(let j=0; j < det.listkontakgudang.length; j++){
        //                     let detnotlp = det.listkontakgudang[j];
        //                     if(detnotlp.kontakgudang == ''){
        //                         setErrInputKontakGudang(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
        //                         flag = false;
        //                     }
        //                 }
        //             }else{
        //                 setErrInputKontakGudang(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
        //                 flag = false;
        //             }

        //             if(det.listhpkontakgudang.length > 0){
        //                 for(let j=0; j < det.listhpkontakgudang.length; j++){
        //                     let detnotlp = det.listhpkontakgudang[j];
        //                     if(detnotlp.hpkontakgudang == ''){
        //                         setErrInputHpKontakGudang(i18n.t('label_CONTACT_NUMBER')+' (HP) '+i18n.t('label_REQUIRED'));
        //                         flag = false;
        //                     }
        //                 }
        //             }else{
        //                 setErrInputHpKontakGudang(i18n.t('label_CONTACT_NUMBER')+' (HP)'+i18n.t('label_REQUIRED'));
        //                 flag = false;
        //             }
        //         }
        //     }
        // }
        
        if(InputListInfoContact.length > 0){
            for(let i=0; i < InputListInfoContact.length; i++){
                let det = InputListInfoContact[i];
                if(det.panggilan !== '' || det.namakontak !== '' || det.email !== '' || det.noext !== ''){
                    if(det.panggilan == ''){
                        setErrInputPanggilan('Bapak/Ibu '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.namakontak == ''){
                        setErrInputNamaKontak(i18n.t('label_CONTACT_NAME')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.email == ''){
                        setErrInputEmail('Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.noext == ''){
                        setErrInputNoExt('No Ext '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.listnotelepon.length > 0){
                        for(let j=0; j < det.listnotelepon.length; j++){
                            let detnotlp = det.listnotelepon[j];
                            if(detnotlp.notelepon == ''){
                                setErrInputNotelepon(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrInputNotelepon(i18n.t('label_CONTACT_NUMBER')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }

                
            }
        }

        if(InputListInfoKementerian.length > 0){
            for(let i=0; i < InputListInfoKementerian.length; i++){
                let det = InputListInfoKementerian[i];
                if(det.kementerian !== '' || det.alamat_email !== '' || det.password_email !== ''){
                    if(det.kementerian == ''){
                        setErrInputKementtrian(i18n.t('label_MINISTRY')+' '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.alamat_email == ''){
                        setErrInputAlamatEmail('Email / Login '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.password_email == ''){
                        setErrInputPasswordEmail('Password '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }
        if(InputNib == ''){
            setErrInputNib(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputCustomerName == ''){
            setErrInputCustomerName(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputNpwp == ''){
            setErrInputNpwp(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelProvinsi == ''){
            setErrSelProvinsi(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCity == ''){
            setErrSelCity(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelKodePos == ''){
            setErrSelKodePos(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCustomerType == ''){
            setErrSelCustomerType(i18n.t('label_REQUIRED'));
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
            obj.customertype = SelCustomerType;
            obj.customername = InputCustomerName;
            obj.alias = InputAlis;
            obj.alamat = InputAlamat;
            obj.provinsi = SelProvinsi;
            obj.kota = SelCity;
            obj.kodepos = SelKodePos;
            obj.npwp = new String(InputNpwp).replaceAll('_','');
            obj.nib = InputNib;
            obj.isactive = InputIsActive;
            let listnotelp = '';
            if(InputListNoKantor.length > 0){
                let count =0;
                for(let i=0; i < InputListNoKantor.length; i++){
                    let no = InputListNoKantor[i].nokantor;
                    count++;
                    if(no != ''){
                        no = new String(no).replaceAll('_','');
                        if(count == InputListNoKantor.length){
                            listnotelp += no;
                        }else{
                            listnotelp += no+',';
                        }
                        
                    }
                    
                }
            }
            obj.telpkantor = listnotelp;
            obj.detailsinfokementerian = InputListInfoKementerian;

            let listinfocontact =[];
            if(InputListInfoContact.length > 0){
                
                for(let i=0; i < InputListInfoContact.length; i++){
                    let det = InputListInfoContact[i];
                    let listnotelpinfocontact = '';
                    if(det.panggilan !== '' && det.namakontak !== '' && det.email !== '' && det.noext !== ''){
                        let count =0;
                        for(let j=0; j < det.listnotelepon.length; j++){
                            let no = det.listnotelepon[j].notelepon;
                            count++;
                            if(no != ''){
                                no = new String(no).replaceAll('_','');
                                if(count == det.listnotelepon.length){
                                    listnotelpinfocontact += no;
                                }else{
                                    listnotelpinfocontact += no+',';
                                }
                            }
                        }
                        let objinfocontact = new Object();
                        objinfocontact.panggilan = det.panggilan;
                        objinfocontact.namakontak = det.namakontak;
                        objinfocontact.email = det.email;
                        objinfocontact.noext = new String(det.noext).replaceAll('_','');
                        objinfocontact.notelepon = listnotelpinfocontact;
                        listinfocontact.push(objinfocontact);
                    }
                }
            }
            obj.detailsinfocontact = listinfocontact;

            let listinfogudang =[];
            if(InputListInfoGudang.length > 0){
                for(let i=0; i < InputListInfoGudang.length; i++){
                    let det = InputListInfoGudang[i];
                    let objinfogudang = new Object();
                    objinfogudang.idwarehouse = det.id;
                    listinfogudang.push(objinfogudang);

                    // let listkontakgudang = '';
                    // let listhpkontakgudang = '';
                    // if(det.namagudang !== '' && det.areakirim !== '' && det.alamatgudang !== ''){
                    //     let count =0;
                    //     for(let j=0; j < det.listkontakgudang.length; j++){
                    //         let no = det.listkontakgudang[j].kontakgudang;
                    //         count++;
                    //         if(no != ''){
                    //             if(count == det.listkontakgudang.length){
                    //                 listkontakgudang += no;
                    //             }else{
                    //                 listkontakgudang += no+',';
                    //             }
                    //         }
                    //     }

                    //     count =0;
                    //     for(let j=0; j < det.listhpkontakgudang.length; j++){
                    //         let no = det.listhpkontakgudang[j].hpkontakgudang;
                    //         count++;
                    //         if(no != ''){
                    //             if(count == det.listhpkontakgudang.length){
                    //                 listhpkontakgudang += no;
                    //             }else{
                    //                 listhpkontakgudang += no+',';
                    //             }
                    //         }
                    //     }

                    //     let objinfogudang = new Object();
                    //     objinfogudang.namagudang = det.namagudang;
                    //     objinfogudang.areakirim = det.areakirim;
                    //     objinfogudang.alamatgudang = det.alamatgudang;
                    //     objinfogudang.ancerancer = det.ancerancer;
                    //     objinfogudang.kontakgudang = listkontakgudang;
                    //     objinfogudang.hpkontakgudang = listhpkontakgudang;
                    //     objinfogudang.note = det.note;
                    //     listinfogudang.push(objinfogudang);
                    // }
                }
            }
            obj.detailsinfogudang = listinfogudang;
            dispatch(actions.submitAddCustomerManggala('',obj,succesHandlerSubmit, errorHandler));
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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        let repVal = new String(value).replaceAll('(','');
        repVal = new String(repVal).replaceAll(')','')
        if(name == 'nokantor' && isNaN(repVal)){
            flag = false;
        }
        if(flag){
            const list = [...InputListNoKantor];
            list[index][name] = value;
            setInputListNoKantor(list);
        }
        
    };

    const handleInputChangeKementerian = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoKementerian];
        list[index][name] = value;
        setInputListInfoKementerian(list);
    };

    const handleInputChangeInfoContact = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoContact];
        list[index][name] = value;
        setInputListInfoContact(list);
    };

    const handleInputChangeInfoGudang = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListInfoGudang];
        list[index][name] = value;
        setInputListInfoGudang(list);
    };
    
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...InputListNoKantor];
        list.splice(index, 1);
        setInputListNoKantor(list);
    };

    const handleRemoveClickInfoKementerian = index => {
        const list = [...InputListInfoKementerian];
        list.splice(index, 1);
        setInputListInfoKementerian(list);
    };

    const handleRemoveClickInfoContact = index => {
        const list = [...InputListInfoContact];
        list.splice(index, 1);
        setInputListInfoContact(list);
    };

    const handleRemoveClickInfoGudang = index => {
        const list = [...InputListInfoGudang];
        list.splice(index, 1);
        setInputListInfoGudang(list);
    };
    
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputListNoKantor([...InputListNoKantor, { nokantor: ""}]);
    };

    const handleAddClickInfoKementerian = () => {
        setInputListInfoKementerian([...InputListInfoKementerian, { kementerian:"",alamat_email: "", password_email: ""}]);
    };

    const handleAddClickInfoContact = () => {
        setInputListInfoContact([...InputListInfoContact, { panggilan:"",namakontak: "", listnotelepon: [{notelepon:""}],email:"",noext:""}]);
    };

    const handleAddClickInfoGudang = () => {
        setInputListInfoGudang([...InputListInfoGudang, { namagudang:"",areakirim: "",alamatgudang:"",ancerancer:"", listkontakgudang: [{kontakgudang:""}],listhpkontakgudang: [{hpkontakgudang:""}],note:""}]);
    };

    const handleInputDropDownChangeInfoContact = (e, index,name) => {
        const list = [...InputListInfoContact];
        list[index][name] = e.value;
        setInputListInfoContact(list);
    };

    const handleInputDropDownChangeInfoGudang = (e, index,name) => {
        const list = [...InputListInfoGudang];
        list[index][name] = e.value;
        setInputListInfoGudang(list);
    };

    const handleAddClickListKontakGudangInfoGudang = (paramparent,indexparent) => {
        const list = [...InputListInfoGudang];
        const listKontakGudang = [...list[indexparent][paramparent], { kontakgudang: ""}];
        list[indexparent][paramparent] = listKontakGudang;
        setInputListInfoGudang(list);
    };

    const handleRemoveClickListKontakGudangInfoGudang = (paramparent,indexparent,index) => {
        const list = [...InputListInfoGudang];
        const listKontakGudang = [...list[indexparent][paramparent]];
        listKontakGudang.splice(index, 1);
        list[indexparent][paramparent] = listKontakGudang;
        setInputListInfoGudang(list);
    };

    const handleAddClickListHpKontakGudangInfoGudang = (paramparent,indexparent) => {
        const list = [...InputListInfoGudang];
        const listKontakGudang = [...list[indexparent][paramparent], { hpkontakgudang: ""}];
        list[indexparent][paramparent] = listKontakGudang;
        setInputListInfoGudang(list);
    };

    const handleRemoveClickListHpKontakGudangInfoGudang = (paramparent,indexparent,index) => {
        const list = [...InputListInfoGudang];
        const listKontakGudang = [...list[indexparent][paramparent]];
        listKontakGudang.splice(index, 1);
        list[indexparent][paramparent] = listKontakGudang;
        setInputListInfoGudang(list);
    };

    const handleAddClickListNoTelpInfoContact = (paramparent,indexparent) => {
        const list = [...InputListInfoContact];
        const listnotelp = [...list[indexparent][paramparent], { notelepon: ""}];
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
    };

    const handleRemoveClickListNoTelpInfoContact = (paramparent,indexparent,index) => {
        const list = [...InputListInfoContact];
        const listnotelp = [...list[indexparent][paramparent]];
        listnotelp.splice(index, 1);
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
    };

    const handleInputChangeListNoTelpInfoContact = (e, paramparent,indexparent,indexchild) => {
        // let paramlist = 'listnotelepon';
        const { name, value } = e.target;
        let flag = true;
        if(name == 'notelepon' && isNaN(value)){
            flag = false;
        }
        if(flag){
            const list = [...InputListInfoContact];
            const listnotelp = list[indexparent][paramparent];
            listnotelp[indexchild][name] = value;
            list[indexparent][paramparent] = listnotelp;
            setInputListInfoContact(list);
        }
    };

    const handleInputChangeListInfoGudang = (e, paramparent,indexparent,indexchild) => {
        // let paramlist = 'listnotelepon';
        const { name, value } = e.target;
        const list = [...InputListInfoGudang];
        const listinfogudang = list[indexparent][paramparent];
        listinfogudang[indexchild][name] = value;
        list[indexparent][paramparent] = listinfogudang;
        setInputListInfoGudang(list);
    };
    

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: i18n.t(data.msgcode)
        })
    }

    return (
        <Formik
        initialValues={
            {
                customertype:SelCustomerType,
                customername:InputCustomerName,
                alias:InputAlis,
                alamat:InputAlamat,
                provinsi:SelProvinsi,
                city:SelCity,
                npwp:InputNpwp,
                nib:InputNib,
                kodepos:SelKodePos,
                isactive:InputIsActive
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddCustomerManggala">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addcustomers} label={'Add Customer'} labeldefault={'Add Customer'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="customertype">
                                {i18n.t('PT / CV')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="customertype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeCustomerType(val)}
                                onBlur={val => setFieldTouched("customertype", val?.value ? val.value : '')}
                                data={ListCustomerType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.customertype}
                            />
                            <div className="invalid-feedback-custom">{ErrSelCustomerType}</div>

                            <label className="mt-3 form-label required" htmlFor="customername">
                                {i18n.t('label_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="customername"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="customername"
                                onChange={val => handleInputCustomerName(val)}
                                onBlur={handleBlur}
                                value={values.customername}
                            />
                            <div className="invalid-feedback-custom">{ErrInputCustomerName}</div>

                            <label className="mt-3 form-label required" htmlFor="alias">
                                {i18n.t('Alias')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="alias"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="alias"
                                onChange={val => handleInputAlias(val)}
                                onBlur={handleBlur}
                                value={values.alias}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlis}</div>

                            
                            <label className="mt-3 form-label required" htmlFor="npwp">
                                {i18n.t('NPWP')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <Input
                                name="npwp"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="npwp"
                                mask="99.999.999.9-999.999"
                                tag={InputMask}
                                onChange={val => handleInputNpwp(val)}
                                onBlur={handleBlur}
                                value={values.npwp}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNpwp}</div>

                            <label className="mt-3 form-label required" htmlFor="nib">
                                {i18n.t('NIB')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <Input
                                name="nib"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="nib"
                                onChange={val => handleInputNib(val)}
                                onBlur={handleBlur}
                                value={values.nib}
                            />
                            <div className="invalid-feedback-custom">{ErrInputNib}</div>

                            <label className="mt-3 form-label required" htmlFor="ntp">
                                {i18n.t('label_PHONE_OFFICE')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'120%'}}>
                                {
                                    InputListNoKantor.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="nokantor"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="nokantor"
                                                // mask="(9999)999-9999"
                                                // tag={InputMask}
                                                onChange={val => handleInputChange(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.nokantor}
                                                disabled={false}
                                                maxLength={16}
                                                />
                                                </td>
                                                
                                                <td hidden={i > 0}>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClick()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                </td>
                                                <td hidden={i == 0}>
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
                            </table>
                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            
                            <label className="mt-3 form-label required" htmlFor="provinsi">
                                {i18n.t('label_PROVINCE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="provinsi"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeProvinsi(val)}
                                onBlur={val => setFieldTouched("provinsi", val?.value ? val.value : '')}
                                data={ListProvinsi}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.provinsi}
                            />
                            <div className="invalid-feedback-custom">{ErrSelProvinsi}</div>

                            <label className="mt-3 form-label required" htmlFor="city">
                                {i18n.t('label_CITY')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="city"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeKota(val)}
                                onBlur={val => setFieldTouched("city", val?.value ? val.value : '')}
                                data={ListCity}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.city}
                            />
                            <div className="invalid-feedback-custom">{ErrSelCity}</div>

                            <label className="mt-3 form-label required" htmlFor="kodepos">
                                {i18n.t('label_POSTAL_CODE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="kodepos"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeKodePos(val)}
                                onBlur={val => setFieldTouched("kodepos", val?.value ? val.value : '')}
                                data={ListKodePos}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.kodepos}
                            />
                            <div className="invalid-feedback-custom">{ErrSelKodePos}</div>

                            <label className="mt-3 form-label required" htmlFor="alamat">
                                {i18n.t('label_ADDRESS')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                    name="alamat"
                                    type="textarea"
                                    id="alamat"
                                    onChange={val => handleInputAlamat(val)}
                                    onBlur={handleBlur}
                                    value={values.alamat}
                                    disabled={false}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlamat}</div>

                            {/* <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactive}
                            checked={values.isactive}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>     */}

                            </div>

                            </div>
                                <div style={{marginTop:'0px'}}><h3>{i18n.t('label_MINISTRY_INFO')}</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputKementtrian}</div>
                                <div className="invalid-feedback-custom">{ErrInputAlamatEmail}</div>
                                <div className="invalid-feedback-custom">{ErrInputPasswordEmail}</div>
                            {
                                InputListInfoKementerian.length == 0?'':
                                
                                <table id="tablegrid">
                                    
                                <tr>
                                    <th>{i18n.t('label_MINISTRY')}</th>
                                    <th>{i18n.t('Email / Login')}</th>
                                    <th>{i18n.t('Password')}</th>
                                    <th>{i18n.t('Action')}</th>
                                </tr>
                                {
                                    InputListInfoKementerian.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="kementerian"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="kementerian"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.kementerian}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <Input
                                                name="alamat_email"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="alamat_email"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.alamat_email}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <Input
                                                name="password_email"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="password_email"
                                                onChange={val => handleInputChangeKementerian(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.password_email}
                                                disabled={false}
                                                />
                                                </td>

                                                <td>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClickInfoKementerian()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                <IconButton color={'primary'} hidden={i == 0}
                                                onClick={() => handleRemoveClickInfoKementerian(i)}
                                                // hidden={showplusdebit}
                                                >
                                                    <RemoveIcon style={{ fontSize: 18 }}/>
                                                </IconButton>    
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </table>
                            }

                                <div style={{marginTop:'50px'}}><h3>{i18n.t('label_CONTACT_INFORMATION')}</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputPanggilan}</div>
                                <div className="invalid-feedback-custom">{ErrInputNamaKontak}</div>
                                <div className="invalid-feedback-custom">{ErrInputNotelepon}</div>
                                <div className="invalid-feedback-custom">{ErrInputEmail}</div>
                                <div className="invalid-feedback-custom">{ErrInputNoExt}</div>
                                {
                                    InputListInfoContact.length == 0?'':
                                    <table id="tablegrid">
                                        <tr>
                                            <th>{i18n.t('Bapak/Ibu')}</th>
                                            <th>{i18n.t('label_CONTACT_NAME')}</th>
                                            <th>{i18n.t('label_CONTACT_NUMBER')}</th>
                                            <th>{i18n.t('Email')}</th>
                                            <th>{i18n.t('No Ext')}</th>
                                            <th>{i18n.t('Action')}</th>
                                        </tr>
                                        {
                                            InputListInfoContact.map((x, i) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                        <DropdownList
                                                            name="panggilan"
                                                            filter='contains'
                                                            // placeholder={i18n.t('select.SELECT_OPTION')}
                                                            
                                                            onChange={val => handleInputDropDownChangeInfoContact(val,i,'panggilan')}
                                                            data={ListPanggilan}
                                                            textField={'label'}
                                                            valueField={'value'}
                                                            style={{width: '100px'}}
                                                            value={x.panggilan}
                                                        />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="namakontak"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="namakontak"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.namakontak}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <table >
                                                            {
                                                                x.listnotelepon.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                            <Input
                                                                            name="notelepon"
                                                                            // className={
                                                                            //     touched.amount && errors.amount
                                                                            //         ? "w-50 input-error"
                                                                            //         : "w-50"
                                                                            // }
                                                                            type="text"
                                                                            id="notelepon"
                                                                            // mask="9999999999999"
                                                                            // tag={InputMask}
                                                                            onChange={val => handleInputChangeListNoTelpInfoContact(val,'listnotelepon',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.notelepon}
                                                                            disabled={false}
                                                                            maxLength={16}
                                                                            />
                                                                            </td>
                                                                            
                                                                            <td hidden={j > 0}>
                                                                            <IconButton color={'primary'} hidden={j > 0}
                                                                                onClick={() => handleAddClickListNoTelpInfoContact('listnotelepon',i)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>
                                                                            </td>
                                                                            <td hidden={j == 0}>
                                                                            <IconButton color={'primary'} hidden={j == 0}
                                                                            onClick={() => handleRemoveClickListNoTelpInfoContact('listnotelepon',i,j)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>    
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </table>
                                                        {/* <Input
                                                            name="notelepon"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="notelepon"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.notelepon}
                                                            disabled={false}
                                                            /> */}
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="email"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="email"
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.email}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="noext"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="noext"
                                                            mask="9999"
                                                            tag={InputMask}
                                                            onChange={val => handleInputChangeInfoContact(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.noext}
                                                            disabled={false}
                                                            />
                                                        </td>

                                                        <td>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClickInfoContact()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClickInfoContact(i)}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>    
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                }

                                <div style={{marginTop:'50px'}}><h3>{i18n.t('label_WAREHOUSE_INFO')}</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputNamaGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputAreaKirim}</div>
                                <div className="invalid-feedback-custom">{ErrInputAlamatGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputAncerAncer}</div>
                                <div className="invalid-feedback-custom">{ErrInputKontakGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputHpKontakGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputNote}</div>

                                <table style={{width:'70%'}}>
                                <tbody>
                                    <tr>
                                        <td>
                                        <DropdownList
                                            // className={
                                            //     touched.branch && errors.branch
                                            //         ? "input-error" : ""
                                            // }
                                            name="selgudang"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}
                                            
                                            onChange={val => handleChangeGudang(val)}
                                            onBlur={val => setFieldTouched("selgudang", val?.value ? val.value : '')}
                                            data={ListGudang}
                                            textField={'label'}
                                            valueField={'value'}
                                            // style={{width: '50%'}}
                                            // disabled={values.isdisabledcountry}
                                            value={values.selgudang}
                                            
                                        />
                                        </td>
                                        <td>
                                        <IconButton color={'primary'}
                                                    onClick={() => handleAddGudang()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                                {
                                    // InputListInfoGudang.length == 0?'':
                                    <div style={{overflowX:'auto',marginBottom:'20px'}}>
                                    <table id="tablegrid" style={{width:'1500px'}}>
                                        <tr>
                                            <th>{i18n.t('label_NAME')}</th>
                                            <th>{i18n.t('label_SEND_AREA')}</th>
                                            <th>{i18n.t('label_ADDRESS')}</th>
                                            <th>{i18n.t('Ancer Ancer')}</th>
                                            <th>{i18n.t('label_CONTACT_NAME')}</th>
                                            <th>{i18n.t('label_CONTACT_NUMBER')+'(HP)'}</th>
                                            <th>{i18n.t('label_NOTE')}</th>
                                            <th>{i18n.t('Action')}</th>

                                        </tr>

                                        {
                                        InputListInfoGudang.map((x, i) => {
                                            return (
                                                <tr>
                                                    <td>
                                                    {x.namagudang}
                                                        {/* <Input
                                                            name="namagudang"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="namagudang"
                                                            onChange={val => handleInputChangeInfoGudang(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.namagudang}
                                                            disabled={false}
                                                            /> */}
                                                        </td>
                                                    
                                                        <td>
                                                        {x.areakirim}
                                                        {/* <DropdownList
                                                            name="areakirim"
                                                            filter='contains'
                                                            // placeholder={i18n.t('select.SELECT_OPTION')}
                                                            
                                                            onChange={val => handleInputDropDownChangeInfoGudang(val,i,'areakirim')}
                                                            data={ListAreaKirim}
                                                            textField={'label'}
                                                            valueField={'value'}
                                                            style={{width: '200px'}}
                                                            value={x.areakirim}
                                                        /> */}
                                                        </td>

                                                        <td>
                                                        {x.alamatgudang}
                                                        {/* <Input
                                                            name="alamatgudang"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="alamatgudang"
                                                            onChange={val => handleInputChangeInfoGudang(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.alamatgudang}
                                                            disabled={false}
                                                            /> */}
                                                        </td>

                                                        <td>
                                                        {x.ancerancer}
                                                        {/* <Input
                                                            name="ancerancer"
                                                            // className={
                                                            //     touched.amount && errors.amount
                                                            //         ? "w-50 input-error"
                                                            //         : "w-50"
                                                            // }
                                                            type="text"
                                                            id="ancerancer"
                                                            onChange={val => handleInputChangeInfoGudang(val,i)}
                                                            onBlur={handleBlur}
                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                            // style={{width: '25%'}}
                                                            // value={values.amount}
                                                            value={x.ancerancer}
                                                            disabled={false}
                                                            /> */}
                                                        </td>

                                                        <td>
                                                        <table >
                                                            {
                                                                x.listkontakgudang.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.kontakgudang}</td>
                                                                            {/* <td>
                                                                            <Input
                                                                            name="kontakgudang"
                                                                            // className={
                                                                            //     touched.amount && errors.amount
                                                                            //         ? "w-50 input-error"
                                                                            //         : "w-50"
                                                                            // }
                                                                            type="text"
                                                                            id="kontakgudang"
                                                                            onChange={val => handleInputChangeListInfoGudang(val,'listkontakgudang',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.kontakgudang}
                                                                            disabled={false}
                                                                            />
                                                                            </td>
                                                                            
                                                                            <td hidden={j > 0}>
                                                                            <IconButton color={'primary'} hidden={j > 0}
                                                                                onClick={() => handleAddClickListKontakGudangInfoGudang('listkontakgudang',i)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>
                                                                            </td>
                                                                            <td hidden={j == 0}>
                                                                            <IconButton color={'primary'} hidden={j == 0}
                                                                            onClick={() => handleRemoveClickListKontakGudangInfoGudang('listkontakgudang',i,j)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>    
                                                                            </td> */}
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </table>
                                                        </td>

                                                        <td>
                                                        <table >
                                                            {
                                                                x.listhpkontakgudang.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.hpkontakgudang}</td>
                                                                            {/* <td>
                                                                            <Input
                                                                            name="hpkontakgudang"
                                                                            // className={
                                                                            //     touched.amount && errors.amount
                                                                            //         ? "w-50 input-error"
                                                                            //         : "w-50"
                                                                            // }
                                                                            type="text"
                                                                            id="hpkontakgudang"
                                                                            onChange={val => handleInputChangeListInfoGudang(val,'listhpkontakgudang',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.hpkontakgudang}
                                                                            disabled={false}
                                                                            />
                                                                            </td>
                                                                            
                                                                            <td hidden={j > 0}>
                                                                            <IconButton color={'primary'} hidden={j > 0}
                                                                                onClick={() => handleAddClickListHpKontakGudangInfoGudang('listhpkontakgudang',i)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <AddIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>
                                                                            </td>
                                                                            <td hidden={j == 0}>
                                                                            <IconButton color={'primary'} hidden={j == 0}
                                                                            onClick={() => handleRemoveClickListHpKontakGudangInfoGudang('listhpkontakgudang',i,j)}
                                                                            // hidden={showplusdebit}
                                                                            >
                                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                                            </IconButton>    
                                                                            </td> */}


                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </table>
                                                        </td>

                                                        <td>
                                                        {x.note}
                                                        {/* <Input
                                                            name="note"
                                                            type="textarea"
                                                            id="note"
                                                            onChange={val => handleInputChangeInfoGudang(val,i)}
                                                            onBlur={handleBlur}
                                                            value={x.note}
                                                            disabled={false}
                                                        /> */}
                                                        </td>

                                                        <td>
                                                        {/* <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClickInfoGudang()}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClickInfoGudang(i)}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>  */}

                                                        <IconButton color={'primary'}
                                                        onClick={() => handleRemoveClickInfoGudang(i)}
                                                        >
                                                            <RemoveIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>    
                                                        </td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </table>
                                    </div>
                                   
                                }

                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
                            <Button
                            // disabled={props.activeStep === 0}
                                // style={{marginLeft:"20%"}}
                                onClick={() => history.goBack()}
                                disabled={loading}
                            >
                            {/* {i18n.t('common.BACK')} */}
                            {'Cancel'}
                            </Button>

                            <Button
                                // style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                                disabled={loading}
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