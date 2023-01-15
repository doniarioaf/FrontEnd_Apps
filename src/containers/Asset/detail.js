import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../components/Layout/ContentWrapper';
  import ContentHeading               from '../../components/Layout/ContentHeading';
  import {
  Container, Card, CardBody
  , Button, CardHeader
  }                                   from 'reactstrap';
  import {useHistory}                 from 'react-router-dom';
  import {useTranslation}             from 'react-i18next';
  import Swal             from "sweetalert2";
  import {useDispatch}    from 'react-redux';
  import * as actions     from '../../store/actions';
  import Skeleton         from 'react-loading-skeleton';
//   import styled                       from "styled-components";
//   import Dialog                       from '@material-ui/core/Dialog';
  import * as pathmenu           from '../shared/pathMenu';
  import ButtonMUI from '@material-ui/core/Button';
  import ClickAwayListener from '@material-ui/core/ClickAwayListener';
  import Grow from '@material-ui/core/Grow';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import MenuItem from '@material-ui/core/MenuItem';
  import MenuList from '@material-ui/core/MenuList';
  import { makeStyles } from '@material-ui/core/styles';
  import {Loading}                    from '../../components/Common/Loading';
  import { isGetPermissions,reloadToHomeNotAuthorize } from '../shared/globalFunc';
  import { MenuAsset,editAsset_Permission,addAssetMapping_Permission,deleteHistoryAssetMapping_Permission, deleteAsset_Permission} from '../shared/permissionMenu';
  import moment                       from "moment/moment";
  import '../CSS/table.css';
  import { formatdate, formatdatetime } from '../shared/constantValue';
  import Grid                         from '../../components/TableGrid';

  import DialogAssetMapping from './dialogAssetMapping';
  import styled                       from "styled-components";
  import Dialog                       from '@material-ui/core/Dialog';

  const StyledDialog = styled(Dialog)`
    & > .MuiDialog-container > .MuiPaper-root {
        height: 500px;
    }
    `;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  function Detail(props) {
    reloadToHomeNotAuthorize(MenuAsset,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [ShowDialog, setShowDialog] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);

    const [ListAssetMapping, setListAssetMapping] = useState([]);
    const [rows, setRows] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'nama', title: i18n.t('Nama')},
        {name: 'kodeasset', title: i18n.t('Kode Asset')},
        {name: 'tipeasset', title: i18n.t('Tipe Asset')},
        {name: 'nodocpengeluaran', title: i18n.t('No Document')},
        {name: 'tanggal', title: i18n.t('Tanggal')},
        // {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);

    const id = props.match.params.id;

    const handleToggle = (flag) => {
        setOpen((prevOpen) => !prevOpen);
        setIsPrint(flag)
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);

      useEffect(() => {
        setLoading(true);
        dispatch(actions.getAssetData('/'+id,successHandler, errorHandler));
    }, []);

    const getNama = (data) => {
        if(data.assettype){
            if(data.assettype == 'KEPALA'){
                return data.kepala_nama;
            }else if(data.assettype == 'BUNTUT'){
                return data.buntut_nama;
            }else if(data.assettype == 'SP_KEPALA'){
                return data.sparepartkepala_nama;
            }else if(data.assettype == 'SP_BUNTUT'){
                return data.sparepartbuntut_nama;
            }
        }
        return 'Kosong';
    }

    const getTipeAsset = (data) => {
        if(data.assettype){
            if(data.assettype == 'KEPALA'){
                return 'Inventarisasi Kepala';
            }else if(data.assettype == 'BUNTUT'){
                return 'Inventarisasi Buntut';
            }else if(data.assettype == 'SP_KEPALA'){
                return 'Inventarisasi Sparepart Kepala';
            }else if(data.assettype == 'SP_BUNTUT'){
                return 'Inventarisasi Sparepart Buntut';
            }
        }
        return 'Kosong';
    }

    function successHandler(data) {
        setValue(data.data);
        if(data.data){
            // let filterid = RowsBranch.filter(output => output.id == SelBranch);

            const theData = data.data.historymapping.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'nama':getNama(el),
                    'kodeasset':el.kodeasset?el.kodeasset:'Kosong',
                    'tipeasset':getTipeAsset(el),
                    'nodocpengeluaran':el.noDocPengeluaranKasBank?el.noDocPengeluaranKasBank:'',
                    'tanggal':el.tanggal?moment(new Date(el.tanggal)).format(formatdatetime):''
                }
            ], []);
            setRows(theData);
            setListAssetMapping(data.data.assetmapping);
        }
        setTimeout(() => {
            setLoading(false);
            
        }, 1000);
        
    }

    const submitHandlerDelete = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(actions.submitDeleteAsset('/'+id,succesHandlerSubmit, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const succesHandlerSubmit = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(pathmenu.menuAsset);
            }
        })
    }

    const succesHandlerSubmitHistory = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(0);
            }
        })
    }

    const succesHandlerSubmitDialog = (data) => {
        setLoading(false);
        setShowDialog(false);
        setLoadingSend(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(0);
            }
        })
    }

    const handleGantiSparePartBuntut = () => {
        let listmapping = value.assetmapping;
        let listfilteroutput = listmapping.filter(output => output.type == 'ARMADA');    
        let msg = 'Tidak Ada Buntut';
        if(listfilteroutput.length > 0){
            let idbuntut = listfilteroutput[0].idasset_mapping?listfilteroutput[0].idasset_mapping:0;
            if(idbuntut !== 0){
                msg = '';
                history.push(pathmenu.detailAsset+'/'+idbuntut);
            }
        }

        if(msg !== ''){
            Swal.fire({
                icon: 'info',
                title: '',
                text: msg
            })
        }
        
    }

    
    function onClickAdd() {
        setShowDialog(true);
    }
    function onClickView(id) {
        // history.push(pathmenu.detailWorkOrder+'/'+id);
    }
    function handleDisbaledDelete(row) {
        if(row.nodocpengeluaran !== ''){
            return true;
        }
        return false;
    }
    function onClickDelete(id) {
        let Nama = '';
        let filterid = rows.filter(output => output.id == id);
        if(filterid.length > 0){
            Nama = filterid[0].nama;
        }
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE') +' ('+Nama+')',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setLoading(true);
                dispatch(actions.submitDeleteAsset('/historyassetmapping/'+id,succesHandlerSubmitHistory, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
        
    }

    function errorHandler(error) {
        setLoading(false);
        setShowDialog(false);
        setLoadingSend(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailAsset+'/'+id} label={'Detail Asset'} labeldefault={'Detail Asset'} />
            <Container fluid>
            <Card>
            <CardBody>
            <Button
                onClick={() => history.goBack()}
                title={i18n.t('label_BACK')}
            >
                {i18n.t('label_BACK')}
            </Button>

            <ButtonMUI
                ref={anchorRef}
                color="white"
                // backgroundColor="primary"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={() => handleToggle(false)}
                style={{float: 'right',marginRight:'0.2%',backgroundColor:'#05105d'}}
            >
                <span style={{color:'white',fontSize:'13px'}}>
                {i18n.t('label_OPTIONS')}
                </span>
            </ButtonMUI>

            <div className="h1 m-3 text-center">
                <h2>
                    {
                        !loading  ?
                            value.kodeasset :
                            <Skeleton style={{maxWidth: 300}}/>
                    }
                </h2>
            </div>

            <div className="row mt-2">
            <div className="mt-2 col-lg-4 ft-detail mb-3">
            <Card outline color="primary" className="mb-3" style={{width:"200%"}}>
            <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Details'}</CardHeader>
            <CardBody>
                {
                    loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                    (
                        <section>
                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Kode Asset')}</span>
                            <strong className="col-md-7">
                                {value.kodeasset?value.kodeasset:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tipe Asset')}</span>
                            <strong className="col-md-7">
                                {value.assettypeName?value.assettypeName:''}
                            </strong>
                            </div>

                            <div hidden={!(value.assettype?(value.assettype == 'KEPALA'):false)}>
                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Nama')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_nama?value.kepala_nama:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No Polisi')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_nopolisi?value.kepala_nopolisi:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Jenis Kendaraan')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_jeniskendaraanname?value.kepala_jeniskendaraanname:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Merk')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_merk?value.kepala_merk:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No Mesin')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_nomesin?value.kepala_nomesin:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No Rangka')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_norangka?value.kepala_norangka:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No STNK')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_nostnk?value.kepala_nostnk:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Masa Berlaku STNK')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_masaberlakustnk?moment (new Date(value.kepala_masaberlakustnk)).format(formatdate):''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('KIR')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_kir?value.kepala_kir:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Masa Berlaku KIR')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_masaberlakukir?moment (new Date(value.kepala_masaberlakukir)).format(formatdate):''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Lunas Tanggal')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_lunastanggal?moment (new Date(value.kepala_lunastanggal)).format(formatdate):''}
                                </strong>
                                </div>

                            <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                <strong className="col-md-7">
                                    {value.kepala_keterangan?value.kepala_keterangan:''}
                                </strong>
                                </div>
                            </div>

                            <div hidden={!(value.assettype?(value.assettype == 'SP_BUNTUT'):false)}>
                                <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Nama')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_nama?value.sparepartbuntut_nama:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Jenis')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_jenisname?value.sparepartbuntut_jenisname:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_keterangan?value.sparepartbuntut_keterangan:''}
                                        </strong>
                                    </div>

                                    <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'BEARING'):false)}>
                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('No Bearing')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_bearing_nobearing?value.sparepartbuntut_bearing_nobearing:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Posisi')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_bearing_posisiname?value.sparepartbuntut_bearing_posisiname:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Merk')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_bearing_merk?value.sparepartbuntut_bearing_merk:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Jenis Hole')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_bearing_jenisholename?value.sparepartbuntut_bearing_jenisholename:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Kotak/Bulat')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_bearing_kotakbulatname?value.sparepartbuntut_bearing_kotakbulatname:''}
                                        </strong>
                                    </div>
                                </div>


                                <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'BAN'):false)}>
                                    {/* <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Nama')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_nama?value.sparepartbuntut_ban_nama:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_keterangan?value.sparepartbuntut_ban_keterangan:''}
                                            </strong>
                                    </div> */}

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Posisi')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_posisiname?value.sparepartbuntut_ban_posisiname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Jenis Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_jenisname?value.sparepartbuntut_ban_jenisname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Ukuran Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_ukuranname?value.sparepartbuntut_ban_ukuranname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Status Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_ban_statusname?value.sparepartbuntut_ban_statusname:''}
                                            </strong>
                                    </div>
                                </div>

                                <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'LAINNYA'):false)}>
                                    {/* <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Nama')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_lainnya_nama?value.sparepartbuntut_lainnya_nama:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_lainnya_keterangan?value.sparepartbuntut_lainnya_keterangan:''}
                                        </strong>
                                    </div> */}
                                </div>

                                <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'FILTER'):false)}>
                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Tipe')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_filter_type_name?value.sparepartbuntut_filter_type_name:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Posisi')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_filter_posisi_name?value.sparepartbuntut_filter_posisi_name:''}
                                        </strong>
                                    </div>
                                </div>

                                <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'BOHLAM'):false)}>
                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Tipe')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_bohlam_type_name?value.sparepartbuntut_bohlam_type_name:''}
                                            </strong>
                                        </div>
                                </div>

                                <div hidden={!(value.sparepartbuntut_jenis?(value.sparepartbuntut_jenis == 'SELANG'):false)}>
                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Tipe')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartbuntut_selang_type_name?value.sparepartbuntut_selang_type_name:''}
                                            </strong>
                                        </div>
                                </div>


                            </div>

                            <div hidden={!(value.assettype?(value.assettype == 'SP_KEPALA'):false)}>
                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Nama')}</span>
                                    <strong className="col-md-7">
                                        {value.sparepartkepala_nama?value.sparepartkepala_nama:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Jenis')}</span>
                                    <strong className="col-md-7">
                                        {value.sparepartkepala_jenisname?value.sparepartkepala_jenisname:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                    <strong className="col-md-7">
                                        {value.sparepartkepala_keterangan?value.sparepartkepala_keterangan:''}
                                    </strong>
                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'BEARING'):false)}>
                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('No Bearing')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bearing_nobearing?value.sparepartkepala_bearing_nobearing:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Posisi')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bearing_posisibearingname?value.sparepartkepala_bearing_posisibearingname:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Merk')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bearing_merk?value.sparepartkepala_bearing_merk:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Jenis Hole')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bearing_jenisholename?value.sparepartkepala_bearing_jenisholename:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Kotak/Bulat')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bearing_kotakbulatname?value.sparepartkepala_bearing_kotakbulatname:''}
                                        </strong>
                                    </div>

                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'BAN'):false)}>
                                    {/* <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Nama')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_nama?value.sparepartkepala_ban_nama:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_keterangan?value.sparepartkepala_ban_keterangan:''}
                                            </strong>
                                    </div> */}

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Posisi')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_posisiname?value.sparepartkepala_ban_posisiname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Jenis Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_jenisname?value.sparepartkepala_ban_jenisname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Ukuran Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_ukuranname?value.sparepartkepala_ban_ukuranname:''}
                                            </strong>
                                    </div>

                                    <div className="row mt-3">
                                            <span className="col-md-5">{i18n.t('Status Ban')}</span>
                                            <strong className="col-md-7">
                                                {value.sparepartkepala_ban_statusname?value.sparepartkepala_ban_statusname:''}
                                            </strong>
                                    </div>

                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'LAINNYA'):false)}>
                                    {/* <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Nama')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_lainnya_nama?value.sparepartkepala_lainnya_nama:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Keterangan')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_lainnya_keterangan?value.sparepartkepala_lainnya_keterangan:''}
                                        </strong>
                                    </div> */}
                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'FILTER'):false)}>
                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Tipe')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_filter_type_name?value.sparepartkepala_filter_type_name:''}
                                        </strong>
                                    </div>

                                    <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Posisi')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_filter_posisi_name?value.sparepartkepala_filter_posisi_name:''}
                                        </strong>
                                    </div>
                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'BOHLAM'):false)}>
                                <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Tipe')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartkepala_bohlam_type_name?value.sparepartkepala_bohlam_type_name:''}
                                        </strong>
                                    </div>
                                </div>

                                <div hidden={!(value.sparepartkepala_jenis?(value.sparepartkepala_jenis == 'SELANG'):false)}>
                                <div className="row mt-3">
                                        <span className="col-md-5">{i18n.t('Tipe')}</span>
                                        <strong className="col-md-7">
                                            {value.sparepartbuntut_selang_type_name?value.sparepartbuntut_selang_type_name:''}
                                        </strong>
                                    </div>
                                </div>
                                

                            </div>

                            <div hidden={!(value.assettype?(value.assettype == 'BUNTUT'):false)}>
                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Nama')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_nama?value.buntut_nama:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('No Buntut')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_nobuntut?value.buntut_nobuntut:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('No Bearing Luar')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_nobearingluar?value.buntut_nobearingluar:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('No Bearing Dalam')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_nobearingdalam?value.buntut_nobearingdalam:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('No KIR')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_nokir?value.buntut_nokir:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Masa Berlaku KIR')}</span>
                                <strong className="col-md-7">
                                    {value.buntut_masaberlakukir?moment (new Date(value.buntut_masaberlakukir)).format(formatdate):''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Rangka/Plat')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_rangkaname?value.buntut_rangkaname:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Merk Axel')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_merkaxel?value.buntut_merkaxel:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Jenis Axel')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_jenisaxelname?value.buntut_jenisaxelname:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                    <span className="col-md-5">{i18n.t('Jenis Hole')}</span>
                                    <strong className="col-md-7">
                                        {value.buntut_jenisholename?value.buntut_jenisholename:''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Lunas Tanggal')}</span>
                                <strong className="col-md-7">
                                    {value.buntut_lunastanggal?moment (new Date(value.buntut_lunastanggal)).format(formatdate):''}
                                </strong>
                                </div>

                            </div>

                        </section>
                    )
                }
            </CardBody>
            </Card>
            </div>    
            </div>

            </CardBody>

            {
            value.assettype == 'KEPALA' || value.assettype == 'BUNTUT'? 
            <Container fluid className="center-parent">
            <div className="table-responsive">
            <Grid
                rows={rows}
                columns={columns}
                totalCounts={rows.length}
                loading={loading}
                columnextension={tableColumnExtensions}
                permissionadd={!isGetPermissions(addAssetMapping_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={true}
                onclickview={onClickView}
                // onclickdownload={onClickDownload}
                permissiondownload={true}
                permissiondelete={!isGetPermissions(deleteHistoryAssetMapping_Permission,'TRANSACTION')}
                onclickdelete={onClickDelete}
                listfilterdisabled={['tanggal']}
                deletedisabled = {handleDisbaledDelete}
                width={80}
            />
            </div>
            </Container>
            :''
        }

            </Card>
            </Container>

            <div className={classes.root}>
        <Paper className={classes.paper}>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {
                        isprint ? 
                        (<div>
                            {/* <MenuItem onClick={showQrCode}>{i18n.t('Generate QR Code')}</MenuItem> */}
                        </div>)
                        :(<div>
                            <MenuItem hidden={loading || !isGetPermissions(editAsset_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editAsset+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={loading || !isGetPermissions(deleteAsset_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            <MenuItem hidden={!(value.assettype == 'KEPALA')}  onClick={() => handleGantiSparePartBuntut()}>{i18n.t('Ganti Sparepart Buntut')}</MenuItem>
                            
                        </div>)
                        
                    }
                    
                </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
        </Paper>
        </div>

            {loading && <Loading/>}

            <StyledDialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                style={{height: '80%'}}
                open={ShowDialog}
            >
                <DialogAssetMapping
                    showflag = {setShowDialog}
                    loadingsend = {setLoadingSend}
                    errorHandler = {errorHandler}
                    idasset = {id}
                    handlesubmit = {succesHandlerSubmitDialog}
                    jenisasset= {value.assettype}
                    listassetmapping = {value.assetmapping}
                />
                {LoadingSend && <Loading/>}
            </StyledDialog>
        </ContentWrapper>

    )
  }
  export default Detail;