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
  import { convertGramToKGAndPembulatan, formatRupiah, isGetPermissions,numToMoney,reloadToHomeNotAuthorize } from '../../shared/globalFunc';
  import { MenuPurchaseReceive, deletePurchaseReceive_Permission, editPurchaseReceiveCalcSelisih_Permission, editPurchaseReceive_Permission } from '../../shared/permissionMenu';
  import moment                          from 'moment';
  import { formatdate, formatdatetime } from '../../shared/constantValue';
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
    reloadToHomeNotAuthorize(MenuPurchaseReceive,'READ');
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

    const [ListItemHidup, setListItemHidup] = useState([]);
    const [ListItemMati, setListItemMati] = useState([]);
    const [ListItemBiaya, setListItemBiaya] = useState([]);
    const [ListItemPenguranganBiaya, setListItemPenguranganBiaya] = useState([]);
    const [ListItemInventori, setListItemInventori] = useState([]);
    let flagCalcSelisih = isGetPermissions(editPurchaseReceiveCalcSelisih_Permission,'TRANSACTION');

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
        dispatch(actions.getPurchaseReceiveData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let det = data.data;
        let totalprice = det.totalprice?det.totalprice:0;
        let setor = det.setor?det.setor:0;
        let setorPinjaman = det.setor_pinjaman?det.setor_pinjaman:0;
        let transfer = parseFloat(totalprice) - (parseFloat(setor) + parseFloat(setorPinjaman));
        if(transfer < 1){
            transfer = 0;
        }
        det.transfer = transfer;
        setValue(det);

        let listItems = det.items?det.items:[];
        let listfilteroutputHidup = listItems.filter(output => output.type == 'H');
        let listfilteroutputMati = listItems.filter(output => output.type == 'M');
        let listCharge = det.charges?det.charges:[];
        let listPenambahanBiaya = listCharge.filter(output => output.chargename == 'BOX' || output.chargename == 'BOAT' || output.chargename == 'BANTUAN');
        let listPenguranganBiaya = listCharge.filter(output => output.chargename == 'ONGKOS' || output.chargename == 'SETOR' || output.chargename == 'SETORPINJAMAN');

        setListItemHidup(listfilteroutputHidup);
        setListItemMati(listfilteroutputMati);
        setListItemBiaya(listPenambahanBiaya);
        setListItemPenguranganBiaya(listPenguranganBiaya);
        setListItemInventori(det.inventori?det.inventori:[]);
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
                dispatch(actions.submitPurchaseReceiveData( {url:'/'+id,type:'DELETE'} ,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menupurchasereceive);
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

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailpurchasereceive+'/'+id} label={'Detail'} labeldefault={'Detail'} />
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
                            <span className="col-md-5">{i18n.t('No Document SPB')}</span>
                            <strong className="col-md-7">
                                {value.nodocumentDraft?value.nodocumentDraft+(value.noSmuDraft !== ''?' ('+value.noSmuDraft+')':''):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Vendor')}</span>
                                <strong className="col-md-7">
                                {value.vendorname ?value.vendorname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Area')}</span>
                                <strong className="col-md-7">
                                {value.namaArea ?value.namaArea:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('SMU')}</span>
                                <strong className="col-md-7">
                                {value.smu ?value.smu:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Flight No')}</span>
                                <strong className="col-md-7">
                                {value.flightno ?value.flightno:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Notes 1')}</span>
                                <strong className="col-md-7">
                                {value.notes ?value.notes:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Notes 2')}</span>
                                <strong className="col-md-7">
                                {value.notes2 ?value.notes2:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Bank')}</span>
                                <strong className="col-md-7">
                                {value.bank ?value.bank:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Acc no')}</span>
                                <strong className="col-md-7">
                                {value.accountnobank ?value.accountnobank:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Acc name bank')}</span>
                                <strong className="col-md-7">
                                {value.accountnamebank ?value.accountnamebank:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                                <strong className="col-md-7">
                                {value.transactiondate ?moment (new Date(value.transactiondate)).format(formatdate):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Total')}</span>
                                <strong className="col-md-7">
                                {value.totalprice ?formatRupiah(new String(value.totalprice - value.setor_pinjaman).replaceAll('.',',')):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Transfer')}</span>
                                <strong className="col-md-7">
                                {value.transfer ?numToMoney(value.transfer):0}
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
                <div >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        }}>
                        {/* Kiri */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div hidden={flagCalcSelisih?false:true}>
                            <label style={{ margin: 0 }}>Kurs : {value.kurs?numToMoney(value.kurs):0}</label>
                            </div>
                        </div>
                    
                    {/* Tengah */}
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <h4 style={{ margin: 0 }}>Item Hidup</h4>
                    </div>

                    {/* Kanan (kosong, untuk balance) */}
                    <div style={{ width: '150px' }}>
                        <div hidden={flagCalcSelisih?false:true}>
                        <label style={{ margin: 0 }}>Selisih : {value.selisih?numToMoney(value.selisih):0}</label>
                        </div>
                    </div>
                    </div>

                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th style={{ minWidth: '150px' }}>{i18n.t('Product')}</th>
                        <th style={{ minWidth: '90px' }}>{i18n.t('Category Product')}</th>
                        <th style={{ minWidth: '60px' }}>{i18n.t('Kg')}</th>
                        <th style={{ minWidth: '60px' }}>{i18n.t('Qty')}</th>
                        {/* <th >{i18n.t('Qty Bonus')}</th> */}
                        <th style={{ minWidth: '60px' }}>{i18n.t('Qty Nota')}</th>
                        <th style={{ minWidth: '80px' }}>{i18n.t('Price')}</th>
                        <th style={{ minWidth: '100px' }}>{i18n.t('Subtotal Price')}</th>

                        {flagCalcSelisih && (<th style={{ minWidth: '80px' }}>{i18n.t('Harga Jual')}</th>)}
                        {flagCalcSelisih && (<th style={{ minWidth: '80px' }}>{i18n.t('Harga Jual (Edit)')}</th>)}
                        {flagCalcSelisih && (<th style={{ minWidth: '80px' }}>{i18n.t('Total USD')}</th>)}
                        {flagCalcSelisih && (<th style={{ minWidth: '130px' }}>{i18n.t('Total Rp')}</th>)}
                        </tr>
                        {
                            ListItemHidup.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.productName}</td>
                                        <td>{x.categoryProductName}</td>
                                        <td>{x.weight_udang?numToMoney(convertGramToKGAndPembulatan(x.weight_udang)):0}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.qtynota}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.subtotalprice?numToMoney(x.subtotalprice):0}</td>
                                        {flagCalcSelisih && (<td>{x.hargajual_terakhir?numToMoney(x.hargajual_terakhir):0}</td>)}
                                        {flagCalcSelisih && (<td>{x.hargajual?numToMoney(x.hargajual):0}</td>)}
                                        {flagCalcSelisih && (<td>{x.totalusd?numToMoney(x.totalusd):0}</td>)}
                                        {flagCalcSelisih && (<td>{x.totalrupiah?numToMoney(x.totalrupiah):0}</td>)}
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
                    <h4>{'Item Mati'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Product')}</th>
                        <th >{i18n.t('Category Product')}</th>
                        <th >{i18n.t('Qty')}</th>
                        <th >{i18n.t('Price')}</th>
                        <th >{i18n.t('Subtotal Price')}</th>
                        </tr>
                        {
                            ListItemMati.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.productName}</td>
                                        <td>{x.categoryProductName}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.subtotalprice?numToMoney(x.subtotalprice):0}</td>
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
                    <h4>{'Penambahan Biaya'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Nama')}</th>
                        <th >{i18n.t('Qty')}</th>
                        <th >{i18n.t('Price')}</th>
                        <th >{i18n.t('Subtotal Price')}</th>
                        </tr>
                        {
                            ListItemBiaya.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.chargenamecustom?x.chargenamecustom :(x.chargename == 'SETORPINJAMAN'?'SETOR PINJAMAN':x.chargename)}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.subtotalprice?numToMoney(x.subtotalprice):0}</td>
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
                    <h4>{'Pengurangan Biaya'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Nama')}</th>
                        <th >{i18n.t('Qty')}</th>
                        <th >{i18n.t('Price')}</th>
                        <th >{i18n.t('Subtotal Price')}</th>
                        </tr>
                        {
                            ListItemPenguranganBiaya.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.chargenamecustom?x.chargenamecustom :x.chargename}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.subtotalprice?numToMoney(x.subtotalprice):0}</td>
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
                    <h4>{'Inventori'}</h4>
                    <table id="tablegrid">
                    <tbody>
                        <tr>
                        <th >{i18n.t('Nama')}</th>
                        <th >{i18n.t('Qty')}</th>
                        <th >{i18n.t('Price')}</th>
                        <th >{i18n.t('Subtotal Price')}</th>
                        </tr>
                        {
                            ListItemInventori.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.inventoriname}</td>
                                        <td>{x.qty}</td>
                                        <td>{x.price?numToMoney(x.price):0}</td>
                                        <td>{x.subtotalprice?numToMoney(x.subtotalprice):0}</td>
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
                            <MenuItem hidden={!isGetPermissions(editPurchaseReceive_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpurchasereceive+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deletePurchaseReceive_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(MenuPurchaseReceive,'TRANSACTION')}  onClick={() => history.push(pathmenu.printnota+'/'+id)}>{i18n.t('Print')}</MenuItem>
                            
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