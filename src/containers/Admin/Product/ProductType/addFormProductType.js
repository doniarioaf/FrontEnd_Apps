import React, {useState}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../../components/Layout/ContentWrapper';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';

export default function AddFormProductType(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputName, setInputName] = useState('');
    const [ErrInputName, setErrInputName] = useState('');
    const [InputDescription, setInputDescription] = useState('');
    const [ErrInputDescription, setErrInputDescription] = useState('');

    const handleInputName = (data) =>{
        let val = data.target.value;
        setInputName(val);
    }

    const handleInputDescription = (data) =>{
        let val = data.target.value;
        setInputDescription(val);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputName('');
        setErrInputDescription('');

        if(InputName == ''){
            setErrInputName(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputDescription == ''){
            setErrInputDescription(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.nama = InputName;
            obj.description = InputDescription;
            dispatch(actions.submitAddProductType(obj,succesHandlerSubmit, errorHandler));
        }
    }

    const succesHandlerSubmit = (data) => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: i18n.t('label_SUCCESS')
        }).then((result) => {
            if (result.isConfirmed) {
                history.goBack();
            }
        })
    }

    const submitHandler = () => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit();
            //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            //   Swal.fire('Changes are not saved', '', 'info')
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
                    nama:InputName,
                    description:InputDescription,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddBranch">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('Add Product Type')}</span>
                            </div>

                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                className={
                                    touched.nama && errors.nama
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="nama"
                                onChange={val => handleInputName(val)}
                                onBlur={handleBlur}
                                value={values.nama}
                            />
                            <div className="invalid-feedback-custom">{ErrInputName}</div>

                            <label className="mt-3 form-label required" htmlFor="description">
                                {i18n.t('label_DESCRIPTION')}
                            </label>
                            <Input
                                name="description"
                                className={
                                    touched.description && errors.description
                                        ? "w-50 input-error"
                                        : "w-50"
                                }
                                type="text"
                                id="description"
                                onChange={val => handleInputDescription(val)}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            <div className="invalid-feedback-custom">{ErrInputDescription}</div>
                            </ContentWrapper>
                            {loading && <Loading/>}

                            <Button
                                // disabled={props.activeStep === 0}
                                    style={{marginLeft:"20%"}}
                                    onClick={() => history.goBack()}
                                >
                                {/* {i18n.t('common.BACK')} */}
                                {'Cancel'}
                                </Button>

                                <Button
                                    style={{marginLeft:"1%"}}
                                    onClick={() => submitHandler()}
                                >
                                {'Submit'}
                                </Button>
                        </form>

                    )

                }
            }

        </Formik>

      )
}