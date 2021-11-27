import React, {useState, useEffect} from 'react';
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation}      from 'react-i18next';
import Grid                         from './grid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper'
import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';

const InfoIndex = () => {
    const [rows, setRows] = useState([]);
    const [t, i18n] = useTranslation('translations');
    const [columns] = useState([
        {name: 'id', title: 'id'},
        {name: 'question', title: i18n.t('Question')},
        {name: 'type', title: i18n.t('Type')},
    ]);
    const [tableColumnExtensions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getInfoData('',successHandler, errorHandler));
    }, []);

    function successHandler(data) {
        if(data.data){
            const theData = data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.id,
                    'question': el.question ?el.question:'',
                    'type':handleTeksType(el.type),
                }
            ], []);
            setRows(theData);
        }
        setLoading(false);
    }

    
    const handleTeksType = (data) =>{
        let val = '';
        // TA(Text Area),RB(Radio Button),CL(Chekbox List),DDL(DropDown List)
        if(data == 'TA'){
            val = 'Text Area';
        }else if(data == 'RB'){
            val = 'Radio Button';
        }else if(data == 'CL'){
            val = 'Chekbox List';
        }else if(data == 'DDL'){
            val = 'DropDown List';
        }

        return val;
    }

    function errorHandler(error) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error'
        })
    }

    return (
        <ContentWrapper>
            <div className="content-heading">
                <span><Trans t={t} i18nKey={'Info'}>Info</Trans></span>
            </div>
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
export default InfoIndex;