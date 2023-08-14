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
    const [ListUangLolo, SetListUangLolo] = useState([]);
    const [SelUangLolo, SetSelUangLolo] = useState('');
    const [IdUangLolo, SetIdUangLolo] = useState('');
    const [ErrSelUangLolo, SetErrSelUangLolo] = useState('');

    const [ListUangRepair, SetListUangRepair] = useState([]);
    const [SelUangRepair, SetSelUangRepair] = useState('');
    const [IdUangRepair, SetIdUangRepair] = useState('');
    const [ErrSelUangRepair, SetErrSelUangRepair] = useState('');

    // const [ListMapping, SetListMapping] = useState([]);
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
            dispatch(actions.getInvoiceTypeData('/listmapping',successHandlerTemplate, props.errorhandler));
            
        // }
    }, []);

    const successHandlerTemplate = (data) =>{
        let det = data.data;
        let detuanglolo = det.filter(output => output.mappingcode == 'UANGLOLO');
        let detuangrepair = det.filter(output => output.mappingcode == 'UANGREPAIR');
        if(detuanglolo.length > 0){
            let idmaster = detuanglolo[0].idmaster?detuanglolo[0].idmaster:'';
            let id = detuanglolo[0].id?detuanglolo[0].id:'';
            SetSelUangLolo(idmaster);
            SetIdUangLolo(id);

        }

        if(detuangrepair.length > 0){
            let idmaster = detuangrepair[0].idmaster?detuangrepair[0].idmaster:'';
            let id = detuangrepair[0].id?detuangrepair[0].id:'';
            SetSelUangRepair(idmaster);
            SetIdUangRepair(id);
        }

        if(props.invoiceitemsdata){
            let listreimbursement = props.invoiceitemsdata.filter(output => output.invoicetype == 'REIMBURSEMENT');
            SetListUangLolo(listreimbursement.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            SetListUangRepair(listreimbursement.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        

        props.flagloadingsend(false);
    }

    const handleChangeUangLOLO = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUangLolo(id);
    }

    const handleChangeUangRepair = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelUangRepair(id);
    }

    function submitTrans(){
        SetErrSelUangLolo('');
        SetErrSelUangRepair('');
        let flag = true;
        if(SelUangLolo !== '' && SelUangRepair !== ''){
            if(SelUangLolo == SelUangRepair){
                SetErrSelUangLolo(i18n.t('Tidak Boleh Sama'));
                SetErrSelUangRepair(i18n.t('Tidak Boleh Sama'));
                flag = false;
            }
        }

        if(flag){
            props.flagloadingsend(true);
            let list = [];
            let objlolo = new Object();
            objlolo.id = IdUangLolo;
            objlolo.idmaster = SelUangLolo !== ''?SelUangLolo:null;
            list.push(objlolo);

            let objrepair = new Object();
            objrepair.id = IdUangRepair;
            objrepair.idmaster = SelUangRepair !== ''?SelUangRepair:null;
            list.push(objrepair);

            let obj = new Object();
            obj.mappings = list;
            dispatch(actions.submitAddInvoiceType('/mapping',obj,props.handlesubmit, props.errorhandler));
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
            <label className="mt-3 form-label required" htmlFor="uanglolo">
                {i18n.t('Uang Lolo')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="uanglolo"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangLOLO(val)}
                data={ListUangLolo}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelUangLolo}
            />
            <div className="invalid-feedback-custom">{ErrSelUangLolo}</div>
            
            <label className="mt-3 form-label required" htmlFor="uangrepair">
                {i18n.t('Uang Repair/Demurrage')}
            </label>

            <DropdownList
                // className={
                //     touched.branch && errors.branch
                //         ? "input-error" : ""
                // }
                name="uangrepair"
                filter='contains'
                placeholder={i18n.t('select.SELECT_OPTION')}
                
                onChange={val => handleChangeUangRepair(val)}
                data={ListUangRepair}
                textField={'label'}
                valueField={'value'}
                // style={{width: '25%'}}
                // disabled={values.isdisabledcountry}
                value={SelUangRepair}
            />
            <div className="invalid-feedback-custom">{ErrSelUangRepair}</div>

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
export default DialogMapping;