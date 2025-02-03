import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Input } from 'reactstrap';
import PageFooter from "../../../components/Pages/PageFooter";
import { Loading } from '../../../components/Common/Loading';
import * as actions from '../../../store/actions';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {DropdownList}  from 'react-widgets';
import { useTranslation } from 'react-i18next';
import "react-widgets/dist/css/react-widgets.css"
import CryptoJS from 'crypto-js';
import * as key from '../../../containers/shared/constantKey';

export default function FormLogin(props) {
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showpassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [IsPreLoginSuccess, setIsPreLoginSuccess] = useState(false);
    const [ListBranch, setListBranch] = useState([]);
    const [ListDataBranch, setListDataBranch] = useState([]);
    const [SelBranch, setSelBranch] = useState('');
    const [ErrSelBranch, setErrSelBranch] = useState('');
    // useEffect(() => {
    //     deleteSessionAndLocalStorage();
    // }, []);

    const handleChangeUser = (data) => {
        let val = data.target.value;
        setUser(val);
    }
    const handlePassword = (data) => {
        let val = data.target.value;
        setPassword(val);
    }
    const handleShowingPassword = () => {
        setShowPassword(!showpassword);
    }
    const SubmitLogin = () => {
        // alert(user+' | '+password);
        setErrSelBranch('');
        if (SelBranch !== '') {
            setLoading(true);
            var obj = new Object();
            obj.user = user;
            obj.password = password;
            obj.idbranch = SelBranch;
            dispatch(actions.loginUser({url:'',payload:obj,propsdata:null}, succesHandlerSubmit, errorHandler));
        } else {
            setErrSelBranch(i18n.t('label_REQUIRED'));
        }


    }
    const SubmitPreLogin = () => {
        // alert(user+' | '+password);
        setLoading(true);
        localStorage.removeItem(key.branch);
        var obj = new Object();
        obj.user = user;
        obj.password = password;
        dispatch(actions.preLoginUser({url:'',payload:obj}, succesHandlerPreLogin, errorHandler));

    }
    const succesHandlerPreLogin = (data) => {
        setListDataBranch(data.data);
        setListBranch(data.data.reduce((obj, el) => (
            [...obj, {
                value: el.idbranch,
                label: el.displayName
            }]
        ), []));
        if(data.data.length == 1){
            setLoading(true);
            var obj = new Object();
            obj.user = user;
            obj.password = password;
            obj.idbranch = data.data[0].idbranch;
            dispatch(actions.loginUser({url:'',payload:obj,propsdata:data.data}, succesHandlerSubmit, errorHandler));
        }else{
            setLoading(false);
            setIsPreLoginSuccess(true);
        }

        
        
    }
    const handleChangeBranch = (data) => {
        let idbranch = data?.value ? data.value : '';
        setSelBranch(idbranch);
    }
    const succesHandlerSubmit = (data,propsdata) => {
        setLoading(false);
        
        
        if (data.flag) {
            let listbranch = propsdata != null?propsdata:ListDataBranch;
            let idbranch = propsdata != null?propsdata[0].idbranch:SelBranch;
            suksesLogin(data,listbranch,idbranch);
        }
        // alert('succesHandlerSubmit '+data);
    }

    function suksesLogin(data,listBranch, idbranch){
        
        let filterid = listBranch.filter(output => output.idbranch == idbranch);
        
        if (filterid.length > 0) {
            const branch = CryptoJS.AES.encrypt(JSON.stringify(filterid[0]), key.keyEcncrypt).toString();
            localStorage.setItem(key.branch, branch);
        }

        if (data.msg !== '') {
            Swal.fire({
                icon: 'info',
                title: 'Information',
                text: data.msg
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/home');
                }
            })
        } else {
            history.push('/home');
        }
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
                    user: user,
                    password: password,
                    showingpassword: showpassword,
                    preloginsuccess: IsPreLoginSuccess,
                    branch: SelBranch
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

                    return (
                        <div className="block-center mt-4 wd-xl">
                            <div className="card card-flat">
                                {/* <div className="card-header text-center bg-dark"> */}
                                <div className="card-header text-center bg-primary">
                                    <a href="">
                                        <img className="block-center rounded" src="img/logoexample100x35.png" alt="Logo" />
                                    </a>
                                </div>
                                {
                                    values.preloginsuccess ?
                                        <div className="card-body">
                                            <p className="text-center py-2">CHOOSE BRANCH</p>
                                            <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <div className="input-group with-focus">
                                                        <DropdownList
                                                            // className={
                                                            //     touched.branch && errors.branch
                                                            //         ? "input-error" : ""
                                                            // }
                                                            name="branch"
                                                            filter='contains'
                                                            placeholder={i18n.t('select.SELECT_OPTION')}
                                                            onKeyPress={
                                                                event => {
                                                                    if (event.key === "Enter") {
                                                                        SubmitLogin()
                                                                    }
                                                            }}

                                                            onChange={val => handleChangeBranch(val)}
                                                            onBlur={val => setFieldTouched("branch", val?.value ? val.value : '')}
                                                            data={ListBranch}
                                                            textField={'label'}
                                                            valueField={'value'}
                                                            dataKey={'value'}
                                                            style={{ width: '100%' }}
                                                            // disabled={values.isdisabledcountry}
                                                            value={values.branch}
                                                        />
                                                        <div className="invalid-feedback-custom">{ErrSelBranch}</div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-block btn-primary mt-3" type="button" onClick={() => SubmitLogin()}>Next</button>
                                            </form>
                                        </div>
                                        :

                                        (
                                            <div className="card-body">
                                                <p className="text-center py-2">SIGN IN TO CONTINUE</p>
                                                <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <div className="input-group with-focus">
                                                            <Input type="text"
                                                                name="user"
                                                                className="border-right-0"
                                                                placeholder="Enter user"
                                                                onKeyPress={
                                                                    event => {
                                                                        if (event.key === "Enter") {
                                                                            SubmitPreLogin()
                                                                        }
                                                                }}
                                                                // invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                                                // onChange={this.validateOnChange}
                                                                onChange={val => handleChangeUser(val)}
                                                                // data-validate='["required", "email"]'
                                                                value={values.user} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text text-muted bg-transparent border-left-0">
                                                                    <em className="fa fa-envelope"></em>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="input-group with-focus">
                                                            <Input type={values.showingpassword ? 'text' : 'password'}
                                                                id="id-password"
                                                                name="password"
                                                                className="border-right-0"
                                                                placeholder="Password"
                                                                onKeyPress={
                                                                    event => {
                                                                        if (event.key === "Enter") {
                                                                            SubmitPreLogin()
                                                                        }
                                                                }}
                                                                // invalid={this.hasError('formLogin','password','required')}
                                                                onChange={val => handlePassword(val)}
                                                                data-validate='["required"]'
                                                                value={values.password}
                                                            />
                                                            <div className="input-group-append" onClick={() => handleShowingPassword()}>
                                                                <span className="input-group-text text-muted bg-transparent border-left-0">
                                                                    <em className={values.showingpassword ? 'fa fa-eye-slash' : 'fa fa-eye'} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-block btn-primary mt-3" type="button" onClick={() => SubmitPreLogin()}>Login</button>
                                                </form>
                                            </div>)
                                }

                                {loading && <Loading />}
                            </div>
                            <PageFooter />
                        </div>
                    )

                }
            }

        </Formik>

    )


}