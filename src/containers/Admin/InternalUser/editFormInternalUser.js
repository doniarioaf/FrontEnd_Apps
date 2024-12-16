import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import { Input, Button, FormGroup, Label, Card, CardBody } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editInternalUser_Permission } from '../../shared/permissionMenu';

import Grid from '../Company/gridBranch';
import { DropdownList } from 'react-widgets';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "react-widgets/dist/css/react-widgets.css";

export default function EditFormInternalUser(props) {
    reloadToHomeNotAuthorize(editInternalUser_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [InputUsername, setInputUsername] = useState('');
    const [ErrInputUsername, setErrInputUsername] = useState('');

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputPassword, setInputPassword] = useState('');
    const [InputConfirmPassword, setInputConfirmPassword] = useState('');
    const [ErrInputPassword, setErrInputPassword] = useState('');

    const [InputEmail, setInputEmail] = useState('');
    const [ErrInputEmail, setErrInputEmail] = useState('');

    const [InputNoTlp, setInputNoTlp] = useState('');
    const [ErrInputNoTlp, setErrInputNoTlp] = useState('');

    const [InputAddress, setInputAddress] = useState('');
    const [ErrInputAddress, setErrInputAddress] = useState('');

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [ListRoles, setListRoles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ErrRoles, setErrRoles] = useState('');

    const [ListBranch, setListBranch] = useState([]);
    const [SelBranch, setSelBranch] = useState('');
    const [ErrSelBranch, setErrSelBranch] = useState('');
    const [hiddenColumns] = useState(['id']);
    const [RowsBranch, setRowsBranch] = useState([]);
    const [columns] = useState([
        { name: 'id', title: 'id' },
        { name: 'name', title: i18n.t('label_NAME') },
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight + 'px');

    const [IsAllBranch, setIsAllBranch] = useState(false);

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getUserAppsData('/template', successHandler, errorHandler));

    }, []);

    function successHandler(data) {

        if (data.data) {
            setListBranch(data.data.branchOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.idbranch,
                    label: el.displayName
                }]
            ), []));

            dispatch(actions.getUserAppsDataWithParam('/' + id, data.data.roleoptions, successHandlerDetail, errorHandler));
        }

    }

    function successHandlerDetail(data, param) {
        let detail = data.data.user ? data.data.user : [];
        setInputNama(detail.nama);
        setInputUsername(detail.username);
        setInputNoTlp(detail.notelepon);
        setInputEmail(detail.email);
        setInputAddress(detail.address);
        let isAllBranch = detail.isallbranch ? true : false;
        setIsAllBranch(isAllBranch);

        if (!isAllBranch) {
            let branchs = data.data.branchs ? data.data.branchs : [];
            let listbranch = branchs.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.idbranch,
                    'name': el.displayName
                }
            ], []);
            setRowsBranch(listbranch);
            setHeightGridListCharges(listbranch);
        }


        let theData = param.reduce((obj, el) => (
            [...obj, {
                value: el.id,
                label: el.nama
            }]
        ), [])

        let selectedData = [];
        let roles = [];
        if (data.data.roles) {
            for (let i = 0; i < data.data.roles.length; i++) {
                let role = data.data.roles[i];
                const options = { value: role.id, label: role.nama };
                selectedData.push(options);
                // theData.push(options);
                roles.push(role.id);
            }
        }
        setRoles(roles);
        setSelectedRoles(selectedData);
        setListRoles(theData);
        setLoading(false);
    }

    const handleChangeBranche = (data) => {
        let idbranch = data?.value ? data.value : '';
        setSelBranch(idbranch);
    }
    const setHeightGridListCharges = (dataval) => {
        if (dataval.length > 2) {
            let height = (50 * (dataval.length - 2)) + StartdefaultHeight;
            if (height > 600) {
                height = 600;
            }
            setdefaultHeight(height + 'px');
        }
    }
    const handleAddListBranch = () => {
        let dataval = [];
        let filterid = RowsBranch.filter(output => output.id == SelBranch);
        if (filterid.length == 0) {
            let listfilteroutput = ListBranch.filter(output => output.value == SelBranch);
            if (listfilteroutput.length > 0) {
                dataval = [...RowsBranch];
                let filter = listfilteroutput[0];
                let obj = {
                    'id': filter.value,
                    'name': filter.label
                };
                dataval.push(obj);
                setRowsBranch(dataval);
                setHeightGridListCharges(dataval);
            }
        }
    }
    const handleSubstractListDetailTrans = (id) => {
        let listfilter = RowsBranch.filter(output => output.id !== id);
        let dataval = [...listfilter];
        setRowsBranch(dataval);
        setHeightGridListCharges(dataval);
    }

    const handleChangeIsAllBranch = (data) => {
        setIsAllBranch(data.target.checked);
    }

    const handleInputUsername = (data) => {
        let val = data.target.value;
        setInputUsername(val);
    }

    const handleInputNama = (data) => {
        let val = data.target.value;
        setInputNama(val);
    }

    const handleInputPassword = (data) => {
        let val = data.target.value;
        setInputPassword(val);
    }

    const handleInputConfirmPassword = (data) => {
        let val = data.target.value;
        setInputConfirmPassword(val);
    }

    const handleInputEmail = (data) => {
        let val = data.target.value;
        setInputEmail(val);
    }

    const handleInputNoTlp = (data) => {
        let val = data.target.value;
        setInputNoTlp(val);
    }

    const handleInputAddress = (data) => {
        let val = data.target.value;
        setInputAddress(val);
    }

    const handleRolesChange = (data) => {
        let temp = [];
        let selectedroles = [];
        if (data !== null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                temp.push(data[i].value);
                selectedroles.push(data[i]);
            }
        }
        setSelectedRoles(selectedroles);
        setRoles(temp);
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputUsername('');
        setErrInputNama('');
        setErrInputPassword('');
        setErrInputEmail('');
        setErrInputNoTlp('');
        setErrInputAddress('');
        setErrRoles('');
        setErrSelBranch('');

        if (InputUsername == '') {
            setErrInputUsername(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (InputNama == '') {
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }
        // if(InputPassword == ''){
        //     setErrInputPassword(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }else if(InputPassword !== InputConfirmPassword){
        //     setErrInputPassword(i18n.t('label_REQUIRED'));
        //     flag = false;
        // }
        if (InputEmail == '') {
            setErrInputEmail(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (InputNoTlp == '') {
            setErrInputNoTlp(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (InputAddress == '') {
            setErrInputAddress(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (roles.length == 0) {
            setErrRoles(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (!IsAllBranch && RowsBranch.length == 0) {
            setErrSelBranch(i18n.t('label_REQUIRED'));
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
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.username = InputUsername;
            // obj.password = InputPassword;
            obj.nama = InputNama;
            obj.notelepon = InputNoTlp;
            obj.address = InputAddress;
            obj.email = InputAddress;
            obj.roles = roles;
            obj.isallbranch = IsAllBranch;
            if (IsAllBranch) {
                obj.branchs = [];
            } else {
                let temp = [];
                for (var i = 0; i < RowsBranch.length; i++) {
                    temp.push(RowsBranch[i].id);
                }
                obj.branchs = temp;
            }
            dispatch(actions.submitEditUserApps(id, obj, succesHandlerSubmit, errorHandler));
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
                    nama: InputNama,
                    username: InputUsername,
                    // password:InputPassword,
                    // confirmpassword:InputConfirmPassword,
                    notlp: InputNoTlp,
                    email: InputEmail,
                    address: InputAddress,
                    isallbranch: IsAllBranch,
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormAddUser">
                            <ContentWrapper>
                                <div className="content-heading"  >
                                    <span>{i18n.t('label_EDIT_INTERNAL_USER')}</span>
                                </div>

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="nama">
                                            {i18n.t('label_NAME')}
                                        </label>
                                        <Input
                                            name="nama"
                                            // className={
                                            //     touched.nama && errors.nama
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="nama"
                                            onChange={val => handleInputNama(val)}
                                            onBlur={handleBlur}
                                            value={values.nama}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputNama}</div>

                                        <label className="mt-3 form-label required" htmlFor="username">
                                            {i18n.t('label_USERNAME')}
                                        </label>
                                        <Input
                                            name="username"
                                            // className={
                                            //     touched.nama && errors.nama
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="username"
                                            onChange={val => handleInputUsername(val)}
                                            onBlur={handleBlur}
                                            value={values.username}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputUsername}</div>

                                        {/* <label className="mt-3 form-label required" htmlFor="password">
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
                            /> */}

                                        <label className="mt-3 form-label required" htmlFor="notlp">
                                            {i18n.t('label_CONTACT_NUMBER')}
                                        </label>
                                        <Input
                                            name="notlp"
                                            // className={
                                            //     touched.nama && errors.nama
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="notlp"
                                            onChange={val => handleInputNoTlp(val)}
                                            onBlur={handleBlur}
                                            value={values.notlp}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputNoTlp}</div>

                                        <div className="row mt-0" hidden={values.isallbranch}>
                                            <div className="mt-0 col-lg-11 ft-detail mb-5" style={{ paddingRight: '0px' }}>
                                                <label className="mt-3 form-label required" htmlFor="branch">
                                                    {i18n.t('label_BRANCH')}
                                                </label>

                                                <DropdownList
                                                    // className={
                                                    //     touched.branch && errors.branch
                                                    //         ? "input-error" : ""
                                                    // }
                                                    name="branch"
                                                    filter='contains'
                                                    placeholder={i18n.t('select.SELECT_OPTION')}

                                                    onChange={val => handleChangeBranche(val)}
                                                    onBlur={val => setFieldTouched("branch", val?.value ? val.value : '')}
                                                    data={ListBranch}
                                                    textField={'label'}
                                                    valueField={'value'}
                                                    // style={{width: '25%'}}
                                                    // disabled={values.isdisabledcountry}
                                                    value={values.branch}
                                                />
                                            </div>

                                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{ paddingLeft: '0px', paddingTop: '35px' }}>
                                                <IconButton color={'primary'}
                                                    onClick={() => handleAddListBranch()}
                                                >
                                                    <AddIcon style={{ fontSize: 30 }} />
                                                </IconButton>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-2 col-lg-6 ft-detail mb-5">


                                        <label className="mt-3 form-label required" htmlFor="email">
                                            {i18n.t('Email')}
                                        </label>
                                        <Input
                                            name="email"
                                            // className={
                                            //     touched.nama && errors.nama
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="email"
                                            onChange={val => handleInputEmail(val)}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputEmail}</div>

                                        <label className="mt-3 form-label required" htmlFor="address">
                                            {i18n.t('label_ADDRESS')}
                                        </label>
                                        <Input
                                            name="address"
                                            // className={
                                            //     touched.nama && errors.nama
                                            //         ? "w-50 input-error"
                                            //         : "w-50"
                                            // }
                                            type="text"
                                            id="address"
                                            onChange={val => handleInputAddress(val)}
                                            onBlur={handleBlur}
                                            value={values.address}
                                        />
                                        <div className="invalid-feedback-custom">{ErrInputAddress}</div>

                                        <label className="mt-3 form-label required" htmlFor="role">
                                            {i18n.t('Role')}
                                        </label>
                                        <Select
                                            // defaultValue={[options[0], options[1]]}
                                            value={selectedRoles}
                                            isMulti
                                            name="colors"
                                            options={ListRoles}
                                            onChange={val => handleRolesChange(val)}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        // placeholder={i18n.t('select.SELECT_OPTION')}
                                        />

                                        <FormGroup check style={{ marginTop: '20px' }}>
                                            <Input type="checkbox" name="check"
                                                id="isallbranch"
                                                onChange={val => handleChangeIsAllBranch(val)}
                                                defaultChecked={values.isallbranch}
                                                checked={values.isallbranch}
                                                style={{ transform: 'scale(1.5)' }}
                                            />
                                            <Label for="isallbranch" check style={{ transform: 'scale(1.5)', marginLeft: '20px' }}>{i18n.t('All Branch?')}</Label>
                                        </FormGroup>
                                    </div>

                                </div>
                                <Button
                                    // disabled={props.activeStep === 0}
                                    style={{ marginLeft: "20%" }}
                                    onClick={() => history.goBack()}
                                >
                                    {/* {i18n.t('common.BACK')} */}
                                    {'Cancel'}
                                </Button>

                                <Button
                                    style={{ marginLeft: "1%" }}
                                    onClick={() => submitHandler()}
                                >
                                    {'Submit'}
                                </Button>

                                <Card hidden={values.isallbranch}>
                                    <div className="invalid-feedback-custom">{ErrSelBranch}</div>
                                    <CardBody>
                                        <div className="table-responsive" style={{ height: defaultHeight }}>
                                            <Grid
                                                rows={RowsBranch}
                                                columns={columns}
                                                totalCounts={RowsBranch.length}
                                                loading={loading}
                                                columnextension={[]}
                                                handleSubstractList={handleSubstractListDetailTrans}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>

                            </ContentWrapper>
                            {loading && <Loading />}

                        </form>

                    )

                }
            }

        </Formik>

    )
}