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
  import { editVendor_Permission,deleteVendor_Permission,MenuVendor } from '../../../shared/permissionMenu';
  import '../../../CSS/table.css';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));


  function Detail(props) {
    reloadToHomeNotAuthorize(MenuVendor,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const [Template, setTemplate] = useState([]);
    const [InputListBank, setInputListBank] = useState([{ norek:"",atasnama: "",bank:""}]);
    const [InputListInfoContact, setInputListInfoContact] = useState([{ panggilan:"",namakontak: "",nocontacthp:[{contacthp:""}],email:"", contactofficenumber: "",extention:""}]);
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
        dispatch(actions.getVendorData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        let detail = data.data;
        let template = detail.template;
        setValue(detail);
        setTemplate(template);
        if(detail.detailsbank){
            if(detail.detailsbank.length > 0){
                setInputListBank(detail.detailsbank);
            }
        }

        let listnoinfocontact = [];
        if(detail.detailscontact){
            for(let i=0; i < detail.detailscontact.length; i++){
                let det = detail.detailscontact[i];
                let panggilan = det.panggilan;
                let listfilteroutput = template.panggilanOptions.filter(output => output.code == det.panggilan);
                if(listfilteroutput.length > 0){
                    panggilan = listfilteroutput[0].codename;
                }

                let cek = new String(det.nocontacthp).includes(',');
                let listnocontacthp = [];
                if(cek){
                    let arrList = new String(det.nocontacthp).split(',');
                    for(let j=0; j < arrList.length; j++){
                        listnocontacthp.push({ contacthp: arrList[j]});
                    }
                }else{
                    listnocontacthp.push({ contacthp: det.nocontacthp});
                }

                listnoinfocontact.push({ panggilan: panggilan,namakontak:det.namakontak,nocontacthp:listnocontacthp,email:det.email,contactofficenumber:det.contactofficenumber,extention:det.extention});
            }
        }

        setInputListInfoContact(listnoinfocontact);
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
                dispatch(actions.submitDeleteVendor('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuvendor);
            }
        })
    }

    const getValueOptions = (data,action) => {
        if(action == 'idvendorcategory'){
            let listfilteroutput = Template.vendorCategoryOptions.filter(output => output.id == data);
            if(listfilteroutput.length > 0){
                return listfilteroutput[0].categoryname;
            }
        }else if(action == 'jenisbadanusaha'){
            let listfilteroutput = Template.badanUsahaOptions.filter(output => output.code == data);
            if(listfilteroutput.length > 0){
                return listfilteroutput[0].codename;
            }
        }else if(action == 'provinsi'){
            let listfilteroutput = Template.provinceOptions.filter(output => output.prov_id == data);
            if(listfilteroutput.length > 0){
                return listfilteroutput[0].prov_name;
            }
        }else if(action == 'kota'){
            let listfilteroutput = Template.cityOptions.filter(output => output.city_id == data);
            if(listfilteroutput.length > 0){
                return listfilteroutput[0].city_name;
            }
        }else if(action == 'kecamatan'){
            let listfilteroutput = Template.districtOptions.filter(output => output.dis_id == data);
            if(listfilteroutput.length > 0){
                return listfilteroutput[0].dis_name;
            }else{
                return '';
            }
        }

        return data;
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
            <ContentHeading history={history} link={pathmenu.detailvendor+'/'+id} label={'Detail Vendor'} labeldefault={'Detail Vendor'} />
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
                            value.nama :
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
                            <span className="col-md-5">{i18n.t('label_CATEGORY')}</span>
                            <strong className="col-md-7">
                                {value.idvendorcategory?getValueOptions(value.idvendorcategory,'idvendorcategory'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('PT/CV')}</span>
                            <strong className="col-md-7">
                                {value.jenisbadanusaha?getValueOptions(value.jenisbadanusaha,'jenisbadanusaha'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NAME')}</span>
                            <strong className="col-md-7">
                                {value.nama?value.nama:''}
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
                            <span className="col-md-5">{i18n.t('label_ADDRESS')+' 1'}</span>
                            <strong className="col-md-7">
                                {value.address?value.address:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')+' 2'}</span>
                            <strong className="col-md-7">
                                {value.alamat2?value.alamat2:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')+' 3'}</span>
                            <strong className="col-md-7">
                                {value.alamat3?value.alamat3:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_PROVINCE')}</span>
                            <strong className="col-md-7">
                                {value.provinsi?getValueOptions(value.provinsi,'provinsi'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CITY')}</span>
                            <strong className="col-md-7">
                                {value.kota?getValueOptions(value.kota,'kota'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Kecamatan')}</span>
                            <strong className="col-md-7">
                                {value.kota?getValueOptions(value.district,'kecamatan'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_POSTAL_CODE')}</span>
                            <strong className="col-md-7">
                                {value.kodepos?value.kodepos:''}
                            </strong>
                            </div>

                            {/* <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_IS_ACTIVE')}</span>
                                <strong className="col-md-7">
                                {value.isactive?'Yes':'No'}
                                </strong>
                            </div> */}
                        </section>
                    )
                }
            </CardBody>
            </Card>
            </div>
            </div>
            </CardBody>

            <div><h3>{i18n.t('Bank')}</h3></div>
            {
                value.detailsbank?
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
                :''
            }

            <div><h3>{i18n.t('label_CONTACT_INFORMATION')}</h3></div>
            {
                value.detailscontact?
                <table id="tablegrid">
                    <tr>
                    <th>{i18n.t('Bapak/Ibu')}</th>
                    <th>{i18n.t('label_CONTACT_NAME')}</th>
                    <th>{i18n.t('label_CONTACT_NUMBER')}</th>
                    <th>{i18n.t('Email')}</th>
                    <th>{i18n.t('label_PHONE_OFFICE')}</th>
                    <th>{i18n.t('Extention')}</th>
                    </tr>
                    <tbody>
                        {
                            InputListInfoContact.map((x, i) => {
                                return (
                                <tr>
                                    <td>{x.panggilan}</td>
                                    <td>{x.namakontak}</td>
                                    <td>
                                    <table style={{border:'0px'}}>
                                        <tbody>
                                        {
                                            x.nocontacthp.map((y, j) => {
                                                return (
                                                    <tr>
                                                        <td style={{border:'0px',backgroundColor:i % 2 == 0?'#f2f2f2':'white'}}>{y.contacthp}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    </td>
                                    <td>{x.email}</td>
                                    <td>{x.contactofficenumber}</td>
                                    <td>{x.extention}</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
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
                            <MenuItem hidden={!isGetPermissions(editVendor_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editvendor+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteVendor_Permission,'TRANSACTION')}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
                            
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