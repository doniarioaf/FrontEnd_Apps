import React, {useEffect,useState} from 'react';
import {useDispatch}                from 'react-redux';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import {DropdownList}      from 'react-widgets';
import * as actions                 from '../../store/actions';
import {useTranslation}             from 'react-i18next';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Button,Input,FormGroup,Label}                                   from 'reactstrap';
import "react-widgets/dist/css/react-widgets.css";

const DialogStatus = props => {
    const [ListStatus, SetListStatus] = useState([]);
    const [SelStatus, SetSelStatus] = useState('');
    const [ErrSelStatus, SetErrSelStatus] = useState('');
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
            dispatch(actions.getSuratJalanData('/template',successHandlerTemplate, props.errorhandler));
            
        // }
    }, []);
    const successHandlerTemplate = (data) =>{
        SetListStatus(data.data.statusSJOptions.reduce((obj, el) => (
            [...obj, {
                value: el.code,
                label: el.codename
            }]
        ), []));
        SetSelStatus(props.status);
        props.flagloadingsend(false);
    }
    const handleChangeStatus = (data) =>{
        let id = data?.value ? data.value : '';
        SetSelStatus(id);
    }

    function submitTrans(){
        if(SelStatus !== ''){
            props.flagloadingsend(true);
            var obj = new Object();
            obj.status = SelStatus;
            dispatch(actions.submitAddSuratJalan('/status/'+props.idsuratjalan,obj,props.handlesubmit, props.errorhandler));
        }
    }

    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Change Status')}
            </DialogTitle>
            <DialogContent dividers style={{height:"260px"}}>
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
