import React, {useEffect,useState} from 'react';
import {useDispatch}                from 'react-redux';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import {useTranslation}             from 'react-i18next';
import * as actions                 from '../../store/actions';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Button,Input}                                   from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip                      from '@material-ui/core/Tooltip';
import Grid                         from './grid';

const DialogQuickSearch = props => {
    const dispatch = useDispatch();
    const [InputSearchName, setInputSearchName] = useState('');
    const i18n = useTranslation('translations');

    const [rows, setRows] = useState([]);
    const [columns,setColumns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('label_NAME')},
    ]);
    const [tableColumnExtensions] = useState([
        // { columnName: 'thresholdaccount', width: '200' },
    ]);
    const [ErrInputSearh, setErrInputSearch] = useState('');

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
      });

      const DialogTitle = withStyles(styles)((props) => {
        const {children, classes, onClose, ...other} = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
      });

      useEffect(() => {
        let data = [
            {name: 'id', title: 'id'},
            {name: 'name', title: i18n.t('label_NAME')},
        ]
        if(props.seacrhtype == 'PRICELIST'){
            data = [
                {name: 'id', title: 'id'},
                {name: 'nodoc', title: 'No Document'},
                {name: 'name', title: i18n.t('label_NAME')},
            ]
        }else if(props.seacrhtype == 'PENERIMAANINVOICE'){
            data = [
                {name: 'id', title: 'id'},
                {name: 'noinv', title: 'No Invoice'},
                {name: 'nowo', title: 'No Work Order'},
                {name: 'name', title: i18n.t('label_NAME')},
            ]
        }else if(props.seacrhtype == 'PENERIMAANWO'){
            data = [
                {name: 'id', title: 'id'},
                {name: 'nowo', title: 'No Work Order'},
                {name: 'namacargo', title: 'Nama Cargo'},
                {name: 'name', title: i18n.t('label_NAME')},
            ]
        }
        setColumns(data);
    }, []);

    const handleChangeSearchName = (data) =>{
        let value = data.target.value;
        if(value.includes("`")){
        }else{
            setInputSearchName(value);
        }
        
    }

    const handleSearch = () =>{
        setErrInputSearch("");
        if(InputSearchName !== ''){
            props.flagloadingsend(true);
            if(props.seacrhtype == 'PRICELIST'){
                let obj = new Object();
                obj.nodocument = InputSearchName;
                obj.namacustomer = InputSearchName;
                dispatch(actions.submitAddPriceList('/search',obj,successHandleSearch, props.errorHandler));
            }else if(props.seacrhtype == 'CUSTOMERWO'){
                let obj = new Object();
                obj.nama = InputSearchName;
                dispatch(actions.submitAddWorkOrder('/searchcustomer',obj,successHandleSearch, props.errorHandler));
            }else if(props.seacrhtype == 'CUSTOMERINVOICE'){
                let obj = new Object();
                obj.nama = InputSearchName;
                dispatch(actions.submitAddInvoice('/searchcustomer',obj,successHandleSearch, props.errorHandler));
            }else if(props.seacrhtype == 'PENERIMAANINVOICE'){
                let obj = new Object();
                obj.nodocument = InputSearchName;
                obj.namacustomer = InputSearchName;
                obj.idwo = props.idwo == ''?0:props.idwo;
                obj.type = 'PENERIMAAN';
                dispatch(actions.submitAddPenerimaanKasBank('/searchinvoice',obj,successHandleSearch, props.errorHandler));
            }else if(props.seacrhtype == 'PENERIMAANWO'){
                let obj = new Object();
                obj.nodocument = InputSearchName;
                obj.namacustomer = InputSearchName;
                obj.namacargo = InputSearchName;
                obj.idwo = 0;
                dispatch(actions.submitAddPenerimaanKasBank('/searchwo',obj,successHandleSearch, props.errorHandler));
            }
        }else{
            setErrInputSearch(i18n.t('forms.REQUIRED'));
        }
        
    }

    const successHandleSearch = (data) =>{
        let theData = [];
        if(data.data){
            if(props.seacrhtype == 'PRICELIST'){
                theData = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'name': el.namacustomer,
                        'nodoc': el.nodocument,
                        'data':el
                    }
                ], []);
            }else if(props.seacrhtype == 'CUSTOMERWO'){
                theData = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'name': el.customername,
                        'data':el
                    }
                ], []);
            }else if(props.seacrhtype == 'CUSTOMERINVOICE'){
                theData = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'name': el.customername,
                        'data':el
                    }
                ], []);
            }else if(props.seacrhtype == 'PENERIMAANINVOICE'){
                // {name: 'id', title: 'id'},
                // {name: 'noinv', title: 'No Invoice'},
                // {name: 'nowo', title: 'No Work Order'},
                // {name: 'name', title: i18n.t('label_NAME')},
                theData = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'noinv': el.nodocument,
                        'nowo': el.noocumentwo,
                        'name': el.namaCustomer,
                        'data':el
                    }
                ], []);
            }else if(props.seacrhtype == 'PENERIMAANWO'){
                // {name: 'id', title: 'id'},
                // {name: 'nowo', title: 'No Work Order'},
                // {name: 'namacargo', title: 'Nama Cargo'},
                // {name: 'name', title: i18n.t('label_NAME')},
                theData = data.data.reduce((obj, el) => [
                    ...obj,
                    {
                        'id': el.id,
                        'nowo': el.nodocument,
                        'namacargo': el.namacargo,
                        'name': el.namaCustomer,
                        'data':el
                    }
                ], []);
            }
        }
        
        setRows(theData);

        props.flagloadingsend(false);
    }

    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Search')}
            </DialogTitle>
            <DialogContent dividers style={{height:"460px"}}>
            <table style={{width:'100%'}}>
                {/* <tbody> */}
                    <tr>
                        <td>
                        <Input
                            name="InputSearchName"
                            className={
                                "input-font-size"
                            }
                            type="text"
                            id="InputSearchName"
                            onChange={val => handleChangeSearchName(val)}
                            onKeyPress={event => {
                                if (event.key === "Enter") {
                                    handleSearch()
                                }
                              }}
                            placeholder={props.placeholder?props.placeholder:''}
                            value={InputSearchName}
                            disabled={false}
                        />
                        <div className="invalid-feedback-custom">{ErrInputSearh}</div>
                        </td>
                        <td>
                        <Tooltip title={i18n.t('Search')}>
                        <IconButton color={'primary'}
                            onClick={() => handleSearch()}
                            // hidden={isGetPermissions(withdrawSavings,'TRANSACTION')}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </Tooltip>
                        </td>
                    </tr>
                    {/* </tbody> */}
                </table>

                <Grid
                rows={rows}
                columns={columns}
                totalCounts={rows.length}
                loading={false}
                columnextension={tableColumnExtensions}
                handlesearch={props.handlesearch}
                />
            
            </DialogContent>
        </div>

    )
}
export default DialogQuickSearch;