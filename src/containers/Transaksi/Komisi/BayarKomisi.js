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
import { formatRupiah, reloadToHomeNotAuthorize, removeFormatRupiah } from '../../shared/globalFunc';
import { addKomisi_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DatePicker } from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import { formatdate } from '../../shared/constantValue';
import '../../CSS/table.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function BayarKomisi(props) {
    reloadToHomeNotAuthorize(addKomisi_Permission, 'TRANSACTION');
    const { i18n } = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    momentLocalizer();

    const [loading, setLoading] = useState(false);
    const [TransDate, setTransDate] = useState(new Date());
    const [ErrTransDate, setErrTransDate] = useState("");

    const [ListItems, setListItems] = useState([]);
    const [ErrItems, setErrItems] = useState("");

    const id = props.match.params.id;
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getKomisiData({ url: '/template', type: 'GET', payload: null }, successHandlerTemplate, errorHandler));

    }, []);

    function successHandlerTemplate(data, propsdata) {
        let det = data.data;
        let iddec = localStorage.getItem('ajskme3ss');

        let obj = new Object();
        obj.idbox = det.idbox;
        obj.listidpurchaisereceive = iddec;
        dispatch(actions.getKomisiData({ url: '/bayar/listpr', type: 'POST', payload: obj }, successHandler, errorHandler));
    }

    function successHandler(data, propsdata) {
        let listpr = data.data;
        setLisPR(listpr);
        setLoading(false);

    }

    function setLisPR(listpr) {
        setListItems(listpr.reduce((obj, el) => [
            ...obj,
            {
                'id': el.id,
                'nama': el.vendornamabroker,
                'nodoc': el.nodocument,
                'transdate': el.date ? moment(el.date).format(formatdate) : '',
                'koli': el.koli,
                'komisiperkoli': el.komisi?formatRupiah((el.komisi?new String(el.komisi).replaceAll('.',','):''),2):0,
                'subtotalkomisi': el.subTotalkomisi?formatRupiah((el.subTotalkomisi?new String(el.subTotalkomisi).replaceAll('.',','):''),2):0,
            }
        ], []));
    }
    const checkColumnMandatory = (values) => {
        let flag = true;
        setErrTransDate('');
        if (ListItems.length <= 0) {
            setErrItems(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if (TransDate == null) {
            setErrTransDate(i18n.t('label_REQUIRED'));
            flag = false;
        }
        return flag;
    }
    const executeSubmit = (values) => {
        let flag = checkColumnMandatory(values);
        if (flag) {
            setLoading(true);
            let obj = new Object();
            obj.date = TransDate.getTime();
            obj.note = '';
            let items = [];
            if (ListItems.length > 0) {
                items = ListItems.reduce((obj, el) => [
                    ...obj,
                    {
                        'idpurchasereceive': el.id,
                        'koli': el.koli,
                        'komisiperkoli': removeFormatRupiah(el.komisiperkoli) !== '' ? removeFormatRupiah(el.komisiperkoli): '0',
                        'subtotalkomisi': removeFormatRupiah(el.subtotalkomisi) !== '' ? removeFormatRupiah(el.subtotalkomisi) : '0',
                    }
                ], []);
            }
            obj.items = items;
            dispatch(actions.submitKomisi({ url: '', payload: obj, type: 'ADD' }, succesHandlerSubmit, errorHandler));
        }
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

    const handleRemoveItems = index => {
        const list = [...ListItems];
        list.splice(index, 1);
        setListItems(list);
    };

    const handleChangeTransDate = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            let datetrans = moment(data, formatdate).toDate();
            setTransDate(datetrans);
        } else {
            setTransDate(null)
        }
    }

    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }

    return (
        <Formik
            initialValues={
                {
                    transdate: TransDate,
                    // kurs: InputKurs,
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
                        <form className="mb-6" onSubmit={handleSubmit} name="bayarkomisi">
                            <ContentWrapper>
                                <ContentHeading history={history} link={pathmenu.bayarkomisi+'/'+id} label={'Bayar Komisi'} labeldefault={'Bayar Komisi'} />
                                <div className="row mt-2">
                                <div className="mt-2 col-lg-6 ft-detail mb-5">
                                    <label className="mt-3 form-label required" htmlFor="transdate">
                                        {i18n.t('Tanggal')}
                                    </label>
                                    <span style={{ color: 'red' }}>*</span>

                                    <DatePicker
                                        name="transdate"
                                        onChange={val => handleChangeTransDate(val)}
                                        format={formatdate}
                                        value={values.transdate}
                                    />
                                    <div className="invalid-feedback-custom">{ErrTransDate}</div>
                                </div>
                                </div>

                                <div className="invalid-feedback-custom" style={{ fontSize: 'larger' }}>{ErrItems}</div>
                                {
                                    <div className="row justify-content-center">
                                        <table id="tablegrid">
                                        <tbody>
                                            <tr>
                                            <th>{''}</th>
                                            <th >{i18n.t('Nama Broker')}</th>
                                            <th >{i18n.t('No Document')}</th>
                                            <th >{i18n.t('Tanggal')}</th>
                                            <th >{i18n.t('Koli')}</th>
                                            <th >{i18n.t('Komisi Per Koli')}</th>
                                            <th >{i18n.t('Subtotal Komisi')}</th>
                                            </tr>
                                            {
                                                ListItems.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td >
                                                                <IconButton
                                                                    color={'primary'}
                                                                    // style={{color:'white'}}
                                                                    onClick={() => handleRemoveItems(i)}
                                                                    // hidden={x.nodocument == 'TOTAL'}
                                                                >
                                                                    <DeleteIcon style={{ fontSize: 18 }} />
                                                                </IconButton>
                                                            </td>
                                                            <td >
                                                                {x.nama}
                                                            </td>
                                                            <td >
                                                                {x.nodoc}
                                                            </td>
                                                            <td >
                                                                {x.transdate}
                                                            </td>
                                                            <td >
                                                                {x.koli}
                                                            </td>
                                                            <td >
                                                                {x.komisiperkoli}
                                                            </td>
                                                            <td >
                                                                {x.subtotalkomisi}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                }
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