import React, {useState} from 'react';
import {useDispatch}                from 'react-redux';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogActions                from '@material-ui/core/DialogActions';
import * as actions                 from '../../../../store/actions';
import {useTranslation}             from 'react-i18next';
import {withStyles}                 from '@material-ui/core/styles';
import MuiDialogTitle               from '@material-ui/core/DialogTitle';
import Typography                   from '@material-ui/core/Typography';
import IconButton                   from '@material-ui/core/IconButton';
import CloseIcon                    from '@material-ui/icons/Close';
import {Button}                                   from 'reactstrap';
import "react-widgets/dist/css/react-widgets.css";

const DialogUploadFile = props => {
    const i18n = useTranslation('translations');
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    
    const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);

		setIsSelected(true);

	};

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

    function submitTrans(){
        if(isSelected && selectedFile !== undefined && selectedFile !== null){
            props.flagloadingsend(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            dispatch(actions.submitAddWorkOrder('/document/'+props.idworkorder,formData,props.handlesubmit, props.errorhandler));
        }   
    }

   
    return (
        <div>
            <DialogTitle id="confirmation-dialog-title" onClose={() => props.showflag(false)}>
            {i18n.t('Upload File (PDF,JPEG,JPG,PNG)')}
            </DialogTitle>

            <DialogContent dividers style={{height:"260px"}}>
            <label className="mt-3 form-label required" htmlFor="Status">
                {i18n.t('File')}
                <span style={{color:'red'}}>*</span>
            </label>

            <input type="file" name="file" onChange={changeHandler} />
            {isSelected && selectedFile !== undefined && selectedFile !== null ? (

            <div>
                
                <p>Nama File: {selectedFile.name || selectedFile.name !== undefined?selectedFile.name:''}</p>

                <p>Tipe File: {selectedFile.type || selectedFile.type !== undefined?selectedFile.type:''}</p>

                <p>Ukuran Dalam KB: {selectedFile.size || selectedFile.size !== undefined?selectedFile.size / 1024:0}</p>

                {/* <p>

                    Terakhir Diubah:{' '}

                    {selectedFile.lastModifiedDate || selectedFile.lastModifiedDate !== undefined?selectedFile.lastModifiedDate.toLocaleDateString():''}

                </p> */}

            </div>

            ) : (

            <p>Silahkan Pilih File</p>

            )}
            </DialogContent>
            <DialogActions>
            <Button autoFocus 
                onClick={() => props.showflag(false)} 
                >
                    Cancel
                </Button>
                <Button color="primary" 
                    onClick={() => submitTrans()}
                >
                    Submit
                </Button>
            </DialogActions>
        </div>
    )
};
export default DialogUploadFile;