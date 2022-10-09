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
  import { isGetPermissions,reloadToHomeNotAuthorize ,numToMoney} from '../shared/globalFunc';
  import { deletePriceList_Permission,editPriceList_Permission,MenuPriceList } from '../shared/permissionMenu';


import Tabs            from '@material-ui/core/Tabs';
import Tab             from '@material-ui/core/Tab';
import TabPanel        from '../../components/Common/TabPanel';
import SwipeableViews  from 'react-swipeable-views';

// import IndexjalurHijau                        from './indexjalurHijau';
// import IndexjalurMerah                        from './indexjalurMerah';
import '../CSS/table.css';
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  function Detail(props) {
    reloadToHomeNotAuthorize(MenuPriceList,'READ');
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
    const [InputListHijau, setInputListHijau] = useState([]);
    const [InputListMerah, setInputListMerah] = useState([]);


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
        dispatch(actions.getPriceListData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            let det = data.data;
            setValue(det);

            let details = det.details;
            let listfilterhijau = details.filter(output => output.jalur == 'HIJAU');
            let listhijau = [];
            if(listfilterhijau.length > 0){
                for(let i =0; i < listfilterhijau.length; i++){
                    let detlist = listfilterhijau[i];
                    listhijau.push({"warehouse":detlist.warehouseName,"invoicetype":detlist.invoicetypename, "price":detlist.price ,"ismandatory":detlist.ismandatory == 'Y'?'Yes':'No',"jalur":"HIJAU"});
                }
            }
            setInputListHijau(listhijau);

            let listfiltermerah = details.filter(output => output.jalur == 'MERAH');
            let listmerah = [];
            if(listfiltermerah.length > 0){
                for(let i =0; i < listfiltermerah.length; i++){
                    let detlist = listfiltermerah[i];
                    listmerah.push({"warehouse":detlist.warehouseName,"invoicetype":detlist.invoicetypename, "price":detlist.price ,"ismandatory":detlist.ismandatory == 'Y'?'Yes':'No',"jalur":"MERAH"});
                }
            }
            setInputListMerah(listmerah);
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
                dispatch(actions.submitDeletePriceList('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuPriceList);
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
            <ContentHeading history={history} link={pathmenu.detailpricelist+'/'+id} label={'Detail Price List'} labeldefault={'Detail Price List'} />
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
                            <span className="col-md-5">{i18n.t('label_NO_DOCUMENT')}</span>
                            <strong className="col-md-7">
                                {value.nodocument?value.nodocument:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CUSTOMER')}</span>
                            <strong className="col-md-7">
                                {value.namacustomer?value.namacustomer:''}
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
            </Card>

            <div className="row mt-3" style={{padding: '0 15px 0 15px'}}>
            <Paper style={{flexGrow: 1}}>
            <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label={i18n.t('Hijau') }/>
                <Tab label={i18n.t('Merah') }/>
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
            <table id="tablegrid">
            <tbody>
            <tr>
                <th>{i18n.t('label_WAREHOUSE')}</th>
                <th>{i18n.t('Jasa')}</th>
                <th>{i18n.t('label_PRICE')}</th>
                <th>{i18n.t('Is Mandatory')}</th>
            </tr>
            {
                InputListHijau.map((x, i) => {
                    return (
                    <tr>
                        <td>{x.warehouse}</td>
                        <td>{x.invoicetype}</td>
                        <td>{numToMoney(parseFloat(x.price))}</td>
                        <td>{x.ismandatory}</td>
                    </tr>
                    )
                })
            }
            </tbody>
            </table>
            </TabPanel>

            <TabPanel index={tabValue} value={1}>
            <table id="tablegrid">
            <tbody>
            <tr>
                <th>{i18n.t('label_WAREHOUSE')}</th>
                <th>{i18n.t('Jasa')}</th>
                <th>{i18n.t('label_PRICE')}</th>
                <th>{i18n.t('Is Mandatory')}</th>
            </tr>
            {
                InputListMerah.map((x, i) => {
                    return (
                    <tr>
                        <td>{x.warehouse}</td>
                        <td>{x.invoicetype}</td>
                        <td>{numToMoney(parseFloat(x.price))}</td>
                        <td>{x.ismandatory}</td>
                    </tr>
                    )
                })
            }
            </tbody>
            </table>
            </TabPanel>
        </SwipeableViews>
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
                            <MenuItem hidden={!isGetPermissions(editPriceList_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editpricelist+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            {/* <MenuItem hidden={!isGetPermissions(deletePartai_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem> */}
                            
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