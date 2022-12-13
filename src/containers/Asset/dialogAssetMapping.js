import React, {useState,useEffect} from 'react';
import {useDispatch}                from 'react-redux';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import * as actions                 from '../../store/actions';
import {useTranslation}             from 'react-i18next';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Button}                                   from 'reactstrap';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

const DialogAssetMapping = props => {
    const i18n = useTranslation('translations');
    const dispatch = useDispatch();

    const [ListJenisMapping, setListJenisMapping] = useState([]);
    const [SelJenisMapping, setSelJenisMapping] = useState('');
    const [ErrSelJenisMapping, setErrSelJenisMapping] = useState('');
    const [IDassetMapping, setIDassetMapping] = useState('');

    const [ListAsset, setListAsset] = useState([]);
    const [SelAsset, setSelAsset] = useState('');
    const [ErrSelAsset, setErrSelAsset] = useState('');

    useEffect(() => {
        let jenisasset = props.jenisasset;
        let listJenisMapping = [];
        if(jenisasset == 'KEPALA'){
            listJenisMapping = [{value:'ARMADA',label:'Armada'},{value:'SPAREPART',label:'Sparepart'}];
        }else if(jenisasset == 'BUNTUT'){
            listJenisMapping = [{value:'SPAREPART',label:'Sparepart'}];
        }
        setListJenisMapping(listJenisMapping);
    }, []);

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

    const handleChangeJenisMapping = (data) =>{
        let id = data?.value ? data.value : '';
        setSelJenisMapping(id);
        setSelAsset('');
        setIDassetMapping('');
        let listmapping = props.listassetmapping?props.listassetmapping:[];
        if(id == 'ARMADA'){
            let listfilteroutput = listmapping.filter(output => output.type == id);
            if(listfilteroutput.length > 0){
                let idassetmapping = listfilteroutput[0].id;
                let idmasterasset = listfilteroutput[0].idasset_mapping;
                setIDassetMapping(idassetmapping);
                setSelAsset(idmasterasset)
            }
        }

        props.loadingsend(true);
        let idasset = props.idasset;
        let jenisasset = props.jenisasset; 
        let jenis = '';
        if(jenisasset == 'KEPALA'){
            if(id == 'ARMADA'){
                jenis = 'BUNTUT';
            }else if(id == 'SPAREPART'){
                jenis = 'SP_KEPALA';
            }
            
        }else if(jenisasset == 'BUNTUT'){
            if(id == 'SPAREPART'){
                jenis = 'SP_BUNTUT';
            }
        }
        dispatch(actions.getAssetData('/listmapping/'+idasset+'/'+jenis,successHandler, props.errorHandler));
    }

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
        return '';
    }

    const successHandler = (data) =>{
        setListAsset([]);
        let list = [{value:'',label:'Kosong'}];
        if(data.data){
            for(let i=0; i < data.data.length; i++){
                let det = data.data[i];
                let objData = {value:det.id,label:getNama(det) + '('+det.kodeasset+')'}
                list.push(objData);
            }
        }
        setListAsset(list);
        props.loadingsend(false);
    }

    const handleChangeAsset = (data) =>{
        let id = data?.value ? data.value : '';
        setSelAsset(id);
        
    }

    function submitTrans(){
        let flag = true;
        if(SelJenisMapping == ''){
            setErrSelJenisMapping(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelAsset == '' && SelJenisMapping !== 'ARMADA'){
            setErrSelAsset(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(flag){
            let idasset = props.idasset;
            props.loadingsend(true);
            let obj = new Object();
            obj.id = IDassetMapping !== ''?IDassetMapping:null;
            obj.idasset = idasset;
            obj.idasset_mapping = SelAsset !== ''?SelAsset:0;
            obj.type = SelJenisMapping;
            dispatch(actions.submitAddAsset('/createassetmapping',obj,props.handlesubmit, props.errorHandler));
        }
    }

    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {'Mapping Asset'}
            </DialogTitle>

            <DialogContent dividers style={{height:"260px"}}>
            <label className="mt-3 form-label required" htmlFor="SelJenisMapping">
                {i18n.t('Jenis Mapping')}
                <span style={{color:'red'}}>*</span>
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="SelJenisMapping"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeJenisMapping(val)}
                // onBlur={val => setFieldTouched("jenisasset", val?.value ? val.value : '')}
                data={ListJenisMapping}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelJenisMapping}
            />
            <div className="invalid-feedback-custom">{ErrSelJenisMapping}</div>

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
                // onBlur={val => setFieldTouched("jenisasset", val?.value ? val.value : '')}
                data={ListAsset}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelAsset}
            />
            <div className="invalid-feedback-custom">{ErrSelAsset}</div>

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
export default DialogAssetMapping;