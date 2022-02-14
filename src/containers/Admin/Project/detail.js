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
  import Grid                         from './gridCustomer';
  import { reloadToHomeNotAuthorize,isGetPermissions } from '../../shared/globalFunc';
import { MenuProject, editProject_Permission,deleteProject_Permission } from '../../shared/permissionMenu';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuProject,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [RowsCustomer, setRowsCustomer] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'address', title: i18n.t('label_ADDRESS')},
        {name: 'phone', title: i18n.t('label_CONTACT_NUMBER')},
    ]);
    const [StartdefaultHeight] = useState(250);
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
        dispatch(actions.getProjectData('/'+id,successHandler, errorHandler));
    }, []);

        function successHandler(data) {
            setLoading(false);
            if(data.data){
                let obj = new Object();
                obj.nama = data.data.nama;
                obj.description = data.data.description;
                obj.projectnumber = data.data.projectnumber;
                setValue(obj);
                if(data.data.customers){
                    let listcustomers = data.data.customers;
                    setRowsCustomer(listcustomers.reduce((obj, el) => (
                        [...obj, {
                            id: el.id,
                            name: el.nama,
                            address: el.address,
                            phone: el.phone
                        }]
                    ), []));
                }
            }
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
                dispatch(actions.submitDeleteProject(id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuproject);
            }
        })
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
            <span>{i18n.t('Project')}</span>
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
                            value.nama :
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
                            <span className="col-md-5">{i18n.t('Project Number')}</span>
                                <strong className="col-md-7">
                                {value.projectnumber?value.projectnumber:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DESCRIPTION')}</span>
                                <strong className="col-md-7">
                                {value.description?value.description:''}
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
                            <MenuItem hidden={!isGetPermissions(editProject_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editproject+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteProject_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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

        <div><p className="lead text-center"><h2>{i18n.t('label_CUSTOMER')}</h2></p></div>
        <Card>
        <CardBody>
        <div className="table-responsive" style={{height:defaultHeight}}>
            <Grid
                rows={RowsCustomer}
                columns={columns}
                totalCounts={RowsCustomer.length}
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