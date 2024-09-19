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
  import { isGetPermissions,reloadToHomeNotAuthorize } from '../shared/globalFunc';
  import { printSuratJalan_Permission,editSuratJalan_Permission,deleteSuratJalan_Permission,editStatusSuratJalan_Permission,MenuSuratJalan } from '../shared/permissionMenu';
  import { formatdate,formatdatetime } from '../shared/constantValue';
  import moment                       from "moment/moment";
   
import Tabs            from '@material-ui/core/Tabs';
import Tab             from '@material-ui/core/Tab';
import TabPanel        from '../../components/Common/TabPanel';
import SwipeableViews  from 'react-swipeable-views';

import DialogStatus from './dialogStatus';
import styled                       from "styled-components";
import Dialog                       from '@material-ui/core/Dialog';

import Grid                         from '../../components/TableGrid';

//Live Demo = http://raw.githack.com/MrRio/jsPDF/master/index.html
// https://www.npmjs.com/package/jspdf
import { jsPDF } from "jspdf";
import Iframe from './Iframe';

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
    reloadToHomeNotAuthorize(MenuSuratJalan,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [tabValue, setTabValue] = useState(0);

    const [ShowStatus, setShowStatus] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);
    const [IsReady, setIsReady] = useState(false);

    const [rows, setRows] = useState([]);
    const [columns,Setcolumns] = useState([
        {name: 'id', title: 'id'},
        {name: 'status', title: 'Status'},
        {name: 'tanggal', title: i18n.t('label_DATE')}
    ]);
    const [tableColumnExtensions] = useState([]);

    const [PdfHtml, setPdfHtml] = useState("");

    const id = props.match.params.id;

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    function handleChangeTabIndex(index) {
        setTabValue(index);
    }


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
        dispatch(actions.getSuratJalanData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        let det = data.data;
        let template = det.template;
        setValue(det);

        if(det.history){
            const theData = data.data.history.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'status': getStatusEmp(el.status ?el.status:'',template.statusSJOptions?template.statusSJOptions:[]),
                    'tanggal': el.tanggal?moment (new Date(el.tanggal)).format(formatdatetime):'',
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    const getStatusEmp = (data,statusSuratJalanOptions) => {
        if(data !== ''){
            let cek = data.includes('|');
            if(cek){
                let arr = data.split('|');
                let oldVal = arr[0];
                let OldNew = arr[1];

                let listfilterOld = statusSuratJalanOptions.filter(output => output.code == oldVal);
                if(listfilterOld.length > 0){
                    oldVal = listfilterOld[0].codename;
                }

                let listfilterNew = statusSuratJalanOptions.filter(output => output.code == OldNew);
                if(listfilterNew.length > 0){
                    OldNew = listfilterNew[0].codename;
                }

                return oldVal +' > '+OldNew
            }else{
                let listfilter = statusSuratJalanOptions.filter(output => output.code == data);
                if(listfilter.length > 0){
                    return listfilter[0].codename;
                }

                return data;
            }
        }
        return '';
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
                dispatch(actions.submitDeleteSuratJalan('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuSuratJalan);
            }
        })
    }

    const succesHandlerSubmitChangeStatus = (data) => {
        setLoading(false);
        setShowStatus(false);
        setLoadingSend(false);
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

    function errorHandler(error) {
        setLoading(false);
        setShowStatus(false);
        setLoadingSend(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    const listArrayComma = (data) => {
        let list = [];
        let cek = new String(data).includes(',');
        if(cek){
            let arrList = new String(data).split(',');
            for(let i=0; i < arrList.length; i++){
                list.push(
                    <div className="row mt-1">
                    <strong className="col-md-7">
                    {arrList[i]}
                    </strong>
                    </div>
                )
            }
        }else{
            list.push(
                <div className="row mt-1">
                <strong className="col-md-7">
                {data}
                </strong>
                </div>
            )
        }
        return list;
    }

    function onClickAdd() {
    }
    function onClickView(id) {
    }

    function testPrintPDF() {
        setIsReady(false);
        //Ukuran kertas 21,5 x14 cm

        // Landscape export, 2×4 inches
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "cm",
            format: [21.5, 14]
        });

        doc.text("Hello world!", 1, 1);
        let dataUrl = doc.output("bloburl");
        setPdfHtml(dataUrl);
        setTimeout(() => {
            setIsReady(true);
        }, 1000);
        // let iframe =  document.createElement('iframe');
        // document.body.appendChild(iframe);
        // iframe.style.display = 'none';
        // iframe.type ='application/pdf'
        // iframe.src = dataUrl;
        // iframe.onload = function() {
        // setTimeout(function() {
        //     iframe.focus();
        //     iframe.contentWindow.print();
        // }, 1);
        // };

        // doc.save("two-by-four.pdf");
        
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailSuratJalan+'/'+id} label={'Detail Surat Jalan'} labeldefault={'Detail Surat Jalan'} />
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
            {/* {
                IsReady ?
                <Iframe source={PdfHtml} />
                :""
            } */}
            
            <div className="h1 m-3 text-center">
                <h2>
                    {
                        !loading  ?
                            value.nodocument+(value.statusname?' ('+value.statusname+')':'') :
                            <Skeleton style={{maxWidth: 300}}/>
                    }
                </h2>
            </div>

            <div className="row mt-3" style={{padding: '0 15px 0 15px'}}>
            <Paper style={{flexGrow: 1}}>
            <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label={i18n.t('Work Order') }/>
                <Tab label={i18n.t('Warehouse') }/>
                <Tab label={i18n.t('Container') }/>
            </Tabs>
            </Paper>
            </div>

            <SwipeableViews
            axis={'x'}
            index={tabValue}
            onChangeIndex={handleChangeTabIndex}
            style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}
            >
                <TabPanel index={tabValue} value={0}>
                <div className="row mt-2">
                <div className="mt-2 col-lg-4 ft-detail mb-3">
                <Card outline color="primary" className="mb-3" style={{width:"125%"}}>
                <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Work Order'}</CardHeader>
                <CardBody>
                    {
                        loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                        (
                            <section>
                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_DATE')}</span>
                                    <strong className="col-md-7">
                                    {value.tanggal?moment (new Date(value.tanggal)).format(formatdate):''}
                                    </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No Surat Jalan')}</span>
                                <strong className="col-md-7">
                                    {value.nodocument?value.nodocument:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Work Order')}</span>
                                <strong className="col-md-7">
                                    {value.nodocumentWO?value.nodocumentWO:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_AJU_NUMBER')}</span>
                                <strong className="col-md-7">
                                    {value.noajuWO?value.noajuWO:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_BL_NUMBER')}</span>
                                <strong className="col-md-7">
                                    {value.noblWO?value.noblWO:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Barang')}</span>
                                <strong className="col-md-7">
                                    {value.namacargoWO?value.namacargoWO:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_CUSTOMER')}</span>
                                <strong className="col-md-7">
                                    {value.namacustomer?value.namacustomer:''}
                                </strong>
                                </div>

                                {/* <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_DESCRIPTION')}</span>
                                <strong className="col-md-7">
                                    {value.keterangan?value.keterangan:''}
                                </strong>
                                </div> */}

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_NOTE')}</span>
                                <strong className="col-md-7">
                                {value.catatan?value.catatan:''}
                                </strong>
                                </div>


                            </section>
                        )
                    }
                </CardBody>
                </Card>
                </div>
                </div>
                </TabPanel>
                <TabPanel index={tabValue} value={1}>
                <div className="row mt-2">
                <div className="mt-2 col-lg-4 ft-detail mb-3">
                <Card outline color="primary" className="mb-3" style={{width:"125%"}}>
                <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Warehouse'}</CardHeader>
                <CardBody>
                    {
                        loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                        (
                            <section>
                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_NAME')}</span>
                                <strong className="col-md-7">
                                    {value.warehousename?value.warehousename:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_CONTACT_NAME')}</span>
                                <strong className="col-md-7">
                                    {listArrayComma(value.warehousecontactname?value.warehousecontactname:'')}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_CONTACT_NUMBER')}</span>
                                <strong className="col-md-7">
                                    {listArrayComma(value.warehousecontactno?value.warehousecontactno:'')}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('label_ADDRESS')}</span>
                                <strong className="col-md-7">
                                {value.warehouseaddress?value.warehouseaddress:''}
                                </strong>
                                </div>

                                

                            </section>
                        )
                    }
                </CardBody>
                </Card>
                </div>
                </div>
                </TabPanel>
                <TabPanel index={tabValue} value={2}>
                <div className="row mt-2">
                <div className="mt-2 col-lg-4 ft-detail mb-3">
                <Card outline color="primary" className="mb-3" style={{width:"125%"}}>
                <CardHeader className="text-white bg-primary" tag="h4" >{loading ? <Skeleton/> : 'Container'}</CardHeader>
                <CardBody>
                    {
                        loading ?<Skeleton count={7} height={21} style={{marginTop: '1rem'}}/> :
                        (
                            <section>
                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('No Container')}</span>
                                <strong className="col-md-7">
                                    {value.nocantainer?value.nocantainer:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Partai')}</span>
                                <strong className="col-md-7">
                                {value.containerpartai?value.containerpartai:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Koli')}</span>
                                <strong className="col-md-7">
                                {value.containerjumlahkoli?value.containerjumlahkoli:''}
                                </strong>
                                </div>

                                <div className="row mt-3">
                                <span className="col-md-5">{i18n.t('Kg')}</span>
                                <strong className="col-md-7">
                                {value.containerjumlahkg?value.containerjumlahkg:''}
                                </strong>
                                </div>

                            </section>
                        )
                    }
                </CardBody>
                </Card>
                </div>
                </div>
                </TabPanel>
            </SwipeableViews>

            </CardBody>
            </Card>
            </Container>

            {
                value.history?
                (
                    <Container fluid className="center-parent">
                    <div className="table-responsive">
                    <div><h3>{i18n.t('History')}</h3></div>
                    <Grid
                        rows={rows}
                        columns={columns}
                        totalCounts={rows.length}
                        loading={loading}
                        columnextension={tableColumnExtensions}
                        permissionadd={true}
                        onclickadd={onClickAdd}
                        permissionview={true}
                        onclickview={onClickView}
                        listfilterdisabled={['tanggal','status']}
                    />
                    </div>
                    </Container>
                ):''
            }

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
                            {/* <MenuItem hidden={!isGetPermissions(editSuratJalan_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.printSuratJalan+'/'+id)}>{i18n.t('Surat Jalan')}</MenuItem> */}
                        </div>)
                        :(<div>
                            <MenuItem hidden={!isGetPermissions(printSuratJalan_Permission,'READ')}  onClick={() => history.push(pathmenu.printSuratJalan+'/'+id)}>{i18n.t('Print Surat Jalan')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(editStatusSuratJalan_Permission,'TRANSACTION')} onClick={() => setShowStatus(true)} >{i18n.t('Penandaan Surat Jalan')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(editSuratJalan_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editSuratJalan+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteSuratJalan_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            {/* <MenuItem  onClick={() => testPrintPDF()} >{i18n.t('Tes')}</MenuItem> */}
                            
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
                maxWidth="md"
                fullWidth={true}
                // style={{height: '100%'}}
                open={ShowStatus}
            >
                {
                    value.nodocument?
                    <DialogStatus
                    showflag = {setShowStatus}
                    flagloadingsend = {setLoadingSend}
                    errorhandler = {errorHandler}
                    idsuratjalan = {props.match.params.id}
                    handlesubmit = {succesHandlerSubmitChangeStatus}
                    status = {value.status}
                    detail = {value}
                    // getAutoDebitid= {getAutoDebitid}
                />:''
                }
                
                {LoadingSend && <Loading/>}
            </StyledDialog>
        </ContentWrapper>

        

    )

  }
  export default Detail;