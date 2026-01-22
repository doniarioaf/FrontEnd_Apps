import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody,Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Grid from '../../../components/TableGrid';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { Loading } from '../../../components/Common/Loading';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';
import * as pathmenu from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth } from '../../shared/globalFunc';
import { MenuIntegrasi } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker, DropdownList } from 'react-widgets';
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

const IntegrasiIndex = () => {
    reloadToHomeNotAuthorize(MenuIntegrasi, 'READ');
    momentLocalizer();
    const { i18n } = useTranslation('translations');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    let getdate = firstAndLastDateInMonth();
    const [from, setFrom] = useState(getdate.first);
    const [to, setTo] = useState(getdate.last);
    const [ListType, setListType] = useState([{label:'Proses Semua',value:'Y'},{label:'Berdasarkan Tanggal',value:'DATE'}]);
    const [SelType, setSelType] = useState('Y');


    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg?error.msg:error
        })
    }

    const executeSubmit = () => {
        setLoading(true);
        let obj = new Object();
        if(SelType == 'Y'){
            obj.from = null;
            obj.to = null;
            obj.isall = 'Y';
        }else{
            obj.from = from.getTime();
            obj.to = to.getTime();
            obj.isall = SelType;
        }
        
        dispatch(actions.submitJournal({ url: '/integrasi', payload: obj, type: 'INTEGRASI' }, succesHandlerSubmit, errorHandler));
    }

    const handleChangeType = (data) => {
        let id = data?.value ? data.value : '';
        setSelType(id);

    }

    const handleChangeFrom = (data) => {
            //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setFrom(moment(data, formatdate).toDate())
        } else {
            setFrom(null)
        }
    }

    const handleChangeTo = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setTo(moment(data, formatdate).toDate())
        } else {
            setTo(null)
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
                    // history.goBack();
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

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.integrasiSaldo} label={'Integrasi Saldo'} labeldefault={'Integrasi Saldo'} />
            <Container fluid>
                 {/* <table>
                <th hidden={SelType == 'Y'}>{'From'}</th>
                <th style={{ paddingLeft: '10px' }} hidden={SelType == 'Y'}>{'To'}</th>
                <th style={{ paddingLeft: '10px' }}>{'Type'}</th>
                <tbody>
                    <tr>
                    <td hidden={SelType == 'Y'}>
                        <DatePicker
                        name="from"
                        onChange={val => handleChangeFrom(val)}
                        format={formatdate}
                        value={from}
                        /></td>
                        <td style={{ paddingLeft: '10px' }} hidden={SelType == 'Y'}>
                            <DatePicker
                                name="to"
                                
                                onChange={val => handleChangeTo(val)}
                               
                                format={formatdate}
                                value={to}
                            
                            />
                        </td> 
                            <td width={'300px'}>
                            <div>
                            <DropdownList
                                name="SelType"
                                filter='contains'
                                placeholder={i18n.t('select.SELECT_OPTION')}

                                onChange={val => handleChangeType(val)}
                                data={ListType}
                                textField={'label'}
                                valueField={'value'}
                                value={SelType}
                            />
                        </div>
                        </td>
                    
                    </tr>
                </tbody>
            </table> */}
                <div className="row justify-content-center" style={{paddingTop:'15px'}}>
                <Button
                // style={{marginLeft:"1%"}}
                color={'primary'}
                disabled={loading}
                onClick={() => submitHandler()}
            >
                {'Integrasi'}
            </Button>
            </div>
            </Container>
            {loading && <Loading />}
        </ContentWrapper>
        
    )
}
export default IntegrasiIndex;