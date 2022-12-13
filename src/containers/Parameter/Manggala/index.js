import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../../components/TableGrid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import * as pathmenu           from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize,isGetPermissions,numToMoney,numToMoneyWithComma } from '../../shared/globalFunc';
import { MenuParameterManggala,addParameterManggala_Permission } from '../../shared/permissionMenu';
import { formatdate } from '../../shared/constantValue';
import {useHistory}                 from 'react-router-dom';
import moment                          from 'moment';

const PortIndex = () => {
    reloadToHomeNotAuthorize(MenuParameterManggala,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'name', title: i18n.t('label_NAME')},
        {name: 'type', title: i18n.t('Type')},
        {name: 'value', title: i18n.t('Value')},
        // {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getParameterManggalaData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'name': el.paramname ?el.paramname:'',
                    'type': el.paramtype ?el.paramtype:'',
                    'value':el.paramvalue || el.paramdate?checkValue(el.paramvalue,el.paramdate,el.paramtype):'',
                    'isactive': el.isactive?'Yes':'No'
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function checkValue(data,paramdate,type) {
        if(type == 'NUMBER'){
            return numToMoneyWithComma(parseFloat(data));
        }else if(type == 'DATE'){
            return moment(new Date(paramdate)).format(formatdate);
        }
        
        return data;
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    function onClickAdd() {
        history.push(pathmenu.addparameter);
    }
    function onClickView(id) {
        history.push(pathmenu.detailparameter+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuParameter} label={'Parameter'} labeldefault={'Parameter'} />
            <Container fluid>
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
                permissionadd={!isGetPermissions(addParameterManggala_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuParameterManggala,'READ')}
                onclickview={onClickView}
                listfilterdisabled = {['value']}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default PortIndex;