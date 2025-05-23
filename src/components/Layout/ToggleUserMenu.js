import React, {useState, useRef, useEffect} from 'react';
import {makeStyles}               from '@material-ui/core/styles';
import Button                     from '@material-ui/core/Button';
import ClickAwayListener          from '@material-ui/core/ClickAwayListener';
import Grow                       from '@material-ui/core/Grow';
import Paper                      from '@material-ui/core/Paper';
import Popper                     from '@material-ui/core/Popper';
import MenuItem                   from '@material-ui/core/MenuItem';
import MenuList                   from '@material-ui/core/MenuList';
import {useSelector, useDispatch} from 'react-redux';
import { withRouter ,useHistory } from 'react-router-dom';
import KeyIcon                    from '@material-ui/icons/VpnKey';
import LogoutIcon                 from '@material-ui/icons/MeetingRoom';
import ChangePassworddDialog from './ChangePasswordDialog';
import Dialog                       from '@material-ui/core/Dialog';
import styled                       from "styled-components";
import * as actions                 from '../../store/actions';
import {Loading}                    from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import { isGetPermissions } from '../../containers/shared/globalFunc';
import { changePasswordInternalUser_user_Permission } from '../../containers/shared/permissionMenu';

const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    button: {
        color: 'white',
        textTransform: 'none',
        marginRight:theme.spacing(2),
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    svgIcon: {
        marginRight: '10px',
    }
}));


function MenuListComposition(props) {
    const classes = useStyles();
    const history = useHistory();
    const [changepassword, setShowChangePassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const anchorRef = useRef(null);
    const dispatch = useDispatch();
    // const username = 'hahaha';
    const username = useSelector(state => state.auth.username);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
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

    const handleChangePassword = (event) => {
        setShowChangePassword(true);
        // dispatch(actions.createChangePasswordUserWebOTP(successHandler,errorHandler));
        
    };

    const successHandlerConfirmPW = (data) =>{
        setShowChangePassword(false);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Sukses'
        }).then(res => {            
            // window.location.reload(true);
            history.push('/');
        });
        setLoading(false);
    }

    function handleLogout() {
        history.push('/');
        // deleteSessionAndLocalStorage();
        // dispatch(actions.logoutUser(succesHandlerSubmit, errorHandler));
    }
    // function succesHandlerSubmit() {
    //     history.push('/');
    // }
    // function errorHandler() {
    //     history.push('/');
    // }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
    }, []);

    const errorHandler = (data) => {
        setLoading(false);
        setShowChangePassword(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data
        })
      }
    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                Hi, {username}
            </Button>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {/* <MenuItem onClick={handleShowUserProfile} hidden={isGetPermissions(viewUserProfile,'TRANSACTION')} ><FaceIcon
                                        className={classes.svgIcon}/>{i18n.t('label_PROFILE')}</MenuItem>
                                    <MenuItem onClick={handleChangePassword} hidden={isGetPermissions(changePasswordUser,'TRANSACTION')}><KeyIcon className={classes.svgIcon}/>
                                    {i18n.t('label_CHANGE_PASSWORD')}</MenuItem> */}
                                    {/* <MenuItem onClick={handleShowUserProfile} hidden={isGetPortalMenuPermission(Portal_Header,[])} ><FaceIcon
                                        className={classes.svgIcon}/>{i18n.t('label_PROFILE')}</MenuItem>
                                    <MenuItem onClick={handleChangePassword} hidden={isGetPortalMenuPermission(Portal_Header,[])}><KeyIcon className={classes.svgIcon}/>
                                    {i18n.t('label_CHANGE_PASSWORD')}</MenuItem>
                                    <MenuItem onClick={handleLogout}><LogoutIcon
                                        className={classes.svgIcon}/>{i18n.t('label_LOGOUT')}</MenuItem> */}
                                        <MenuItem onClick={handleChangePassword} hidden={!isGetPermissions(changePasswordInternalUser_user_Permission,'TRANSACTION')} ><KeyIcon className={classes.svgIcon}/>
                                        {'Ubah Password'}</MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                        <LogoutIcon
                                        className={classes.svgIcon}/>{'Logout'}</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        
                    </Grow>
                )}
                
            </Popper>

            <StyledDialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                style={{height: '80vh'}}
                open={changepassword}
                >
                <ChangePassworddDialog
                    showflag = {setShowChangePassword}
                    errorHandler = {errorHandler}
                    successHandlerConfirmPW = {successHandlerConfirmPW}
                    setloading = {setLoading}
                />
                {loading && <Loading/>}
            </StyledDialog>

        </div>


    )
}
export default withRouter(MenuListComposition);