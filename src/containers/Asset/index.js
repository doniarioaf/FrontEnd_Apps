import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {useTranslation}      from 'react-i18next';
import Grid                         from '../../components/TableGrid';
import ContentWrapper               from '../../components/Layout/ContentWrapper';
import ContentHeading               from '../../components/Layout/ContentHeading';
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../store/actions';
import * as pathmenu           from '../shared/pathMenu';
import { reloadToHomeNotAuthorize,isGetPermissions } from '../shared/globalFunc';
import { MenuAsset, addAsset_Permission } from '../shared/permissionMenu';
import {useHistory}                 from 'react-router-dom';
// import moment                       from "moment/moment";
// import { formatdate } from '../shared/constantValue';

const MenuIndex = () => {
    reloadToHomeNotAuthorize(MenuAsset,'READ');
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'nodocument', title: i18n.t('Kode Asset')},
        {name: 'assettype', title: i18n.t('Jenis Asset')},
        {name: 'nama', title: i18n.t('Nama')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getAssetData('',successHandler, errorHandler));
    }, []);

    const getNameByAssetType = (data) =>{
        if(data.assettype == 'KEPALA'){
            return data.kepala_nama;
        }else if(data.assettype == 'BUNTUT'){
            return data.buntut_nama;
        }else if(data.assettype == 'SP_KEPALA'){
            return data.sparepartkepala_nama;
        }else if(data.assettype == 'SP_BUNTUT'){
            return data.sparepartbuntut_nama;
        }
        return '';
    }

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    // 'code':el.code?el.code:'',
                    'nodocument': el.kodeasset ?el.kodeasset:'',
                    'assettype':el.assettypeName?el.assettypeName:'',
                    'nama':getNameByAssetType(el)
                    
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
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
        history.push(pathmenu.addAsset);
    }
    function onClickView(id) {
        history.push(pathmenu.detailAsset+'/'+id);
    }

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.menuAsset} label={'Asset'} labeldefault={'Asset'} />
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
                permissionadd={!isGetPermissions(addAsset_Permission,'TRANSACTION')}
                onclickadd={onClickAdd}
                permissionview={!isGetPermissions(MenuAsset,'READ')}
                onclickview={onClickView}
                listfilterdisabled={['tanggal']}
            />
            </div>
            </Container>
            </CardBody>
            </Card>
            </Container>
        </ContentWrapper>
        
    );
};
export default MenuIndex;