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
  import { MenuCancelPackingList, MenuPackingList, cancelPackingList_Permission, deletePackingList_Permission, editPackingList_Permission } from '../../shared/permissionMenu';
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
    const [ListItemPL, setListItemPL] = useState([]);

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
        dispatch(actions.getCancelPackingListData({ url: '/'+id, type: 'GET'}, successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let det = data.data;
        setValue(det);

        let listItems = det.items?det.items:[];
        let listItemsPL = det.itemsPL?det.itemsPL:[];
        setListItem(listItems);
        setListItemPL(listItemsPL)
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

    const downloadExcelCPL = () => {
            setLoading(true);
            dispatch(actions.getCancelPackingListData( {url:'/printexcel/'+id,type:'GETFILE',typefile:'application/vnd.ms-excel'},successHandlerExcel, errorHandler));
        }
    
        function successHandlerExcel(data,propsdata) {
            var blob = new Blob([data],{ type: 'application/vnd.ms-excel'});
            var dataUrl = URL.createObjectURL(blob);
            var fileLink = document.createElement('a');
            fileLink.href = dataUrl;
    
            // it forces the name of the downloaded file
            fileLink.download = 'CancelPackingList-'+moment(new Date()).format(formatdateYYYYMMDD)+'-'+value.nodocument+'.xlsx';
            fileLink.click();
            fileLink.remove();
            setLoading(false);
        }

    function errorHandler(error,propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailcancelpackinglist+'/'+id} label={'Detail'} labeldefault={'Detail'} />
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
                            <span className="col-md-5">{i18n.t('Tanggal Cancel')}</span>
                                <strong className="col-md-7">
                                {value.datecancel ?moment (new Date(value.datecancel)).format(formatdate):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Keterangan')}</span>
                            <strong className="col-md-7">
                                {value.keterangan?value.keterangan:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('No Document PL')}</span>
                            <strong className="col-md-7">
                                {value.nodocumentPL?value.nodocumentPL:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Vendor')}</span>
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
                    <h4>{'Items Packing List'}</h4>
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
                            ListItemPL.map((x, i) => {
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

            {
                <div className="row justify-content-center">
                    <h4>{'Item Udang Mati'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Product')}</th>
                        <th >{i18n.t('Category Product')}</th>
                        <th >{i18n.t('Qty')}</th>
                        
                        </tr>
                        {
                            ListItem.map((x, i) => {
                                return (
                                    <tr>
                                        <td width={"30%"}>{x.namaProduct}</td>
                                        <td width={"40%"}>{x.categoryProductNama +' ('+x.categoryProductSize+')' }</td>
                                        <td width={"30%"}>{x.qty}</td>
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
                            <MenuItem hidden={!isGetPermissions(MenuCancelPackingList,'TRANSACTION')}  onClick={() => history.push(pathmenu.printpdfcancelpackinglist+'/'+id)}>{i18n.t('Print PDF')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(MenuCancelPackingList,'TRANSACTION')}  onClick={() => downloadExcelCPL()}>{i18n.t('Excel CPL')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(editPackingList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editcancelpackinglist+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            {/* <MenuItem hidden={!isGetPermissions(MenuPackingList,'TRANSACTION')}  onClick={() => history.push(pathmenu.printpdfpackinglist+'/'+id)}>{i18n.t('PDF Packing List')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(MenuPackingList,'TRANSACTION')}  onClick={() => downloadExcelPL()}>{i18n.t('Excel Packing List')}</MenuItem>
                            <MenuItem hidden={value.isalreadyupdateprice != null && value.isalreadyupdateprice != undefined? (isGetPermissions(editPackingList_Permission,'TRANSACTION')?value.isalreadyupdateprice: true):true}  onClick={() => updatePrice()}>{i18n.t('Update Price')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(editPackingList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpackinglist+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(cancelPackingList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.cancelpackinglist+'/'+id)}>{i18n.t('Cancel Packing List')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deletePackingList_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem> */}
                            
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