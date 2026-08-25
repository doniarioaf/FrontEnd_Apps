import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'reactstrap';
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
import { MenuBackUpDB } from '../../shared/permissionMenu';
import { useHistory } from 'react-router-dom';
import { DatePicker, DropdownList } from 'react-widgets';
import { formatdate } from '../../shared/constantValue';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import "react-widgets/dist/css/react-widgets.css";
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import axios from 'axios'; // pastikan axios sudah terinstall di project
import { basebackupDbURL } from '../../shared/apiURL';

const BackUpDbIndex = () => {
    reloadToHomeNotAuthorize(MenuBackUpDB, 'READ');
    momentLocalizer();
    const { i18n } = useTranslation('translations');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingBackup, setLoadingBackup] = useState(false); // loading khusus tombol backup
    const dispatch = useDispatch();


    function errorHandler(error, propsdata) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.msg?error.msg:error
        })
    }

    

    // ==== FUNGSI BARU: DOWNLOAD BACKUP DATABASE ====
    const downloadBackupHandler = () => {
        Swal.fire({
            title: 'Yakin ingin download backup database?',
            text: 'Proses ini mungkin memakan waktu beberapa saat.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Download',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                executeDownloadBackup();
            }
        })
    }

    const executeDownloadBackup = async () => {
        setLoadingBackup(true);
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get(basebackupDbURL(""), {
                responseType: 'blob', // WAJIB, supaya file binary tidak korup
                 headers: {
                'Authorization': token
                        // Kalau backend expect format Bearer, ganti jadi:
                        // 'Authorization': `Bearer ${token}`
                    }
            });

            // Generate nama file: Berlian-DDMMYYYY-HHmmss.backup
            const now = moment(); // sudah ada import moment di file ini
            const fileName = `Berlian-${now.format('DDMMYYYY')}-${now.format('HHmmss')}.backup`;

            // Trigger download di browser
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            setLoadingBackup(false);
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'Backup database berhasil diunduh.'
            });
        } catch (error) {
            setLoadingBackup(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.msg || 'Gagal mengunduh backup database.'
            });
        }
    }
    // ==== END FUNGSI BARU ====

    return (
        <ContentWrapper>
            <ContentHeading history={history} removehistorylink={true} link={pathmenu.backUpDB} label={'BackUp DB'} labeldefault={'BackUp DB'} />
            <Container fluid>
                <div className="row justify-content-center" style={{paddingTop:'15px'}}>
                    <Button
                        color={'primary'}
                        
                        disabled={loadingBackup}
                        onClick={() => downloadBackupHandler()}
                    >
                        {loadingBackup ? 'Downloading...' : 'Download Backup DB'}
                    </Button>
                </div>
            </Container>
            {(loading || loadingBackup) && <Loading />}
        </ContentWrapper>
        
    )
}
export default BackUpDbIndex;