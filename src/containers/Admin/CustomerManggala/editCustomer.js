import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import momentLocalizer                 from 'react-widgets-moment';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editCustomerManggala_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import '../../CSS/table.css';

export default function EditCustomerManggala(props) {
    reloadToHomeNotAuthorize(editCustomerManggala_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
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

    const [DataTemplate, setDataTemplate] = useState([]);
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

    const [ListAreaKirim, setListAreaKirim] = useState([]);
    const [InputListInfoGudang, setInputListInfoGudang] = useState([{ namagudang:"",areakirim: "",alamatgudang:"",ancerancer:"", listkontakgudang: [{kontakgudang:""}],listhpkontakgudang: [{hpkontakgudang:""}],note:""}]);
    const [ErrInputNamaGudang, setErrInputNamaGudang] = useState('');
    const [ErrInputAreaKirim, setErrInputAreaKirim] = useState('');
    const [ErrInputAlamatGudang, setErrInputAlamatGudang] = useState('');
    const [ErrInputAncerAncer, setErrInputAncerAncer] = useState('');
    const [ErrInputKontakGudang, setErrInputKontakGudang] = useState('');
    const [ErrInputHpKontakGudang, setErrInputHpKontakGudang] = useState('');
    const [ErrInputNote, setErrInputNote] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getCustomerManggalaData('/'+id,successHandler, errorHandler));
        // dispatch(actions.getCustomerManggalaData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandler = (data) =>{
        if(data.data){
            let template = data.data.template;
            setDataTemplate(template);
            setSelCustomerType(data.data.customertype);
            setInputCustomerName(data.data.customername);
            setInputAlias(data.data.alias);
            setInputAlamat(data.data.alamat);
            setSelProvinsi(parseInt(data.data.provinsi));
            setSelCity(parseInt(data.data.kota));
            setSelKodePos(parseInt(data.data.kodepos));
            setInputNpwp(data.data.npwp);
            setInputNib(data.data.nib);
            setInputIsActive(data.data.isactive);

            let listnokantor = [];
            if(data.data.telpkantor){
                let cek = new String(data.data.telpkantor).includes(',');
                if(cek){
                    let arrList = new String(data.data.telpkantor).split(',');
                    for(let i=0; i < arrList.length; i++){
                        listnokantor.push({ nokantor: arrList[i]});
                    }
                }else{
                    listnokantor.push({ nokantor: data.data.telpkantor});
                }
                if(listnokantor.length > 0){
                    setInputListNoKantor(listnokantor);
                }
                
            }

            let listnoinfocontact = [];
            if(data.data.detailsInfoContact){
                for(let i=0; i < data.data.detailsInfoContact.length; i++){
                    let det = data.data.detailsInfoContact[i];
                    let cek = new String(det.notelepon).includes(',');
                    let listnotelpinfocontact = [];
                    if(cek){
                        let arrList = new String(det.notelepon).split(',');
                        for(let j=0; j < arrList.length; j++){
                            listnotelpinfocontact.push({ notelepon: arrList[j]});
                        }
                    }else{
                        listnotelpinfocontact.push({ notelepon: det.notelepon});
                    }

                    listnoinfocontact.push({ panggilan: det.panggilan,namakontak:det.namakontak,listnotelepon:listnotelpinfocontact,email:det.email,noext:det.noext});
                    
                }
                if(listnoinfocontact.length > 0){
                    setInputListInfoContact(listnoinfocontact);
                }
                
            }

            let listinfogudang = [];
        if(data.data.detailsInfoGudang){
            for(let i=0; i < data.data.detailsInfoGudang.length; i++){
                let det = data.data.detailsInfoGudang[i];

                let areakirim = det.areakirim?parseInt(det.areakirim):'';
                // let listfilteroutput = data.data.districtOptions.filter(output => output.dis_id == parseInt(areakirim));
                // if(listfilteroutput.length > 0){
                //     areakirim = listfilteroutput[0].dis_name;
                // }
                let cek = new String(det.kontakgudang).includes(',');
                let listkontakgudang = [];
                if(cek){
                    let arrList = new String(det.kontakgudang).split(',');
                    for(let j=0; j < arrList.length; j++){
                        listkontakgudang.push({ kontakgudang: arrList[j]});
                    }
                }else{
                    listkontakgudang.push({ kontakgudang: det.kontakgudang});
                }

                cek = new String(det.hpkontakgudang).includes(',');
                let listhpkontakgudang = [];
                if(cek){
                    let arrList = new String(det.hpkontakgudang).split(',');
                    for(let j=0; j < arrList.length; j++){
                        listhpkontakgudang.push({ hpkontakgudang: arrList[j]});
                    }
                }else{
                    listhpkontakgudang.push({ hpkontakgudang: det.hpkontakgudang});
                }

                listinfogudang.push({ namagudang:det.namagudang,areakirim: areakirim,alamatgudang:det.alamatgudang,ancerancer:det.ancerancer, listkontakgudang: listkontakgudang,listhpkontakgudang: listhpkontakgudang,note:det.note});
            }

            if(listinfogudang.length > 0){
                setInputListInfoGudang(listinfogudang);
            }
            
        }
        
            

            if(data.data.detailsInfoKementerian){
                setInputListInfoKementerian(data.data.detailsInfoKementerian);
            }
            

            setListCustomerType(template.customertypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListProvinsi(template.provinceOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.prov_id,
                    label: el.prov_name
                }]
            ), []));

            setListPanggilan(template.panggilanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListAreaKirim(data.data.districtOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.dis_id,
                    label: el.dis_name
                }]
            ), []));

            

            let listfilteroutput = template.cityOptions.filter(output => output.prov_id == data.data.provinsi);
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
            
            dispatch(actions.getAddressData('/postalcodebycityandprovince?cityid='+data.data.kota+'&provid='+data.data.provinsi,successHandlerPostalCode, errorHandler));
        }

        // setLoading(false);
    }
    const setKosongAreaKirim = () =>{
        const list = [...InputListInfoGudang];
        for(let index=0; index < list.length; index++){
            list[index]['areakirim'] = '';
        }
        
        setInputListInfoGudang(list);
    }
    // const successHandlerTemplate = (data) =>{
    //     if(data.data){
    //         setDataTemplate(data.data);
            
    //     }
    //     setLoading(false);
    // }
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
        setKosongAreaKirim();
        setSelKodePos(id);
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

        if(InputListInfoGudang.length > 0){
            for(let i=0; i < InputListInfoGudang.length; i++){
                let det = InputListInfoGudang[i];
                if(det.namagudang !== '' || det.areakirim !== '' || det.alamatgudang !== '' ){
                    if(det.namagudang == ''){
                        setErrInputNamaGudang('Nama Gudang '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.areakirim == ''){
                        setErrInputAreaKirim('Area Kirim '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.alamatgudang == ''){
                        setErrInputAlamatGudang('Alamat Gudang '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.listkontakgudang.length > 0){
                        for(let j=0; j < det.listkontakgudang.length; j++){
                            let detnotlp = det.listkontakgudang[j];
                            if(detnotlp.kontakgudang == ''){
                                setErrInputKontakGudang('Kontak Gudang '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrInputKontakGudang('Kontak Gudang '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.listhpkontakgudang.length > 0){
                        for(let j=0; j < det.listhpkontakgudang.length; j++){
                            let detnotlp = det.listhpkontakgudang[j];
                            if(detnotlp.hpkontakgudang == ''){
                                setErrInputHpKontakGudang('HP Kontak Gudang '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrInputHpKontakGudang('HP Kontak Gudang '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }
                }
            }
        }

        if(InputListInfoContact.length > 0){
            for(let i=0; i < InputListInfoContact.length; i++){
                let det = InputListInfoContact[i];
                if(det.panggilan !== '' || det.namakontak !== '' || det.email !== '' || det.noext !== ''){
                    if(det.panggilan == ''){
                        setErrInputPanggilan('Bapak/Ibu '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.namakontak == ''){
                        setErrInputNamaKontak('Nama Kontak '+i18n.t('label_REQUIRED'));
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
                                setErrInputNotelepon('No Telepon '+i18n.t('label_REQUIRED'));
                                flag = false;
                            }
                        }
                    }else{
                        setErrInputNotelepon('No Telepon '+i18n.t('label_REQUIRED'));
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
                        setErrInputKementtrian('Kementrian '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.alamat_email == ''){
                        setErrInputAlamatEmail('Alamat Email '+i18n.t('label_REQUIRED'));
                        flag = false;
                    }

                    if(det.password_email == ''){
                        setErrInputPasswordEmail('Password Email '+i18n.t('label_REQUIRED'));
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
            obj.npwp = InputNpwp;
            obj.nib = InputNib;
            obj.isactive = InputIsActive;
            let listnotelp = '';
            if(InputListNoKantor.length > 0){
                let count =0;
                for(let i=0; i < InputListNoKantor.length; i++){
                    let no = InputListNoKantor[i].nokantor;
                    count++;
                    if(no != ''){
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
                        objinfocontact.noext = det.noext;
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
                    let listkontakgudang = '';
                    let listhpkontakgudang = '';
                    if(det.namagudang !== '' && det.areakirim !== '' && det.alamatgudang !== ''){
                        let count =0;
                        for(let j=0; j < det.listkontakgudang.length; j++){
                            let no = det.listkontakgudang[j].kontakgudang;
                            count++;
                            if(no != ''){
                                if(count == det.listkontakgudang.length){
                                    listkontakgudang += no;
                                }else{
                                    listkontakgudang += no+',';
                                }
                            }
                        }

                        count =0;
                        for(let j=0; j < det.listhpkontakgudang.length; j++){
                            let no = det.listhpkontakgudang[j].hpkontakgudang;
                            count++;
                            if(no != ''){
                                if(count == det.listhpkontakgudang.length){
                                    listhpkontakgudang += no;
                                }else{
                                    listhpkontakgudang += no+',';
                                }
                            }
                        }

                        let objinfogudang = new Object();
                        objinfogudang.namagudang = det.namagudang;
                        objinfogudang.areakirim = det.areakirim;
                        objinfogudang.alamatgudang = det.alamatgudang;
                        objinfogudang.ancerancer = det.ancerancer;
                        objinfogudang.kontakgudang = listkontakgudang;
                        objinfogudang.hpkontakgudang = listhpkontakgudang;
                        objinfogudang.note = det.note;
                        listinfogudang.push(objinfogudang);
                    }
                }
            }
            obj.detailsinfogudang = listinfogudang;

            dispatch(actions.submitEditCustomerManggala('/'+id,obj,succesHandlerSubmit, errorHandler));
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
            text: i18n.t(data.msgcode)
        })
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...InputListNoKantor];
        list[index][name] = value;
        setInputListNoKantor(list);
        
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

    const handleAddClickListNoTelpInfoContact = (paramparent,indexparent) => {
        const list = [...InputListInfoContact];
        const listnotelp = [...list[indexparent][paramparent], { notelepon: ""}];
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
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
        const list = [...InputListInfoContact];
        const listnotelp = list[indexparent][paramparent];
        listnotelp[indexchild][name] = value;
        list[indexparent][paramparent] = listnotelp;
        setInputListInfoContact(list);
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormEditCustomerManggala">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editcustomers+'/'+id} label={'Edit Customer'} labeldefault={'Edit Customer'} />
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
                                {i18n.t('Name')}
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
                                {i18n.t('No Telp Kantor')}
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
                                                onChange={val => handleInputChange(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.nokantor}
                                                disabled={false}
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
                                {i18n.t('Provinsi')}
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
                                {i18n.t('Kota')}
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
                                {i18n.t('Kode Pos')}
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
                                {i18n.t('Alamat')}
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

                            <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactive}
                            checked={values.isactive}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>    

                            </div>

                            </div>

                            <div><h3>Informasi Kementerian</h3></div>
                            <div className="invalid-feedback-custom">{ErrInputKementtrian}</div>
                            <div className="invalid-feedback-custom">{ErrInputAlamatEmail}</div>
                            <div className="invalid-feedback-custom">{ErrInputPasswordEmail}</div>

                            {
                                InputListInfoKementerian.length == 0?'':
                                
                                <table id="tablegrid">
                                    
                                <tr>
                                    <th>{i18n.t('Kementrian')}</th>
                                    <th>{i18n.t('Alamat Email')}</th>
                                    <th>{i18n.t('Password Email')}</th>
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

                                <div style={{marginTop:'50px'}}><h3>Informasi Contact</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputPanggilan}</div>
                                <div className="invalid-feedback-custom">{ErrInputNamaKontak}</div>
                                <div className="invalid-feedback-custom">{ErrInputNotelepon}</div>
                                <div className="invalid-feedback-custom">{ErrInputEmail}</div>
                                <div className="invalid-feedback-custom">{ErrInputNoExt}</div>
                                {
                                    InputListInfoContact.length == 0?'':
                                    <table id="tablegrid">
                                        <tr>
                                            <th>{i18n.t('Bapal/Ibu')}</th>
                                            <th>{i18n.t('Nama Kontak')}</th>
                                            <th>{i18n.t('No Telepon')}</th>
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
                                                                            onChange={val => handleInputChangeListNoTelpInfoContact(val,'listnotelepon',i,j)}
                                                                            onBlur={handleBlur}
                                                                            // placeholder={i18n.t('label_AMOUNT')}
                                                                            // style={{width: '70%'}}
                                                                            // value={values.amount}
                                                                            value={y.notelepon}
                                                                            disabled={false}
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

                                <div style={{marginTop:'50px'}}><h3>Informasi Gudang</h3></div>
                                <div className="invalid-feedback-custom">{ErrInputNamaGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputAreaKirim}</div>
                                <div className="invalid-feedback-custom">{ErrInputAlamatGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputAncerAncer}</div>
                                <div className="invalid-feedback-custom">{ErrInputKontakGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputHpKontakGudang}</div>
                                <div className="invalid-feedback-custom">{ErrInputNote}</div>
                                {
                                    InputListInfoGudang.length == 0?'':
                                    <div style={{overflowX:'auto',marginBottom:'20px'}}>
                                    <table id="tablegrid" style={{width:'1500px'}}>
                                        <tr>
                                            <th>{i18n.t('Nama Gudang')}</th>
                                            <th>{i18n.t('Area Kirim')}</th>
                                            <th>{i18n.t('Alamat Gudang')}</th>
                                            <th>{i18n.t('Ancer Ancer')}</th>
                                            <th>{i18n.t('Kontak Gudang')}</th>
                                            <th>{i18n.t('HP Kontak Gudang')}</th>
                                            <th>{i18n.t('Catatan Penting')}</th>
                                            <th>{i18n.t('Action')}</th>

                                        </tr>

                                        {
                                        InputListInfoGudang.map((x, i) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Input
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
                                                            />
                                                        </td>
                                                    
                                                        <td>
                                                        <DropdownList
                                                            name="areakirim"
                                                            filter='contains'
                                                            // placeholder={i18n.t('select.SELECT_OPTION')}
                                                            
                                                            onChange={val => handleInputDropDownChangeInfoGudang(val,i,'areakirim')}
                                                            data={ListAreaKirim}
                                                            textField={'label'}
                                                            valueField={'value'}
                                                            style={{width: '200px'}}
                                                            value={x.areakirim}
                                                        />
                                                        </td>

                                                        <td>
                                                        <Input
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
                                                            />
                                                        </td>

                                                        <td>
                                                        <Input
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
                                                            />
                                                        </td>

                                                        <td>
                                                        <table >
                                                            {
                                                                x.listkontakgudang.map((y, j) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>
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
                                                                            </td>
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
                                                                            <td>
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
                                                                            </td>


                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </table>
                                                        </td>

                                                        <td>
                                                        <Input
                                                            name="note"
                                                            type="textarea"
                                                            id="note"
                                                            onChange={val => handleInputChangeInfoGudang(val,i)}
                                                            onBlur={handleBlur}
                                                            value={x.note}
                                                            disabled={false}
                                                        />
                                                        </td>

                                                        <td>
                                                        <IconButton color={'primary'} hidden={i > 0}
                                                            onClick={() => handleAddClickInfoGudang()}
                                                        // hidden={showplusdebit}
                                                        >
                                                            <AddIcon style={{ fontSize: 18 }}/>
                                                        </IconButton>
                                                        <IconButton color={'primary'} hidden={i == 0}
                                                        onClick={() => handleRemoveClickInfoGudang(i)}
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
                                   
                                }
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginBottom:'20px'}}>
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
                        </form>
                    )
                }
            }
        </Formik>
    )
}