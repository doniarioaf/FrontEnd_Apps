import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../../components/TableGrid';
import {useDispatch}   from 'react-redux';
import * as actions                 from '../../../store/actions';
import { formatdate } from '../../shared/constantValue';

export default function HomeIndex() {
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        // {name: 'code', title: i18n.t('Code')},
        {name: 'kode', title: i18n.t('Kode')},
        {name: 'nama', title: i18n.t('Nama')},
        {name: 'nopolisi', title: i18n.t('No Polisi')},
        {name: 'nokir', title: i18n.t('No KIR')},
        {name: 'masaberlakustnk', title: i18n.t('Masa Berlaku STNK')},
        {name: 'masaberlakukir', title: i18n.t('Masa Berlaku KIR')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getAssetData('/listreminder',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'kode': el.kodeasset ?el.kodeasset:'',
                    'nama': el.kepala_nama ?el.kepala_nama:'',
                    'nopolisi': el.kepala_nopolisi ?el.kepala_nopolisi:'',
                    'nokir': el.kepala_kir ?el.kepala_kir:'',
                    'masaberlakustnk':el.kepala_masaberlakustnk?moment (new Date(el.kepala_masaberlakustnk)).format(formatdate):'',
                    'masaberlakukir':el.kepala_masaberlakukir?moment (new Date(el.kepala_masaberlakukir)).format(formatdate):''
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    function errorHandler(error) {
        setLoading(false);
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: '' + error
        // })
    }
    function onClickAdd() {
        // history.push(pathmenu.addpenerimaankasbank);
    }
    function onClickView(id) {
        // history.push(pathmenu.detailpenerimaankasbank+'/'+id);
    }
    return (
        <ContentWrapper>
            <h1>{'Welcome in Bizz Apps'}</h1>

            {
                rows.length > 0?
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
                // permissionadd={!isGetPermissions(addPenerimaanKasBank_Permission,'TRANSACTION')}
                // onclickadd={onClickAdd}
                // permissionview={!isGetPermissions(MenuPenerimaanKasBank,'READ')}
                // onclickview={onClickView}
                listfilterdisabled={['masaberlakustnk','masaberlakukir']}
                width={'20'}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
            :''
            }
            

        </ContentWrapper>
    );

};