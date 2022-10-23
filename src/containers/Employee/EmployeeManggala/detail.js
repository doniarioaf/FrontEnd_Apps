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
  import { deleteEmployeeManggala_Permission,editEmployeeManggala_Permission,MenuEmployeeManggala } from '../../shared/permissionMenu';
  import moment                       from "moment/moment";
  import '../../CSS/table.css';
  import Avatar           from '../../../components/Avatar/index';
  import { numToMoney } from '../../shared/globalFunc';
  import { formatdatetime,formatdate } from '../../shared/constantValue';

  import Grid                         from '../../../components/TableGrid';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  function Detail(props) {
    reloadToHomeNotAuthorize(MenuEmployeeManggala,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);

    const [InputListInfoFamily, setInputListInfoFamily] = useState([{ namaanak:"",tanggallahir: "",jeniskelamin:"",status:""}]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [rows, setRows] = useState([]);
    const [columns,Setcolumns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'statusemployee', title: 'Status '+i18n.t('label_EMPLOYEE')},
        {name: 'gaji', title: i18n.t('label_SALARY')},
        {name: 'tanggal', title: i18n.t('label_DATE')}
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
        dispatch(actions.getEmployeeManggalaData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        let template = data.data.template;
        let jenisKelaminOptions = template.jeniskelaminOptions;
        let statusOptions = template.statusOptions;
        setValue(data.data);
        let listinfofamily = [];
        if(data.data.detailsFamily){
            for(let i=0; i < data.data.detailsFamily.length; i++){
                let det = data.data.detailsFamily[i];
                let tanggal = det.tanggallahir?moment (new Date(det.tanggallahir)).format('DD MMMM YYYY'):'';
                let jeniskelamin = det.jeniskelamin;
                let listfilterjenkel = jenisKelaminOptions.filter(output => output.code == det.jeniskelamin);
                if(listfilterjenkel.length > 0){
                    jeniskelamin = listfilterjenkel[0].codename;
                }
                let status = det.status;
                let listfilterStatus = statusOptions.filter(output => output.code == det.status);
                if(listfilterStatus.length > 0){
                    status = listfilterStatus[0].codename;
                }
                //namaanak:"",tanggallahir: "",jeniskelamin:"",status:""
                listinfofamily.push({namaanak:det.namaanak,tanggallahir:tanggal,jeniskelamin:jeniskelamin,status:status});
            }
        }
        setInputListInfoFamily(listinfofamily);

        if(data.data.historyEmployee){
            const theData = data.data.historyEmployee.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'statusemployee': getStatusEmp(el.statusemployee ?el.statusemployee:'',template.statusKaryawanOptions?template.statusKaryawanOptions:[]),
                    'gaji':getGaji(el.gaji?el.gaji:''),//el.gaji?numToMoney(parseFloat(el.gaji)):'',
                    'tanggal': el.tanggal?moment (new Date(el.tanggal)).format(formatdatetime):'',
                }
            ], []);
            setRows(theData);
        }
                

        setLoading(false);
    }
    const getStatusEmp = (data,statusKaryawanOptions) => {
        if(data !== ''){
            let cek = data.includes('|');
            if(cek){
                let arr = data.split('|');
                let oldVal = arr[0];
                let OldNew = arr[1];

                let listfilterOld = statusKaryawanOptions.filter(output => output.code == oldVal);
                if(listfilterOld.length > 0){
                    oldVal = listfilterOld[0].codename;
                }

                let listfilterNew = statusKaryawanOptions.filter(output => output.code == OldNew);
                if(listfilterNew.length > 0){
                    OldNew = listfilterNew[0].codename;
                }

                return oldVal +' > '+OldNew
            }else{
                let listfilter = statusKaryawanOptions.filter(output => output.code == data);
                if(listfilter.length > 0){
                    return listfilter[0].codename;
                }

                return data;
            }
        }
        return '';
    }

    const getGaji = (data) => {
        if(data !== ''){
            let cek = data.includes('|');
            if(cek){
                let arr = data.split('|');
                let oldVal = arr[0];
                let OldNew = arr[1];
                return numToMoney(parseFloat(oldVal)) +' > '+numToMoney(parseFloat(OldNew))
            }else{
                return numToMoney(parseFloat(data));
            }
        }
        return '';
    }
    const getOptionsParameter = (data,action) => {
        let list = [];
        if(action == 'STATUSKARYAWAN'){
            list = value.template.statusKaryawanOptions;
        }else if(action == 'JABATAN'){
            list = value.template.jabatanOptions;
        }else if(action == 'STATUS'){
            list = value.template.statusOptions;
        }else if(action == 'JENISKELAMIN'){
            list = value.template.jeniskelaminOptions;
        }
        let listfilter = list.filter(output => output.code == data);
        if(listfilter.length > 0){
            return listfilter[0].codename;
        }
        return data;
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
                dispatch(actions.submitDeleteEmployeeManggalaData('/'+id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuemployeeManggala);
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

    function onClickAdd() {
    }
    function onClickView(id) {
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailemployeeManggala+'/'+id} label={'Detail Employee'} labeldefault={'Detail Employee'} />
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
            <div className="row justify-content-center">
            <Avatar
            // memberId={props.match.params.id}
            loading={loading}
            // openModal={handleModalUpload}
            image={"data:image/png;base64,"+(value.photo?value.photo:'')}
            // deleteimagepermission = {isGetPermissions(deleteImageMember_permission,'TRANSACTION')}
            errorHandler={errorHandler}
            // deleteImageSuccess={getMemberImageSuccess}
        />
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
                            <span className="col-md-5">{i18n.t('label_NAME')}</span>
                            <strong className="col-md-7">
                                {value.nama?value.nama:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{'Status '+i18n.t('label_EMPLOYEE')}</span>
                            <strong className="col-md-7">
                                {value.statuskaryawan?getOptionsParameter(value.statuskaryawan,'STATUSKARYAWAN'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_POSITION')}</span>
                            <strong className="col-md-7">
                                {value.jabatan?getOptionsParameter(value.jabatan,'JABATAN'):''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_SALARY')}</span>
                                <strong className="col-md-7">
                                {value.gaji?(value.gaji !== ''?numToMoney(parseFloat(value.gaji)):'*******'):'*******'}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NUMBER_IDENTITY')}</span>
                            <strong className="col-md-7">
                                {value.noidentitas?value.noidentitas:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_GENDER')}</span>
                                <strong className="col-md-7">
                                {value.jeniskelamin?getOptionsParameter(value.jeniskelamin,'JENISKELAMIN'):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_DATE_OF_BIRTH')}</span>
                                <strong className="col-md-7">
                                {value.tanggallahir?moment (new Date(value.tanggallahir)).format(formatdate):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ADDRESS')}</span>
                            <strong className="col-md-7">
                                {value.alamat?value.alamat:''}
                            </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Status')}</span>
                                <strong className="col-md-7">
                                {value.status?getOptionsParameter(value.status,'STATUS'):''}
                                </strong>
                            </div>

                            <div hidden={value.status? !(value.status == 'MENIKAH') :true}>
                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_COUPLE_NAME')}</span>
                                <strong className="col-md-7">
                                {value.namapasangan?value.namapasangan:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_COUPLE_BIRTH_DATE')}</span>
                                <strong className="col-md-7">
                                {value.tanggallahirpasangan?moment (new Date(value.tanggallahirpasangan)).format(formatdate):''}
                                </strong>
                            </div>

                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('Bank')}</span>
                                <strong className="col-md-7">
                                {value.namabank?value.namabank:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_NUMBER_ACCOUNT')}</span>
                                <strong className="col-md-7">
                                {value.norekening?value.norekening:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_ON_BEHALF_OF')}</span>
                                <strong className="col-md-7">
                                {value.atasnama?value.atasnama:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_START_DATE')}</span>
                                <strong className="col-md-7">
                                {value.tanggalmulai?moment (new Date(value.tanggalmulai)).format(formatdate):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_RESIGN_DATE')}</span>
                                <strong className="col-md-7">
                                {value.tanggalresign?moment (new Date(value.tanggalresign)).format(formatdate):''}
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

            <div><h3>{i18n.t('label_FAMILY_INFO')}</h3></div>
                {
                    value.detailsFamily?
                    <table id="tablegrid">
                        <tr>
                        <th>{i18n.t('label_CHILD_NAME')}</th>
                        <th>{i18n.t('label_DATE_OF_BIRTH')}</th>
                        <th>{i18n.t('label_GENDER')}</th>
                        <th>{i18n.t('Status')}</th>
                        </tr>
                        <tbody>
                        {
                            InputListInfoFamily.map((x, i) => {
                                return (
                                    <tr>
                                        <td>{x.namaanak}</td>
                                        <td>{x.tanggallahir}</td>
                                        <td>{x.jeniskelamin}</td>
                                        <td>{x.status}</td>
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
            
            {
                value.historyEmployee?
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
                        listfilterdisabled={['tanggal','statusemployee','gaji']}
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
                            {/* <MenuItem onClick={showQrCode}>{i18n.t('Generate QR Code')}</MenuItem> */}
                        </div>)
                        :(<div>
                            <MenuItem hidden={!isGetPermissions(editEmployeeManggala_Permission,'TRANSACTION')}  onClick={() => history.push(pathmenu.editemployeeManggala+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={!isGetPermissions(deleteEmployeeManggala_Permission,'TRANSACTION')} onClick={() => submitHandlerDelete()} >{i18n.t('grid.DELETE')}</MenuItem>
                            
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