import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {Input,Button,FormGroup,Label} from 'reactstrap';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editWarehouse_Permission } from '../../shared/permissionMenu';
import * as pathmenu           from '../../shared/pathMenu';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconButton } from '@material-ui/core';
import InputMask                    from 'react-input-mask';

export default function EditWarehouse(props) {
    reloadToHomeNotAuthorize(editWarehouse_Permission,'TRANSACTION');
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListProvince, setListProvince] = useState([]);
    const [SelProvince, setSelProvince] = useState('');
    const [ErrSelProvince, setErrSelProvince] = useState('');

    const [ListCity, setListCity] = useState([]);
    const [SelCity, setSelCity] = useState('');
    const [ErrSelCity, setErrSelCity] = useState('');

    const [ListDistrict, setListDistrict] = useState([]);
    const [SelDistrict, setSelDistrict] = useState('');
    const [ErrSelDistrict, setErrSelDistrict] = useState('');

    const [InputNama, setInputNama] = useState('');
    const [ErrInputNama, setErrInputNama] = useState('');

    const [InputAlamat, setInputAlamat] = useState('');
    const [ErrInputAlamat, setErrInputAlamat] = useState('');

    const [InputAncerAncer, setInputAncerAncer] = useState('');
    const [ErrInputAncerAncer, setErrInputAncerAncer] = useState('');

    const [InputNote, setInputNote] = useState('');
    const [InputIsActive, setInputIsActive] = useState(true);

    const [InputListContactHp, setInputListContactHp] = useState([{ contacthp: ""}]);
    const [InputListContactNumber, setInputListContactNumber] = useState([{ contactnumber: ""}]);

    const [ErrInputContactHp, setErrInputContactHp] = useState('');
    const [ErrInputContactNumber, setErrInputContactNumber] = useState('');

    const id = props.match.params.id;

    const [DataTemplate, setDataTemplate] = useState([]);
    useEffect(() => {
        setLoading(true);
        dispatch(actions.getWarehouseData('/'+id,successHandlerTemplate, errorHandler));
    }, []);

    const successHandlerTemplate = (data) =>{
        if(data.data){
            let det = data.data;
            let template = det.template;
            setDataTemplate(template);

            setInputNama(det.nama);
            setSelProvince(parseInt(det.province));
            setSelCity(parseInt(det.city));
            setSelDistrict(parseInt(det.kecamatan));
            setInputAlamat(det.alamat);
            setInputAncerAncer(det.ancerancer);
            setInputNote(det.note);
            setInputIsActive(det.isactive);

            let listcontactnumber = [];
            if(det.contactnumber){
                let cek = new String(det.contactnumber).includes(',');
                if(cek){
                    let arrList = new String(det.contactnumber).split(',');
                    for(let i=0; i < arrList.length; i++){
                        listcontactnumber.push({ contactnumber: arrList[i]});
                    }
                }else{
                    listcontactnumber.push({ contactnumber: det.contactnumber});
                }
                if(listcontactnumber.length > 0){
                    setInputListContactNumber(listcontactnumber);
                }
                
            }

            let listcontacthp = [];
            if(det.contactnumber){
                let cek = new String(det.contacthp).includes(',');
                if(cek){
                    let arrList = new String(det.contacthp).split(',');
                    for(let i=0; i < arrList.length; i++){
                        listcontacthp.push({ contacthp: arrList[i]});
                    }
                }else{
                    listcontacthp.push({ contacthp: det.contacthp});
                }
                if(listcontacthp.length > 0){
                    setInputListContactHp(listcontacthp);
                }
                
            }

            setListProvince(template.provinceOptions.reduce((obj, el) => (
                [...obj, {
                    value: el.prov_id,
                    label: el.prov_name
                }]
            ), []));
            setChangeListCity(det.province,template);

            setLoading(true);
            dispatch(actions.getAddressData('/districtbycity?cityid='+det.city,successHandlerDistrict, errorHandler));
        }

        

        setLoading(false);
    }

    const handleChangeProvinsi = (data) =>{
        let id = data?.value ? data.value : '';
        setSelProvince(id);
        setListCity([]);
        setSelCity('');
        setListDistrict([]);
        setSelDistrict('');
        setChangeListCity(id,DataTemplate);
        
    }

    const setChangeListCity = (provid,template) =>{
        let listfilteroutput = template.cityOptions.filter(output => output.prov_id == provid);
        if(listfilteroutput.length > 0){
            setListCity(listfilteroutput.reduce((obj, el) => (
                [...obj, {
                    value: el.city_id,
                    label: el.city_name
                }]
            ), []));
        }
    }

    const handleChangeKota = (data) =>{
        let id = data?.value ? data.value : '';
        setSelCity(id);
        setListDistrict([]);
        setSelDistrict('');
        setLoading(true);
        dispatch(actions.getAddressData('/districtbycity?cityid='+id,successHandlerDistrict, errorHandler));
    }

    const successHandlerDistrict = (data) =>{
        setListDistrict(data.data.reduce((obj, el) => (
            [...obj, {
                value: el.dis_id,
                label: el.dis_name
            }]
        ), []));
        setLoading(false);
    }

    const handleChangeDistrict = (data) =>{
        let id = data?.value ? data.value : '';
        setSelDistrict(id);
    }

    const handleInputNama = (data) =>{
        let val = data.target.value;
        setInputNama(val);
    }

    const handleInputAlamat = (data) =>{
        let val = data.target.value;
        setInputAlamat(val);
    }

    const handleInputNote = (data) =>{
        let val = data.target.value;
        setInputNote(val);
    }

    const handleInputAncer = (data) =>{
        let val = data.target.value;
        setInputAncerAncer(val);
    }

    const handleChangeIsActive = (data) =>{
        setInputIsActive(data.target.checked);
    }

    const handleInputChangeContactNumber = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        // let repVal = new String(value).replaceAll('(','');
        // repVal = new String(repVal).replaceAll(')','')
        if(name == 'contactnumber' && new String(value).includes(',')){
            flag = false;
        }
        if(flag){
            const list = [...InputListContactNumber];
            list[index][name] = value;
            setInputListContactNumber(list);
        }
    };

    const handleInputChangeContacthp = (e, index) => {
        const { name, value } = e.target;
        let flag = true;
        if(name == 'contacthp' && isNaN(value)){
            flag = false;
        }
        if(flag){
            const list = [...InputListContactHp];
            list[index][name] = value;
            setInputListContactHp(list);
        }
    };

    const handleAddClickContactHp = () => {
        setInputListContactHp([...InputListContactHp, { contacthp: ""}]);
    };

    const handleRemoveClickContactHp = index => {
        const list = [...InputListContactHp];
        list.splice(index, 1);
        setInputListContactHp(list);
    };

    const handleAddClickContactNumber = () => {
        setInputListContactNumber([...InputListContactNumber, { contactnumber: ""}]);
    };

    const handleRemoveClickContactNumber = index => {
        const list = [...InputListContactNumber];
        list.splice(index, 1);
        setInputListContactNumber(list);
    };

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputNama('');
        setErrSelProvince('');
        setErrSelCity('');
        setErrSelDistrict('');
        setErrInputAlamat('');
        setErrInputAncerAncer('');
        setErrInputContactNumber('');
        setErrInputContactHp('');

        if(InputNama == ''){
            setErrInputNama(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelProvince == ''){
            setErrSelProvince(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelCity == ''){
            setErrSelCity(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(SelDistrict == ''){
            setErrSelDistrict(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAlamat == ''){
            setErrInputAlamat(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputAncerAncer == ''){
            setErrInputAncerAncer(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputListContactHp.length > 0){
            for(let i=0; i < InputListContactHp.length; i++){
                let det = InputListContactHp[i];
                if(det.contacthp == ''){
                    setErrInputContactHp(i18n.t('label_REQUIRED'));
                    flag = false;
                    break;
                }
            }
        }else{
            setErrInputContactHp(i18n.t('label_REQUIRED'));
            flag = false;
        }

        if(InputListContactNumber.length > 0){
            for(let i=0; i < InputListContactNumber.length; i++){
                let det = InputListContactNumber[i];
                if(det.contactnumber == ''){
                    setErrInputContactNumber(i18n.t('label_REQUIRED'));
                    flag = false;
                    break;
                }
            }
        }else{
            setErrInputContactNumber(i18n.t('label_REQUIRED'));
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
            obj.province = SelProvince;
            obj.city = SelCity;
            obj.kecamatan = SelDistrict;
            obj.nama = InputNama;
            obj.alamat = InputAlamat;
            obj.ancerancer = InputAncerAncer;
            obj.isactive = InputIsActive;
            obj.note = InputNote;

            let listcontactnumber = '';
            if(InputListContactNumber.length > 0){
                let count =0;
                for(let i=0; i < InputListContactNumber.length; i++){
                    let no = InputListContactNumber[i].contactnumber.replaceAll('_','');
                    count++;
                    if(no != ''){
                        if(count == InputListContactNumber.length){
                            listcontactnumber += no;
                        }else{
                            listcontactnumber += no+',';
                        }
                        
                    }
                    
                }
            }
            obj.contactnumber = listcontactnumber;

            let listcontacthp = '';
            if(InputListContactHp.length > 0){
                let count =0;
                for(let i=0; i < InputListContactHp.length; i++){
                    let no = InputListContactHp[i].contacthp.replaceAll('_','');;
                    count++;
                    if(no != ''){
                        if(count == InputListContactHp.length){
                            listcontacthp += no;
                        }else{
                            listcontacthp += no+',';
                        }
                        
                    }
                    
                }
            }
            obj.contacthp = listcontacthp;
            dispatch(actions.submitEditWarehouse('/'+id,obj,succesHandlerSubmit, errorHandler));
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

    const errorHandler = (data) => {
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
                    provinsi:SelProvince,
                    city:SelCity,
                    district:SelDistrict,
                    nama:InputNama,
                    alamat:InputAlamat,
                    ancer:InputAncerAncer,
                    note:InputNote,
                    isactive:InputIsActive
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
                        <form className="mb-6" onSubmit={handleSubmit}  name="FormAddWarehouse">
                            <ContentWrapper>
                            <ContentHeading history={history} link={pathmenu.editWarehouse+'/'+id} label={'Edit Warehouse'} labeldefault={'Edit Warehouse'} />
                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">

                            <label className="mt-3 form-label required" htmlFor="nama">
                                {i18n.t('label_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="nama"
                                // className={
                                //     touched.namebranch && errors.namebranch
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

                            <label className="mt-3 form-label required" htmlFor="provinsi">
                                {i18n.t('label_PROVINCE')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="provinsi"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeProvinsi(val)}
                                onBlur={val => setFieldTouched("provinsi", val?.value ? val.value : '')}
                                data={ListProvince}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.provinsi}
                            />
                            <div className="invalid-feedback-custom">{ErrSelProvince}</div>

                            <label className="mt-3 form-label required" htmlFor="city">
                                {i18n.t('label_CITY')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="city"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeKota(val)}
                                onBlur={val => setFieldTouched("city", val?.value ? val.value : '')}
                                data={ListCity}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.city}
                            />
                            <div className="invalid-feedback-custom">{ErrSelCity}</div>

                            <label className="mt-3 form-label required" htmlFor="district">
                                {i18n.t('label_DISTRICT')}
                                <span style={{color:'red'}}>*</span>
                            </label>

                            <DropdownList
                                // className={
                                //     touched.branch && errors.branch
                                //         ? "input-error" : ""
                                // }
                                name="district"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeDistrict(val)}
                                onBlur={val => setFieldTouched("district", val?.value ? val.value : '')}
                                data={ListDistrict}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.district}
                            />
                            <div className="invalid-feedback-custom">{ErrSelDistrict}</div>

                            <label className="mt-3 form-label required" htmlFor="alamat">
                                {i18n.t('label_ADDRESS')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="alamat"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="alamat"
                                onChange={val => handleInputAlamat(val)}
                                onBlur={handleBlur}
                                value={values.alamat}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAlamat}</div>

                            </div>    

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="ancer">
                                {i18n.t('Ancer Ancer')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <Input
                                name="ancer"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="ancer"
                                onChange={val => handleInputAncer(val)}
                                onBlur={handleBlur}
                                value={values.ancer}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAncerAncer}</div>

                            <label className="mt-3 form-label required" htmlFor="contactnumber">
                                {i18n.t('label_CONTACT_NAME')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'110%',marginTop:'-5px'}}>
                                {
                                    InputListContactNumber.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="contactnumber"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="contactnumber"
                                                // mask="(9999)999-9999"
                                                // tag={InputMask}
                                                onChange={val => handleInputChangeContactNumber(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.contactnumber}
                                                disabled={false}
                                                />
                                                </td>
                                                
                                                <td hidden={i > 0}>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClickContactNumber()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                </td>
                                                <td hidden={i == 0}>
                                                <IconButton color={'primary'} hidden={i == 0}
                                                onClick={() => handleRemoveClickContactNumber(i)}
                                                // hidden={showplusdebit}
                                                >
                                                    <RemoveIcon style={{ fontSize: 18 }}/>
                                                </IconButton>    
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputContactNumber}</div>

                            <label className="mt-3 form-label required" htmlFor="contacthp">
                                {i18n.t('Contact Hp')}
                                <span style={{color:'red'}}>*</span>
                            </label>
                            <table style={{width:'110%',marginTop:'-5px'}}>
                                {
                                    InputListContactHp.map((x, i) => {
                                        return (
                                            <tr>
                                                <td>
                                                <Input
                                                name="contacthp"
                                                // className={
                                                //     touched.amount && errors.amount
                                                //         ? "w-50 input-error"
                                                //         : "w-50"
                                                // }
                                                type="text"
                                                id="contacthp"
                                                // mask="9999-9999-9999"
                                                // tag={InputMask}
                                                onChange={val => handleInputChangeContacthp(val,i)}
                                                onBlur={handleBlur}
                                                // placeholder={i18n.t('label_AMOUNT')}
                                                // style={{width: '25%'}}
                                                // value={values.amount}
                                                value={x.contacthp}
                                                disabled={false}
                                                />
                                                </td>
                                                
                                                <td hidden={i > 0}>
                                                <IconButton color={'primary'} hidden={i > 0}
                                                    onClick={() => handleAddClickContactHp()}
                                                // hidden={showplusdebit}
                                                >
                                                    <AddIcon style={{ fontSize: 18 }}/>
                                                </IconButton>
                                                </td>
                                                <td hidden={i == 0}>
                                                <IconButton color={'primary'} hidden={i == 0}
                                                onClick={() => handleRemoveClickContactHp(i)}
                                                // hidden={showplusdebit}
                                                >
                                                    <RemoveIcon style={{ fontSize: 18 }}/>
                                                </IconButton>    
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <div className="invalid-feedback-custom">{ErrInputContactHp}</div>

                            

                            <label className="mt-3 form-label required" htmlFor="note">
                                {i18n.t('label_NOTE')}
                                {/* <span style={{color:'red'}}>*</span> */}
                            </label>
                            <Input
                                name="note"
                                // className={
                                //     touched.namebranch && errors.namebranch
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="textarea"
                                id="note"
                                onChange={val => handleInputNote(val)}
                                onBlur={handleBlur}
                                value={values.note}
                            />

                            {/* <FormGroup check style={{marginTop:'20px'}}>
                            <Input type="checkbox" name="check" 
                            id="isactived" 
                            onChange={val => handleChangeIsActive(val)}
                            defaultChecked={values.isactive}
                            checked={values.isactive}
                            style={{transform:'scale(1.5)'}}
                            />
                            <Label for="isactived" check style={{transform:'scale(1.5)',marginLeft:'20px'}}>{i18n.t('label_IS_ACTIVE')}</Label>
                            </FormGroup>     */}

                            </div>
                            </div>
                            </ContentWrapper>
                            {loading && <Loading/>}
                            <div className="row justify-content-center" style={{marginTop:'-30px',marginBottom:'20px'}}>
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
                                onClick={() => submitHandler()}
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