import React, {useState,
    useEffect} from 'react';
  import ContentWrapper               from '../../../components/Layout/ContentWrapper';
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
  import moment                       from "moment/moment";
  import {Loading}                    from '../../../components/Common/Loading';
  import Grid                         from './gridAnswer';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

  function Detail(props) {
    // reloadToHomeNotAuthorize(DetailInternalUser_Permission,'READ');
    const i18n = useTranslation('translations');
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [isprint, setIsPrint] = useState(false);

    const [RowsAnswer, setRowsAnswer] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'answer', title: i18n.t('label_ANSWER')},
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');

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
        dispatch(actions.getInfoData('/'+id,successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        setValue(data.data.infoheader);
        if(data.data.detail){
            setRowsAnswer(data.data.detail.reduce((obj, el) => (
                [...obj, {
                    id: el.id,
                    answer: el.answer
                }]
            ), []));
            setHeightGridListAnswer(data.data.detail);
        }
        setLoading(false);
    }

    const setHeightGridListAnswer = (dataval) =>{
        if(dataval.length > 2){
            let height = ( 50 * (dataval.length - 2) ) + StartdefaultHeight;
            if(height > 600){
                height = 600;
            }
            setdefaultHeight(height+'px');
        }
    }

    const handleTeksType = (data) =>{
        let val = '';
        // TA(Text Area),RB(Radio Button),CL(Chekbox List),DDL(DropDown List)
        if(data == 'TA'){
            val = 'Text Area';
        }else if(data == 'RB'){
            val = 'Radio Button';
        }else if(data == 'CL'){
            val = 'Chekbox List';
        }else if(data == 'DDL'){
            val = 'DropDown List';
        }

        return val;
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
                dispatch(actions.submitDeleteInfo(id,succesHandlerSubmit, errorHandler));
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
                history.push(pathmenu.menuinfo);
            }
        })
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error'
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
            <span>{i18n.t('label_INFORMATION')}</span>
            </div>

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
                            value.name :
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
                            <span className="col-md-5">{i18n.t('label_QUESTION')}</span>
                                <strong className="col-md-7">
                                {value.question?value.question:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_CUSTOMER_TYPE')}</span>
                                <strong className="col-md-7">
                                {value.customertypename?value.customertypename:''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_INFORMATION_TYPE')}</span>
                                <strong className="col-md-7">
                                {value.type?handleTeksType(value.type):''}
                                </strong>
                            </div>

                            <div className="row mt-3">
                            <span className="col-md-5">{i18n.t('label_SEQUENCE')}</span>
                                <strong className="col-md-7">
                                {value.sequence?value.sequence:''}
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
                            <MenuItem hidden={false}  onClick={() => history.push(pathmenu.editinfo+'/'+id)}>{i18n.t('grid.EDIT')}</MenuItem>
                            <MenuItem hidden={false}  onClick={() => submitHandlerDelete()}>{i18n.t('grid.DELETE')}</MenuItem>
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
        {props.loading && <Loading/>}

        <div><p className="lead text-center"><h2>{i18n.t('label_ANSWER')}</h2></p></div>
        <Card>
        <CardBody>
        <div className="table-responsive" style={{height:defaultHeight}}>
            <Grid
                rows={RowsAnswer}
                columns={columns}
                totalCounts={RowsAnswer.length}
                loading={loading}
                columnextension={[]}
            />
        </div>
        </CardBody>
        </Card>

        </ContentWrapper>

    )

  }
  export default Detail;