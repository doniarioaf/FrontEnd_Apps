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
  import { editPenerimaanKasBank_Permission,deletePenerimaanKasBank_Permission,MenuPenerimaanKasBank} from '../shared/permissionMenu';
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
    reloadToHomeNotAuthorize(MenuPenerimaanKasBank,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idcoa:"",catatan: "",amount:"",isdownpayment:"",idinvoice:"",nodocinv:"",idworkorder:"",nodocwo:"",penyesuaian:"",ketpenyesuaian:""}]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [IsDisableBtn, setIsDisableBtn] = useState(false);

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
        dispatch(actions.getPenerimaanKasBankData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data);
        setIsDisableBtn(data.data.disablededitordelete?true:false);
        let listitems = [];
        if(data.data.details){
            for(let i=0; i < data.data.details.length; i++){
                let det = data.data.details[i];
                listitems.push({ idcoa:det.coaname,catatan: det.catatan,amount:det.amount,isdownpayment:(det.isdownpayment == 'Y'?'Yes':'No'),idinvoice:det.idinvoice,nodocinv:det.nodocinvoice,idworkorder:det.idworkorder,nodocwo:det.nodocworkorder,penyesuaian:(det.penyesuaian ?det.penyesuaian:0),ketpenyesuaian:det.keterangan_penyesuaian});
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
                dispatch(actions.submitDeletePenerimaanKasBank('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuPenerimaanKasBank);
            }
        })
    }

    const getReceiveFromName = (data) =>{
        if(data.idreceivetype){
            if(data.idreceivetype == 'EMPLOYEE'){
                return data.employeeName?data.employeeName:''
            }else if(data.idreceivetype == 'CUSTOMER'){
                return data.customerName?data.customerName:''
            }else if(data.idreceivetype == 'VENDOR'){
                return data.vendorName?data.vendorName:''
            }else{
                return data.idreceivetype;
            }
        }
        return data.receivefrom;
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
            <ContentHeading history={history} link={pathmenu.detailpenerimaankasbank+'/'+id} label={'Detail Penerimaan Kas/Bank'} labeldefault={'Detail Penerimaan Kas/Bank'} />
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
                            <span className="col-md-5">{i18n.t('label_RECEIVE_DATE')}</span>
                            <strong className="col-md-7">
                            {value.receivedate?moment (new Date(value.receivedate)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_RECEIVE_FROM')}</span>
                            <strong className="col-md-7">
                                {getReceiveFromName(value)}
                                {/* {value.receivefrom?value.receivefrom:''} */}
                            </strong>
                            </div>

                            <div className="row mt-3" hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>
                            <span className="col-md-5">{i18n.t('Work Order')}</span>
                            <strong className="col-md-7">
                                {InputListItem.length > 0?InputListItem[0].nodocwo:''}
                            </strong>
                            </div>

                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('COA')}</span>
                            <strong className="col-md-7">
                                {value.coaName?value.coaName:''}
                            </strong>
                            </div> */}

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
                        <th>{i18n.t('Transaksi')}</th>
                        {/* <th>{i18n.t('label_NOTE')}</th> */}
                        <th>{i18n.t('Amount')}</th>
                        {/* <th>{i18n.t('DP')}</th> */}
                        {/* <th hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{i18n.t('label_WO_NUMBER')}</th> */}
                        <th hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{i18n.t('Penyeseuaian')}</th>
                        <th hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{i18n.t('Ket. Penyeseuaian')}</th>
                        <th hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{i18n.t('Invoice Number')}</th>
                    </tr>
                    {/* //penyesuaian:"",ketpenyesuaian:"" */}
                    <tbody>
                        {
                            InputListItem.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.idcoa}</td>
                                        {/* <td>{x.catatan}</td> */}
                                        <td>{numToMoney(parseFloat(x.amount))}</td>
                                        {/* <td>{x.isdownpayment}</td> */}
                                        {/* <td hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{x.nodocwo}</td> */}
                                        <td hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{numToMoney(parseFloat(x.penyesuaian))}</td>
                                        <td hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{x.ketpenyesuaian}</td>
                                        <td hidden={value.idreceivetype?(value.idreceivetype == "EMPLOYEE" || value.idreceivetype == "VENDOR"):false}>{x.nodocinv}</td>
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
                            <MenuItem hidden={IsDisableBtn || !isGetPermissions(editPenerimaanKasBank_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpenerimaankasbank+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={IsDisableBtn || !isGetPermissions(deletePenerimaanKasBank_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            
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
