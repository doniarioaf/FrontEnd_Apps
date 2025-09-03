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
  import { formatRupiah, isGetPermissions,numToMoney,reloadToHomeNotAuthorize } from '../../shared/globalFunc';
  import { MenuPackingList, cancelPackingList_Permission, deletePackingList_Permission, editPackingList_Permission } from '../../shared/permissionMenu';
  import moment                          from 'moment';
  import { formatdate, formatdatetime, formatdateYYYYMMDD } from '../../shared/constantValue';
  import '../../CSS/table.css';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuPackingList,'READ');
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

    const [ListItem, setListItem] = useState([]);

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
        dispatch(actions.getPackingListData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let det = data.data;
        setValue(det);

        let listItems = det.items?det.items:[];
        setListItem(listItems);
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
                setLoading(true);
                dispatch(actions.submitPackingList( {url:'/'+id,type:'DELETE'} ,succesHandlerSubmit, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    const updatePrice = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setLoading(true);
                dispatch(actions.getPackingListData( {url:'/updateprice/'+id,type:'GET'},succesHandlerSubmitUpdatePrice, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
        
    }
    const succesHandlerSubmitUpdatePrice = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(0);
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
                history.push(pathmenu.menupackinglist);
            }
        })
    }

    function errorHandler(error,propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    const downloadExcelPL = () => {
        setLoading(true);
        dispatch(actions.getPackingListData( {url:'/printexcel/'+id,type:'GETFILE',typefile:'application/vnd.ms-excel'},successHandlerExcel, errorHandler));
    }

    function successHandlerExcel(data,propsdata) {
        var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
        var dataUrl = URL.createObjectURL(blob);
        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = 'PackingList-'+moment(new Date()).format(formatdateYYYYMMDD)+'-'+value.nodocument+'.xlsx';
        fileLink.click();
        fileLink.remove();
        setLoading(false);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailpackinglist+'/'+id} label={'Detail'} labeldefault={'Detail'} />
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
                            value.nodocument :
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
                            <span className="col-md-5">{i18n.t('No Document')}</span>
                            <strong className="col-md-7">
                                {value.nodocument?value.nodocument:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                                <strong className="col-md-7">
                                {value.date ?moment (new Date(value.date)).format(formatdate):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Vendor UPI')}</span>
                                <strong className="col-md-7">
                                {value.vendorName ?value.vendorName+'/'+value.vendorAlias:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Customer')}</span>
                                <strong className="col-md-7">
                                {value.customerName ?value.customerName+'/'+value.customerAlias:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('City')}</span>
                                <strong className="col-md-7">
                                {value.city ?value.city:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Attention')}</span>
                                <strong className="col-md-7">
                                {value.attention ?value.attention:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Flight Number')}</span>
                                <strong className="col-md-7">
                                {value.flightnumber ?value.flightnumber:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('AWB Number')}</span>
                                <strong className="col-md-7">
                                {value.awbnumber ?value.awbnumber:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Netto')}</span>
                                <strong className="col-md-7">
                                {value.netto ?formatRupiah(new String(value.netto).replaceAll('.',','),1):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Koli')}</span>
                                <strong className="col-md-7">
                                {value.koli ?value.koli:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CREATED')}</span>
                                <strong className="col-md-7">
                                {value.createdbyName ?value.createdbyName:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CREATED_DATE')}</span>
                                <strong className="col-md-7">
                                {value.createddate ?moment (new Date(value.createddate)).format(formatdatetime):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_MODIFIED')}</span>
                                <strong className="col-md-7">
                                {value.modifiedbyName ?value.modifiedbyName:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_MODIFIED_DATE')}</span>
                                <strong className="col-md-7">
                                {value.modifieddate ?moment (new Date(value.modifieddate)).format(formatdatetime):''}
                                </strong>
                            </div>

                        </section>
                    )
                }
            </CardBody>
            </Card>
            </div>
            </div>

            {
                <div className="row justify-content-center">
                    <h4>{'Item'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Box')}</th>
                        <th >{i18n.t('Product')}</th>
                        <th >{i18n.t('Category Product')}</th>
                        <th >{i18n.t('Qty')}</th>
                        <th >{i18n.t('Bruto Weight(Gr)')}</th>
                        <th >{i18n.t('Allowance(%)')}</th>
                        <th >{i18n.t('Netto Weight(Kg)')}</th>
                        <th >{i18n.t('Price(USD)')}</th>
                        <th >{i18n.t('Subtotal Price')}</th>
                        </tr>
                        {
                            ListItem.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.box}</td>
                                        <td>{x.productName}</td>
                                        <td>{x.categoryProductName +' ('+x.categoryProductSize+') ('+x.categoryJumlahitemsperkoli+')'}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.brutoweight?numToMoney(x.brutoweight):0}</td>
                                        <td>{x.allowance?numToMoney(x.allowance):0}</td>
                                        <td>{x.nettoweight?formatRupiah(new String(x.nettoweight).replaceAll('.',','),4):0}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.totalprice?formatRupiah(new String(x.totalprice).replaceAll('.',','),1):0}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            }
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
                            <MenuItem hidden={!isGetPermissions(MenuPackingList,'TRANSACTION')}  onClick={() => history.push(pathmenu.printpdfpackinglist+'/'+id)}>{i18n.t('PDF Packing List')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(MenuPackingList,'TRANSACTION')}  onClick={() => downloadExcelPL()}>{i18n.t('Excel Packing List')}</MenuItem>
                            <MenuItem hidden={value.isalreadyupdateprice != null && value.isalreadyupdateprice != undefined? (isGetPermissions(editPackingList_Permission,'TRANSACTION')?value.isalreadyupdateprice: true):true}  onClick={() => updatePrice()}>{i18n.t('Update Price')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(editPackingList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpackinglist+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(cancelPackingList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.cancelpackinglist+'/'+id)}>{i18n.t('Cancel Packing List')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deletePackingList_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            {/* <MenuItem hidden={!isGetPermissions(MenuPurchaseReceive,'TRANSACTION')}  onClick={() => history.push(pathmenu.printnota+'/'+id)}>{i18n.t('Nota')}</MenuItem> */}
                            
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