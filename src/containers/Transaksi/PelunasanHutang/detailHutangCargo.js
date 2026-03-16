import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../components/Layout/ContentWrapper';
  import ContentHeading               from '../../../components/Layout/ContentHeading';
  import {
  Container, Card, CardBody
  , Button, CardHeader,Input
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
  import { addPelunasanHutang_Permission,MenuPelunasanHutang } from '../../shared/permissionMenu';
  import moment                          from 'moment';
  import { formatdate } from '../../shared/constantValue';
  import { Formik } from 'formik';
  import momentLocalizer from 'react-widgets-moment';
    import {DatePicker } from 'react-widgets';
    import "react-widgets/dist/css/react-widgets.css";

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuPelunasanHutang,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    momentLocalizer();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [InputNotes, setInputNotes] = useState('');
    const [InputDates, setInputDates] = useState(new Date());
    const [ErrInputDates, setErrInputDates] = useState('');

    const [InputAmount, setInputAmount] = useState(0);
    const [ErrInputAmount, setErrInputAmount] = useState('');

    const [InputKurangBayar, setInputKurangBayar] = useState(0);
    const [ShowBayar, setShowBayar] = useState(false);

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
        dispatch(actions.getPelunasanHutangData( {url:'/detailhutangcargo/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        setValue(data.data);
        let det = data.data;
        
        let outstanding = det.detailCargo?(parseFloat(det.detailCargo.outstanding) > 1 ? det.detailCargo.outstanding:0) :0
        setInputKurangBayar(outstanding);
        setLoading(false);
    }


    const succesHandlerSubmit = (data) => {
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

    function errorHandler(data,propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }



    const getListPembayaran = (items,outstanding) => {
        let row = [];
        let totalbayar = 0;
        for(let i=0; i < items.length; i++){
            let det = items[i];
            totalbayar += det.amount;
                row.push(
                    <div className="row mt-3">
                    <span className="col-md-5">{'Pembayaran tanggal '+(det.date?moment(det.date).format(formatdate):'')}</span>
                        <strong className="col-md-7">
                        {det.amount?'('+numToMoney(det.amount)+')':''}
                        </strong>
                    </div>
                );
            }
        // let kurangbayar = totalnota - totalbayar;
        row.push(
            <div className="row mt-3">
            <span className="col-md-5">{'Kurang Bayar'}</span>
                <strong className="col-md-7">
                {outstanding > 1?numToMoney(outstanding):'0'}
                </strong>
            </div>
        );
            
        return row;
    }


    const handleChangeDate = (data) => {
            //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setInputDates(datetrans)
        } else {
            setInputDates(null)
        }
    }

    function cancelBayar() {
        setInputAmount(0);
        setInputDates(new Date());
        setInputNotes('');
        setShowBayar(false);
    }
    function clickBayar() {
        setShowBayar(true);
        setOpen(false);
    }
    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrInputAmount('');
        setErrInputDates('');
        let amount = new String(values.amount).replaceAll('.','');
        if(amount == ''){
            setErrInputAmount(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(parseFloat(amount) == 0){
                setErrInputAmount(i18n.t('Harus Lebih besar dari 0'));
                flag = false;
            }else if(parseFloat(amount) > parseFloat(InputKurangBayar)) {
                setErrInputAmount(i18n.t('Jumlah bayar melebihi jumlah kurang bayar'));
                flag = false;
            }
        }
        if(InputDates == null){
            setErrInputDates(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            let obj = new Object();
            obj.idpurchasereceive = null;
            obj.idcargo = value.detailCargo.id;
            obj.date = InputDates.getTime();
            obj.amount = new String(values.amount).replaceAll('.','');
            obj.notes = values.notes;
            setLoading(true);
            dispatch(actions.submitPelunasanHutang({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }
    }

    const submitHandler = (values) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit(values);
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailhutangcargo+'/'+id} label={'Detail Hutang Cargo'} labeldefault={'Detail Hutang Cargo'} />
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
                            (value.detailCargo?value.detailCargo.invoicenumber:'') :
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
                            <span className="col-md-5">{i18n.t('No Invoice Cargo')}</span>
                            <strong className="col-md-7">
                                {value.detailCargo?value.detailCargo.invoicenumber:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Vendor')}</span>
                            <strong className="col-md-7">
                                {value.detailCargo?value.detailCargo.vendorAlias:''}
                            </strong>
                            </div>


                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                            <strong className="col-md-7">
                                {value.detailCargo?(value.detailCargo.date?moment(value.detailCargo.date).format(formatdate):""):''}
                            </strong>
                            </div>
                            

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Total Amount')}</span>
                                <strong className="col-md-7">
                                {value.detailCargo ?'('+numToMoney(value.detailCargo.netamount)+')':''}
                                </strong>
                            </div>


                            {getListPembayaran((value.listpembayaran?value.listpembayaran:[]) , (value.detailCargo?value.detailCargo.outstanding:0))}

                            
                        </section>
                    )
                }
            </CardBody>
            </Card>
            </div>

            <div hidden={!ShowBayar} style={{marginLeft:'150px'}} className="mt-2 col-lg-4 ft-detail mb-3">
            <Card outline color="primary" className="mb-3" style={{width:"150%"}}>
            <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Bayar'}</CardHeader>
            <CardBody>
                <Formik
                     initialValues={
                        {
                            notes: InputNotes,
                            amount:InputAmount,
                            date:InputDates
                        }
                    }
                    validate={values => {
                        const errors = {};
                        setInputNotes(values.notes);
                        setInputAmount(values.amount);
                        return errors;
                    }}
                    enableReinitialize="true"
                    onSubmit={(values) => {
        
                    }}
                >
                    {
                        formikProps => {
                            const {
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldTouched,
                                setFieldValue,
                            } = formikProps;
                            return (
                                <form className="mb-6" onSubmit={handleSubmit} name="FormProduct">
                                    <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="date">
                                        {i18n.t('Tanggal')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DatePicker
                                            name="date"
                                            onChange={val => handleChangeDate(val)}
                                            format={formatdate}
                                            value={values.date}
                                            style={{width:'200%'}}
                                            
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputDates}</div>
                                        <label className="mt-3 form-label required" htmlFor="amount">
                                            {i18n.t('Bayar')}
                                        </label>
                                        <Input
                                            name="amount"
                                            type="text"
                                            id="amount"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.amount !== ''?numToMoney(parseFloat(new String(values.amount).replaceAll('.',''))):''}
                                            style={{width:'200%'}}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputAmount}</div>

                                        <label className="mt-3 form-label required" htmlFor="nama">
                                            {i18n.t('Note')}
                                        </label>
                                        <Input
                                            name="notes"
                                            type="text"
                                            id="notes"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.notes}
                                            style={{width:'200%'}}
                                        />
                                    </div>
                                    </div>

                                    <div className="row justify-content-center" style={{ marginTop: '-30px', marginBottom: '20px' }}>
                                    <Button
                                        // disabled={props.activeStep === 0}
                                        // style={{marginLeft:"20%"}}
                                        onClick={() => cancelBayar()}
                                    >
                                        {/* {i18n.t('common.BACK')} */}
                                        {'Cancel'}
                                    </Button>
    
                                    <Button
                                        // style={{marginLeft:"1%"}}
                                        color={'primary'}
                                        onClick={() => submitHandler(values)}
                                    >
                                        {'Submit'}
                                    </Button>
                                </div>
                                </form>
                            )
                        }
                    }
                </Formik>
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
                            <MenuItem hidden={!isGetPermissions(addPelunasanHutang_Permission,'TRANSACTION')?true:InputKurangBayar == 0}  onClick={() => clickBayar()}>{i18n.t('Bayar')}</MenuItem>
                            {/* <MenuItem hidden={!isGetPermissions(deleteDeposit_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem> */}
                            
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