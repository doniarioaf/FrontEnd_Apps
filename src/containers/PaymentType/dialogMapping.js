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
import {Button}                                   from 'reactstrap';
import "react-widgets/dist/css/react-widgets.css";

const DialogMapping = props => {
    const [ListUangJalan, SetListUangJalan] = useState([]);
    const [SelUangJalan, SetSelUangJalan] = useState('');
    const [ErrSelUangJalan, SetErrSelUangJalan] = useState('');
    const [IdUangJalan, SetIdUangJalan] = useState('');

    const [ListUangBongkar, SetListUangBongkar] = useState([]);
    const [SelUangBongkar, SetSelUangBongkar] = useState('');
    const [ErrSelUangBongkar, SetErrSelUangBongkar] = useState('');
    const [IdUangBongkar, SetIdUangBongkar] = useState('');

    const [ListUangKawalan, SetListUangKawalan] = useState([]);
    const [SelUangKawalan, SetSelUangKawalan] = useState('');
    const [ErrSelUangKawalan, SetErrSelUangKawalan] = useState('');
    const [IdUangKawalan, SetIdUangKawalan] = useState('');

    const [ListLainLain, SetListLainLain] = useState([]);
    const [SelLainLain, SetSelLainLain] = useState('');
    const [IdLainLain, SetIdLainLain] = useState('');

    const i18n = useTranslation('translations');
    const dispatch = useDispatch();

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
            dispatch(actions.getPaymentTypeData('/listmapping',successHandlerTemplate, props.errorhandler));
            
        // }
    }, []);


    const successHandlerTemplate = (data) =>{
        let det = data.data;
        let detuangjalan = det.filter(output => output.mappingcode == 'UANGJALAN');
        let detuangbongkarmuat = det.filter(output => output.mappingcode == 'UANGBONGKARMUAT');
        let detuangkawalan = det.filter(output => output.mappingcode == 'UANGKAWALAN');
        let detuanglainlain = det.filter(output => output.mappingcode == 'UANGLAINLAIN');

        if(detuangjalan.length > 0){
            let idmaster = detuangjalan[0].idmaster?detuangjalan[0].idmaster:'';
            let id = detuangjalan[0].id?detuangjalan[0].id:'';
            SetSelUangJalan(idmaster);
            SetIdUangJalan(id);
        }

        if(detuangbongkarmuat.length > 0){
            let idmaster = detuangbongkarmuat[0].idmaster?detuangbongkarmuat[0].idmaster:'';
            let id = detuangbongkarmuat[0].id?detuangbongkarmuat[0].id:'';
            SetSelUangBongkar(idmaster);
            SetIdUangBongkar(id);
        }

        if(detuangkawalan.length > 0){
            let idmaster = detuangkawalan[0].idmaster?detuangkawalan[0].idmaster:'';
            let id = detuangkawalan[0].id?detuangkawalan[0].id:'';
            SetSelUangKawalan(idmaster);
            SetIdUangKawalan(id);
        }

        if(detuanglainlain.length > 0){
            let idmaster = detuanglainlain[0].idmaster?detuanglainlain[0].idmaster:'';
            let id = detuanglainlain[0].id?detuanglainlain[0].id:'';
            SetSelLainLain(idmaster);
            SetIdLainLain(id);
        }

        if(props.itemsdata){
            // let listBiayaOperasional = props.itemsdata.filter(output => output.paymenttype == 'OPTIONS_PAYMENTITEM_TYPE_2');
            // let listLainLain = props.itemsdata.filter(output => output.paymenttype == 'OPTIONS_PAYMENTITEM_TYPE_4');
            let listBiayaOperasional = props.itemsdata.filter(output => output.paymenttype == 'OPTIONS_PAYMENTITEM_TYPE_1');
            let listLainLain = props.itemsdata.filter(output => output.paymenttype == 'OPTIONS_PAYMENTITEM_TYPE_1');
            SetListUangJalan(listBiayaOperasional.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            SetListUangBongkar(listBiayaOperasional.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            SetListUangKawalan(listBiayaOperasional.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            SetListLainLain(listLainLain.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }

        props.flagloadingsend(false);
    }
    

    const handleChangeUangJalan = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUangJalan(id);
    }

    const handleChangeUangBongkar = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUangBongkar(id);
    }

    const handleChangeUangKawalan = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUangKawalan(id);
    }

    const handleChangeUangLainLain = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelLainLain(id);
    }


    function submitTrans(){
        SetErrSelUangJalan('');
        SetErrSelUangBongkar('');
        SetErrSelUangKawalan('');
        let flag = true;
        let listtemp = [];
        if(SelUangJalan !== ''){
            listtemp.push(SelUangJalan);
        }
        if(SelUangBongkar !== ''){
            if(listtemp.indexOf(SelUangBongkar) > -1){
                SetErrSelUangJalan(i18n.t('Tidak Boleh Sama'));
                SetErrSelUangBongkar(i18n.t('Tidak Boleh Sama'));
                SetErrSelUangKawalan(i18n.t('Tidak Boleh Sama'));
                flag = false;
            }else{
                listtemp.push(SelUangBongkar);
            }   
        }

        if(SelUangKawalan !== ''){
            if(listtemp.indexOf(SelUangKawalan) > -1){
                SetErrSelUangJalan(i18n.t('Tidak Boleh Sama'));
                SetErrSelUangBongkar(i18n.t('Tidak Boleh Sama'));
                SetErrSelUangKawalan(i18n.t('Tidak Boleh Sama'));
                flag = false;
            }else{
                listtemp.push(SelUangKawalan);
            }
        }

        if(flag){
            props.flagloadingsend(true);
            let list = [];
            let objuangjalan = new Object();
            objuangjalan.id = IdUangJalan;
            objuangjalan.idmaster = SelUangJalan !== ''?SelUangJalan:null;
            list.push(objuangjalan);

            let objuangBongkar = new Object();
            objuangBongkar.id = IdUangBongkar;
            objuangBongkar.idmaster = SelUangBongkar !== ''?SelUangBongkar:null;
            list.push(objuangBongkar);

            let objuangKawalan = new Object();
            objuangKawalan.id = IdUangKawalan;
            objuangKawalan.idmaster = SelUangKawalan !== ''?SelUangKawalan:null;
            list.push(objuangKawalan);

            let objuangLainLain = new Object();
            objuangLainLain.id = IdLainLain;
            objuangLainLain.idmaster = SelLainLain !== ''?SelLainLain:null;
            list.push(objuangLainLain);

            let obj = new Object();
            obj.mappings = list;

            dispatch(actions.submitAddPaymentType('/mapping',obj,props.handlesubmit, props.errorhandler));
        }
    }

    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Mapping')}
            </DialogTitle>

            <DialogContent dividers style={{height:"360px"}}>
            <div className="row mt-2">
            <div className="mt-2 col-lg-6 ft-detail mb-5">
            <label className="mt-3 form-label required" htmlFor="SelUangJalan">
                {i18n.t('Uang Jalan')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelUangJalan"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangJalan(val)}
                data={ListUangJalan}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelUangJalan}
            />
            <div className="invalid-feedback-custom">{ErrSelUangJalan}</div>

            <label className="mt-3 form-label required" htmlFor="SelUangBongkar">
                {i18n.t('Uang Bongkar/Muat')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelUangBongkar"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangBongkar(val)}
                data={ListUangBongkar}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelUangBongkar}
            />
            <div className="invalid-feedback-custom">{ErrSelUangBongkar}</div>

            

            </div>

            <div className="mt-2 col-lg-6 ft-detail mb-5">
            <label className="mt-3 form-label required" htmlFor="SelUangKawalan">
                {i18n.t('Uang Kawalan')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelUangKawalan"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangKawalan(val)}
                data={ListUangKawalan}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelUangKawalan}
            />
            <div className="invalid-feedback-custom">{ErrSelUangKawalan}</div>

            <label className="mt-3 form-label required" htmlFor="SelLainLain">
                {i18n.t('Lain-Lain')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelLainLain"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangLainLain(val)}
                data={ListLainLain}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelLainLain}
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
}
export default DialogMapping;