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
  import { isGetPermissions,numToMoney,reloadToHomeNotAuthorize } from '../../shared/globalFunc';
  import { editInvoice_Permission,deleteInvoice_Permission,MenuInvoice} from '../../shared/permissionMenu';
  import moment                       from "moment/moment";
  import '../../CSS/table.css';
  import { formatdate } from '../../shared/constantValue';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  function Detail(props) {
    reloadToHomeNotAuthorize(MenuInvoice,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [IsHide, setIsHide] = useState(false);
    const [IsPrintInvoiceHide, setIsPrintInvoiceHide] = useState(false);
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
        dispatch(actions.getInvoiceData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data);
        if(data.data.listpenerimaan){
            if(data.data.listpenerimaan.length > 0){
                setIsHide(true);
            }
        }
        //setIsPrintInvoiceHide
        if(data.data.detailspenerimaan){
            let totalpenerimaan = 0;
            for(let i=0; i < data.data.detailspenerimaan.length; i++){
                let val = data.data.detailspenerimaan[i];
                totalpenerimaan += val.amount?parseFloat(val.amount):0;
            }
            let totalInvoice = data.data?.totalinvoice?parseFloat(data.data.totalinvoice):0;
            if(totalInvoice == 0 || totalpenerimaan >= totalInvoice){
                setIsPrintInvoiceHide(true);
            }
        }

        // let listitems = [];
        // if(data.data.details){
        //     for(let i=0; i < data.data.details.length; i++){
        //         let det = data.data.details[i];
        //         listitems.push({ idcoa:det.coaname,catatan: det.catatan,amount:det.amount,isdownpayment:(det.isdownpayment == 'Y'?'Yes':'No'),idinvoice:det.idinvoice,idworkorder:det.idworkorder});
        //     }
        // }
        // setInputListItem(listitems);

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
                dispatch(actions.submitDeleteInvoice('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuInvoice);
            }
        })
    }

    const getAmountPayment = (idpenerimaankasbank,details) => {
        let listfilter = details.filter(output => output.idpenerimaankasbank == idpenerimaankasbank);
        if(listfilter.length > 0){
            return numToMoney(parseFloat(listfilter[0].amount));
        }
        return 0;
    }
    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailInvoice+'/'+id} label={'Detail Invoice'} labeldefault={'Detail Invoice'} />
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
            <Card outline color="primary" className="mb-3" style={{width:"200%"}}>
            <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Details'}</CardHeader>
            <CardBody>
                {
                    loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                    (
                        <section>
                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NO_DOCUMENT')}</span>
                            <strong className="col-md-7">
                                {value.nodocument?value.nodocument:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Invoice Type')}</span>
                            <strong className="col-md-7">
                                {value.namainvoicetype?value.namainvoicetype:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                            <strong className="col-md-7">
                            {value.tanggal?moment (new Date(value.tanggal)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Customer')}</span>
                            <strong className="col-md-7">
                            {value.namaCustomer?value.namaCustomer:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Ref. No')}</span>
                            <strong className="col-md-7">
                            {value.refno?value.refno:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Delivered To')}</span>
                            <strong className="col-md-7">
                            {value.deliveredto?value.deliveredto:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Delivery Date')}</span>
                            <strong className="col-md-7">
                            {value.deliverydate?moment (new Date(value.deliverydate)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Work Order')}</span>
                            <strong className="col-md-7">
                            {value.noocumentwo?value.noocumentwo:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Surat Jalan')}</span>
                            <strong className="col-md-7">
                            {value.noocumentsuratjalan?value.noocumentsuratjalan:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Diskon Nota')}</span>
                            <strong className="col-md-7">
                            {value.diskonnota?numToMoney(parseFloat(value.diskonnota)):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Total')}</span>
                            <strong className="col-md-7">
                            {value.totalinvoice?numToMoney(parseFloat(value.totalinvoice)):''}
                            </strong>
                            </div>

                            <div className="row mt-3" hidden={value.idinvoicetype?(value.idinvoicetype == 'REIMBURSEMENT'?true:false):true}>
                            <span className="col-md-5">{i18n.t('Price List')}</span>
                            <strong className="col-md-7">
                            {value.detailsprice?(value.detailsprice.length > 0?value.detailsprice[0].nodocumentpricelist:''):''}
                            </strong>
                            </div>

                            <div className="row mt-3" hidden={value.idinvoicetype?(value.idinvoicetype == 'REIMBURSEMENT'?false:true):true}>
                            <span className="col-md-5">{i18n.t('Pengeluaran')}</span>
                            <strong className="col-md-7">
                            {value.detailsprice?(value.detailsprice.length > 0?value.detailsprice[0].nodocumentpengeluaran:''):''}
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

            {
                <table id="tablegrid">
                    <tr>
                        <th>{i18n.t('Invoice Type')}</th>
                        <th>{i18n.t('Harga')}</th>
                        {/* <th>{i18n.t('Is Mandatory')}</th> */}
                        <th>{i18n.t('Jalur')}</th>
                        <th>{i18n.t('Qty')}</th>
                        <th>{i18n.t('Diskon')}</th>
                        <th>{i18n.t('Sub Total')}</th>
                        
                    </tr>
                    <tbody>
                        {   value.detailsprice?
                            value.detailsprice.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.invoicetypename}</td>
                                        <td>{numToMoney(parseFloat(x.price))}</td>
                                        {/* <td style={{width:'50px'}}>{x.ismandatory == 'Y'?'Yes':'No'}</td> */}
                                        <td style={{backgroundColor:x.jalur !== ''? (x.jalur == 'HIJAU'?'greenyellow':'red'):''}}>{x.jalur == 'MERAH'?'Merah':'Hijau'}</td>
                                        <td>{x.qty}</td>
                                        <td>{numToMoney(parseFloat(x.diskon))}</td>
                                        <td>{numToMoney(parseFloat(x.subtotal))}</td>
                                    </tr>
                                )
                            })
                            :''
                        }
                    </tbody>
                </table>
            }

            {
                <table id="tablegrid">
                    <tr>
                        <th>{i18n.t('No Document')}</th>
                        <th>{i18n.t('Receive Date')}</th>
                        <th>{i18n.t('Amount')}</th>
                        <th>{i18n.t('Keterangan')}</th>
                    </tr>
                    <tbody>
                        {
                            value.listpenerimaan?
                            value.listpenerimaan.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.nodocument}</td>
                                        <td>{x.receivedate?moment (new Date(x.receivedate)).format(formatdate):''} </td>
                                        <td>{getAmountPayment(x.id,(value.detailspenerimaan?value.detailspenerimaan:[]))}</td>
                                        <td>{x.keterangan}</td>
                                    </tr>
                                )
                            })
                            :''
                        }
                    </tbody>
                </table>
            }
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
                            <MenuItem hidden={IsPrintInvoiceHide || !isGetPermissions(MenuInvoice,'READ')} onClick={() => history.push(pathmenu.printInvoice+'/'+id)} >{i18n.t('Cetak')}</MenuItem>
                            <MenuItem hidden={IsHide || !isGetPermissions(editInvoice_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editInvoice+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={IsHide || !isGetPermissions(deleteInvoice_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            
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