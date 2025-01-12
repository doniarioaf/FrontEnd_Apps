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
  import { editCargo_Permission,deleteCargo_Permission,MenuCargo, addCargo_Permission } from '../../shared/permissionMenu';
  import moment                          from 'moment';
  import { formatdate, formatdatetime } from '../../shared/constantValue';
  import Grid from '../../../components/TableGrid';

  import DialogUploadFile from './dialogUploadFile';
  import styled                       from "styled-components";
  import Dialog                       from '@material-ui/core/Dialog';

  const StyledDialog = styled(Dialog)`
    & > .MuiDialog-container > .MuiPaper-root {
        height: 500px;
    }
    `;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuCargo,'READ');
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

    
    const [ShowDialog, setShowDialog] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns] = useState([
            { name: 'id', title: 'id' },
            { name: 'file', title: i18n.t('File') },
        ]);
    const [tableColumnExtensions] = useState([]);

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
        dispatch(actions.getCargoData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        setValue(data.data);
        if(data.data){
            const theData = data.data.listDoc.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'file': el.filename,
                }
            ], []);
            setRows(theData);
        }
         
       
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
                dispatch(actions.submitCargo( {url:'/'+id,type:'DELETE'} ,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menucargo);
            }
        })
    }

    const succesHandlerSubmitFile = (data) => {
        setLoading(false);
        setShowDialog(false);
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

    // function downloadFile(){
    //     setLoading(true);
    //     dispatch(actions.getCargoData( {url:'/downloadfile/'+id},successHandlerDownload, errorHandler));
    // }
    function successHandlerDownload(data,propsdata) {
        let det = data.data;

        let contenttype = det.filecontenttype;
        if(contenttype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            contenttype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        }
        var base64str = det.filedocument;

        // decode base64 string, remove space for IE compatibility
        var binary = window.atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view,{ type: contenttype }]);
        var dataUrl = URL.createObjectURL(blob);

        var fileLink = document.createElement('a');
        fileLink.href = dataUrl;

        // it forces the name of the downloaded file
        fileLink.download = det.filename;
        fileLink.click();
        fileLink.remove();

        setLoading(false);

    }

    function onClickAdd() {
        setShowDialog(true);
    }
    function onClickView(id) {
        // history.push(pathmenu.detailWorkOrder+'/'+id);
    }
    function onClickDelete(id) {
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
                dispatch(actions.submitCargo({ url: '/deletefile/'+id, type: 'ADD' }, succesHandlerSubmitFile, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
        
    }

    function onClickDownload(idval) {
        setLoading(true);
        dispatch(actions.getCargoData( {url:'/downloadfile/'+idval},successHandlerDownload, errorHandler));
        
    }


    function errorHandler(data,propsdata) {
        setShowDialog(false);
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailcargo+'/'+id} label={'Detail'} labeldefault={'Detail'} />
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
                            value.vendorNama :
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
                            <span className="col-md-5">{i18n.t('Vendor')}</span>
                            <strong className="col-md-7">
                                {value.vendorNama?value.vendorNama:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                            <strong className="col-md-7">
                                {value.date?moment(value.date).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Invoice Number')}</span>
                            <strong className="col-md-7">
                                {value.invoicenumber?value.invoicenumber:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('SMU')}</span>
                            <strong className="col-md-7">
                                {value.smunumber?value.smunumber:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('AWB')}</span>
                            <strong className="col-md-7">
                                {value.awbnumber?value.awbnumber:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Koli')}</span>
                            <strong className="col-md-7">
                                {value.koli?value.koli:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Amount')}</span>
                                <strong className="col-md-7">
                                {value.grossamount ?numToMoney(value.grossamount):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('PPN Amount')}</span>
                                <strong className="col-md-7">
                                {value.ppnamount ?numToMoney(value.ppnamount):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('PPN23 Amount')}</span>
                                <strong className="col-md-7">
                                {value.ppn23amount ?numToMoney(value.ppn23amount):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Net Amount')}</span>
                                <strong className="col-md-7">
                                {value.netamount ?numToMoney(value.netamount):''}
                                </strong>
                            </div>

                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('File')}</span>
                                <strong className="col-md-7" onClick={() => downloadFile()} style={{cursor:'pointer',color:'blue'}} >
                                {value.fileName ?value.fileName:''}
                                </strong>
                            </div> */}

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

            <Container fluid className="center-parent">
            <div className="table-responsive">
            <Grid
                rows={rows}
                columns={columns}
                totalCounts={rows.length}
                loading={loading}
                columnextension={tableColumnExtensions}
                permissionadd={!isGetPermissions(addCargo_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                // permissionview={true}
                // onclickview={onClickView}
                onclickdownload={onClickDownload}
                permissiondownload={!isGetPermissions(addCargo_Permission,'READ')}
                permissiondelete={!isGetPermissions(addCargo_Permission,'TRANSACTION')}
                onclickdelete={onClickDelete}
                listfilterdisabled={['tanggal']}
                width={120}
            />
            </div>
            </Container>

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
                            <MenuItem hidden={!isGetPermissions(editCargo_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editcargo+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteCargo_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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

            <StyledDialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth={true}
                style={{height: '80%'}}
                open={ShowDialog}
            >
                <DialogUploadFile
                    showflag = {setShowDialog}
                    flagloadingsend = {setLoadingSend}
                    errorhandler = {errorHandler}
                    idparam = {id}
                    handlesubmit = {succesHandlerSubmitFile}
                    // getAutoDebitid= {getAutoDebitid}
                />
                {LoadingSend && <Loading/>}
            </StyledDialog>
        </ContentWrapper>
    )
  }
  export default Detail;