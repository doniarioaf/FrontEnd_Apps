import React, {useState, useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { changePasswordInternalUser_Permission } from '../../shared/permissionMenu';

export default function ChangeFormInternalUser(props) {
    reloadToHomeNotAuthorize(changePasswordInternalUser_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputUsername, setInputUsername] = useState('');
    const [InputNama, setInputNama] = useState('');

    const [InputPassword, setInputPassword] = useState('');
    const [InputConfirmPassword, setInputConfirmPassword] = useState('');
    const [ErrInputPassword, setErrInputPassword] = useState('');
    const [dataDetail, setDataDetail] = useState([]);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getUserAppsData('/'+id,successHandler, errorHandler));
        // dispatch(actions.getUserAppsData('/template',successHandler, errorHandler));
        
    }, []);

    function successHandler(data) {
        let detail = data.data.user?data.data.user:[];
        setDataDetail(detail);
        setInputNama(detail.nama);
        setInputUsername(detail.username);
        setLoading(false);
        
    }

    

    const handleInputPassword = (data) =>{
        let val = data.target.value;
        setInputPassword(val);
    }

    const handleInputConfirmPassword = (data) =>{
        let val = data.target.value;
        setInputConfirmPassword(val);
    }

    
    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputPassword('');

        if(InputPassword == ''){
            setErrInputPassword(i18n.t('label_REQUIRED'));
            flag = false;
        }else if(InputPassword !== InputConfirmPassword){
            setErrInputPassword(i18n.t('Password Tidak Sama'));
            flag = false;
        }
        
        return flag;
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

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.username = dataDetail.username;
            obj.password = dataDetail.password;
            obj.passwordchange = InputPassword;
            
            dispatch(actions.submitEditUserApps('/changepassword/'+id,obj,succesHandlerSubmit, errorHandler));
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


    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    }

    return (
        <Formik
        initialValues={
            {
                nama:InputNama,
                username:InputUsername,
                password:InputPassword,
                confirmpassword:InputConfirmPassword,
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddUser">
                            <ContentWrapper>
                            <div className="content-heading"  >
                            <span>{i18n.t('label_CHANGE_PASSWORD')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                            </label>
                            <Input
                                name="nama"
                                type="text"
                                id="nama"
                                disabled={true}
                                value={values.nama}
                            />

                            <label className="mt-3 form-label required" htmlFor="username">
                                {i18n.t('label_USERNAME')}
                            </label>
                            <Input
                                name="username"
                                type="text"
                                id="username"
                                disabled={true}
                                value={values.username}
                            />

                            <label className="mt-3 form-label required" htmlFor="password">
                                {i18n.t('Password')}
                            </label>
                            <Input
                                name="password"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="password"
                                id="password"
                                onChange={val => handleInputPassword(val)}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <div className="invalid-feedback-custom">{ErrInputPassword}</div>

                            <label className="mt-3 form-label required" htmlFor="confirmpassword">
                                {i18n.t('Confirm Password')}
                            </label>
                            <Input
                                name="confirmpassword"
                                // className={
                                //     touched.nama && errors.nama
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="password"
                                id="confirmpassword"
                                onChange={val => handleInputConfirmPassword(val)}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                            />
                            </div>

                            </div>
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