import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import {Formik}                        from 'formik';
import { Input } from 'reactstrap';
import PageFooter               from "../../../components/Pages/PageFooter";
import { Loading } from '../../../components/Common/Loading';
import * as actions                 from '../../../store/actions';
import Swal             from "sweetalert2";
import {useDispatch}   from 'react-redux';
import {useHistory}                 from 'react-router-dom';
// import {deleteSessionAndLocalStorage} from '../../../containers/shared/globalFunc';

export default function FormLogin(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showpassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // useEffect(() => {
    //     deleteSessionAndLocalStorage();
    // }, []);

    const handleChangeUser = (data) =>{
        let val = data.target.value;
        setUser(val);
    }
    const handlePassword = (data) =>{
        let val = data.target.value;
        setPassword(val);
    }
    const handleShowingPassword = () =>{
        setShowPassword(!showpassword);
    }
    const SubmitLogin = () =>{
        // alert(user+' | '+password);
        setLoading(true);
        var obj = new Object();
        obj.user = user;
        obj.password = password;
        dispatch(actions.loginUser(obj, succesHandlerSubmit, errorHandler));

    }
    const succesHandlerSubmit = (data) => {
        // console.log('succesHandlerSubmit ',data);
        setLoading(false);
        if(data.flag){
            if(data.msg !== ''){
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: data.msg
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/home');
                    }
                })
            }else{
                history.push('/home');
            }
        }
        // alert('succesHandlerSubmit '+data);
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
                user:user,
                password:password,
                showingpassword:showpassword
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
                    <div className="block-center mt-4 wd-xl">
                        <div className="card card-flat">
                        {/* <div className="card-header text-center bg-dark"> */}
                        <div className="card-header text-center bg-primary">
                            <a href="">
                                <img className="block-center rounded" src="img/logoexample100x35.png" alt="Logo"/>
                            </a>
                        </div>
                        <div className="card-body">
                        <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                        <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <div className="input-group with-focus">
                        <Input type="text"
                        name="user"
                        className="border-right-0"
                        placeholder="Enter user"
                        // invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                        // onChange={this.validateOnChange}
                        onChange={val => handleChangeUser(val)}
                        // data-validate='["required", "email"]'
                        value={values.user}/>
                        <div className="input-group-append">
                        <span className="input-group-text text-muted bg-transparent border-left-0">
                            <em className="fa fa-envelope"></em>
                        </span>
                        </div>
                        </div>
                        </div>

                        <div className="form-group">
                        <div className="input-group with-focus">
                        <Input type= {values.showingpassword ? 'text':'password'}
                            id="id-password"
                            name="password"
                            className="border-right-0"
                            placeholder="Password"
                            // invalid={this.hasError('formLogin','password','required')}
                            onChange={val => handlePassword(val)}
                            data-validate='["required"]'
                            value={values.password}
                        />
                         <div className="input-group-append" onClick={() => handleShowingPassword()}>
                            <span className="input-group-text text-muted bg-transparent border-left-0">
                                <em className={values.showingpassword ? 'fa fa-eye-slash' : 'fa fa-eye'}/>
                            </span>
                        </div>
                        </div>
                        </div>
                        <button className="btn btn-block btn-primary mt-3" type="button" onClick={() => SubmitLogin()}>Login</button>
                        </form>
                        </div>
                        {loading && <Loading/>}
                        </div>
                        <PageFooter/>
                    </div>
                    )

                }
            }

        </Formik>
        
    )


}