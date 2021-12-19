import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import "react-widgets/dist/css/react-widgets.css";
// import ContentWrapper               from '../../../components/Layout/ContentWrapper';
// import {Input,Button,Card, CardBody} from 'reactstrap';
// import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import {DropdownList,DatePicker}      from 'react-widgets';
import moment                          from 'moment';
import momentLocalizer                 from 'react-widgets-moment';

// import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
// import { addInfo_Permission } from '../../shared/permissionMenu';
// import SearchIcon from '@mui/icons-material/Search';
import Search from '@material-ui/icons/Search';

export default function ParameterMaps(props) {
    // reloadToHomeNotAuthorize(addInfo_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    momentLocalizer();

    const [ListSalesman, setListSalesman] = useState([]);
    const [SelSalesman, setSelSalesman] = useState('');
    const [InputTanggal, setInputTanggal] = useState(new Date());

    useEffect(() => {
        // setLoading(true);
        props.handleLoading(true);
        dispatch(actions.getMonitoringData('/monitoring/maps/template',successHandlerTemplate, errorHandler));
    }, []);

    function successHandlerTemplate(data) {
        if(data.data){
            setListSalesman(data.data.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        props.handleLoading(false);
    }

    const errorHandler = (data) => {
        props.handleLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + data
        })
    }

    const handleChangeSalesman = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelSalesman(selValue);
    }

    const handleStartDate = (data) =>{
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        setInputTanggal(moment(data, "DD MMMM YYYY").toDate())
    }
    const handleSeacrh = () => {
        if(SelSalesman !== ''){
            props.handleLoading(true);
            let startDate = moment(InputTanggal).format('YYYY-MM-DD');
            let pathURL = '/monitoring/maps?idusermobile='+SelSalesman+'&tanggal='+startDate;
            dispatch(actions.getMonitoringData(pathURL,props.handleGetDataMaps, errorHandler));
        }
    }
    return (
        <Formik
        initialValues={
            {
                salesman:SelSalesman,
                tanggal:InputTanggal !== null ? moment(InputTanggal, "DD MMMM YYYY").toDate() : new Date(),
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
                            {/* <ContentWrapper> */}
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-4 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="salesman">
                                {i18n.t('Salesman')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.infotype && errors.infotype
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                name="salesman"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeSalesman(val)}
                                onBlur={val => setFieldTouched("salesman", val?.value ? val.value : '')}
                                data={ListSalesman}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.salesman}
                            />
                            </div>

                            <div className="mt-2 col-lg-4 ft-detail mb-5">
                                <label className="mt-3 form-label required" htmlFor="tanggal">
                                    {i18n.t('Tanggal')}
                                </label>
                                <DatePicker
                                        name="tanggal"
                                        // onChange={(val) => {
                                        //         setFieldValue("tanggal", val);
                                        //     }
                                        // }
                                        onChange={val => handleStartDate(val)}
                                        onBlur={handleBlur}
                                        // defaultValue={Date(moment([]))}
                                        format={'DD MMMM YYYY'}
                                        value={values.tanggal}
                                        // style={{width: '25%'}}
                                        // disabled={ values.allmember}                                    
                                />
                            </div>

                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{paddingLeft:'0px',paddingTop:'40px'}}>
                            <IconButton color={'primary'}
                                onClick={() => handleSeacrh()}
                            >
                                <Search style={{ fontSize: 30 }}/>
                            </IconButton>
                            </div>

                            </div>
                            {/* </ContentWrapper> */}
                        </form>

                    )

                }
            }
        </Formik>

    )

}