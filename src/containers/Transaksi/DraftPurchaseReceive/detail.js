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
  import { MenuDraftPurchaseReceive, deleteDraftPurchaseReceive_Permission, editDraftPurchaseReceive_Permission } from '../../shared/permissionMenu';
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
    reloadToHomeNotAuthorize(MenuDraftPurchaseReceive,'READ');
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

    const [ListCategory, setListCategory] = useState([]);
    const [ListItemHidup, setListItemHidup] = useState([]);
    const [ListItemMati, setListItemMati] = useState([]);

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
        dispatch(actions.getDraftPurchaseReceiveData( {url:'/'+id},successHandler, errorHandler));
    }, []);

    function successHandler(data,propsdata) {
        let det = data.data;
        setValue(det);

        let listItems = det.items?det.items:[];
        let listfilteroutputHidup = listItems.filter(output => output.type == 'H');
        let listfilteroutputMati = listItems.filter(output => output.type == 'M');
        // setListItemHidup(listfilteroutputHidup);
        // setListItemMati(listfilteroutputMati);

        let listCP = [];
        let listNo = [];
        let arrDistinctCP = [];
        for(let i =0; i < listfilteroutputHidup.length; i++){
            let el = listfilteroutputHidup[i];
            let idcategoryproduct = el.idcategoryproduct;
            let boxsequence = el.boxsequence;
            if(listNo.indexOf(boxsequence) == -1){
                listNo.push(boxsequence);
            }
            if(arrDistinctCP.indexOf(idcategoryproduct) == -1){
                let listfilteroutput = listfilteroutputHidup.filter(output => output.idcategoryproduct == idcategoryproduct);
                let totalekor = 0;
                let totalkg = 0;
                for(let x =0; x < listfilteroutput.length; x++){
                    let det = listfilteroutput[x];
                    let jumlahekor = det.ekor?parseInt(det.ekor):0;
                    let jumlahkilo = det.kilo?parseInt(det.kilo):0;

                    totalekor += jumlahekor;
                    totalkg += jumlahkilo;
                }
                listCP.push(
                    {
                        'idcategoryproduct': el.idcategoryproduct,
                        'size': el.sizecategoryproduct,
                        'weight': el.weightfromingramcategoryproduct+'-'+el.weighttoingramcategoryproduct+' Gram',
                        'listtotal':[{label:'Total Ekor',code:'totalekor',total:totalekor},{label:'Total Kg',code:'totalkg',total:totalkg}]
                    }
                );
                arrDistinctCP.push(idcategoryproduct);
            }
        }

        setListCategory(listCP);

        let listitemshidup = [];
        for(let i =0; i < listNo.length; i++){
            let boxseq = listNo[i];
            let temp = [];
            let listfilteroutput = listfilteroutputHidup.filter(output => output.boxsequence == boxseq);
            for(let x =0; x < listfilteroutput.length; x++){
                let det = listfilteroutput[x];
                temp.push(
                    {
                        'idproduct': det.idproduct,
                        'idcategoryproduct': det.idcategoryproduct,
                        'jumlah':det.ekor?det.ekor:0,
                        'jumlahtype':'EKOR'
                    }
                );
    
                temp.push(
                    {
                        'idproduct': det.idproduct,
                        'idcategoryproduct': det.idcategoryproduct,
                        'jumlah':det.kilo?det.kilo:0,
                        'jumlahtype':'KG'
                    }
                );
            }
            listitemshidup.push(
                {
                    'no':boxseq,
                    'items':temp
                }
            )
        }

        
        setListItemHidup(listitemshidup);

        let listNoMati = [];
        let listitemsMati = [];
        for(let i =0; i < listfilteroutputMati.length; i++){
            let el = listfilteroutputMati[i];
            let boxsequence = el.boxsequence;
            if(listNoMati.indexOf(boxsequence) == -1){
                listNoMati.push(boxsequence);
            }
        }
        for(let i =0; i < listNoMati.length; i++){
            let boxseq = listNoMati[i];
            let temp = [];
            let listfilteroutput = listfilteroutputMati.filter(output => output.boxsequence == boxseq);
            for(let x =0; x < listfilteroutput.length; x++){
                let det = listfilteroutput[x];
                temp.push(
                    {
                        'idproduct': det.idproduct,
                        'idcategoryproduct': det.idcategoryproduct,
                        'jumlah':det.ekor?det.ekor:0,
                    }
                );
            }
            listitemsMati.push(
                {
                    'items':temp
                }
            )
        }
        setListItemMati(listitemsMati);

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
                dispatch(actions.submitDraftPurchaseReceive( {url:'/'+id,type:'DELETE'} ,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menudraftpurchasereceive);
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
            <ContentHeading history={history} link={pathmenu.detaildraftpurchasereceive+'/'+id} label={'Detail'} labeldefault={'Detail'} />
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
                            <span className="col-md-5">{i18n.t('Tanggal')}</span>
                            <strong className="col-md-7">
                                {value.date ?moment (new Date(value.date)).format(formatdate):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('SMU')}</span>
                            <strong className="col-md-7">
                                {value.smu?value.smu:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Flight No')}</span>
                            <strong className="col-md-7">
                                {value.flightno?value.flightno:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Notes 1')}</span>
                            <strong className="col-md-7">
                                {value.notes1?value.notes1:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Notes 2')}</span>
                            <strong className="col-md-7">
                                {value.notes2?value.notes2:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Vendor')}</span>
                                <strong className="col-md-7">
                                {value.vendorName ?value.vendorName:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Arrival Time')}</span>
                                <strong className="col-md-7">
                                {value.arriveltime ?value.arriveltime:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Receive Time')}</span>
                                <strong className="col-md-7">
                                {value.receivetime ?value.receivetime:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Total Ekor')}</span>
                                <strong className="col-md-7">
                                {value.totalekor ?value.totalekor:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Total Kg')}</span>
                                <strong className="col-md-7">
                                {value.totalkg ?value.totalkg:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Persentase')}</span>
                                <strong className="col-md-7">
                                {value.persentase ?value.persentase:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CREATED_DATE')}</span>
                                <strong className="col-md-7">
                                {value.createddate ?moment (new Date(value.createddate)).format(formatdatetime):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CREATED')}</span>
                                <strong className="col-md-7">
                                {value.createdbyName ?value.createdbyName:''}
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
                <div hidden={ListCategory.length == 0}  className="row justify-content-center">
                <h4>{'List Item'}</h4>
                <div style={{overflowX:'auto'}}>
                <table id="tablegrid" style={{tableLayout:'fixed'}}>
                    <tbody>
                        <tr>
                            {
                                ListCategory.map((x, i) => {
                                    return(
                                        <th colSpan={2} style={{textAlign:'center',width:'230px'}}>{i18n.t(x.size)} <br></br>{x.weight} </th>
                                    )
                                })
                            }
                        </tr>
                        <tr>
                            {
                                ListCategory.map((x, i) => {
                                    return(
                                        x.listtotal.map((xx, ii) => {
                                            return(
                                                <td width={'50%'}>{xx.label+' : '+xx.total} </td>
                                            )
                                            
                                        })
                                    )
                                })
                            }
                        </tr>
                        {
                            ListItemHidup.map((x, i) => {
                                return (
                                <tr>
                                    {
                                        x.items.map((xx, ii) => {
                                            return(
                                                <td >
                                                    {xx.jumlah?xx.jumlah:0}
                                                </td>
                                            )
                                        })   
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                </div>
                </div>
            }

            {
                <div hidden={ListCategory.length == 0}  className="row justify-content-center">
                <h4>{'List Item Mati'}</h4>
                <div style={{overflowX:'auto'}}>
                <table id="tablegrid" style={{tableLayout:'fixed'}}>
                <tbody>
                <tr>
                    {
                        ListCategory.map((x, i) => {
                            return(
                                <th style={{textAlign:'center',width:'230px'}}>{i18n.t(x.size)} <br></br>{x.weight} </th>
                            )
                        })
                    }
                </tr>

                {
                    ListItemMati.map((x, i) => {
                        return (
                            <tr>
                                {
                                        x.items.map((xx, ii) => {
                                            return(
                                                <td >
                                                    {xx.jumlah?xx.jumlah:0}
                                                </td>
                                            )
                                        })   
                                    }
                            </tr>
                        )
                    })   
                }
                </tbody>
                </table>
                </div>
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
                            <MenuItem hidden={!isGetPermissions(editDraftPurchaseReceive_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editdraftpurchasereceive+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteDraftPurchaseReceive_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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