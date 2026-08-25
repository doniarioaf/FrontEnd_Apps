import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseVersionURL } from '../../containers/shared/apiURL';

// Hardcode versi frontend di sini, update manual tiap kali release
const FRONTEND_VERSION = '25.08.2026';

const PageFooter = (props) => {
    const year = new Date().getFullYear();
    const [backendVersion, setBackendVersion] = useState('-');

    useEffect(() => {
        const fetchBackendVersion = async () => {
            try {
                const response = await axios.get(baseVersionURL);
                setBackendVersion(response.data.version || '-');
            } catch (error) {
                console.error('Gagal mengambil versi backend:', error);
                setBackendVersion('-');
            }
        };
        fetchBackendVersion();
    }, []);

    return(
        <div className="p-3 text-center">
            <div>
                <span className="mr-2">&copy;</span>
                <span>{year}</span>
                <span className="mx-2">-</span>
                <span>Berlian Pro</span>
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                <span>FE v{FRONTEND_VERSION}</span>
                <span className="mx-2">|</span>
                <span>BE v{backendVersion}</span>
            </div>
        </div>
    );

};

export default PageFooter;