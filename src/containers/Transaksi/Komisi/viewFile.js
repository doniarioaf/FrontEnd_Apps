import React, {useState,
    useEffect} from 'react';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
import ContentHeading               from '../../../components/Layout/ContentHeading';
import {
Container, Card, CardBody
, Button, CardHeader
}                                   from 'reactstrap';
import * as actions     from '../../../store/actions';
import {useDispatch}    from 'react-redux';
import FileViewer from '../../../components/Common/FileViewer';
import * as pathmenu from '../../shared/pathMenu';
import Swal             from "sweetalert2";
import {useHistory}                 from 'react-router-dom';
import {useTranslation}             from 'react-i18next';

export default function ViewFileKomisi(props) {
    const dispatch = useDispatch();
    const i18n = useTranslation('translations');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [Base64File, setBase64File] = useState('');
    const [TypeFile, setTypeFile] = useState('');
    const [FileName, setFileName] = useState('');
    
    const id = props.match.params.id;

    useEffect(() => {
        setLoading(true);
        dispatch(actions.getKomisiData( {url:'/downloadfile/'+id},successHandlerDownload, errorHandler));
    }, []);
    function successHandlerDownload(data,propsdata) {
        let det = data.data;
        let contenttype = det.filecontenttype;
        let base64str = det.filedocument?det.filedocument:'';
        setBase64File(base64str);
        setTypeFile(contenttype);
        setFileName(det.filename);
        setLoading(false);
    }
    function errorHandler(error,propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg
        })
    }
    return (
        <ContentWrapper>
            <ContentHeading history={history} link={pathmenu.detailkomisi+'/'+id} label={'Detail'} labeldefault={'Detail'} />
            <Container fluid>
                <Card>
                    <CardBody>
                        <Button
                        onClick={() => history.goBack()}
                        title={i18n.t('label_BACK')}
                    >
                        {i18n.t('label_BACK')}
                    </Button>
        <>
            {Base64File !== '' ? (
                <FileViewer
                    base64Data={Base64File}
                    mimeType={TypeFile} // simpan ini di state juga
                    fileName={FileName}
                    height="600px"
                />
            ) : null}
        </>
        </CardBody>
        </Card>
        </Container>
        </ContentWrapper>
    );
}