import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Button } from 'reactstrap';
import * as actions from '../../../store/actions';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal from "sweetalert2";
import { useHistory } from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editMappingStock_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import momentLocalizer from 'react-widgets-moment';
import { DropdownList } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

export default function EditMappingStock(props) {
    reloadToHomeNotAuthorize(editMappingStock_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);

    const [ListCategoryProduct, setListCategoryProduct] = useState([]);
    const [ListCategoryProductCustomer, setListCategoryProductCustomer] = useState([]);

    const [SelCategoryProduct, setSelCategoryProduct] = useState('');
    const [ErrSelCategoryProduct, setErrSelCategoryProduct] = useState('');
    const [SelCategoryProductMapping, setSelCategoryProductMapping] = useState('');
    const [ErrSelCategoryProductMapping, setErrSelCategoryProductMapping] = useState('');

    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getMappingStockData({ url: '/template' }, successHandlerTemplate, errorHandler));
    }, []);
    function successHandlerTemplate(data, propsdata) {
        let valTemplate = data.data;
        dispatch(actions.getMappingStockData({ url: '/' + id, propsdata: { template: valTemplate } }, successHandler, errorHandler));
    }
    function successHandler(data, propsdata) {
        if (propsdata.template) {
            let listfilteroutputVendor = propsdata.template.categoryProductOpt.filter(output => output.forcategory == 'VENDOR');
            let listfilteroutputCustomer = propsdata.template.categoryProductOpt.filter(output => output.forcategory == 'CUSTOMER');
            
            setListCategoryProduct(listfilteroutputVendor.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama + ' (' + el.size + ')'
                }]
            ), []));

            setListCategoryProductCustomer(listfilteroutputCustomer.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama + ' (' + el.size + ')'
                }]
            ), []));
        }
        if (data.data) {
            let val = data.data;
            setSelCategoryProduct(val.categoryproductid);
            setSelCategoryProductMapping(val.categoryproductidmapping);
        }
        setLoading(false);
    }

    const handleChangeCategoryProduct = (data) => {
        let id = data?.value ? data.value : '';
        setSelCategoryProduct(id);
    }
    const handleChangeCategoryProductMapping = (data) => {
        let id = data?.value ? data.value : '';
        setSelCategoryProductMapping(id);
    }

    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrSelCategoryProduct('');
        setErrSelCategoryProductMapping('');
        if (SelCategoryProduct == '') {
            setErrSelCategoryProduct(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (SelCategoryProductMapping == '') {
            setErrSelCategoryProductMapping(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if (SelCategoryProduct !== '' && SelCategoryProductMapping !== '') {
            if (SelCategoryProduct == SelCategoryProductMapping) {
                setErrSelCategoryProductMapping(i18n.t('Product Tidak Bisa Sama'));
                flag = false;
            }
        }
        return flag;
    }

    const succesHandlerSubmit = (data, propsdata) => {
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

    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.categoryproductid = SelCategoryProduct;
            obj.categoryproductidmapping = SelCategoryProductMapping;
            dispatch(actions.submitMappingStockData({ url: '/' + id, payload: obj, type: 'EDIT' }, succesHandlerSubmit, errorHandler));
        }
    }

    const submitHandler = (values) => {
        Swal.fire({
            title: i18n.t('label_DIALOG_ALERT_SURE'),
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                executeSubmit(values);
                //   Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const errorHandler = (data, propsdata) => {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.msg
        })
    }

    return (
        <Formik
            initialValues={
                {
                    CategoryProduct: SelCategoryProduct,
                    CategoryProductMapping: SelCategoryProductMapping,
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
                        <form className="mb-6" onSubmit={handleSubmit} name="FormCustomer">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.editmappingstock + '/' + id} label={'Edit Mapping Stock'} labeldefault={'Edit Mapping Stock'} />

                                <div className="row mt-2">
                                    <div className="mt-2 col-lg-6 ft-detail mb-5">
                                        <label className="mt-3 form-label required" htmlFor="CategoryProduct">
                                            {i18n.t('Category Product Vendor')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="CategoryProduct"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeCategoryProduct(val)}
                                            onBlur={val => setFieldTouched("CategoryProduct", val?.value ? val.value : '')}
                                            data={ListCategoryProduct}
                                            textField={'label'}
                                            valueField={'value'}
                                            value={values.CategoryProduct}
                                            disabled={true}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelCategoryProduct}</div>

                                        <label className="mt-3 form-label required" htmlFor="CategoryProductMapping">
                                            {i18n.t('Category Product Customer ')}
                                        </label>
                                        <span style={{ color: 'red' }}>*</span>

                                        <DropdownList
                                            name="CategoryProductMapping"
                                            filter='contains'
                                            placeholder={i18n.t('select.SELECT_OPTION')}

                                            onChange={val => handleChangeCategoryProductMapping(val)}
                                            onBlur={val => setFieldTouched("CategoryProductMapping", val?.value ? val.value : '')}
                                            data={ListCategoryProductCustomer}
                                            textField={'label'}
                                            valueField={'value'}
                                            value={values.CategoryProductMapping}
                                        />
                                        <div className="invalid-feedback-custom">{ErrSelCategoryProductMapping}</div>


                                    </div>

                                </div>

                            </ContentWrapper>
                            {loading && <Loading />}
                            <div className="row justify-content-center" style={{ marginTop: '-30px', marginBottom: '20px' }}>
                                <Button
                                    // disabled={props.activeStep === 0}
                                    // style={{marginLeft:"20%"}}
                                    onClick={() => history.goBack()}
                                >
                                    {/* {i18n.t('common.BACK')} */}
                                    {'Cancel'}
                                </Button>

                                <Button
                                    // style={{marginLeft:"1%"}}
                                    color={'primary'}
                                    onClick={() => submitHandler(values)}
                                >
                                    {'Submit'}
                                </Button>
                            </div>
                        </form>
                    )
                }
            }
        </Formik>
    )
}