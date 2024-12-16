import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Grid from '../../../components/TableGrid';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import ContentHeading from '../../../components/Layout/ContentHeading';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';
import * as pathmenu from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize, isGetPermissions, firstAndLastDateInMonth } from '../../shared/globalFunc';
import { MenuDeposit, addDeposit_Permission } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker } from 'react-widgets';
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

const DepositIndex = () => {
    reloadToHomeNotAuthorize(MenuDeposit, 'READ');
    momentLocalizer();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        { name: 'id', title: 'id' },
        { name: 'vendor', title: i18n.t('Vendor') },
        { name: 'transdate', title: i18n.t('Date') },
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    let getdate = firstAndLastDateInMonth();
    const [from, setFrom] = useState(getdate.first);
    const [to, setTo] = useState(getdate.last);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        let obj = new Object();
        obj.from = from.getTime();
        obj.to = to.getTime();
        obj.idvendor = null;
        dispatch(actions.getDepositData({ url: '/list', type: 'POST', payload: obj }, successHandler, errorHandler));
    }, []);

    function successHandler(data, propsdata) {
        if (data.data) {
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'vendor': el.vendorName,
                    'transdate': el.depositdate ? moment(el.depositdate).format(formatdate) : '',
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    function onClickAdd() {
        history.push(pathmenu.adddeposit);
    }
    function onClickView(id) {
        history.push(pathmenu.detaildeposit + '/' + id);
    }

    const handleChangeFrom = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setFrom(moment(data, formatdate).toDate())
        } else {
            setFrom(null)
        }
    }

    const handleChangeTO = (data) => {
        //console.log('handleDate ',moment(data).format('DD MMMM YYYY'))
        if (data !== null) {
            setTo(moment(data, formatdate).toDate())
        } else {
            setTo(null)
        }
    }

    function onClickSearch() {
        if (from != null && to != null) {
            setLoading(true);
            let obj = new Object();
            obj.from = from.getTime();
            obj.to = to.getTime();
            obj.idvendor = null;
            dispatch(actions.getDepositData({ url: '/list', type: 'POST', payload: obj }, successHandler, errorHandler));
        }

    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menudeposit} label={'Deposit'} labeldefault={'Deposit'} />
            <Container fluid>
                <table>
                    <th>{'From'}</th>
                    <th style={{ paddingLeft: '10px' }}>{'To'}</th>
                    <tbody>
                        <tr>
                            <td><DatePicker
                                name="from"
                                // onChange={(val) => {
                                //         setFieldValue("startdate", val);
                                //     }
                                // }
                                onChange={val => handleChangeFrom(val)}
                                // onBlur={handleBlur}
                                // defaultValue={Date(moment([]))}
                                format={formatdate}
                                value={from}
                            // max={new Date()}
                            // style={{width: '25%'}}
                            /></td>
                            <td style={{ paddingLeft: '10px' }}>
                                <DatePicker
                                    name="to"
                                    // onChange={(val) => {
                                    //         setFieldValue("startdate", val);
                                    //     }
                                    // }
                                    onChange={val => handleChangeTO(val)}
                                    // onBlur={handleBlur}
                                    // defaultValue={Date(moment([]))}
                                    format={formatdate}
                                    value={to}
                                // max={new Date()}
                                // style={{width: '25%'}}
                                />
                            </td>
                            <td>
                                <IconButton color={'primary'}
                                    onClick={() => onClickSearch()}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>



                <Card>
                    <CardBody>
                        <Container fluid className="center-parent">
                            <div className="table-responsive">
                                <Grid
                                    rows={rows}
                                    columns={columns}
                                    totalCounts={rows.length}
                                    loading={loading}
                                    columnextension={tableColumnExtensions}
                                    permissionadd={!isGetPermissions(addDeposit_Permission, 'TRANSACTION')}
                                    onclickadd={onClickAdd}
                                    permissionview={!isGetPermissions(MenuDeposit, 'READ')}
                                    onclickview={onClickView}
                                    listfilterdisabled={['transdate']}
                                />
                            </div>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </ContentWrapper>

    );
};
export default DepositIndex;