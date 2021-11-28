import React, {useState,useEffect}    from 'react';
import {Formik}                        from 'formik';
import {useTranslation}                from 'react-i18next';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import {Input,Button,Card, CardBody} from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import * as actions                 from '../../../store/actions';
import {useDispatch}   from 'react-redux';
// import { reloadToHomeNotAuthorize } from '../../../../shared/maskFunc';
import { Loading } from '../../../components/Common/Loading';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import Grid                         from './gridAnswer';
// import { AddInternalUser_Permission } from '../../../../shared/PermissionForFeatures';

export default function AddFormInfo(props) {
    const {i18n} = useTranslation('translations');
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [ListType, setListType] = useState([]);
    const [SelType, setSelType] = useState('');
    const [ErrSelType, setErrSelType] = useState('');

    const [InputQuestion, setInputQuestion] = useState('');
    const [ErrInputQuestion, setErrInputQuestion] = useState('');

    const [InputSequence, setInputSequence] = useState('');
    const [ErrInputSequence, setErrInputSequence] = useState('');

    const [ListCustomerType, setListCustomerType] = useState([]);
    const [SelCustomerType, setSelCustomerType] = useState('');
    const [ErrCustomerType, setErrCustomerType] = useState('');

    const [InputAnswer, setInputAnswer] = useState('');
    const [ErrInputAnswer, setErrInputAnswer] = useState('');
    const [ShowAnswer, setShowAnswer] = useState(false);

    // const [hiddenColumns] = useState(['id']);
    const [RowsAnswer, setRowsAnswer] = useState([]);
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'answer', title: i18n.t('label_ANSWER')},
    ]);
    const [StartdefaultHeight] = useState(150);
    const [defaultHeight, setdefaultHeight] = useState(StartdefaultHeight+'px');


    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInfoData('/template',successHandlerTemplate, errorHandler));
    }, []);

    function successHandlerTemplate(data) {
        if(data.data){
            setListCustomerType(data.data.customertypeoptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));

            setListType(data.data.typeoptions.reduce((obj, el) => (
                [...obj, {
                    value: el.id,
                    label: el.nama
                }]
            ), []));
        }
        setLoading(false);
    }

    const handleChangeCustomerType = (data) =>{
        let selValue = data?.value ? data.value : '';
        setSelCustomerType(selValue);
    }

    const handleChangeType = (data) =>{
        let selValue = data?.value ? data.value : '';
        if(selValue == 'TA'){
            setShowAnswer(false);
        }else{
            setShowAnswer(true);
        }
        setSelType(selValue);
    }

    const handleInputQuestion = (data) =>{
        let val = data.target.value;
        setInputQuestion(val);
    }

    const handleInputAnswer = (data) =>{
        let val = data.target.value;
        setInputAnswer(val);
    }

    const handleInputSequence = (data) =>{
        let val = data.target.value;
        if(!isNaN(val)){
            setInputSequence(val);
        }
    }

    const checkColumnMandatory = () => {
        let flag = true;
        setErrInputQuestion('');
        setErrInputSequence('');
        setErrSelType('');
        setErrCustomerType('');
        setErrInputAnswer('')

        if(InputQuestion == ''){
            setErrInputQuestion(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(InputSequence == ''){
            setErrInputSequence(i18n.t('label_REQUIRED'));
            flag = false;
        }
        if(SelType == ''){
            setErrInputSequence(i18n.t('label_REQUIRED'));
            flag = false;
        }else{
            if(RowsAnswer.length == 0 && SelType !== 'TA'){
                setErrInputAnswer(i18n.t('label_REQUIRED'));
                flag = false;
            }
        }
        if(SelCustomerType == ''){
            setErrCustomerType(i18n.t('label_REQUIRED'));
            flag = false;
        }

        return flag;
    }

    const executeSubmit = () => {
        let flag = checkColumnMandatory();
        if(flag){
            setLoading(true);
            let obj = new Object();
            obj.question = InputQuestion;
            obj.type = SelType;
            obj.sequence = InputSequence;
            obj.idcustomertype = SelCustomerType;
            let listanswer = [];
            for(let i=0; i < RowsAnswer.length; i++){
                listanswer.push(RowsAnswer[i].answer);
            }
            obj.answer = listanswer;
            
            dispatch(actions.submitAddInfo(obj,succesHandlerSubmit, errorHandler));
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

      const setHeightGridListAnswer = (dataval) =>{
        if(dataval.length > 2){
            let height = ( 50 * (dataval.length - 2) ) + StartdefaultHeight;
            if(height > 600){
                height = 600;
            }
            setdefaultHeight(height+'px');
        }
    }

    const handleAddListAnswer = () => {
        let dataval = [];
        // let filterid = RowsAnswer.filter(output => output.id == SelBranch);
        // if(filterid.length == 0){
            // let listfilteroutput = ListBranch.filter(output => output.value == SelBranch);
            // if(listfilteroutput.length > 0){
                dataval = [...RowsAnswer];
                // let filter = listfilteroutput[0];
                let obj = {
                    'id':new Date().getTime(),
                    'answer':InputAnswer
                };
                dataval.push(obj);
                setRowsAnswer(dataval);
                setHeightGridListAnswer(dataval);
                setInputAnswer('');
            // }
        // }
        
    }

    const handleSubstractListDetailTrans = (id) =>{
        let listfilter = RowsAnswer.filter(output => output.id !== id);
        let dataval = [...listfilter];
        setRowsAnswer(dataval);
        setHeightGridListAnswer(dataval);
    }

    
      return (
        <Formik
            initialValues={
                {
                    question:InputQuestion,
                    sequence:InputSequence,
                    customertype:SelCustomerType,
                    infotype:SelType,
                    answer:InputAnswer
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
                            <span>{i18n.t('label_ADD_INFORMATION')}</span>
                            </div>

                            <div className="row mt-2">
                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="question">
                                {i18n.t('label_QUESTION')}
                            </label>
                            <Input
                                name="question"
                                // className={
                                //     touched.question && errors.question
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="question"
                                onChange={val => handleInputQuestion(val)}
                                onBlur={handleBlur}
                                value={values.question}
                            />
                            <div className="invalid-feedback-custom">{ErrInputQuestion}</div>

                            <label className="mt-3 form-label required" htmlFor="description">
                                {i18n.t('label_SEQUENCE')}
                            </label>
                            <Input
                                name="sequence"
                                // className={
                                //     touched.sequence && errors.sequence
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="sequence"
                                onChange={val => handleInputSequence(val)}
                                onBlur={handleBlur}
                                value={values.sequence}
                            />
                            <div className="invalid-feedback-custom">{ErrInputSequence}</div>

                            <div className="row mt-0" hidden={!ShowAnswer}>
                            <div className="mt-0 col-lg-11 ft-detail mb-5" style={{paddingRight:'0px'}}>
                            <label className="mt-3 form-label required" htmlFor="branch">
                                {i18n.t('label_ANSWER')}
                            </label>

                            <Input
                                name="answer"
                                // className={
                                //     touched.sequence && errors.sequence
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                type="text"
                                id="answer"
                                onChange={val => handleInputAnswer(val)}
                                onBlur={handleBlur}
                                value={values.answer}
                            />
                            <div className="invalid-feedback-custom">{ErrInputAnswer}</div>
                            </div>

                            <div className="mt-0 col-lg-1 ft-detail mb-5" style={{paddingLeft:'0px',paddingTop:'35px'}}>
                            <IconButton color={'primary'}
                                onClick={() => handleAddListAnswer()}
                            >
                                <AddIcon style={{ fontSize: 30 }}/>
                            </IconButton>
                            </div>

                            </div>

                            </div>

                            <div className="mt-2 col-lg-6 ft-detail mb-5">
                            <label className="mt-3 form-label required" htmlFor="infotype">
                                {i18n.t('label_INFORMATION_TYPE')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.infotype && errors.infotype
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                name="infotype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeType(val)}
                                onBlur={val => setFieldTouched("infotype", val?.value ? val.value : '')}
                                data={ListType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.infotype}
                            />
                            <div className="invalid-feedback-custom">{ErrSelType}</div>

                            <label className="mt-3 form-label required" htmlFor="customertype">
                                {i18n.t('label_CUSTOMER_TYPE')}
                            </label>

                            <DropdownList
                                // className={
                                //     touched.customertype && errors.customertype
                                //         ? "w-50 input-error"
                                //         : "w-50"
                                // }
                                name="customertype"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}
                                
                                onChange={val => handleChangeCustomerType(val)}
                                onBlur={val => setFieldTouched("customertype", val?.value ? val.value : '')}
                                data={ListCustomerType}
                                textField={'label'}
                                valueField={'value'}
                                // style={{width: '25%'}}
                                // disabled={values.isdisabledcountry}
                                value={values.customertype}
                            />
                            <div className="invalid-feedback-custom">{ErrCustomerType}</div>
                            </div>
                            </div>

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
                                style={{marginLeft:"1%"}}
                                onClick={() => submitHandler()}
                            >
                            {'Submit'}
                            </Button>
                            </div>

                            <Card>
                            <CardBody>
                            <div className="table-responsive" style={{height:defaultHeight}}>
                                <Grid
                                    rows={RowsAnswer}
                                    columns={columns}
                                    totalCounts={RowsAnswer.length}
                                    loading={loading}
                                    columnextension={[]}
                                    handleSubstractList={handleSubstractListDetailTrans}
                                />
                            </div>
                            </CardBody>
                            </Card>

                            </ContentWrapper>
                            {loading && <Loading/>}

                            
                        </form>

                    )

                }
            }

        </Formik>

      )

}