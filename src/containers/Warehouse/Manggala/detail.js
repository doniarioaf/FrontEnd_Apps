import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../components/Layout/ContentWrapper';
  import ContentHeading               from '../../../components/Layout/ContentHeading';
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
//   import styled                       from "styled-components";
//   import Dialog                       from '@material-ui/core/Dialog';
  import * as pathmenu           from '../../shared/pathMenu';
  import ButtonMUI from '@material-ui/core/Button';
  import ClickAwayListener from '@material-ui/core/ClickAwayListener';
  import Grow from '@material-ui/core/Grow';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import MenuItem from '@material-ui/core/MenuItem';
  import MenuList from '@material-ui/core/MenuList';
  import { makeStyles } from '@material-ui/core/styles';
  import {Loading}                    from '../../../components/Common/Loading';
  import { isGetPermissions,reloadToHomeNotAuthorize } from '../../shared/globalFunc';
  import { editWarehouse_Permission,deleteWarehouse_Permission,MenuWarehouse } from '../../shared/permissionMenu';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuWarehouse,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

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
        dispatch(actions.getWarehouseData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data);
        setLoading(false);
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
                dispatch(actions.submitDeleteWarehouse('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuWarehouse);
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

    const listContact = (data,datacontactno) => {
        let list = [];
        let cek = new String(data).includes(',');
        if(cek){
            let arrList = new String(data).split(',');
            let arrListNo = new String(datacontactno).split(',');
            for(let i=0; i < arrList.length; i++){
                list.push(
                    <div className="row mt-1">
                    <strong className="col-md-10">
                    {arrList[i]+' - '+arrListNo[i]}
                    </strong>
                    </div>
                )
            }
        }else{
            list.push(
                <div className="row mt-1">
                <strong className="col-md-7">
                {data+' - '+datacontactno}
                </strong>
                </div>
            )
        }
        return list;
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailWarehouse+'/'+id} label={'Detail Warehouse'} labeldefault={'Detail Warehouse'} />
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
                            value.paramname :
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
                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Code')}</span>
                            <strong className="col-md-7">
                                {value.code?value.code:''}
                            </strong>
                            </div> */}

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NAME')}</span>
                            <strong className="col-md-7">
                                {value.nama?value.nama:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CUSTOMER')}</span>
                                <strong className="col-md-7">
                                {value.customername?value.customername:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PROVINCE')}</span>
                                <strong className="col-md-7">
                                {value.provincename?value.provincename:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CITY')}</span>
                                <strong className="col-md-7">
                                {value.cityname?value.cityname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DISTRICT')}</span>
                                <strong className="col-md-7">
                                {value.kecamatanname?value.kecamatanname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')}</span>
                                <strong className="col-md-7">
                                {value.alamat?value.alamat:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Ancer Ancer')}</span>
                                <strong className="col-md-7">
                                {value.ancerancer?value.ancerancer:''}
                                </strong>
                            </div>

                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CONTACT_NAME')}</span>
                            <strong className="col-md-7">
                                {listContact(value.contactnumber?value.contactnumber:'')}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('No Contact HP')}</span>
                            <strong className="col-md-7">
                                {listContact(value.contacthp?value.contacthp:'')}
                            </strong>
                            </div> */}

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('No Contact')}</span>
                            <strong className="col-md-7">
                                {listContact((value.contactnumber?value.contactnumber:''),(value.contacthp?value.contacthp:''))}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NOTE')}</span>
                                <strong className="col-md-7">
                                {value.note?value.note:''}
                                </strong>
                            </div>
                            
                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_IS_ACTIVE')}</span>
                                <strong className="col-md-7">
                                {value.isactive?'Yes':'No'}
                                </strong>
                            </div> */}

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
                            <MenuItem hidden={!isGetPermissions(editWarehouse_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editWarehouse+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteWarehouse_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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
        </ContentWrapper>
    )
  }
  export default Detail;