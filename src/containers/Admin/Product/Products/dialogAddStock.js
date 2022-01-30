import React, {useEffect,useState} from 'react';
import {useDispatch}                from 'react-redux';
// import styled                       from "styled-components";
// import Dialog                       from '@material-ui/core/Dialog';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import {DropdownList}      from 'react-widgets';
import {useTranslation}             from 'react-i18next';
import {
    Button,Input
}                                   from 'reactstrap';
import * as actions                 from '../../../../store/actions';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import  {convertFormtUOMToUOM4} from '../../../shared/globalFunc';

const DialogAddStock = props => {
    const dispatch = useDispatch();
    const i18n = useTranslation('translations');

    const [InputName, setInputName] = useState('');
    const [InputFormat, setFormat] = useState('');
    const [InputStock, setInputStock] = useState('0.0.0.0');
    const [InputNilaiUOM4, setInputNilaiUOM4] = useState('0');
    const [InputNilaiStock, setInputNilaiStock] = useState('');
    const [ErrInputStock, setErrInputStock] = useState('');
    const [InputReason, setInputReason] = useState('');
    const [ErrInputReason, setErrInputReason] = useState('');

    useEffect(() => {
        if(props.data){
            let value = props.data;
            let convertuom = convertFormtUOMToUOM4(InputNilaiStock,value.conversion1to4,value.conversion2to4,value.conversion3to4,value.uom1,value.uom2,value.uom3,value.uom4).nilaiuom;
            let uom = value.uom1+'.'+value.uom2+'.'+value.uom3+'.'+value.uom4;
            setInputName(value.nama);
            setInputNilaiStock(convertuom);
            setFormat(uom);

            // setInputAmount(charges.amount);
            // setListTransModule(props.data.listtransmodule);
            // setSelTransModule(charges.idtransmodule);
            // setSelTransModuleName(charges.transmodule)
            // setSelProdType(charges.idprodtype);
            // setSelProdTypeName(charges.prodtype);
            // setDataListProdType(charges.idtransmodule);
        }
    }, []);

    const handleChangeInputStock = (data) =>{
        let val = data.target.value;
        let tempVal = val.split(".");
        if(tempVal.length == 4){
            let value = props.data;
            let convertuom = convertFormtUOMToUOM4(val,value.conversion1to4,value.conversion2to4,value.conversion3to4,value.uom1,value.uom2,value.uom3,value.uom4);
            setInputStock(val);
            setInputNilaiStock(convertuom.nilaiuom);
            setInputNilaiUOM4(convertuom.stockuom4);
        }
        
    }

    const handleChangeInputReason = (data) =>{
        let val = data.target.value;
        setInputReason(val);
    }

    const handleColumnMandatory = () =>{
        let flag = true;
        setErrInputStock('');
        setErrInputReason('');
        if(InputStock == ''){
            setErrInputStock(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(!isNaN(InputNilaiUOM4)){
                if(parseInt(InputNilaiUOM4) <= 0){
                    setErrInputStock(i18n.t('label_REQUIRED'));
                    flag = false;
                }
            }else{
                setErrInputStock(i18n.t('label_REQUIRED'));
                flag = false;
            }
            
        }

        if(props.type == 'REJECT'){
            if(InputReason == ''){
                setErrInputReason(i18n.t('label_REQUIRED'));
                flag = false;
            }
        }
        
        return flag;
    }

    const handleSubmit = () =>{
        let flag = handleColumnMandatory();
        if(flag){
            props.flagloadingsend(true);
            let obj = new Object();
            obj.idproduct = props.data.id;
            obj.stock = InputNilaiUOM4;
            obj.reason = InputReason;
            if(props.type == 'ADD'){
                dispatch(actions.submitAddStockProduct(obj,props.succesHandlerSubmit, props.errorhandler));
            }else {
                dispatch(actions.submitRejectStockProduct(obj,props.succesHandlerSubmit, props.errorhandler));
            }
            
        }
    }

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

      return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
                {props.type == 'ADD'? 'Add Stock':'Reject Stock'}
            </DialogTitle>
            <DialogContent dividers>
            <div className="row mt-0">
            <div className="mt-0 col-lg-6 ft-detail mb-5">

            <label className="mt-3 form-label required" htmlFor="InputStock">
                {i18n.t('Stock')}
            </label>

            <Input
                name="InputStock"
                className={
                    "input-font-size"
                }
                type="text"
                id="InputStock"
                onChange={val => handleChangeInputStock(val)}
                placeholder={''}
                // style={{fontSize:'xx-large'}}
                // size='lg'
                // value={numToMoney(parseFloat(amount.toString().replaceAll('.','')))}
                value={InputStock}
                disabled={false}
                style={{width:'350px'}}    
            ></Input>
            <div className="invalid-feedback-custom">{ErrInputStock}</div>

            <div hidden={!(props.type == 'REJECT')}>
            <label className="mt-3 form-label required" htmlFor="InputReason">
                {i18n.t('Reason')}
            </label>

            <Input
                name="InputReason"
                className={
                    "input-font-size"
                }
                type="text"
                id="InputReason"
                onChange={val => handleChangeInputReason(val)}
                placeholder={''}
                // style={{fontSize:'xx-large'}}
                // size='lg'
                // value={numToMoney(parseFloat(amount.toString().replaceAll('.','')))}
                value={InputReason}
                disabled={false}
                style={{width:'350px'}}    
            ></Input>
            <div className="invalid-feedback-custom">{ErrInputReason}</div>
            </div>

            <label className="mt-3 form-label required" htmlFor="InputNilaiStock">
                {i18n.t('Nilai Stock')}
            </label>

            <Input
                name="InputNilaiStock"
                className={
                    "input-font-size"
                }
                type="text"
                id="InputNilaiStock"
                // onChange={val => handleChangeAmount(val)}
                placeholder={''}
                // style={{fontSize:'xx-large'}}
                // size='lg'
                // value={numToMoney(parseFloat(amount.toString().replaceAll('.','')))}
                value={InputNilaiStock}
                disabled={true}
                style={{width:'350px'}}    
            ></Input>
            

            <label className="mt-3 form-label required" htmlFor="InputName">
                {i18n.t('label_NAME')}
            </label>

            <Input
                name="InputName"
                className={
                    "input-font-size"
                }
                type="text"
                id="InputName"
                // onChange={val => handleChangeAmount(val)}
                placeholder={''}
                // style={{fontSize:'xx-large'}}
                // size='lg'
                // value={numToMoney(parseFloat(amount.toString().replaceAll('.','')))}
                value={InputName}
                disabled={true}
                style={{width:'350px'}}    
            ></Input>

            <label className="mt-3 form-label required" htmlFor="InputFormat">
                {i18n.t('UOM')}
            </label>

            <Input
                name="InputFormat"
                className={
                    "input-font-size"
                }
                type="text"
                id="InputFormat"
                // onChange={val => handleChangeAmount(val)}
                placeholder={''}
                // style={{fontSize:'xx-large'}}
                // size='lg'
                // value={numToMoney(parseFloat(amount.toString().replaceAll('.','')))}
                value={InputFormat}
                disabled={true}
                style={{width:'350px'}}    
            ></Input>

            
            
            </div>
            </div>
            </DialogContent>
            <DialogActions>
            <Button autoFocus 
            onClick={() => props.showflag(false)} 
            >
                Cancel
            </Button>
            <Button color="primary" 
                onClick={() => handleSubmit()}
            >
                Submit
            </Button>
            </DialogActions>
        </div>
      )
}
export default DialogAddStock;