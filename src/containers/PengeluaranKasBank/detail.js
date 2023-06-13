import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../components/Layout/ContentWrapper';
  import ContentHeading               from '../../components/Layout/ContentHeading';
  import {
  Container, Card, CardBody
  , Button, CardHeader
  }                                   from 'reactstrap';
  import {useHistory}                 from 'react-router-dom';
  import {useTranslation}             from 'react-i18next';
  import Swal             from "sweetalert2";
  import {useDispatch}    from 'react-redux';
  import * as actions     from '../../store/actions';
  import Skeleton         from 'react-loading-skeleton';
//   import styled                       from "styled-components";
//   import Dialog                       from '@material-ui/core/Dialog';
  import * as pathmenu           from '../shared/pathMenu';
  import ButtonMUI from '@material-ui/core/Button';
  import ClickAwayListener from '@material-ui/core/ClickAwayListener';
  import Grow from '@material-ui/core/Grow';
  import Paper from '@material-ui/core/Paper';
  import Popper from '@material-ui/core/Popper';
  import MenuItem from '@material-ui/core/MenuItem';
  import MenuList from '@material-ui/core/MenuList';
  import { makeStyles } from '@material-ui/core/styles';
  import {Loading}                    from '../../components/Common/Loading';
  import { isGetPermissions,numToMoney,reloadToHomeNotAuthorize } from '../shared/globalFunc';
  import { editPengeluaranKasBank_Permission,deletePengeluaranKasBank_Permission,MenuPengeluaranKasBank} from '../shared/permissionMenu';
  import moment                       from "moment/moment";
  import '../CSS/table.css';
  import { formatdate } from '../shared/constantValue';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuPengeluaranKasBank,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idcoa:"",catatan: "",amount:"",idasset:"",idinvoiceitem:"",idpaymentitem:"",idassetsparepart:"",sparepartassettype:""}]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [IsDisableBtn, setIsDisableBtn] = useState(false);
    const [InputListBank, setInputListBank] = useState([{ norek:"",atasnama: "",bank:""}]);

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
        dispatch(actions.getPengeluaranKasBankData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data);
        let listBank = data.data.listBank;
        if(listBank != null && listBank != undefined){
            if(listBank.length > 0){
                setInputListBank(listBank);
            }
        }
        setIsDisableBtn(data.data.disablededitordelete?true:false);
        let listitems = [];
        if(data.data.details){
            for(let i=0; i < data.data.details.length; i++){
                let det = data.data.details[i];
                // private String assetNameKepala;
	            // private String assetNameBuntut;
                let assetName = '';
                if(det.assetNameKepala){
                    if(det.assetNameKepala !== ''){
                        assetName = det.assetNameKepala;
                    }
                }
                if(det.assetNameBuntut){
                    if(det.assetNameBuntut !== ''){
                        assetName = det.assetNameBuntut;
                    }
                }

                let sparePartassetName = '';
                if(det.assetsparepartNameKepala){
                    if(det.assetsparepartNameKepala !== ''){
                        sparePartassetName = det.assetsparepartNameKepala;
                    }
                }
                if(det.assetsparepartNameBuntut){
                    if(det.assetsparepartNameBuntut !== ''){
                        sparePartassetName = det.assetsparepartNameBuntut;
                    }
                }
                
                listitems.push({ idcoa:det.coaName,catatan: det.catatan,amount:det.amount,idasset:assetName,idinvoiceitem:(det.invoiceitemName?det.invoiceitemName:''),idpaymentitem:(det.paymentitemName?det.paymentitemName:''),idassetsparepart:sparePartassetName,sparepartassettype:det.sparepartassettypeName});
            }
        }
        setInputListItem(listitems);

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
                dispatch(actions.submitDeletePengeluaranKasBank('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuPengeluaranKasBank);
            }
        })
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    const getPaymentToName = (data) =>{
        if(data.paymentto){
            if(data.paymentto == 'EMPLOYEE'){
                return data.employeeName?data.employeeName:''
            }else if(data.paymentto == 'CUSTOMER'){
                return data.customerName?data.customerName:''
            }else if(data.paymentto == 'VENDOR'){
                return data.vendorName?data.vendorName:''
            }else{
                return data.paymentto;
            }
        }
        return '';
    }

    const checkCategory = (data,type) =>{
        if(type == 'invoiceitem' || type == 'wo'){
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                return false;
            }
            if(type == 'wo' && data == 'OPTIONS_PAYMENTITEM_TYPE_2'){
                return false;
            }

            if(type == 'wo' && data == 'OPTIONS_PAYMENTITEM_TYPE_4'){
                return false;
            }
        }else if(type == 'asset'){
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_3'){
                return false;
            }
        }else if(type == 'all'){
            return false;
        }else if(type == 'invoiceitemtable'){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[0];
                let flag = true;
                if(det.idpaymentitem !== ''){
                    flag = true;
                    // return true;

                    // break;
                    if(det.idpaymentitem == ''){
                        if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                            flag = false;
                            // return false;
                        }
                    }
                }else{
                    if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                        flag = false;
                    }
                }

                return flag;
            }
            if(data == 'OPTIONS_PAYMENTITEM_TYPE_1'){
                return false;
            }
            return true;
        }else if(type == 'paymentitemtable'){
            for(let i=0; i < InputListItem.length; i++){
                let det = InputListItem[0];
                let flag = false;
                if(det.idinvoiceitem !== ''){
                    flag = true;
                    // return true;
                    // break;
                    if(det.idinvoiceitem == ''){
                        // return false;
                        flag = false;
                    }
                }
                return flag;
            }
            return false;
        }

        return true;
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailpengeluarankasbank+'/'+id} label={'Detail Pengeluaran Kas/Bank'} labeldefault={'Detail Pengeluaran Kas/Bank'} />
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
                            <span className="col-md-5">{i18n.t('Payment Date')}</span>
                            <strong className="col-md-7">
                            {value.paymentdate?moment (new Date(value.paymentdate)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Category')}</span>
                            <strong className="col-md-7">
                            {value.paymenttypename?value.paymenttypename:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Payment To')}</span>
                            <strong className="col-md-7">
                                {getPaymentToName(value)}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('COA')}</span>
                            <strong className="col-md-7">
                                {value.coaName?value.coaName:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Bank')}</span>
                            <strong className="col-md-7">
                                {value.bankName?value.bankName:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Keterangan')}</span>
                            <strong className="col-md-7">
                                {value.keterangan?value.keterangan:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('WO Number')}</span>
                            <strong className="col-md-7">
                                {value.nodocumentWO?value.nodocumentWO:''}
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
                <div hidden={value.paymentto?!(value.paymentto == 'VENDOR' || value.paymentto == 'EMPLOYEE'):true}>
                    <div style={{marginTop:'0px'}}><h3>{i18n.t('Bank')+' ('+getPaymentToName(value)+')'}</h3></div>
                    <table id="tablegrid">
                    <tr>
                        <th>{i18n.t('Bank')}</th>
                        <th>{i18n.t('label_ACCOUNT_NAME')}</th>
                        <th>{i18n.t('label_NUMBER_ACCOUNT')}</th>
                    </tr>
                    <tbody>
                        {
                            InputListBank.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.bank}</td>
                                        <td>{x.atasnama}</td>
                                        <td>{x.norek}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            }
            {
                <table id="tablegrid">
                    <tr>
                    <th  hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','invoiceitemtable')}>{i18n.t('Reimbursement')}</th>
                    <th  hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','paymentitemtable')}>{i18n.t('Non Reimbursement')}</th>
                    <th hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{i18n.t('Kepala/Buntut')}</th>
                    <th hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{i18n.t('Jenis Sparepart')}</th>
                    <th hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{i18n.t('Asset Sparepart')}</th>
                    <th>{i18n.t('Amount')}</th>
                    <th>{i18n.t('label_NOTE')}</th>
                    <th>{i18n.t('COA')}</th>
                    </tr>
                    <tbody>
                        {
                            InputListItem.map((x, i) => {
                                return (
                                    <tr>
                                        <td hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','invoiceitemtable')}>{x.idinvoiceitem}</td>
                                        <td hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','paymentitemtable')}>{x.idpaymentitem}</td>
                                        <td hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{x.idasset}</td>
                                        <td hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{x.sparepartassettype}</td>
                                        <td hidden={checkCategory(value.idpaymenttype?value.idpaymenttype:'','asset')}>{x.idassetsparepart}</td>
                                        <td>{numToMoney(parseFloat(x.amount))}</td>
                                        <td>{x.catatan}</td>
                                        <td>{x.idcoa}</td>
                                    </tr>

                                )
                            })
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
                            <MenuItem hidden={IsDisableBtn || !isGetPermissions(editPengeluaranKasBank_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpengeluarankasbank+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={IsDisableBtn || !isGetPermissions(deletePengeluaranKasBank_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            
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
