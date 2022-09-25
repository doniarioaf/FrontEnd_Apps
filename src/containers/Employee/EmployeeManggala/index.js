import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from './grid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import * as pathmenu           from '../../shared/pathMenu';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuEmployeeManggala } from '../../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';

const EmployeeManggalaIndex = () => {
    reloadToHomeNotAuthorize(MenuEmployeeManggala,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'name', title: i18n.t('Name')},
        {name: 'jabatan', title: i18n.t('Jabatan')},
        {name: 'status', title: i18n.t('Status')},
        {name: 'isactive', title: i18n.t('label_IS_ACTIVE')}
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getEmployeeManggalaData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.items.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'name': el.nama ?el.nama:'',
                    'jabatan':el.jabatan?getParamterOptions(data.data?.template?.jabatanOptions?data.data.template.jabatanOptions:[],el.jabatan):'',
                    'status':el.statuskaryawan?getParamterOptions(data.data?.template?.statusKaryawanOptions?data.data.template.statusKaryawanOptions:[],el.statuskaryawan):'',
                    'isactive': el.isactive?'Yes':'No'
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    const getParamterOptions = (list,value) =>{
        let listfilteroutput = list.filter(output => output.code == value);
        if(listfilteroutput.length > 0){
            return listfilteroutput[0].codename;
        }
        return value;
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '' + error
        })
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuemployeeManggala} label={'Employee'} labeldefault={'Employee'} />
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
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default EmployeeManggalaIndex;