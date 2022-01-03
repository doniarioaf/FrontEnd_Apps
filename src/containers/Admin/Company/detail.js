import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../components/Layout/ContentWrapper';
  import {
  Container, Card, CardBody
  , Button, CardHeader
  }                                   from 'reactstrap';
  import {useHistory}                 from 'react-router-dom';
  import {useTranslation}             from 'react-i18next';
  import Swal             from "sweetalert2";
  import {useDispatch}    from 'react-redux';
  import * as actions     from '../../../store/actions';
  import Skeleton         from 'react-loading-skeleton';
  import styled                       from "styled-components";
  import Dialog                       from '@material-ui/core/Dialog';
  import * as pathmenu           from '../../shared/pathMenu';
  import ButtonMUI from '@material-ui/core/Button';
  import ClickAwayListener from '@material-ui/core/ClickAwayListener';
  import Grow from '@material-ui/core/Grow';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import MenuItem from '@material-ui/core/MenuItem';
  import MenuList from '@material-ui/core/MenuList';
  import { makeStyles } from '@material-ui/core/styles';
  import moment                       from "moment/moment";
  import {Loading}                    from '../../../components/Common/Loading';
  import Grid                         from './gridBranch';
  import { reloadToHomeNotAuthorize,isGetPermissions } from '../../shared/globalFunc';
  import { MenuCompany,editCompany_Permission,deleteCompany_Permission } from '../../shared/permissionMenu';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuCompany,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);
    
    const [RowsBranch, setRowsBranch] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'contactnumber', title: i18n.t('label_CONTACT_NUMBER')},
        {name: 'displayname', title: i18n.t('label_DISPLAY_NAME')},
        {name: 'email', title: i18n.t('Email')},
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');

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
        dispatch(actions.getCompanyData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
          setLoading(false);
          if(data.data){
            if(data.data.company){
                setValue(data.data.company);
            }
            if(data.data.listbranches){
                let listbranch = data.data.listbranches;
                setRowsBranch(listbranch.reduce((obj, el) => (
                    [...obj, {
                        id: el.id,
                        name: el.nama,
                        contactnumber: el.contactnumber,
                        displayname: el.displayname,
                        email: el.email
                    }]
                ), []));
            }
          }
    }

    const submitHandlerActivated = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(actions.submitPostCompany('/activated/'+id,'',succesHandlerSubmit, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const submitHandlerUnActivated = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(actions.submitPostCompany('/unactivated/'+id,'',succesHandlerSubmit, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
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
                dispatch(actions.submitDeleteCompany(id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menucompany);
            }
        })
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
            <span>{i18n.t('Company')}</span>
            </div>

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
                            value.name :
                            <Skeleton style={{maxWidth: 300}}/>
                    }
                </h2>
            </div>

            <div className="row mt-2">
            <div className="mt-2 col-lg-4 ft-detail mb-3">
            <Card outline color="primary" className="mb-3" style={{width:"125%"}}>
            <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Details'}</CardHeader>
            <CardBody>
                {
                    loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                    (
                        <section>
                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NAME')}</span>
                                <strong className="col-md-7">
                                {value.nama?value.nama:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DISPLAY_NAME')}</span>
                                <strong className="col-md-7">
                                {value.displayname?value.displayname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CODE')}</span>
                                <strong className="col-md-7">
                                {value.code?value.code:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CONTACT_NUMBER')}</span>
                                <strong className="col-md-7">
                                {value.contactnumber?value.contactnumber:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Email')}</span>
                                <strong className="col-md-7">
                                {value.email?value.email:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')}</span>
                                <strong className="col-md-7">
                                {value.address?value.address:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_IS_ACTIVE')}</span>
                                <strong className="col-md-7">
                                {value.isactive?value.isactive == true?'Yes':'No':'No'}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CREATED')}</span>
                                <strong className="col-md-7">
                                {value.created?moment (new Date(value.created)).format('DD MMMM YYYY'):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_MODIFIED')}</span>
                                <strong className="col-md-7">
                                {value.created?moment (new Date(value.modified)).format('DD MMMM YYYY'):''}
                                </strong>
                            </div>
                        </section>
                    )
                }
            </CardBody>
            </Card>
            </div>
            </div>
            </CardBody>
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
                            <MenuItem hidden={!isGetPermissions(editCompany_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editcompany+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            {/* <MenuItem hidden={value.isactive?value.isactive == true?true:false:true}  onClick={() => submitHandlerActivated()}>{i18n.t('Activated')}</MenuItem>
                            <MenuItem hidden={value.isactive?value.isactive == true?false:true:true}  onClick={() => submitHandlerUnActivated()}>{i18n.t('UnActivated')}</MenuItem> */}
                            <MenuItem hidden={!isGetPermissions(deleteCompany_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            {/* <MenuItem hidden={isGetPermissions(DeleteInternalUser_Permission,'TRANSACTION')}  onClick={() => isDeleteAlert()}>{i18n.t('mobileuser.DELETE')}</MenuItem>
                            <MenuItem hidden={isGetPermissions(ChangePasswordInternalUser_Permission,'TRANSACTION')}  onClick={() => setShowChangePassword(true)}>{i18n.t('mobileuser.CHANGEPASSWORD')}</MenuItem>
                            <MenuItem hidden={isGetPermissions(UnlockInternalUser_Permission,'TRANSACTION')}  onClick={() => setShowUnlock(true)}>{i18n.t('mobileuser.UNLOCKMOBILEUSER')}</MenuItem> */}
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
        {props.loading && <Loading/>}

        <div><p className="lead text-center"><h2>{i18n.t('label_LIST_BRANCH')}</h2></p></div>
        <Card>
        <CardBody>
        <div className="table-responsive" style={{height:defaultHeight}}>
            <Grid
                rows={RowsBranch}
                columns={columns}
                totalCounts={RowsBranch.length}
                loading={loading}
                columnextension={[]}
            />
        </div>
        </CardBody>
        </Card>
        </ContentWrapper>

    )
}
export default Detail;