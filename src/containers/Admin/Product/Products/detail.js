import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
  import {
  Container, Card, CardBody
  , Button, CardHeader
  }                                   from 'reactstrap';
  import {useHistory}                 from 'react-router-dom';
  import {useTranslation}             from 'react-i18next';
  import Swal             from "sweetalert2";
  import {useDispatch}    from 'react-redux';
  import * as actions     from '../../../../store/actions';
  import Skeleton         from 'react-loading-skeleton';
  import * as pathmenu           from '../../../shared/pathMenu';
  import ButtonMUI from '@material-ui/core/Button';
  import ClickAwayListener from '@material-ui/core/ClickAwayListener';
  import Grow from '@material-ui/core/Grow';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import MenuItem from '@material-ui/core/MenuItem';
  import MenuList from '@material-ui/core/MenuList';
  import { makeStyles } from '@material-ui/core/styles';
  import {Loading}                    from '../../../../components/Common/Loading';
  import  {numToMoney} from '../../../shared/globalFunc';
  import styled                       from "styled-components";
  import Dialog                       from '@material-ui/core/Dialog';
  import DialogAddStock from './dialogAddStock';
  

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  const StyledDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    height: 500px;
  }
`;


  function Detail(props) {
    // reloadToHomeNotAuthorize(DetailInternalUser_Permission,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);
    const [ShowDialogStock, setShowDialogStock] = useState(false);
    const [ShowDialogRejectStock, setShowDialogRejectStock] = useState(false);
    // const [showchangepassword, setShowChangePassword] = useState(false);
    // const [showunlock, setShowUnlock] = useState(false);
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
        dispatch(actions.getProductData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setLoading(false);
        setValue(data.data);
    }

    function errorHandler(error) {
        setLoading(false);
        setLoadingSend(false);
        setShowDialogStock(false);
        setShowDialogRejectStock(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    }

    const succesHandlerSubmit = (data) => {
        setLoading(false);
        setLoadingSend(false);
        setShowDialogStock(false);
        setShowDialogRejectStock(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.goBack();
            }
        })
    }

    const handleShowDialogAdd = () => {
        setShowDialogStock(true);
    }

    const handleShowDialogReject = () => {
        setShowDialogRejectStock(true);
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
            <span>{i18n.t('Product')}</span>
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
                            <span className="col-md-5">{i18n.t('label_SHORT_NAME')}</span>
                                <strong className="col-md-7">
                                {value.shortname?value.shortname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DESCRIPTION')}</span>
                                <strong className="col-md-7">
                                {value.description?value.description:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PRICE_BUY')}</span>
                                <strong className="col-md-7">
                                {value.pricebuy?numToMoney(value.pricebuy):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Price UOM 1')}</span>
                                <strong className="col-md-7">
                                {value.pricesell?numToMoney(value.pricesell):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Price UOM 2')}</span>
                                <strong className="col-md-7">
                                {value.priceselluom2?numToMoney(value.priceselluom2):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Price UOM 3')}</span>
                                <strong className="col-md-7">
                                {value.priceselluom3?numToMoney(value.priceselluom3):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Price UOM 4')}</span>
                                <strong className="col-md-7">
                                {value.priceselluom4?numToMoney(value.priceselluom4):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Barcode 1')}</span>
                                <strong className="col-md-7">
                                {value.barcode1?value.barcode1:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Barcode 2')}</span>
                                <strong className="col-md-7">
                                {value.barcode2?value.barcode2:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Barcode 3')}</span>
                                <strong className="col-md-7">
                                {value.barcode3?value.barcode3:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Barcode 4')}</span>
                                <strong className="col-md-7">
                                {value.barcode4?value.barcode4:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('UOM 1')}</span>
                                <strong className="col-md-7">
                                {value.uom1?value.uom1:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('UOM 2')}</span>
                                <strong className="col-md-7">
                                {value.uom2?value.uom2:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('UOM 3')}</span>
                                <strong className="col-md-7">
                                {value.uom3?value.uom3:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('UOM 4')}</span>
                                <strong className="col-md-7">
                                {value.uom4?value.uom4:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CONVERTION1TO4')}</span>
                                <strong className="col-md-7">
                                {value.conversion1to4?value.conversion1to4:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CONVERTION2TO4')}</span>
                                <strong className="col-md-7">
                                {value.conversion2to4?value.conversion2to4:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CONVERTION3TO4')}</span>
                                <strong className="col-md-7">
                                {value.conversion3to4?value.conversion3to4:''}
                                </strong>
                            </div>

                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PRODUCT_TYPE')}</span>
                                <strong className="col-md-7">
                                {value.nameproducttype?value.nameproducttype:''}
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

            <StyledDialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                style={{height: '100%'}}
                open={ShowDialogStock}
            >
              {
                value.nama ?
                <DialogAddStock
                  showflag = {setShowDialogStock}
                  flagloadingsend = {setLoadingSend}
                  errorhandler = {errorHandler}
                  succesHandlerSubmit = {succesHandlerSubmit}
                  data = {value}
                  type = {"ADD"}
                />:''
              }
              {LoadingSend && <Loading/>}
              </StyledDialog>

              <StyledDialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                style={{height: '100%'}}
                open={ShowDialogRejectStock}
            >
              {
                value.nama ?
                <DialogAddStock
                  showflag = {setShowDialogStock}
                  flagloadingsend = {setLoadingSend}
                  errorhandler = {errorHandler}
                  succesHandlerSubmit = {succesHandlerSubmit}
                  data = {value}
                  type = {"REJECT"}
                />:''
              }
              {LoadingSend && <Loading/>}
              </StyledDialog>

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
                            <MenuItem hidden={false}  onClick={() => history.push(pathmenu.editproduct+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={false}  onClick={() => handleShowDialogAdd()}>{i18n.t('Add Stock')}</MenuItem>
                            <MenuItem hidden={false}  onClick={() => handleShowDialogReject()}>{i18n.t('Reject Stock')}</MenuItem>
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
        </ContentWrapper>
    )
  }
  export default Detail;