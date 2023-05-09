import React, {useEffect,useState} from 'react';
import {useDispatch}                from 'react-redux';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import {DropdownList,DatePicker}      from 'react-widgets';
import * as actions                 from '../../store/actions';
import {useTranslation}             from 'react-i18next';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Button,Input}                                   from 'reactstrap';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';
import { formatdate} from '../shared/constantValue';
import "react-widgets/dist/css/react-widgets.css";

const DialogStatus = props => {
    const [ListStatus, SetListStatus] = useState([]);
    const [SelStatus, SetSelStatus] = useState('');

    const [ListChooseYesNo, SetListChooseYesNo] = useState([]);

    const [SelIsLembur, SetSelIsLembur] = useState('');

    const [ListKepemilikanMobil, SetListKepemilikanMobil] = useState([]);
    const [SelKepemilikanMobil, SetSelKepemilikanMobil] = useState('');
    const [ErrSelKepemilikanMobil, SetErrSelKepemilikanMobil] = useState('');

    const [ListSupir, SetListSupir] = useState([]);
    const [SelSupir, SetSelSupir] = useState('');
    const [ErrSelSupir, SetErrSelSupir] = useState('');

    const [ListVendor, SetListVendor] = useState([]);
    const [SelVendor, SetSelVendor] = useState('');
    const [ErrSelVendor, SetErrSelVendor] = useState('');

    const [ErrSelStatus, SetErrSelStatus] = useState('');

    const [InputTanggalKembali, setInputTanggalKembali] = useState(null);

    const [ListAsset, SetListAsset] = useState([]);
    const [SelAsset, SetSelAsset] = useState('');

    const [InputNoSuratJalan, SetInputNoSuratJalan] = useState('');
    const [InputNoBL, SetInputNoBL] = useState('');
    const [InputNoContainer, SetInputNoContainer] = useState('');


    const i18n = useTranslation('translations');
    const dispatch = useDispatch();
    momentLocalizer();

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
      });

      const DialogTitle = withStyles(styles)((props) => {
        const {children, classes, onClose, ...other} = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
      });

      useEffect(() => {
        props.flagloadingsend(true);
        // if(props.liststatus){
            dispatch(actions.getSuratJalanData('/penandaansuratjalantemplate',successHandlerTemplate, props.errorhandler));
            
        // }
    }, []);
    const successHandlerTemplate = (data) =>{
        SetListStatus(data.data.statusSJOptions.reduce((obj, el) => (
            [...obj, {
                value: el.code,
                label: el.codename
            }]
        ), []));

        SetListKepemilikanMobil(data.data.kepimilikanMobilOptions.reduce((obj, el) => (
            [...obj, {
                value: el.code,
                label: el.codename
            }]
        ), []));

        SetListChooseYesNo(data.data.chooseYesNoOptions.reduce((obj, el) => (
            [...obj, {
                value: el.code,
                label: el.codename
            }]
        ), []));

        SetListSupir(data.data.supirOptions.reduce((obj, el) => (
            [...obj, {
                value: el.id,
                label: el.nama
            }]
        ), []));
        
        //vendorcategoryname
        let listvendor = data.data.vendorOptions.filter(output => new String(output.vendorcategoryname).toLowerCase() == 'trucking' || new String(output.vendorcategoryname).toLowerCase() == 'ppjk');
        SetListVendor(listvendor.reduce((obj, el) => (
            [...obj, {
                value: el.id,
                label: el.nama
            }]
        ), []));

        SetListAsset(data.data.assetOptions.reduce((obj, el) => (
            [...obj, {
                value: el.id,
                label: el.kepala_nama+'('+el.kodeasset+')'
            }]
        ), []));

        SetSelAsset(props.detail.idasset != 0?props.detail.idasset:'');
        SetSelStatus(props.status);
        SetInputNoSuratJalan(props.detail?.nodocument?props.detail.nodocument:'');
        SetInputNoBL(props.detail?.noblWO?props.detail.noblWO:'');
        SetInputNoContainer(props.detail?.nocantainer?props.detail.nocantainer:'');

        SetSelKepemilikanMobil(props.detail?.kepemilikanmobil?props.detail.kepemilikanmobil:'');
        SetSelSupir(props.detail?.idemployee_supir?(props.detail.idemployee_supir == 0?'':props.detail.idemployee_supir):'');
        SetSelIsLembur(props.detail?.lembur?props.detail.lembur:'');
        SetSelVendor(props.detail?.idvendormobil? (props.detail.idvendormobil == 0?'':props.detail.idvendormobil):'')
        setInputTanggalKembali(props.detail?.tanggalkembali?moment(new Date(props.detail.tanggalkembali), formatdate).toDate():null);
        props.flagloadingsend(false);
    }

    const handleChangeAsset = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelAsset(id);
    }

    const handleChangeStatus = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelStatus(id);
    }

    const handleChangeKepimilikanMobil = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelKepemilikanMobil(id);
    }

    const handleChangeLembur = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelIsLembur(id);
    }

    const handleChangeSupir = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelSupir(id);
    }

    const handleChangeVendor = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelVendor(id);
    }

    function submitTrans(){
        let flag = true;
        if(SelKepemilikanMobil == 'MOBILSENDIRI' ){
            if(SelSupir == ''){
                flag = false;
            }
        }else if(SelKepemilikanMobil == 'MOBILLUAR' ){
            if(SelVendor == ''){
                flag = false;
            }
        }
        if(SelStatus !== '' && SelKepemilikanMobil !== '' && flag){
            props.flagloadingsend(true);
            var obj = new Object();
            obj.status = SelStatus;
            obj.kepemilikanmobil = SelKepemilikanMobil;
            if(SelKepemilikanMobil == 'MOBILSENDIRI' ){
                obj.idvendormobil = 0;
                obj.idemployee_supir = SelSupir;
                obj.idasset = SelAsset;
            }else if(SelKepemilikanMobil == 'MOBILLUAR' ){
                obj.idvendormobil = SelVendor;
                obj.idemployee_supir = 0;
                obj.idasset = 0;
            }
            
            obj.lembur = SelIsLembur;
            if(InputTanggalKembali != null && InputTanggalKembali != undefined && InputTanggalKembali != ''){
                obj.tanggalkembali = moment(InputTanggalKembali).toDate().getTime();
            }else{
                obj.tanggalkembali = null;
            }
            dispatch(actions.submitAddSuratJalan('/status/'+props.idsuratjalan,obj,props.handlesubmit, props.errorhandler));
        }
    }

    const handleChangeInputTanggalkembali = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if(data !== null){
            setInputTanggalKembali(moment(data, formatdate).toDate())
        }else{
            setInputTanggalKembali(null)
        }
        
    }


    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Penandaan Surat Jalan')}
            </DialogTitle>
            <DialogContent dividers style={{height:"360px"}}>
            {/* <DialogContent dividers > */}
            <div className="row mt-2">
            <div className="mt-2 col-lg-6 ft-detail mb-5">

            <label className="mt-3 form-label required" htmlFor="InputNoSuratJalan">
                {i18n.t('No. Surat Jalan')}
            </label>
            <Input
                name="InputNoSuratJalan"
                type="text"
                id="InputNoSuratJalan"
                maxLength={200}
                disabled={true}
                value={InputNoSuratJalan}
            />

            <label className="mt-3 form-label required" htmlFor="InputNoBL">
                {i18n.t('No. BL')}
            </label>
            <Input
                name="InputNoBL"
                type="text"
                id="InputNoBL"
                maxLength={200}
                disabled={true}
                value={InputNoBL}
            />

            <label className="mt-3 form-label required" htmlFor="InputNoContainer">
                {i18n.t('No. Container')}
            </label>
            <Input
                name="InputNoContainer"
                type="text"
                id="InputNoContainer"
                maxLength={200}
                disabled={true}
                value={InputNoContainer}
            />

            

            <label className="mt-3 form-label required" htmlFor="SelKepemilikanMobil">
                {i18n.t('Kepemilikan Mobil')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelKepemilikanMobil"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeKepimilikanMobil(val)}
                data={ListKepemilikanMobil}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelKepemilikanMobil}
            />
            </div>

            <div className="mt-2 col-lg-6 ft-detail mb-5">
            <label className="mt-3 form-label required" htmlFor="Status">
                {i18n.t('Status')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="workorder"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeStatus(val)}
                data={ListStatus}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelStatus}
            />
            <div hidden={SelKepemilikanMobil == 'MOBILLUAR' || SelKepemilikanMobil == ''}>
            
            <label className="mt-3 form-label required" htmlFor="SelAsset">
                {i18n.t('Asset')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelAsset"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeAsset(val)}
                data={ListAsset}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelAsset}
            />

            <label className="mt-3 form-label required" htmlFor="SelSupir">
                {i18n.t('Supir')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelSupir"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeSupir(val)}
                data={ListSupir}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelSupir}
            />

            
            </div>

            <div hidden={SelKepemilikanMobil == 'MOBILSENDIRI' || SelKepemilikanMobil == ''}>
            <label className="mt-3 form-label required" htmlFor="SelVendor">
                {i18n.t('Vendor')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelVendor"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeVendor(val)}
                data={ListVendor}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelVendor}
            />
            </div>

            <label className="mt-3 form-label required" htmlFor="SelIsLembur">
                {i18n.t('Lembur ?')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelIsLembur"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeLembur(val)}
                data={ListChooseYesNo}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelIsLembur}
            />

        <label className="mt-3 form-label required" htmlFor="InputTanggalKembali">
            {i18n.t('Tanggal Loading/Unloading')}
        </label>
        <DatePicker
                name="InputTanggalKembali"
                // onChange={(val) => {
                //         setFieldValue("startdate", val);
                //     }
                // }
                onChange={val => handleChangeInputTanggalkembali(val)}
                // defaultValue={Date(moment([]))}
                format={formatdate}
                value={InputTanggalKembali}
                                
        />

            </div>
            
            
            

            
            </div>


            

            
            </DialogContent>

            <DialogActions>
            <Button autoFocus 
                onClick={() => props.showflag(false)} 
                >
                    Cancel
                </Button>
                <Button color="primary" 
                    onClick={() => submitTrans()}
                >
                    Submit
                </Button>
            </DialogActions>
        </div>

    )
};
export default DialogStatus;
