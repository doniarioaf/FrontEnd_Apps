import React, {useEffect,useState} from 'react';
import {useDispatch}                from 'react-redux';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import {useTranslation}             from 'react-i18next';
import {
    Button,Input
}                                   from 'reactstrap';
import * as actions     from '../../store/actions';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Loading}                    from '../../components/Common/Loading';
import { getInfoLogin } from '../../containers/shared/processInfoLogin';


const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;



const ChangePassworddDialog = props => {
    const dispatch = useDispatch();
    const i18n = useTranslation('translations');
    const [oldpw, setOldPW] = useState('');
    const [newpw, setNewPW] = useState('');
    const [repeatnewpw, setRepeatNewPW] = useState('');
    const [ErrInputPassword, setErrInputPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const info = getInfoLogin();
    

    useEffect(() => {
        // setTimeout(function(){ console.log('')}, 1000);
        
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
      const handleChangeOldPW = (data) => {
        setOldPW(data.target.value);
      }
      const handleChangePW = (data) => {
        setNewPW(data.target.value);
      }
      const handleChangeRepeatPW = (data) => {
        setRepeatNewPW(data.target.value);
      }
      
      function confirmChangePW(){
        let flag = true;
        setErrInputPassword('');
        if(newpw == ''){
            setErrInputPassword(i18n.t('Tidak Boleh Kosong'));
            flag = false;
        }else if(newpw !== repeatnewpw){
            setErrInputPassword(i18n.t('Password Tidak Sama'));
            flag = false;
        }
        if(flag){
            
            let obj = new Object();
            obj.username = info.username;
            obj.password = oldpw;
            obj.passwordchange = newpw;
            dispatch(actions.submitEditUserApps('/changepassworduser/'+info.iduser,obj,props.successHandlerConfirmPW, props.errorHandler));
            // dispatch(actions.confirmChangePasswordUserWebOTP(jsonString,props.successHandlerConfirmPW,props.errorHandler));
        }
        
      }
      
      return (
          
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Ubah Password')}
            </DialogTitle>
            <DialogContent dividers>
                <div>
                <label className="mt-3 form-label required" htmlFor="oldpassword">
                    {i18n.t('Password Lama')}
                </label>
                <Input
                    name="oldpassword"
                    className={
                        "input-font-size"
                        // touched.username && errors.username
                        //     ? "input-font-size input-error"
                        //     : "input-font-size"
                    }
                    type="password"
                    id="oldpassword"
                    onChange={val => handleChangeOldPW(val)}
                    disabled={false}
                    // onBlur={handleBlur}
                    placeholder={''}
                    // value={''}
                    
                />
                <label className="mt-3 form-label required" htmlFor="newpassword">
                    {i18n.t('Password Baru')}
                </label>
                <Input
                    name="newpassword"
                    className={
                        "input-font-size"
                        // touched.username && errors.username
                        //     ? "input-font-size input-error"
                        //     : "input-font-size"
                    }
                    type="password"
                    id="newpassword"
                    onChange={val => handleChangePW(val)}
                    disabled={false}
                    // onBlur={handleBlur}
                    placeholder={''}
                    // value={''}
                    
                />
                <label className="mt-3 form-label required" htmlFor="newrepeatpassword">
                    {i18n.t('Ulangi Password')}
                </label>
                <Input
                    name="newrepeatpassword"
                    className={
                        "input-font-size"
                        // touched.username && errors.username
                        //     ? "input-font-size input-error"
                        //     : "input-font-size"
                    }
                    type="password"
                    id="newrepeatpassword"
                    onChange={val => handleChangeRepeatPW(val)}
                    disabled={false}
                    // onBlur={handleBlur}
                    placeholder={''}
                    // value={''}
                    
                >
                </Input>
                <div className="invalid-feedback-custom">{ErrInputPassword}</div>
                
                </div>
                {loading && <Loading/>}
            </DialogContent>
            <DialogActions>
            <Button autoFocus 
            onClick={() => props.showflag(false)} 
            color="red">
                Cancel
            </Button>
            <Button color="primary" 
              onClick={() => confirmChangePW()}
            >
                Submit
            </Button>
            </DialogActions>
        </div>
      )
};
export default ChangePassworddDialog;