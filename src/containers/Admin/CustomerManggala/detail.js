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
  import { isGetPermissions,reloadToHomeNotAuthorize } from '../../shared/globalFunc';
  import { deleteCustomerManggala_Permission,editCustomerManggala_Permission,MenuCustomerManggala } from '../../shared/permissionMenu';
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
    reloadToHomeNotAuthorize(MenuCustomerManggala,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const [InputListInfoContact, setInputListInfoContact] = useState([{ panggilan:"",namakontak: "", listnotelepon: [{notelepon:""}],email:"",noext:""}]);
    const [InputListInfoGudang, setInputListInfoGudang] = useState([{id:"", namagudang:"",areakirim: "",alamatgudang:"",ancerancer:"", listkontakgudang: [{kontakgudang:""}],listhpkontakgudang: [{hpkontakgudang:""}],note:""}]);
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
        dispatch(actions.getCustomerManggalaData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        let template = data.data.template;
        setValue(data.data);

        let listnoinfocontact = [];
            if(data.data.detailsInfoContact){
                for(let i=0; i < data.data.detailsInfoContact.length; i++){
                    let det = data.data.detailsInfoContact[i];
                    let panggilanname = det.panggilan;

                    let listfilteroutput = template.panggilanOptions.filter(output => output.code == det.panggilan);
                    if(listfilteroutput.length > 0){
                        panggilanname = listfilteroutput[0].codename;
                    }

                    let cek = new String(det.notelepon).includes(',');
                    let listnotelpinfocontact = [];
                    if(cek){
                        let arrList = new String(det.notelepon).split(',');
                        for(let j=0; j < arrList.length; j++){
                            listnotelpinfocontact.push({ notelepon: arrList[j]});
                        }
                    }else{
                        listnotelpinfocontact.push({ notelepon: det.notelepon});
                    }

                    listnoinfocontact.push({ panggilan: panggilanname,namakontak:det.namakontak,listnotelepon:listnotelpinfocontact,email:det.email,noext:det.noext});
                    
                }
            }
        setInputListInfoContact(listnoinfocontact);

        let listinfogudang = [];
        if(data.data.detailsInfoGudang){
            for(let i=0; i < data.data.detailsInfoGudang.length; i++){
                let det = data.data.detailsInfoGudang[i];

                let areakirim = det.areakirim;
                // let listfilteroutput = data.data.districtOptions.filter(output => output.dis_id == parseInt(areakirim));
                // if(listfilteroutput.length > 0){
                //     areakirim = listfilteroutput[0].dis_name;
                // }
                let cek = new String(det.kontakgudang).includes(',');
                let listkontakgudang = [];
                if(cek){
                    let arrList = new String(det.kontakgudang).split(',');
                    for(let j=0; j < arrList.length; j++){
                        listkontakgudang.push({ kontakgudang: arrList[j]});
                    }
                }else{
                    listkontakgudang.push({ kontakgudang: det.kontakgudang});
                }

                cek = new String(det.hpkontakgudang).includes(',');
                let listhpkontakgudang = [];
                if(cek){
                    let arrList = new String(det.hpkontakgudang).split(',');
                    for(let j=0; j < arrList.length; j++){
                        listhpkontakgudang.push({ hpkontakgudang: arrList[j]});
                    }
                }else{
                    listhpkontakgudang.push({ hpkontakgudang: det.hpkontakgudang});
                }

                listinfogudang.push({ id:det.id ,namagudang:det.namagudang,areakirim: areakirim,alamatgudang:det.alamatgudang,ancerancer:det.ancerancer, listkontakgudang: listkontakgudang,listhpkontakgudang: listhpkontakgudang,note:det.note});
            }
        }
        setInputListInfoGudang(listinfogudang);

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
                dispatch(actions.submitDeleteCustomerManggala('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menucustomers);
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

    const listNoTelpKantor = (data) => {
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

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailcustomers+'/'+id} label={'Detail Customer'} labeldefault={'Detail Customer'} />
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
                            value.customername :
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
                            <span className="col-md-5">{i18n.t('PT/CV')}</span>
                            <strong className="col-md-7">
                                {value.customertype?value.customertype:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NAME')}</span>
                                <strong className="col-md-7">
                                {value.customername?value.customername:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PHONE_OFFICE')}</span>
                            <strong className="col-md-7">
                                {listNoTelpKantor(value.telpkantor?value.telpkantor:'')}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Alias')}</span>
                                <strong className="col-md-7">
                                {value.alias?value.alias:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('NPWP')}</span>
                                <strong className="col-md-7">
                                {value.npwp?value.npwp:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('NIB')}</span>
                                <strong className="col-md-7">
                                {value.nib?value.nib:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PROVINCE')}</span>
                                <strong className="col-md-7">
                                {value.provinsiname?value.provinsiname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CITY')}</span>
                                <strong className="col-md-7">
                                {value.kotaname?value.kotaname:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Kecamatan')}</span>
                                <strong className="col-md-7">
                                {value.districtName?value.districtName:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_POSTAL_CODE')}</span>
                                <strong className="col-md-7">
                                {value.kodepos?value.kodepos:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')}</span>
                                <strong className="col-md-7">
                                {value.alamat?value.alamat:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_IS_ACTIVE')}</span>
                                <strong className="col-md-7">
                                {value.isactive?'Yes':'No'}
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

            <div><h3>{i18n.t('label_MINISTRY_INFO')}</h3></div>
            {
                value.detailsInfoKementerian?
                <table id="tablegrid">
                    <tr>
                        <th>{i18n.t('label_MINISTRY')}</th>
                        <th>{i18n.t('Email / Login')}</th>
                        <th>{i18n.t('Password')}</th>
                    </tr>
                    {
                        value.detailsInfoKementerian.map((x, i) => {
                            return (
                                <tr>
                                    <td>{x.kementerian}</td>
                                    <td>{x.alamat_email}</td>
                                    <td>{x.password_email}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                :''
                
            }

            <div><h3>{i18n.t('label_CONTACT_INFORMATION')}</h3></div>
            {
                value.detailsInfoContact?
                <table id="tablegrid">
                    <tr>
                    <th>{i18n.t('Bapal/Ibu')}</th>
                    <th>{i18n.t('label_CONTACT_NAME')}</th>
                    <th>{i18n.t('label_CONTACT_NUMBER')}</th>
                    <th>{i18n.t('Email')}</th>
                    <th>{i18n.t('No Ext')}</th>
                    </tr>
                    {
                        InputListInfoContact.map((x, i) => {
                            return (
                                <tr>
                                    <td>{x.panggilan}</td>
                                    <td>{x.namakontak}</td>
                                    <td>
                                    <table style={{border:'0px'}}>
                                        {
                                            x.listnotelepon.map((y, j) => {
                                                return (
                                                    <tr>
                                                        <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.notelepon}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                    </td>
                                    <td>{x.email}</td>
                                    <td>{x.noext}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                :''
                
            }

            <div><h3>{i18n.t('label_WAREHOUSE_INFO')}</h3></div>
            {
                value.detailsInfoGudang?
                <div style={{overflowX:'auto',marginBottom:'20px'}}>
                <table id="tablegrid" style={{width:'1500px'}}>
                    <tr>
                    <th>{i18n.t('label_NAME')}</th>
                    <th>{i18n.t('label_SEND_AREA')}</th>
                    <th>{i18n.t('label_ADDRESS')}</th>
                    <th>{i18n.t('Ancer Ancer')}</th>
                    <th>{i18n.t('label_CONTACT_NAME')}</th>
                    <th>{i18n.t('label_CONTACT_NUMBER')+'(HP)'}</th>
                    <th>{i18n.t('label_NOTE')}</th>
                    </tr>
                    {
                        InputListInfoGudang.map((x, i) => {
                            return (
                                <tr>
                                    <td>{x.namagudang}</td>
                                    <td>{x.areakirim}</td>
                                    <td>{x.alamatgudang}</td>
                                    <td>{x.ancerancer}</td>
                                    <td>
                                    <table style={{border:'0px'}}>
                                        {
                                            x.listkontakgudang.map((y, j) => {
                                                return (
                                                    <tr>
                                                        <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.kontakgudang}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                    </td>
                                    <td>
                                    <table style={{border:'0px'}}>
                                        {
                                            x.listhpkontakgudang.map((y, j) => {
                                                return (
                                                    <tr>
                                                        <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.hpkontakgudang}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                    </td>
                                    <td>{x.note}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                </div>
                :''
                
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
                            <MenuItem hidden={!isGetPermissions(editCustomerManggala_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editcustomers+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteCustomerManggala_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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