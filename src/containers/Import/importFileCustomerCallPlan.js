import React, {useState}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import {Button} from 'reactstrap';
import * as actions                 from '../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../shared/globalFunc';
import { MenuUploadCustomerCallPlan } from '../shared/permissionMenu';


export default function ImportFileCustomerCallPlan(props) {
    reloadToHomeNotAuthorize(MenuUploadCustomerCallPlan,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

	// const [isFilePicked, setIsFilePicked] = useState(false);
    const [InputFile, setInputFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);

		setIsSelected(true);

	};

    const handleSubmission = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeAction();
                // dispatch(actions.submitDeleteCustomer(id,succesHandlerSubmit, errorHandler));
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

	const executeAction = () => {
        if(isSelected && selectedFile !== undefined && selectedFile !== null){
            setLoading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);
            dispatch(actions.submitUploadFileCustomerCallPlan(formData,succesHandlerSubmit, errorHandler));
        }else{
            errorHandler('Silahkan Pilih File');
        }
        
	};

    const succesHandlerSubmit = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.go(0);
            }
        })
    }

    const errorHandler = (data) => {
        setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + data
        })
    }

    return (
        <Formik
        initialValues={
            {
                file:InputFile,
                // documentfile:documents
                
            }
        }
        validate={values => {
            const errors = {};
            return errors;
        }}
        enableReinitialize="true"
        onSubmit={(values) => {
           
        }}
        >
            {
                formikProps => {
                    const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldTouched,
                        setFieldValue,
                    } = formikProps;

                    return(
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddImport">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('Import File Customer Call Plan')}</span>
                            </div>

                            <input type="file" name="file" onChange={changeHandler} />
                            {isSelected && selectedFile !== undefined && selectedFile !== null ? (

                            <div>
                                
                                <p>Nama File: {selectedFile.name || selectedFile.name !== undefined?selectedFile.name:''}</p>

                                <p>Tipe File: {selectedFile.type || selectedFile.type !== undefined?selectedFile.type:''}</p>

                                <p>Ukuran Dalam KB: {selectedFile.size || selectedFile.size !== undefined?selectedFile.size / 1024:0}</p>

                                <p>

                                    Terakhir Diubah:{' '}

                                    {selectedFile.lastModifiedDate || selectedFile.lastModifiedDate !== undefined?selectedFile.lastModifiedDate.toLocaleDateString():''}

                                </p>

                            </div>

                            ) : (

                            <p>Silahkan Pilih File</p>

                            )}

                            <div>

                            <div className="row justify-content-center">
                            <Button
                                // style={{marginLeft:"1%"}}
                                onClick={() => handleSubmission()}
                                disabled={loading}
                            >
                            {'Submit'}
                            </Button>
                            </div>

                            </div>
                            </ContentWrapper>
                            {loading && <Loading/>}
                        </form>

                    )
                }
            }
        </Formik>

    )
}