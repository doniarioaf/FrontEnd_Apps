import React, {useState}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
// import ContentHeading               from '../../components/Layout/ContentHeading';
import {Input} from 'reactstrap';
// import * as actions                 from '../../store/actions';
// import {useDispatch}   from 'react-redux';
// import { Loading } from '../../components/Common/Loading';
// import Swal             from "sweetalert2";
// import {useHistory}                 from 'react-router-dom';
import { formatMoney } from '../shared/globalFunc';
// import { addPartai_Permission } from '../shared/permissionMenu';
// import * as pathmenu           from '../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import '../CSS/table.css';

export default function AddJalurMerah(props) {
    // reloadToHomeNotAuthorize(addPartai_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const [loading, setLoading] = useState(false);

    const [SelGudang, setSelGudang] = useState('');
    const [InputHarga, setInputHarga] = useState('0');
    const [SelJasa, setSelJasa] = useState('');
    const [SelIsMandatory, setSelIsMandatory] = useState('N');

    const handleChangeGudang = (data) =>{
        let id = data?.value ? data.value : '';
        setSelGudang(id);
    }

    const handleChangeJasa = (data) =>{
        let id = data?.value ? data.value : '';
        setSelJasa(id);
    }

    const handleChangeIsMandatory = (data) =>{
        let id = data?.value ? data.value : '';
        setSelIsMandatory(id);
    }

    const handleInputHarga = (data) =>{
        let val = data.target.value;
        let split = new String(val).replaceAll('.','');
        split = new String(split).replaceAll(',','.');
        if(!isNaN(split)){
            setInputHarga(val);
        }
        
    }

    const handleAddClick = () =>{
        let obj = new Object();
        obj.idwarehouse = SelGudang;
        obj.idinvoicetype = SelJasa;
        obj.jalur = "MERAH";
        obj.price = InputHarga;
        obj.ismandatory = SelIsMandatory;
        if(SelGudang !== '' && SelJasa !== '' && InputHarga !== '' && SelIsMandatory !== ''){
            setSelGudang('');
            setSelJasa('');
            setInputHarga('0');
            setSelIsMandatory('N');
            props.addtolist(obj);
        }
        
    }

    return (
        <Formik
        initialValues={
            {
                gudang:SelGudang,
                jasa:SelJasa,
                harga:InputHarga,
                ismandatory:SelIsMandatory
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormJalurHijau">
                            <ContentWrapper>
                            <table id="tablegrid" hidden={props.type ? props.type == 'DETAIL':false}>
                                    <tbody>
                                        <tr>
                                            <td>{i18n.t('label_WAREHOUSE')}<span style={{color:'red'}}>*</span></td>
                                            <td>{'Jasa'}<span style={{color:'red'}}>*</span></td>
                                            <td>{i18n.t('label_PRICE')}<span style={{color:'red'}}>*</span></td>
                                            <td hidden={true}>{'Is Mandatory'}<span style={{color:'red'}}>*</span></td>
                                            <td>{''}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <DropdownList
                                                // className={
                                                //     touched.branch && errors.branch
                                                //         ? "input-error" : ""
                                                // }
                                                name="gudang"
                                                filter='contains'
                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                
                                                onChange={val => handleChangeGudang(val)}
                                                onBlur={val => setFieldTouched("gudang", val?.value ? val.value : '')}
                                                data={props.listgudang}
                                                textField={'label'}
                                                valueField={'value'}
                                                style={{width: '220px'}}
                                                // disabled={values.isdisabledcountry}
                                                value={values.gudang}
                                            />
                                            </td>

                                            <td>
                                            <DropdownList
                                                // className={
                                                //     touched.branch && errors.branch
                                                //         ? "input-error" : ""
                                                // }
                                                name="jasa"
                                                filter='contains'
                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                
                                                onChange={val => handleChangeJasa(val)}
                                                onBlur={val => setFieldTouched("jasa", val?.value ? val.value : '')}
                                                data={props.listjasa}
                                                textField={'label'}
                                                valueField={'value'}
                                                style={{width: '220px'}}
                                                // disabled={values.isdisabledcountry}
                                                value={values.jasa}
                                            />
                                            </td>
                                            <td>
                                            <Input
                                                name="harga"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="harga"
                                                onChange={val => handleInputHarga(val)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                value={values.harga !== '' ?formatMoney( new String(values.harga).replaceAll('.','')):''}
                                                // value={numToMoney(parseFloat(values.harga.replaceAll('.','')))}
                                                // value={values.harga}
                                                disabled={false}
                                            />
                                            </td>
                                            <td hidden={true}>
                                            <DropdownList
                                                // className={
                                                //     touched.branch && errors.branch
                                                //         ? "input-error" : ""
                                                // }
                                                name="ismandatory"
                                                filter='contains'
                                                placeholder={i18n.t('select.SELECT_OPTION')}
                                                
                                                onChange={val => handleChangeIsMandatory(val)}
                                                onBlur={val => setFieldTouched("ismandatory", val?.value ? val.value : '')}
                                                data={props.listmandatory}
                                                textField={'label'}
                                                valueField={'value'}
                                                // style={{width: '25%'}}
                                                // disabled={values.isdisabledcountry}
                                                value={values.ismandatory}
                                            />
                                            </td>
                                            <td>
                                            <IconButton color={'primary'}
                                                    onClick={() => handleAddClick()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {
                                    // props.listdata.length == 0?'':
                                    <table id="tablegrid">
                                        <tbody>
                                        <tr>
                                            <th>{i18n.t('label_WAREHOUSE')}</th>
                                            <th>{i18n.t('Jasa')}</th>
                                            <th>{i18n.t('label_PRICE')}</th>
                                            <th hidden={true}>{i18n.t('Is Mandatory')}</th>
                                            <th>{i18n.t('Action')}</th>
                                        </tr>
                                            {
                                                props.listdata.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                            <DropdownList
                                                                name="idwarehouse"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                // onChange={val => handleInputDropDownChange(val,i,'jeniskelamin')}
                                                                data={props.listgudang}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '220px'}}
                                                                disabled={true}
                                                                value={x.idwarehouse}
                                                            />
                                                            </td>

                                                            <td>
                                                            <DropdownList
                                                                name="idinvoicetype"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                // onChange={val => handleInputDropDownChange(val,i,'jeniskelamin')}
                                                                data={props.listjasa}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '220px'}}
                                                                disabled={true}
                                                                value={x.idinvoicetype}
                                                            />
                                                            </td>

                                                            <td>
                                                            <Input
                                                                name="price"
                                                                // className={
                                                                //     touched.amount && errors.amount
                                                                //         ? "w-50 input-error"
                                                                //         : "w-50"
                                                                // }
                                                                type="text"
                                                                id="price"
                                                                onChange={val => props.handleinputchange(val,i)}
                                                                onBlur={handleBlur}
                                                                // placeholder={i18n.t('label_AMOUNT')}
                                                                value={x.price !== '' ?formatMoney( new String(x.price).replaceAll('.','')):''}
                                                                disabled={false}
                                                            />
                                                            </td>

                                                            <td hidden={true}>
                                                            <DropdownList
                                                                name="ismandatory"
                                                                filter='contains'
                                                                // placeholder={i18n.t('select.SELECT_OPTION')}
                                                                
                                                                onChange={val => props.handleInputDropDownChange(val,i,'ismandatory')}
                                                                data={props.listmandatory}
                                                                textField={'label'}
                                                                valueField={'value'}
                                                                style={{width: '100px'}}
                                                                // disabled={true}
                                                                value={x.ismandatory}
                                                            />
                                                            </td>
                                                            <td >
                                                            <IconButton color={'primary'} 
                                                            onClick={() => props.handleRemoveClick(i)}
                                                            // hidden={showplusdebit}
                                                            >
                                                                <RemoveIcon style={{ fontSize: 18 }}/>
                                                            </IconButton>   
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>
                                }
                            </ContentWrapper>
                        </form>

                    )
                }
            }
        </Formik>
    )
}