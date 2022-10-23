import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
  import ContentHeading               from '../../../../components/Layout/ContentHeading';
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
//   import styled                       from "styled-components";
//   import Dialog                       from '@material-ui/core/Dialog';
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
  import { isGetPermissions,reloadToHomeNotAuthorize } from '../../../shared/globalFunc';
  import { editWorkOrder_Permission,deleteWorkOrder_Permission,MenuWorkOrder } from '../../../shared/permissionMenu';
  import moment                       from "moment/moment";
  import '../../../CSS/table.css';
  import { formatdate } from '../../../shared/constantValue';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuWorkOrder,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);

    const [InputListItem, setInputListItem] = useState([{ idpartai:"",jumlahkoli: "",jumlahkg:"",nocontainer:"",noseal:"",barang:""}]);

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
        dispatch(actions.getWorkOrderData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data);

        let listitems = [];
        if(data.data.details){
            for(let i=0; i < data.data.details.length; i++){
                let det = data.data.details[i];
                listitems.push({ idpartai:det.partainame,jumlahkoli: det.jumlahkoli,jumlahkg:det.jumlahkg,nocontainer:det.nocontainer,noseal:det.noseal,barang:det.barang});
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
                dispatch(actions.submitDeleteWorkOrder('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuWorkOrder);
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
            <ContentHeading history={history} link={pathmenu.detailWorkOrder+'/'+id} label={'Detail Work Order'} labeldefault={'Detail Work Order'} />
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
                            <span className="col-md-5">{i18n.t('label_WO_NUMBER')}</span>
                            <strong className="col-md-7">
                                {value.nodocument?value.nodocument:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DATE')}</span>
                            <strong className="col-md-7">
                            {value.tanggal?moment (new Date(value.tanggal)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CUSTOMER')}</span>
                            <strong className="col-md-7">
                                {value.namaCustomer?value.namaCustomer:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Status')}</span>
                            <strong className="col-md-7">
                                {value.status?value.status:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CARGO_NAME')}</span>
                            <strong className="col-md-7">
                                {value.namacargo?value.namacargo:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_WO_TYPE')}</span>
                            <strong className="col-md-7">
                                {value.jeniswoCodeName?value.jeniswoCodeName:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_MODA_TRANSPORTAION')}</span>
                            <strong className="col-md-7">
                                {value.modatransportasiCodeName?value.modatransportasiCodeName:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('ETD')}</span>
                            <strong className="col-md-7">
                            {value.etd?moment (new Date(value.etd)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('ETA')}</span>
                            <strong className="col-md-7">
                            {value.eta?moment (new Date(value.eta)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Port Asal')}</span>
                            <strong className="col-md-7">
                                {value.portasalname?value.portasalname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Port Tujuan')}</span>
                            <strong className="col-md-7">
                                {value.porttujuanname?value.porttujuanname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Penjaluran')}</span>
                            <strong className="col-md-7">
                                {value.jalurCodeName?value.jalurCodeName:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_AJU_NUMBER')}</span>
                            <strong className="col-md-7">
                                {value.noaju?value.noaju:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('NOPEN')}</span>
                            <strong className="col-md-7">
                                {value.nopen?value.nopen:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NOPEN_DATE')}</span>
                            <strong className="col-md-7">
                            {value.tanggalnopen?moment (new Date(value.tanggalnopen)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_BL_NUMBER')}</span>
                            <strong className="col-md-7">
                                {value.nobl?value.nobl:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_BL_DATE')}</span>
                            <strong className="col-md-7">
                            {value.tanggalbl?moment (new Date(value.tanggalbl)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Pelayaran')}</span>
                            <strong className="col-md-7">
                                {value.pelayaranname?value.pelayaranname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Importir')}</span>
                            <strong className="col-md-7">
                                {value.importirname?value.importirname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Eksportir')}</span>
                            <strong className="col-md-7">
                                {value.eksportirname?value.eksportirname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('QQ')}</span>
                            <strong className="col-md-7">
                                {value.qqname?value.qqname:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_VOYAGE_NUMBER')}</span>
                            <strong className="col-md-7">
                                {value.voyagenumber?value.voyagenumber:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_SPPB_NPE_DATE')}</span>
                            <strong className="col-md-7">
                            {value.tanggalsppb_npe?moment (new Date(value.tanggalsppb_npe)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Depo')}</span>
                            <strong className="col-md-7">
                                {value.depo?value.depo:''}
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
                    <th>{i18n.t('Partai')}</th>
                    <th>{i18n.t('Jumlah Koli')}</th>
                    <th>{i18n.t('Jumlah Kg')}</th>
                    <th>{i18n.t('No Container')}</th>
                    <th>{i18n.t('No Seal')}</th>
                    <th>{i18n.t('Barang')}</th>
                    </tr>
                    <tbody>
                        {
                            InputListItem.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.idpartai}</td>
                                        <td>{x.jumlahkoli}</td>
                                        <td>{x.jumlahkg}</td>
                                        <td>{x.nocontainer}</td>
                                        <td>{x.noseal}</td>
                                        <td>{x.barang}</td>
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
                            <MenuItem hidden={!isGetPermissions(editWorkOrder_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editWorkOrder+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteWorkOrder_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            
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