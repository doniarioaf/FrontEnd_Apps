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
        if(props.seacrhtype == 'WAREHOUSE'){

        }
    }, []);

    const handleChangeSearchName = (data) =>{
        let value = data.target.value;
        setInputSearchName(value);
    }

    const handleSearch = () =>{
        setErrInputSearch("");
        if(InputSearchName !== ''){
            props.flagloadingsend(true);
            if(props.seacrhtype == 'WAREHOUSE'){

            }
        }else{
            setErrInputSearch(i18n.t('forms.REQUIRED'));
        }
        
    }

    const successHandleSearch = (data) =>{
        let theData = [];
        if(props.seacrhtype == 'WAREHOUSE'){
            theData = data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.accountNo,
                    'name': el.fullName,
                    'showaccno': el.accountNo+' - '+el.productName,
                    'office': el.officeName,
                    'data':el
                }
            ], []);
        }
        setRows(theData);

        props.flagloadingsend(false);
    }

    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Quick Search')}
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
                            placeholder={'Pencarian Berdasarkan Nama'}
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