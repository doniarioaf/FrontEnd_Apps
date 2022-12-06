import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input,Button,Label,FormGroup,Container} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize} from '../shared/globalFunc';
import { addAssetMapping_Permission} from '../shared/permissionMenu';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import {DatePicker}      from 'react-widgets';
import { formatdate} from '../shared/constantValue';
import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

export default function AddForm(props) {
    reloadToHomeNotAuthorize(addAssetMapping_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputKodeAsset, setInputKodeAsset] = useState('');
    const [ErrInputKodeAsset, setErrInputKodeAsset] = useState('');

    const [ListJenisAsset, setListJenisAsset] = useState([]);
    const [SelJenisAsset, setSelJenisAsset] = useState('');
    const [ErrSelJenisAsset, setErrSelJenisAsset] = useState('');

    const [InputKepalaNama, setInputKepalaNama] = useState('');
    const [ErrInputKepalaNama, setErrInputKepalaNama] = useState('');
    const [InputKepalaNoPolisi, setInputKepalaNoPolisi] = useState('');
    const [ErrInputKepalaNoPolisi, setErrInputKepalaNoPolisi] = useState('');
    const [ListJenisKendaraan, setListJenisKendaraan] = useState([]);
    const [SelKepalaJenisKendaraan, setSelKepalaJenisKendaraan] = useState('');
    const [ErrSelKepalaJenisKendaraan, setErrSelKepalaJenisKendaraan] = useState('');
    const [InputKepalaMerk, setInputKepalaMerk] = useState('');
    const [ErrInputKepalaMerk, setErrInputKepalaMerk] = useState('');
    const [InputKepalaNoMesin, setInputKepalaNoMesin] = useState('');
    const [ErrInputKepalaNoMesin, setErrInputKepalaNoMesin] = useState('');
    const [InputKepalaNoRangka, setInputKepalaNoRangka] = useState('');
    const [ErrInputKepalaNoRangka, setErrInputKepalaNoRangka] = useState('');
    const [InputKepalaNoStnk, setInputKepalaNoStnk] = useState('');
    const [ErrInputKepalaNoStnk, setErrInputKepalaNoStnk] = useState('');
    const [InputKepalaMasaBerlakuStnk, setInputKepalaMasaBerlakuStnk] = useState(null);
    const [ErrInputKepalaMasaBerlakuStnk, setErrInputKepalaMasaBerlakuStnk] = useState('');
    const [InputKepalaKir, setInputKepalaKir] = useState('');
    const [ErrInputKepalaKir, setErrInputKepalaKir] = useState('');
    const [InputKepalaMasaBerlakuKir, setInputKepalaMasaBerlakuKir] = useState(null);
    const [ErrInputKepalaMasaBerlakuKir, setErrInputKepalaMasaBerlakuKir] = useState('');
    const [InputKepalaLunasTanggal, setInputKepalaLunasTanggal] = useState(null);
    const [ErrInputKepalaLunasTanggal, setErrInputKepalaLunasTanggal] = useState('');
    const [InputKepalaKeterangan, setInputKepalaKeterangan] = useState('');

    const [InputBuntutNama, setInputBuntutNama] = useState('');
    const [ErrInputBuntutNama, setErrInputBuntutNama] = useState('');
    const [InputBuntutNoBuntut, setInputBuntutNoBuntut] = useState('');
    const [ErrInputBuntutNoBuntut, setErrInputBuntutNoBuntut] = useState('');
    const [InputBuntutNoBearingLuar, setInputBuntutNoBearingLuar] = useState('');
    const [ErrInputBuntutNoBearingLuar, setErrInputBuntutNoBearingLuar] = useState('');
    const [InputBuntutNoBearingDalam, setInputBuntutNoBearingDalam] = useState('');
    const [ErrInputBuntutNoBearingDalam, setErrInputBuntutNoBearingDalam] = useState('');
    const [InputBuntutNoKir, setInputBuntutNoKir] = useState('');
    const [ErrInputBuntutNoKir, setErrInputBuntutNoKir] = useState('');
    const [InputBuntutMasaBerlakuKir, setInputBuntutMasaBerlakuKir] = useState(null);
    const [ErrInputBuntutMasaBerlakuKir, setErrInputBuntutMasaBerlakuKir] = useState('');
    const [ListRangkaPlat, setListRangkaPlat] = useState([]);
    const [SelBuntutRangkaPlat, setSelBuntutRangkaPlat] = useState('');
    const [ErrSelBuntutRangkaPlat, setErrSelBuntutRangkaPlat] = useState('');
    const [InputBuntutMerkAxel, setInputBuntutMerkAxel] = useState('');
    const [ErrInputBuntutMerkAxel, setErrInputBuntutMerkAxel] = useState('');
    const [ListJenisAxel, setListJenisAxel] = useState([]);
    const [SelBuntutJenisAxel, setSelBuntutJenisAxel] = useState('');
    const [ErrSelBuntutJenisAxel, setErrSelBuntutJenisAxel] = useState('');
    const [ListJenisHole, setListJenisHole] = useState([]);
    const [SelBuntutJenisHole, setSelBuntutJenisHole] = useState('');
    const [ErrSelBuntutJenisHole, setErrSelBuntutJenisHole] = useState('');
    const [InputBuntutLunasTanggal, setInputBuntutLunasTanggal] = useState(null);
    const [ErrInputBuntutLunasTanggal, setErrInputBuntutLunasTanggal] = useState('');

    const [InputSparePartKepalaNama, setInputSparePartKepalaNama] = useState('');
    const [ErrInputSparePartKepalaNama, setErrInputSparePartKepalaNama] = useState('');
    const [ListJenisSparePart, setListJenisSparePart] = useState([]);
    const [SelSparePartKepalaJenisSparePart, setSelSparePartKepalaJenisSparePart] = useState('');
    const [ErrSelSparePartKepalaJenisSparePart, setErrSelSparePartKepalaJenisSparePart] = useState('');
    const [InputSparePartKepalaKeterangan, setInputSparePartKepalaKeterangan] = useState('');
    // const [ErrInputSparePartKepalaKeterangan, setErrInputSparePartKepalaKeterangan] = useState('');

    const [InputSparePartKepala_BearingNoBearing, setInputSparePartKepala_BearingNoBearing] = useState('');
    const [ErrInputSparePartKepala_BearingNoBearing, setErrInputSparePartKepala_BearingNoBearing] = useState('');
    const [ListPosisiBearing, setListPosisiBearing] = useState([]);
    const [SelSparePartKepala_BearingPosisiBearing, setSelSparePartKepala_BearingPosisiBearing] = useState('');
    const [ErrSelSparePartKepala_BearingPosisiBearing, setErrSelSparePartKepala_BearingPosisiBearing] = useState('');
    const [InputSparePartKepala_BearingMerk, setInputSparePartKepala_BearingMerk] = useState('');
    const [ErrInputSparePartKepala_BearingMerk, setErrInputSparePartKepala_BearingMerk] = useState('');
    const [SelSparePartKepala_BearingJenisHole, setSelSparePartKepala_BearingJenisHole] = useState('');
    const [ErrSelSparePartKepala_BearingJenisHole, setErrSelSparePartKepala_BearingJenisHole] = useState('');
    const [ListKotakBulat, setListKotakBulat] = useState([]);
    const [SelSparePartKepala_BearingKotakBulat, setSelSparePartKepala_BearingKotakBulat] = useState('');
    const [ErrSelSparePartKepala_BearingKotakBulat, setErrSelSparePartKepala_BearingKotakBulat] = useState('');

    const [InputSparePartKepala_BanNama, setInputSparePartKepala_BanNama] = useState('');
    const [ErrInputSparePartKepala_BanNama, setErrInputSparePartKepala_BanNama] = useState('');
    const [InputSparePartKepala_BanKeterangan, setInputSparePartKepala_BanKeterangan] = useState('');
    const [ListPosisiBan, setListPosisiBan] = useState([]);
    const [SelSparePartKepala_BanPosisi, setSelSparePartKepala_BanPosisi] = useState('BAN_KEPALA');
    const [ErrSelSparePartKepala_BanPosisi, setErrSelSparePartKepala_BanPosisi] = useState('');
    const [ListJenisBan, setListJenisBan] = useState([]);
    const [SelSparePartKepala_BanJenis, setSelSparePartKepala_BanJenis] = useState('');
    const [ErrSelSparePartKepala_BanJenis, setErrSelSparePartKepala_BanJenis] = useState('');
    const [ListUkuranBan, setListUkuranBan] = useState([]);
    const [SelSparePartKepala_BanUkuran, setSelSparePartKepala_BanUkuran] = useState('');
    const [ErrSelSparePartKepala_BanUkuran, setErrSelSparePartKepala_BanUkuran] = useState('');
    const [ListStatusBan, setListStatusBan] = useState([]);
    const [SelSparePartKepala_BanStatus, setSelSparePartKepala_BanStatus] = useState('');
    const [ErrSelSparePartKepala_BanStatus, setErrSelSparePartKepala_BanStatus] = useState('');

    const [InputSparePartKepala_LainnyaNama, setInputSparePartKepala_LainnyaNama] = useState('');
    const [ErrInputSparePartKepala_LainnyaNama, setErrInputSparePartKepala_LainnyaNama] = useState('');
    const [InputSparePartKepala_LainnyaKeterangan, setInputSparePartKepala_LainnyaKeterangan] = useState('');

    
    const [InputSparePartBuntutNama, setInputSparePartBuntutNama] = useState('');
    const [ErrInputSparePartBuntutNama, setErrInputSparePartBuntutNama] = useState('');
    const [SelSparePartBuntutJenisSparePart, setSelSparePartBuntutJenisSparePart] = useState('');
    const [ErrSelSparePartBuntutJenisSparePart, setErrSelSparePartBuntutJenisSparePart] = useState('');
    const [InputSparePartBuntutKeterangan, setInputSparePartBuntutKeterangan] = useState('');
    // const [ErrInputSparePartBuntutKeterangan, setErrInputSparePartBuntutKeterangan] = useState('');

    const [InputSparePartBuntut_BearingNoBearing, setInputSparePartBuntut_BearingNoBearing] = useState('');
    const [ErrInputSparePartBuntut_BearingNoBearing, setErrInputSparePartBuntut_BearingNoBearing] = useState('');
    const [SelSparePartBuntut_BearingPosisiBearing, setSelSparePartBuntut_BearingPosisiBearing] = useState('');
    const [ErrSelSparePartBuntut_BearingPosisiBearing, setErrSelSparePartBuntut_BearingPosisiBearing] = useState('');
    const [InputSparePartBuntut_BearingMerk, setInputSparePartBuntut_BearingMerk] = useState('');
    const [ErrInputSparePartBuntut_BearingMerk, setErrInputSparePartBuntut_BearingMerk] = useState('');
    const [SelSparePartBuntut_BearingJenisHole, setSelSparePartBuntut_BearingJenisHole] = useState('');
    const [ErrSelSparePartBuntut_BearingJenisHole, setErrSelSparePartBuntut_BearingJenisHole] = useState('');
    const [SelSparePartBuntut_BearingKotakBulat, setSelSparePartBuntut_BearingKotakBulat] = useState('');
    const [ErrSelSparePartBuntut_BearingKotakBulat, setErrSelSparePartBuntut_BearingKotakBulat] = useState('');

    const [InputSparePartBuntut_BanNama, setInputSparePartBuntut_BanNama] = useState('');
    const [ErrInputSparePartBuntut_BanNama, setErrInputSparePartBuntut_BanNama] = useState('');
    const [InputSparePartBuntut_BanKeterangan, setInputSparePartBuntut_BanKeterangan] = useState('');
    const [SelSparePartBuntut_BanPosisi, setSelSparePartBuntut_BanPosisi] = useState('BAN_BUNTUT');
    const [ErrSelSparePartBuntut_BanPosisi, setErrSelSparePartBuntut_BanPosisi] = useState('');
    const [SelSparePartBuntut_BanJenis, setSelSparePartBuntut_BanJenis] = useState('');
    const [ErrSelSparePartBuntut_BanJenis, setErrSelSparePartBuntut_BanJenis] = useState('');
    const [SelSparePartBuntut_BanUkuran, setSelSparePartBuntut_BanUkuran] = useState('');
    const [ErrSelSparePartBuntut_BanUkuran, setErrSelSparePartBuntut_BanUkuran] = useState('');
    const [SelSparePartBuntut_BanStatus, setSelSparePartBuntut_BanStatus] = useState('');
    const [ErrSelSparePartBuntut_BanStatus, setErrSelSparePartBuntut_BanStatus] = useState('');

    const [InputSparePartBuntut_LainnyaNama, setInputSparePartBuntut_LainnyaNama] = useState('');
    const [ErrInputSparePartBuntut_LainnyaNama, setErrInputSparePartBuntut_LainnyaNama] = useState('');
    const [InputSparePartBuntut_LainnyaKeterangan, setInputSparePartBuntut_LainnyaKeterangan] = useState('');

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getAssetData('/template',successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            setListJenisAsset(data.data.assetTypeOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisKendaraan(data.data.jenisKendaraanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListRangkaPlat(data.data.jenisBuntutOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisAxel(data.data.jenisAxelOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisHole(data.data.jenisHoleOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisSparePart(data.data.jenisSparepartOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListPosisiBearing(data.data.posisiBearingOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListKotakBulat(data.data.bentukBearingOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListPosisiBan(data.data.posisiBanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListJenisBan(data.data.jenisBanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListUkuranBan(data.data.ukuranBanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));

            setListStatusBan(data.data.statusBanOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.code,
                    label: el.codename
                }]
            ), []));
        }

        setLoading(false);
    }


    const handleInputSparePartBuntutNama = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntutNama(val);
        setNamaaa('',val,SelJenisAsset);
    }
    const handleChangeSparePartBuntutJenisSparePart = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntutJenisSparePart(id);
    }
    const handleInputSparePartBuntutKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntutKeterangan(val);
        setKeterangan('',val,SelJenisAsset);
    }
    const handleInputSparePartBuntut_BearingNoBearing = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_BearingNoBearing(val);
    }
    const handleChangeSparePartBuntut_BearingPosisi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BearingPosisiBearing(id);
    }
    const handleInputSparePartBuntut_BearingMerk = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_BearingMerk(val);
    }
    const handleChangeSparePartBuntut_BearingJenisHole = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BearingJenisHole(id);
    }
    const handleChangeSparePartBuntut_BearingJenisKotakBulat = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BearingKotakBulat(id);
    }
    const handleInputSparePartBuntut_BanNama = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_BanNama(val);
    }
    const handleInputSparePartBuntut_BanKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_BanKeterangan(val);
    }
    const handleChangeSparePartBuntut_BanPosisi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BanPosisi(id);
    }
    const handleChangeSparePartBuntut_BanJenisBan = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BanJenis(id);
    }
    const handleChangeSparePartBuntut_BanUkuran = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BanUkuran(id);
    }
    const handleChangeSparePartBuntut_BanStatus = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartBuntut_BanStatus(id);
    }
    const handleInputSparePartBuntut_LainnyaNama = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_LainnyaNama(val);
    }
    const handleInputSparePartBuntut_LainnyaKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartBuntut_LainnyaKeterangan(val);
    }

    const setNamaaa = (kepNama,bunNama,jenisasset) =>{
        if(jenisasset == 'SP_KEPALA'){
            setInputSparePartKepala_BanNama(kepNama);
            setInputSparePartKepala_LainnyaNama(kepNama);
        }if(jenisasset == 'SP_BUNTUT'){
            setInputSparePartBuntut_BanNama(bunNama);
            setInputSparePartBuntut_LainnyaNama(bunNama);
        }
    }

    const setKeterangan = (KepKet,bunKet,jenisasset) =>{
        if(jenisasset == 'SP_KEPALA'){
            setInputSparePartKepala_BanKeterangan(KepKet);
            setInputSparePartKepala_LainnyaKeterangan(KepKet);
        }if(jenisasset == 'SP_BUNTUT'){
            setInputSparePartBuntut_BanKeterangan(bunKet);
            setInputSparePartBuntut_LainnyaKeterangan(bunKet);
        }
    }
    const handleInputSparePartKepalaNama = (data) =>{
        let val = data.target.value;
        setInputSparePartKepalaNama(val);
        setNamaaa(val,'',SelJenisAsset);
    }
    const handleChangeSparePartKepalaJenisSparePart = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepalaJenisSparePart(id);
        if(id == 'SP_KEPALA'){
            setNamaaa(InputSparePartKepalaNama,'',id);
            setKeterangan(InputSparePartKepalaKeterangan,'',id);
        }else if(id == 'SP_BUNTUT'){
            setNamaaa('',InputSparePartBuntutNama,id);
            setKeterangan('',InputSparePartBuntutKeterangan,id);
        }
        
    }
    const handleInputSparePartKepalaKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartKepalaKeterangan(val);
        setKeterangan(val,'',SelJenisAsset);
    }
    const handleInputSparePartKepala_BearingNoBearing = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_BearingNoBearing(val);
    }
    const handleChangeSparePartKepala_BearingPosisi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BearingPosisiBearing(id);
    }
    const handleInputSparePartKepala_BearingMerk = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_BearingMerk(val);
    }
    const handleChangeSparePartKepala_BearingJenisHole = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BearingJenisHole(id);
    }
    const handleChangeSparePartKepala_BearingJenisKotakBulat = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BearingKotakBulat(id);
    }
    const handleInputSparePartKepala_BanNama = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_BanNama(val);
    }
    const handleInputSparePartKepala_BanKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_BanKeterangan(val);
    }
    const handleChangeSparePartKepala_BanPosisi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BanPosisi(id);
    }
    const handleChangeSparePartKepala_BanJenisBan = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BanJenis(id);
    }
    const handleChangeSparePartKepala_BanUkuran = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BanUkuran(id);
    }
    const handleChangeSparePartKepala_BanStatus = (data) =>{
        let id = data?.value ? data.value : '';
        setSelSparePartKepala_BanStatus(id);
    }
    const handleInputSparePartKepala_LainnyaNama = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_LainnyaNama(val);
    }
    const handleInputSparePartKepala_LainnyaKeterangan = (data) =>{
        let val = data.target.value;
        setInputSparePartKepala_LainnyaKeterangan(val);
    }

    const handleInputBuntutNama = (data) =>{
        let val = data.target.value;
        setInputBuntutNama(val);
    }

    const handleInputBuntutNoBuntut = (data) =>{
        let val = data.target.value;
        setInputBuntutNoBuntut(val);
    }

    const handleInputBuntutNoBearingLuar = (data) =>{
        let val = data.target.value;
        setInputBuntutNoBearingLuar(val);
    }
    const handleInputBuntutNoBearingDalam = (data) =>{
        let val = data.target.value;
        setInputBuntutNoBearingDalam(val);
    }
    const handleInputBuntutNoKir = (data) =>{
        let val = data.target.value;
        setInputBuntutNoKir(val);
    }
    const handleInputBuntutMasaBerlakuKir = (data) =>{
        if(data !== null){
            setInputBuntutMasaBerlakuKir(moment(data, formatdate).toDate())
        }else{
            setInputBuntutMasaBerlakuKir(null)
        }
    }

    const handleChangeRangkaPlat = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBuntutRangkaPlat(id);
    }
    const handleInputBuntutMerkAxel = (data) =>{
        let val = data.target.value;
        setInputBuntutMerkAxel(val);
    }
    const handleChangeJenisAxel = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBuntutJenisAxel(id);
    }
    const handleChangeJenisHole = (data) =>{
        let id = data?.value ? data.value : '';
        setSelBuntutJenisHole(id);
    }
    const handleInputBuntutLunasTanggal = (data) =>{
        if(data !== null){
            setInputBuntutLunasTanggal(moment(data, formatdate).toDate())
        }else{
            setInputBuntutLunasTanggal(null)
        }
    }


    const handleInputKodeAsset = (data) =>{
        let val = data.target.value;
        setInputKodeAsset(val);
    }

    const handleChangeJenisAsset = (data) =>{
        let id = data?.value ? data.value : '';
        setSelJenisAsset(id);
    }

    const handleInputKepalaNama = (data) =>{
        let val = data.target.value;
        setInputKepalaNama(val);
    }

    const handleInputKepalaNoPolisi = (data) =>{
        let val = data.target.value;
        setInputKepalaNoPolisi(val);
    }

    const handleChangeKepalaJenisKendaraan = (data) =>{
        let id = data?.value ? data.value : '';
        setSelKepalaJenisKendaraan(id);
    }

    const handleInputKepalaMerk = (data) =>{
        let val = data.target.value;
        setInputKepalaMerk(val);
    }

    const handleInputKepalaNoMesin = (data) =>{
        let val = data.target.value;
        setInputKepalaNoMesin(val);
    }

    const handleInputKepalaNoRangka = (data) =>{
        let val = data.target.value;
        setInputKepalaNoRangka(val);
    }

    const handleInputKepalaNoStnk = (data) =>{
        let val = data.target.value;
        setInputKepalaNoStnk(val);
    }

    const handleInputKepalaMasaBerlakuStnk = (data) =>{
        if(data !== null){
            setInputKepalaMasaBerlakuStnk(moment(data, formatdate).toDate())
        }else{
            setInputKepalaMasaBerlakuStnk(null)
        }
    }

    const handleInputKepalaKir = (data) =>{
        let val = data.target.value;
        setInputKepalaKir(val);
    }

    const handleInputKepalaMasaBerlakuKir = (data) =>{
        if(data !== null){
            setInputKepalaMasaBerlakuKir(moment(data, formatdate).toDate())
        }else{
            setInputKepalaMasaBerlakuKir(null)
        }
    }

    const handleInputKepalaLunasTanggal = (data) =>{
        if(data !== null){
            setInputKepalaLunasTanggal(moment(data, formatdate).toDate())
        }else{
            setInputKepalaLunasTanggal(null)
        }
    }

    const handleInputKepalaKeterangan = (data) =>{
        let val = data.target.value;
        setInputKepalaKeterangan(val);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputKodeAsset('');
        setErrSelJenisAsset('');

        setErrInputKepalaNama('');
        setErrInputKepalaNoPolisi('');
        setErrSelKepalaJenisKendaraan('');
        setErrInputKepalaMerk('');
        setErrInputKepalaNoMesin('');
        setErrInputKepalaNoRangka('');
        setErrInputKepalaNoStnk('');
        setErrInputKepalaMasaBerlakuStnk('');
        setErrInputKepalaKir('');
        setErrInputKepalaMasaBerlakuKir('');
        setErrInputKepalaLunasTanggal('');

        setErrInputBuntutNama('');
        setErrInputBuntutNoBuntut('');
        setErrInputBuntutNoBearingLuar('');
        setErrInputBuntutNoBearingDalam('');
        setErrInputBuntutNoKir('');
        setErrInputBuntutMasaBerlakuKir('');
        setErrSelBuntutRangkaPlat('');
        setErrInputBuntutMerkAxel('');
        setErrSelBuntutJenisAxel('');
        setErrSelBuntutJenisHole('');
        setErrInputBuntutLunasTanggal('');

        setErrInputSparePartKepalaNama('');
        setErrSelSparePartKepalaJenisSparePart('');
        // setErrInputSparePartKepalaKeterangan('');
        setErrInputSparePartKepala_BearingNoBearing('');
        setErrSelSparePartKepala_BearingPosisiBearing('');
        setErrInputSparePartKepala_BearingMerk('');
        setErrSelSparePartKepala_BearingJenisHole('');
        setErrSelSparePartKepala_BearingKotakBulat('');
        setErrInputSparePartKepala_BanNama('');
        setErrSelSparePartKepala_BanPosisi('');
        setErrSelSparePartKepala_BanJenis('');
        setErrSelSparePartKepala_BanUkuran('');
        setErrSelSparePartKepala_BanStatus('');
        setErrInputSparePartKepala_LainnyaNama('');

        setErrInputSparePartBuntutNama('');
        setErrSelSparePartBuntutJenisSparePart('');
        // setErrInputSparePartBuntutKeterangan('');
        setErrInputSparePartBuntut_BearingNoBearing('');
        setErrSelSparePartBuntut_BearingPosisiBearing('');
        setErrInputSparePartBuntut_BearingMerk('');
        setErrSelSparePartBuntut_BearingJenisHole('');
        setErrSelSparePartBuntut_BearingKotakBulat('');
        setErrInputSparePartBuntut_BanNama('');
        setErrSelSparePartBuntut_BanPosisi('');
        setErrSelSparePartBuntut_BanJenis('');
        setErrSelSparePartBuntut_BanUkuran('');
        setErrSelSparePartBuntut_BanStatus('');
        setErrInputSparePartBuntut_LainnyaNama('');


        if(InputKodeAsset == ''){
            setErrInputKodeAsset(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelJenisAsset == ''){
            setErrSelJenisAsset(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(SelJenisAsset == 'KEPALA'){
                if(InputKepalaNama == ''){
                    setErrInputKepalaNama(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaNoPolisi == ''){
                    setErrInputKepalaNoPolisi(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelKepalaJenisKendaraan == ''){
                    setErrSelKepalaJenisKendaraan(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaMerk == ''){
                    setErrInputKepalaMerk(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaNoMesin == ''){
                    setErrInputKepalaNoMesin(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaNoRangka == ''){
                    setErrInputKepalaNoRangka(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaNoStnk == ''){
                    setErrInputKepalaNoStnk(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                
                if(InputKepalaMasaBerlakuKir == null){
                    setErrInputKepalaMasaBerlakuStnk(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaKir == ''){
                    setErrInputKepalaKir(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaMasaBerlakuKir == null){
                    setErrInputKepalaMasaBerlakuKir(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputKepalaLunasTanggal == null){
                    setErrInputKepalaLunasTanggal(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }else if(SelJenisAsset == 'BUNTUT'){
                if(InputBuntutNama == ''){
                    setErrInputBuntutNama(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutNoBuntut == ''){
                    setErrInputBuntutNoBuntut(i18n.t('label_REQUIRED'));
                    flag = false;
                }

                if(InputBuntutNoBearingLuar == ''){
                    setErrInputBuntutNoBearingLuar(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutNoBearingDalam == ''){
                    setErrInputBuntutNoBearingDalam(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutNoKir == ''){
                    setErrInputBuntutNoKir(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutMasaBerlakuKir == null){
                    setErrInputBuntutMasaBerlakuKir(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelBuntutRangkaPlat == ''){
                    setErrSelBuntutRangkaPlat(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutMerkAxel == ''){
                    setErrInputBuntutMerkAxel(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelBuntutJenisAxel == ''){
                    setErrSelBuntutJenisAxel(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelBuntutJenisHole == ''){
                    setErrSelBuntutJenisHole(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(InputBuntutLunasTanggal == null){
                    setErrInputBuntutLunasTanggal(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }else if(SelJenisAsset == 'SP_KEPALA'){
                if(InputSparePartKepalaNama == ''){
                    setErrInputSparePartKepalaNama(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelSparePartKepalaJenisSparePart == ''){
                    setErrSelSparePartKepalaJenisSparePart(i18n.t('label_REQUIRED'));
                    flag = false;
                }else{
                    if(SelSparePartKepalaJenisSparePart == 'BEARING'){
                        if(InputSparePartKepala_BearingNoBearing == ''){
                            setErrInputSparePartKepala_BearingNoBearing(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BearingPosisiBearing == ''){
                            setErrSelSparePartKepala_BearingPosisiBearing(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(InputSparePartKepala_BearingMerk == ''){
                            setErrInputSparePartKepala_BearingMerk(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BearingJenisHole == ''){
                            setErrSelSparePartKepala_BearingJenisHole(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BearingKotakBulat == ''){
                            setErrSelSparePartKepala_BearingKotakBulat(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }else if(SelSparePartKepalaJenisSparePart == 'BAN'){
                        if(InputSparePartKepala_BanNama == ''){
                            setErrInputSparePartKepala_BanNama(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BanPosisi == ''){
                            setErrSelSparePartKepala_BanPosisi(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BanJenis == ''){
                            setErrSelSparePartKepala_BanJenis(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BanUkuran == ''){
                            setErrSelSparePartKepala_BanUkuran(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartKepala_BanStatus == ''){
                            setErrSelSparePartKepala_BanStatus(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }else if(SelSparePartKepalaJenisSparePart == 'LAINNYA'){
                        if(InputSparePartKepala_LainnyaNama == ''){
                            setErrInputSparePartKepala_LainnyaNama(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }
                }
            }else if(SelJenisAsset == 'SP_BUNTUT'){
                if(InputSparePartBuntutNama == ''){
                    setErrInputSparePartBuntutNama(i18n.t('label_REQUIRED'));
                    flag = false;
                }
                if(SelSparePartBuntutJenisSparePart == ''){
                    setErrSelSparePartBuntutJenisSparePart(i18n.t('label_REQUIRED'));
                    flag = false;
                }else{
                    if(SelSparePartBuntutJenisSparePart == 'BEARING'){
                        if(InputSparePartBuntut_BearingNoBearing == ''){
                            setErrInputSparePartBuntut_BearingNoBearing(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BearingPosisiBearing == ''){
                            setErrSelSparePartBuntut_BearingPosisiBearing(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(InputSparePartBuntut_BearingMerk == ''){
                            setErrInputSparePartBuntut_BearingMerk(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BearingJenisHole == ''){
                            setErrSelSparePartBuntut_BearingJenisHole(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BearingKotakBulat == ''){
                            setErrSelSparePartBuntut_BearingKotakBulat(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }else if(SelSparePartBuntutJenisSparePart == 'BAN'){
                        if(InputSparePartBuntut_BanNama == ''){
                            setErrInputSparePartBuntut_BanNama(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BanPosisi == ''){
                            setErrSelSparePartBuntut_BanPosisi(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BanJenis == ''){
                            setErrSelSparePartBuntut_BanJenis(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BanUkuran == ''){
                            setErrSelSparePartBuntut_BanUkuran(i18n.t('label_REQUIRED'));
                            flag = false;
                        }

                        if(SelSparePartBuntut_BanStatus == ''){
                            setErrSelSparePartBuntut_BanStatus(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }else if(SelSparePartBuntutJenisSparePart == 'LAINNYA'){
                        if(InputSparePartBuntut_LainnyaNama == ''){
                            setErrInputSparePartBuntut_LainnyaNama(i18n.t('label_REQUIRED'));
                            flag = false;
                        }
                    }
                }
            }

            
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
            obj.kodeasset = InputKodeAsset;
            obj.assettype = SelJenisAsset;
            obj.isactive = true;
            if(SelJenisAsset == 'KEPALA'){
                obj.kepala_nama = InputKepalaNama;
                obj.kepala_nopolisi = InputKepalaNoPolisi;
                obj.kepala_jeniskendaraan = SelKepalaJenisKendaraan;
                obj.kepala_merk = InputKepalaMerk;
                obj.kepala_nomesin = InputKepalaNoMesin;
                obj.kepala_norangka = InputKepalaNoRangka;
                obj.kepala_nostnk = InputKepalaNoStnk;
                obj.kepala_masaberlakustnk = moment(InputKepalaMasaBerlakuStnk).toDate().getTime();
                obj.kepala_kir = InputKepalaKir;
                obj.kepala_masaberlakukir = moment(InputKepalaMasaBerlakuKir).toDate().getTime();
                obj.kepala_lunastanggal = moment(InputKepalaLunasTanggal).toDate().getTime();
                obj.kepala_keterangan = InputKepalaKeterangan;
            }else if(SelJenisAsset == 'BUNTUT'){
                obj.buntut_nama = InputBuntutNama;
                obj.buntut_nobuntut = InputBuntutNoBuntut;
                obj.buntut_nobearingluar = InputBuntutNoBearingLuar;
                obj.buntut_nobearingdalam = InputBuntutNoBearingDalam;
                obj.buntut_nokir = InputBuntutNoKir;
                obj.buntut_masaberlakukir = moment(InputBuntutMasaBerlakuKir).toDate().getTime();
                obj.buntut_rangka = SelBuntutRangkaPlat;
                obj.buntut_merkaxel = InputBuntutMerkAxel;
                obj.buntut_jenisaxel = SelBuntutJenisAxel;
                obj.buntut_jenishole = SelBuntutJenisHole;
                obj.buntut_lunastanggal = moment(InputBuntutLunasTanggal).toDate().getTime();
            }else if(SelJenisAsset == 'SP_KEPALA'){
                obj.sparepartkepala_nama = InputSparePartKepalaNama;
                obj.sparepartkepala_jenis = SelSparePartKepalaJenisSparePart;
                obj.sparepartkepala_keterangan = InputSparePartKepalaKeterangan;
                if(SelSparePartKepalaJenisSparePart == 'BEARING'){
                    obj.sparepartkepala_bearing_nobearing = InputSparePartKepala_BearingNoBearing;
                    obj.sparepartkepala_bearing_posisibearing = SelSparePartKepala_BearingPosisiBearing;
                    obj.sparepartkepala_bearing_merk = InputSparePartKepala_BearingMerk;
                    obj.sparepartkepala_bearing_jenishole = SelSparePartKepala_BearingJenisHole;
                    obj.sparepartkepala_bearing_kotakbulat = SelSparePartKepala_BearingKotakBulat;
                }else if(SelSparePartKepalaJenisSparePart == 'BAN'){
                    obj.sparepartkepala_ban_nama = InputSparePartKepala_BanNama;
                    obj.sparepartkepala_ban_keterangan = InputSparePartKepala_BanKeterangan;
                    obj.sparepartkepala_ban_posisi = SelSparePartKepala_BanPosisi;
                    obj.sparepartkepala_ban_jenis = SelSparePartKepala_BanJenis;
                    obj.sparepartkepala_ban_ukuran = SelSparePartKepala_BanUkuran;
                    obj.sparepartkepala_ban_status = SelSparePartKepala_BanStatus;
                }else if(SelSparePartKepalaJenisSparePart == 'LAINNYA'){
                    obj.sparepartkepala_lainnya_nama = InputSparePartKepala_LainnyaNama;
                    obj.sparepartkepala_lainnya_keterangan = InputSparePartKepala_LainnyaKeterangan;
                }
            }else if(SelJenisAsset == 'SP_BUNTUT'){
                obj.sparepartbuntut_nama = InputSparePartBuntutNama;
                obj.sparepartbuntut_jenis = SelSparePartBuntutJenisSparePart;
                obj.sparepartbuntut_keterangan = InputSparePartBuntutKeterangan;
                if(SelSparePartBuntutJenisSparePart == 'BEARING'){
                    obj.sparepartbuntut_bearing_nobearing = InputSparePartBuntut_BearingNoBearing;
                    obj.sparepartbuntut_bearing_posisi = SelSparePartBuntut_BearingPosisiBearing;
                    obj.sparepartbuntut_bearing_merk = InputSparePartBuntut_BearingMerk;
                    obj.sparepartbuntut_bearing_jenishole = SelSparePartBuntut_BearingJenisHole;
                    obj.sparepartbuntut_bearing_kotakbulat = SelSparePartBuntut_BearingKotakBulat;
                }else if(SelSparePartBuntutJenisSparePart == 'BAN'){
                    obj.sparepartbuntut_ban_nama = InputSparePartBuntut_BanNama;
                    obj.sparepartbuntut_ban_keterangan = InputSparePartBuntut_BanKeterangan;
                    obj.sparepartbuntut_ban_posisi = SelSparePartBuntut_BanPosisi;
                    obj.sparepartbuntut_ban_jenis = SelSparePartBuntut_BanJenis;
                    obj.sparepartbuntut_ban_ukuran = SelSparePartBuntut_BanUkuran;
                    obj.sparepartbuntut_ban_status = SelSparePartBuntut_BanStatus;
                }else if(SelSparePartBuntutJenisSparePart == 'LAINNYA'){
                    obj.sparepartbuntut_lainnya_nama = InputSparePartBuntut_LainnyaNama;
                    obj.sparepartbuntut_lainnya_keterangan = InputSparePartBuntut_LainnyaKeterangan;
                }
            }
            dispatch(actions.submitAddAsset('',obj,succesHandlerSubmit, errorHandler));
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

    return (
        <Formik
        initialValues={
            {
                kodeasset:InputKodeAsset,
                jenisasset:SelJenisAsset,
                KepalaNama:InputKepalaNama,
                KepalaNoPolisi:InputKepalaNoPolisi,
                KepalaJenisKendaraan:SelKepalaJenisKendaraan,
                KepalaMerk:InputKepalaMerk,
                KepalaNoMesin:InputKepalaNoMesin,
                KepalaNoRangka:InputKepalaNoRangka,
                KepalaNoStnk:InputKepalaNoStnk,
                KepalaMasaBerlakuStnk:InputKepalaMasaBerlakuStnk,
                KepalaKir:InputKepalaKir,
                KepalaMasaBerlakuKir:InputKepalaMasaBerlakuKir,
                KepalaLunasTanggal:InputKepalaLunasTanggal,
                KepalaKeterangan:InputKepalaKeterangan,
                BuntutNama:InputBuntutNama,
                BuntutNoBuntut:InputBuntutNoBuntut,
                BuntutNoBearingLuar:InputBuntutNoBearingLuar,
                BuntutNoBearingDalam:InputBuntutNoBearingDalam,
                BuntutNoKir:InputBuntutNoKir,
                BuntutMasaBerlakuKir:InputBuntutMasaBerlakuKir,
                BuntutRangkaPlat:SelBuntutRangkaPlat,
                BuntutMerkAxel:InputBuntutMerkAxel,
                BuntutJenisAxel:SelBuntutJenisAxel,
                BuntutJenisHole:SelBuntutJenisHole,
                BuntutLunasTanggal:InputBuntutLunasTanggal,
                SparePartKepalaNama:InputSparePartKepalaNama,
                SparePartKepalaJenisSparePart:SelSparePartKepalaJenisSparePart,
                SparePartKepalaKeterangan:InputSparePartKepalaKeterangan,
                SparePartKepala_BearingNoBearing:InputSparePartKepala_BearingNoBearing,
                SparePartKepala_BearingPosisiBearing:SelSparePartKepala_BearingPosisiBearing,
                SparePartKepala_BearingMerk:InputSparePartKepala_BearingMerk,
                SparePartKepala_BearingJenisHole:SelSparePartKepala_BearingJenisHole,
                SparePartKepala_BearingKotakBulat:SelSparePartKepala_BearingKotakBulat,
                SparePartKepala_BanNama:InputSparePartKepala_BanNama,
                SparePartKepala_BanKeterangan:InputSparePartKepala_BanKeterangan,
                SparePartKepala_BanPosisi:SelSparePartKepala_BanPosisi,
                SparePartKepala_BanJenis:SelSparePartKepala_BanJenis,
                SparePartKepala_BanUkuran:SelSparePartKepala_BanUkuran,
                SparePartKepala_BanStatus:SelSparePartKepala_BanStatus,
                SparePartKepala_LainnyaNama:InputSparePartKepala_LainnyaNama,
                SparePartKepala_LainnyaKeterangan:InputSparePartKepala_LainnyaKeterangan,
                SparePartBuntutNama:InputSparePartBuntutNama,
                SparePartBuntutJenisSparePart:SelSparePartBuntutJenisSparePart,
                SparePartBuntutKeterangan:InputSparePartBuntutKeterangan,
                SparePartBuntut_BearingNoBearing:InputSparePartBuntut_BearingNoBearing,
                SparePartBuntut_BearingPosisiBearing:SelSparePartBuntut_BearingPosisiBearing,
                SparePartBuntut_BearingMerk:InputSparePartBuntut_BearingMerk,
                SparePartBuntut_BearingJenisHole:SelSparePartBuntut_BearingJenisHole,
                SparePartBuntut_BearingKotakBulat:SelSparePartBuntut_BearingKotakBulat,
                SparePartBuntut_BanNama:InputSparePartBuntut_BanNama,
                SparePartBuntut_BanKeterangan:InputSparePartBuntut_BanKeterangan,
                SparePartBuntut_BanPosisi:SelSparePartBuntut_BanPosisi,
                SparePartBuntut_BanJenis:SelSparePartBuntut_BanJenis,
                SparePartBuntut_BanUkuran:SelSparePartBuntut_BanUkuran,
                SparePartBuntut_BanStatus:SelSparePartBuntut_BanStatus,
                SparePartBuntut_LainnyaNama:InputSparePartBuntut_LainnyaNama,
                SparePartBuntut_LainnyaKeterangan:InputSparePartBuntut_LainnyaKeterangan,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddAsset">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.addAsset} label={'Add Asset'} labeldefault={'Add Asset'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="kodeasset">
                                {i18n.t('Kode Asset')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="kodeasset"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="kodeasset"
                                maxLength={30}
                                onChange={val => handleInputKodeAsset(val)}
                                onBlur={handleBlur}
                                value={values.kodeasset}
                            />
                            <div className="invalid-feedback-custom">{ErrInputKodeAsset}</div>

                            <label className="mt-3 form-label required" htmlFor="jenisasset">
                                {i18n.t('Jenis Asset')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="jenisasset"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeJenisAsset(val)}
                                onBlur={val => setFieldTouched("jenisasset", val?.value ? val.value : '')}
                                data={ListJenisAsset}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.jenisasset}
                            />
                            <div className="invalid-feedback-custom">{ErrSelJenisAsset}</div>

                            <div hidden={!(values.jenisasset == 'SP_BUNTUT')}>
                            <label className="mt-3 form-label required" htmlFor="SparePartBuntutNama">
                                    {i18n.t('Nama')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="SparePartBuntutNama"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="SparePartBuntutNama"
                                    maxLength={200}
                                    onChange={val => handleInputSparePartBuntutNama(val)}
                                    onBlur={handleBlur}
                                    value={values.SparePartBuntutNama}
                                />
                                <div className="invalid-feedback-custom">{ErrInputSparePartBuntutNama}</div>

                                <label className="mt-3 form-label required" htmlFor="SparePartBuntutJenisSparePart">
                                {i18n.t('Jenis')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="SparePartBuntutJenisSparePart"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeSparePartBuntutJenisSparePart(val)}
                                    onBlur={val => setFieldTouched("SparePartBuntutJenisSparePart", val?.value ? val.value : '')}
                                    data={ListJenisSparePart}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.SparePartBuntutJenisSparePart}
                                />
                                <div className="invalid-feedback-custom">{ErrSelSparePartBuntutJenisSparePart}</div>

                                <label className="mt-3 form-label required" htmlFor="SparePartBuntutKeterangan">
                                    {i18n.t('Keterangan')}
                                </label>
                                <Input
                                    name="SparePartBuntutKeterangan"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="SparePartBuntutKeterangan"
                                    maxLength={200}
                                    onChange={val => handleInputSparePartBuntutKeterangan(val)}
                                    onBlur={handleBlur}
                                    value={values.SparePartBuntutKeterangan}
                                />

                            </div>

                            <div hidden={!(values.jenisasset == 'SP_KEPALA')}>
                                <label className="mt-3 form-label required" htmlFor="SparePartKepalaNama">
                                    {i18n.t('Nama')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="SparePartKepalaNama"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="SparePartKepalaNama"
                                    maxLength={200}
                                    onChange={val => handleInputSparePartKepalaNama(val)}
                                    onBlur={handleBlur}
                                    value={values.SparePartKepalaNama}
                                />
                                <div className="invalid-feedback-custom">{ErrInputSparePartKepalaNama}</div>

                                <label className="mt-3 form-label required" htmlFor="SparePartKepalaJenisSparePart">
                                {i18n.t('Jenis')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="SparePartKepalaJenisSparePart"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeSparePartKepalaJenisSparePart(val)}
                                    onBlur={val => setFieldTouched("SparePartKepalaJenisSparePart", val?.value ? val.value : '')}
                                    data={ListJenisSparePart}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.SparePartKepalaJenisSparePart}
                                />
                                <div className="invalid-feedback-custom">{ErrSelSparePartKepalaJenisSparePart}</div>

                                <label className="mt-3 form-label required" htmlFor="SparePartKepalaKeterangan">
                                    {i18n.t('Keterangan')}
                                </label>
                                <Input
                                    name="SparePartKepalaKeterangan"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="SparePartKepalaKeterangan"
                                    maxLength={200}
                                    onChange={val => handleInputSparePartKepalaKeterangan(val)}
                                    onBlur={handleBlur}
                                    value={values.SparePartKepalaKeterangan}
                                />

                            </div>

                            <div hidden={!(values.jenisasset == 'BUNTUT')}>
                            <label className="mt-3 form-label required" htmlFor="BuntutNama">
                                    {i18n.t('Nama')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutNama"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutNama"
                                    maxLength={200}
                                    onChange={val => handleInputBuntutNama(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutNama}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutNama}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutNoBuntut">
                                    {i18n.t('No Buntut')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutNoBuntut"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutNoBuntut"
                                    maxLength={20}
                                    onChange={val => handleInputBuntutNoBuntut(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutNoBuntut}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutNoBuntut}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutNoBearingLuar">
                                    {i18n.t('No Bearing Luar')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutNoBearingLuar"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutNoBearingLuar"
                                    maxLength={20}
                                    onChange={val => handleInputBuntutNoBearingLuar(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutNoBearingLuar}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutNoBearingLuar}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutNoBearingDalam">
                                    {i18n.t('No Bearing Dalam')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutNoBearingDalam"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutNoBearingDalam"
                                    maxLength={20}
                                    onChange={val => handleInputBuntutNoBearingDalam(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutNoBearingDalam}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutNoBearingDalam}</div>

                            </div>

                            <div hidden={!(values.jenisasset == 'KEPALA')}>
                                <label className="mt-3 form-label required" htmlFor="KepalaNama">
                                    {i18n.t('Nama')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaNama"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaNama"
                                    maxLength={200}
                                    onChange={val => handleInputKepalaNama(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaNama}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaNama}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaNoPolisi">
                                    {i18n.t('No Polisi')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaNoPolisi"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaNoPolisi"
                                    maxLength={10}
                                    onChange={val => handleInputKepalaNoPolisi(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaNoPolisi}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaNoPolisi}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaJenisKendaraan">
                                {i18n.t('Jenis Kendaraan')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="KepalaJenisKendaraan"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeKepalaJenisKendaraan(val)}
                                    onBlur={val => setFieldTouched("KepalaJenisKendaraan", val?.value ? val.value : '')}
                                    data={ListJenisKendaraan}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.KepalaJenisKendaraan}
                                />
                                <div className="invalid-feedback-custom">{ErrSelKepalaJenisKendaraan}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaMerk">
                                    {i18n.t('Merk')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaMerk"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaMerk"
                                    maxLength={200}
                                    onChange={val => handleInputKepalaMerk(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaMerk}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaMerk}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaNoMesin">
                                    {i18n.t('No Mesin')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaNoMesin"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaNoMesin"
                                    maxLength={20}
                                    onChange={val => handleInputKepalaNoMesin(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaNoMesin}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaNoMesin}</div>
                                

                            </div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <div hidden={!(values.SparePartBuntutJenisSparePart == 'BEARING' && values.jenisasset == 'SP_BUNTUT')}>
                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BearingNoBearing">
                                        {i18n.t('No Bearing')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartBuntut_BearingNoBearing"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_BearingNoBearing"
                                        maxLength={20}
                                        onChange={val => handleInputSparePartBuntut_BearingNoBearing(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_BearingNoBearing}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartBuntut_BearingNoBearing}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BearingPosisiBearing">
                                    {i18n.t('Posisi Bearing')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BearingPosisiBearing"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BearingPosisi(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BearingPosisiBearing", val?.value ? val.value : '')}
                                        data={ListPosisiBearing}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartBuntut_BearingPosisiBearing}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BearingPosisiBearing}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BearingMerk">
                                        {i18n.t('Merk')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartBuntut_BearingMerk"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_BearingMerk"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartBuntut_BearingMerk(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_BearingMerk}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartBuntut_BearingMerk}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BearingJenisHole">
                                    {i18n.t('Jenis Hole')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BearingJenisHole"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BearingJenisHole(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BearingJenisHole", val?.value ? val.value : '')}
                                        data={ListJenisHole}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartBuntut_BearingJenisHole}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BearingJenisHole}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BearingKotakBulat">
                                    {i18n.t('Kotak/Bulat')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BearingKotakBulat"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BearingJenisKotakBulat(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BearingKotakBulat", val?.value ? val.value : '')}
                                        data={ListKotakBulat}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartBuntut_BearingKotakBulat}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BearingKotakBulat}</div>

                                </div>

                                <div hidden={!(values.SparePartBuntutJenisSparePart == 'BAN' && values.jenisasset == 'SP_BUNTUT')}>
                                    <div hidden={true}>
                                <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanNama">
                                        {i18n.t('Nama')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartBuntut_BanNama"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_BanNama"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartBuntut_BanNama(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_BanNama}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartBuntut_BanNama}</div>
                                    </div>

                                    <div hidden={true}>
                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanKeterangan">
                                        {i18n.t('Keterangan')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartBuntut_BanKeterangan"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_BanKeterangan"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartBuntut_BanKeterangan(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_BanKeterangan}
                                    />
                                    </div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanPosisi">
                                    {i18n.t('Posisi')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BanPosisi"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BanPosisi(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BanPosisi", val?.value ? val.value : '')}
                                        data={ListPosisiBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        disabled={true}
                                        value={values.SparePartBuntut_BanPosisi}
                                        // value={'BAN_Buntut'}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BanPosisi}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanJenis">
                                    {i18n.t('Jenis Ban')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BanJenis"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BanJenisBan(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BanJenis", val?.value ? val.value : '')}
                                        data={ListJenisBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={true}
                                        value={values.SparePartBuntut_BanJenis}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BanJenis}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanUkuran">
                                    {i18n.t('Ukuran')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BanUkuran"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BanUkuran(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BanUkuran", val?.value ? val.value : '')}
                                        data={ListUkuranBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartBuntut_BanUkuran}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BanUkuran}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_BanStatus">
                                    {i18n.t('Status')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartBuntut_BanStatus"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartBuntut_BanStatus(val)}
                                        onBlur={val => setFieldTouched("SparePartBuntut_BanStatus", val?.value ? val.value : '')}
                                        data={ListStatusBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartBuntut_BanStatus}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartBuntut_BanStatus}</div>
                                </div>

                                <div hidden={true}>
                                {/* <div hidden={!(values.SparePartBuntutJenisSparePart == 'LAINNYA' && values.jenisasset == 'SP_BUNTUT')}> */}
                                <label className="mt-3 form-label required" htmlFor="SparePartBuntut_LainnyaNama">
                                        {i18n.t('Nama')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartBuntut_LainnyaNama"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_LainnyaNama"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartBuntut_LainnyaNama(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_LainnyaNama}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartBuntut_LainnyaNama}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartBuntut_LainnyaKeterangan">
                                        {i18n.t('Keterangan')}
                                    </label>
                                    <Input
                                        name="SparePartBuntut_LainnyaKeterangan"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartBuntut_LainnyaKeterangan"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartBuntut_LainnyaKeterangan(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartBuntut_LainnyaKeterangan}
                                    />
                                </div>

                            <div hidden={!(values.SparePartKepalaJenisSparePart == 'BEARING' && values.jenisasset == 'SP_KEPALA')}>
                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BearingNoBearing">
                                        {i18n.t('No Bearing')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartKepala_BearingNoBearing"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_BearingNoBearing"
                                        maxLength={20}
                                        onChange={val => handleInputSparePartKepala_BearingNoBearing(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_BearingNoBearing}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartKepala_BearingNoBearing}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BearingPosisiBearing">
                                    {i18n.t('Posisi Bearing')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BearingPosisiBearing"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BearingPosisi(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BearingPosisiBearing", val?.value ? val.value : '')}
                                        data={ListPosisiBearing}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartKepala_BearingPosisiBearing}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BearingPosisiBearing}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BearingMerk">
                                        {i18n.t('Merk')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartKepala_BearingMerk"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_BearingMerk"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartKepala_BearingMerk(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_BearingMerk}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartKepala_BearingMerk}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BearingJenisHole">
                                    {i18n.t('Jenis Hole')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BearingJenisHole"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BearingJenisHole(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BearingJenisHole", val?.value ? val.value : '')}
                                        data={ListJenisHole}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartKepala_BearingJenisHole}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BearingJenisHole}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BearingKotakBulat">
                                    {i18n.t('Kotak/Bulat')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BearingKotakBulat"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BearingJenisKotakBulat(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BearingKotakBulat", val?.value ? val.value : '')}
                                        data={ListKotakBulat}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartKepala_BearingKotakBulat}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BearingKotakBulat}</div>

                                </div>

                                <div hidden={!(values.SparePartKepalaJenisSparePart == 'BAN' && values.jenisasset == 'SP_KEPALA')}>
                                <div hidden={true}>
                                <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanNama">
                                        {i18n.t('Nama')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartKepala_BanNama"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_BanNama"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartKepala_BanNama(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_BanNama}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartKepala_BanNama}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanKeterangan">
                                        {i18n.t('Keterangan')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartKepala_BanKeterangan"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_BanKeterangan"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartKepala_BanKeterangan(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_BanKeterangan}
                                    />
                                    </div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanPosisi">
                                    {i18n.t('Posisi')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BanPosisi"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BanPosisi(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BanPosisi", val?.value ? val.value : '')}
                                        data={ListPosisiBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        disabled={true}
                                        value={values.SparePartKepala_BanPosisi}
                                        // value={'BAN_KEPALA'}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BanPosisi}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanJenis">
                                    {i18n.t('Jenis Ban')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BanJenis"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BanJenisBan(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BanJenis", val?.value ? val.value : '')}
                                        data={ListJenisBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={true}
                                        value={values.SparePartKepala_BanJenis}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BanJenis}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanUkuran">
                                    {i18n.t('Ukuran')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BanUkuran"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BanUkuran(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BanUkuran", val?.value ? val.value : '')}
                                        data={ListUkuranBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartKepala_BanUkuran}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BanUkuran}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_BanStatus">
                                    {i18n.t('Status')}
                                    <span style={{color:'red'}}>*</span>
                                    </label>

                                    <DropdownList
                                        // className={
                                        //     touched.branch && errors.branch
                                        //         ? "input-error" : ""
                                        // }
                                        name="SparePartKepala_BanStatus"
                                        filter='contains'
                                        placeholder={i18n.t('select.SELECT_OPTION')}
                                        
                                        onChange={val => handleChangeSparePartKepala_BanStatus(val)}
                                        onBlur={val => setFieldTouched("SparePartKepala_BanStatus", val?.value ? val.value : '')}
                                        data={ListStatusBan}
                                        textField={'label'}
                                        valueField={'value'}
                                        // style={{width: '25%'}}
                                        // disabled={values.isdisabledcountry}
                                        value={values.SparePartKepala_BanStatus}
                                    />
                                    <div className="invalid-feedback-custom">{ErrSelSparePartKepala_BanStatus}</div>
                                </div>

                                <div hidden={true}>
                                {/* <div hidden={!(values.SparePartKepalaJenisSparePart == 'LAINNYA' && values.jenisasset == 'SP_KEPALA')}> */}
                                <label className="mt-3 form-label required" htmlFor="SparePartKepala_LainnyaNama">
                                        {i18n.t('Nama')}
                                        <span style={{color:'red'}}>*</span>
                                    </label>
                                    <Input
                                        name="SparePartKepala_LainnyaNama"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_LainnyaNama"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartKepala_LainnyaNama(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_LainnyaNama}
                                    />
                                    <div className="invalid-feedback-custom">{ErrInputSparePartKepala_LainnyaNama}</div>

                                    <label className="mt-3 form-label required" htmlFor="SparePartKepala_LainnyaKeterangan">
                                        {i18n.t('Keterangan')}
                                    </label>
                                    <Input
                                        name="SparePartKepala_LainnyaKeterangan"
                                        // className={
                                        //     touched.namebranch && errors.namebranch
                                        //         ? "w-50 input-error"
                                        //         : "w-50"
                                        // }
                                        type="text"
                                        id="SparePartKepala_LainnyaKeterangan"
                                        maxLength={200}
                                        onChange={val => handleInputSparePartKepala_LainnyaKeterangan(val)}
                                        onBlur={handleBlur}
                                        value={values.SparePartKepala_LainnyaKeterangan}
                                    />
                                </div>

                            <div hidden={!(values.jenisasset == 'BUNTUT')}>
                            <label className="mt-3 form-label required" htmlFor="BuntutNoKir">
                                    {i18n.t('No KIR')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutNoKir"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutNoKir"
                                    maxLength={20}
                                    onChange={val => handleInputBuntutNoKir(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutNoKir}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutNoKir}</div>

                            <label className="mt-3 form-label required" htmlFor="BuntutMasaBerlakuKir">
                                {i18n.t('Masa Berlaku KIR')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <DatePicker
                                        name="BuntutMasaBerlakuKir"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleInputBuntutMasaBerlakuKir(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.BuntutMasaBerlakuKir}
                                        // style={{width: '25%'}}
                                        disabled={false}                       
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutMasaBerlakuKir}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutRangkaPlat">
                                {i18n.t('Rangka/Plat')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="BuntutRangkaPlat"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeRangkaPlat(val)}
                                    onBlur={val => setFieldTouched("BuntutRangkaPlat", val?.value ? val.value : '')}
                                    data={ListRangkaPlat}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.BuntutRangkaPlat}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBuntutRangkaPlat}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutMerkAxel">
                                    {i18n.t('Merk Axel')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="BuntutMerkAxel"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="BuntutMerkAxel"
                                    maxLength={200}
                                    onChange={val => handleInputBuntutMerkAxel(val)}
                                    onBlur={handleBlur}
                                    value={values.BuntutMerkAxel}
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutMerkAxel}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutJenisAxel">
                                {i18n.t('Jenis Axel')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="BuntutJenisAxel"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJenisAxel(val)}
                                    onBlur={val => setFieldTouched("BuntutJenisAxel", val?.value ? val.value : '')}
                                    data={ListJenisAxel}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.BuntutJenisAxel}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBuntutJenisAxel}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutJenisHole">
                                {i18n.t('Jenis Hole')}
                                <span style={{color:'red'}}>*</span>
                                </label>

                                <DropdownList
                                    // className={
                                    //     touched.branch && errors.branch
                                    //         ? "input-error" : ""
                                    // }
                                    name="BuntutJenisHole"
                                    filter='contains'
                                    placeholder={i18n.t('select.SELECT_OPTION')}
                                    
                                    onChange={val => handleChangeJenisHole(val)}
                                    onBlur={val => setFieldTouched("BuntutJenisHole", val?.value ? val.value : '')}
                                    data={ListJenisHole}
                                    textField={'label'}
                                    valueField={'value'}
                                    // style={{width: '25%'}}
                                    // disabled={values.isdisabledcountry}
                                    value={values.BuntutJenisHole}
                                />
                                <div className="invalid-feedback-custom">{ErrSelBuntutJenisHole}</div>

                                <label className="mt-3 form-label required" htmlFor="BuntutLunasTanggal">
                                {i18n.t('Lunas Tanggal')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <DatePicker
                                        name="BuntutLunasTanggal"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleInputBuntutLunasTanggal(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.BuntutLunasTanggal}
                                        // style={{width: '25%'}}
                                        disabled={false}                       
                                />
                                <div className="invalid-feedback-custom">{ErrInputBuntutLunasTanggal}</div>
                            </div>

                            <div hidden={!(values.jenisasset == 'KEPALA')}>
                                <label className="mt-3 form-label required" htmlFor="KepalaNoRangka">
                                    {i18n.t('No Rangka')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaNoRangka"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaNoRangka"
                                    maxLength={30}
                                    onChange={val => handleInputKepalaNoRangka(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaNoRangka}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaNoRangka}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaNoStnk">
                                    {i18n.t('No STNK')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaNoStnk"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaNoStnk"
                                    maxLength={30}
                                    onChange={val => handleInputKepalaNoStnk(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaNoStnk}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaNoStnk}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaMasaBerlakuStnk">
                                {i18n.t('Masa Berlaku STNK')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <DatePicker
                                        name="KepalaMasaBerlakuStnk"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleInputKepalaMasaBerlakuStnk(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.KepalaMasaBerlakuStnk}
                                        // style={{width: '25%'}}
                                        disabled={false}                       
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaMasaBerlakuStnk}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaKir">
                                    {i18n.t('KIR')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <Input
                                    name="KepalaKir"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaKir"
                                    maxLength={30}
                                    onChange={val => handleInputKepalaKir(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaKir}
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaKir}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaMasaBerlakuKir">
                                {i18n.t('Masa Berlaku KIR')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <DatePicker
                                        name="KepalaMasaBerlakuKir"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleInputKepalaMasaBerlakuKir(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.KepalaMasaBerlakuKir}
                                        // style={{width: '25%'}}
                                        disabled={false}                       
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaMasaBerlakuKir}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaLunasTanggal">
                                {i18n.t('Lunas Tanggal')}
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <DatePicker
                                        name="KepalaLunasTanggal"
                                        // onChange={(val) => {
                                        //         setFieldValue("startdate", val);
                                        //     }
                                        // }
                                        onChange={val => handleInputKepalaLunasTanggal(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={formatdate}
                                        value={values.KepalaLunasTanggal}
                                        // style={{width: '25%'}}
                                        disabled={false}                       
                                />
                                <div className="invalid-feedback-custom">{ErrInputKepalaLunasTanggal}</div>

                                <label className="mt-3 form-label required" htmlFor="KepalaKeterangan">
                                    {i18n.t('Keterangan')}
                                </label>
                                <Input
                                    name="KepalaKeterangan"
                                    // className={
                                    //     touched.namebranch && errors.namebranch
                                    //         ? "w-50 input-error"
                                    //         : "w-50"
                                    // }
                                    type="text"
                                    id="KepalaKeterangan"
                                    maxLength={200}
                                    onChange={val => handleInputKepalaKeterangan(val)}
                                    onBlur={handleBlur}
                                    value={values.KepalaKeterangan}
                                />
                            </div>

                            </div>

                            </div>
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
                        </form>
                    )
                }
            }
        </Formik>
    )
}