import React, { useMemo } from 'react';
import PdfViewer from './PdfViewer';

/**
 * FileViewer — Reusable Viewer untuk PDF & Image dari response base64 API
 *
 * Props:
 * @param {string} base64Data   - String base64 (boleh dengan atau tanpa prefix data:...;base64,)
 * @param {string} mimeType     - MIME type file, contoh: 'application/pdf', 'image/png', 'image/jpeg'
 * @param {string} [fileName]   - Nama file saat di-download (default: 'file')
 * @param {string} [height]     - Tinggi area viewer (default: '500px')
 * @param {boolean} [showDownload] - Tampilkan tombol Download (default: true)
 * @param {number} [initialPage]   - Halaman awal untuk PDF (default: 0)
 * @param {function} [onPageChange] - Callback saat halaman PDF berubah
 */
const FileViewer = ({
    base64Data,
    mimeType,
    fileName = 'file',
    height = '500px',
    showDownload = true,
    initialPage = 0,
    onPageChange,
}) => {
    const fileUrl = useMemo(() => {
        if (!base64Data || !mimeType) return null;

        // Jika base64Data sudah berupa data URL, gunakan langsung
        if (base64Data.startsWith('data:')) {
            return base64Data;
        }

        return `data:${mimeType};base64,${base64Data}`;
    }, [base64Data, mimeType]);

    if (!fileUrl) return null;

    const isPdf = mimeType === 'application/pdf';
    const isImage = ['image/jpeg', 'image/jpg', 'image/png'].includes(mimeType);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = fileUrl;

        // Tentukan ekstensi berdasarkan mimeType
        const extMap = {
            'application/pdf': '.pdf',
            'image/jpeg': '.jpg',
            'image/jpg': '.jpg',
            'image/png': '.png',
        };
        const ext = extMap[mimeType] || '';
        link.download = fileName.includes('.') ? fileName : `${fileName}${ext}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // === PDF Viewer ===
    if (isPdf) {
        return (
            <PdfViewer
                fileUrl={fileUrl}
                fileName={fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`}
                initialPage={initialPage}
                height={height}
                showDownload={showDownload}
                onPageChange={onPageChange}
            />
        );
    }

    // === Image Viewer ===
    if (isImage) {
        return (
            <div>
                {showDownload && (
                    <div style={{ textAlign: 'right', marginBottom: '6px' }}>
                        <button
                            onClick={handleDownload}
                            style={{
                                padding: '4px 12px',
                                cursor: 'pointer',
                                fontSize: '13px',
                            }}
                        >
                            ⬇ Download
                        </button>
                    </div>
                )}
                <div
                    style={{
                        height,
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f5f5f5',
                    }}
                >
                    <img
                        src={fileUrl}
                        alt={fileName}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
        );
    }

    // === Unsupported file type ===
    return (
        <div style={{ padding: '12px', color: '#888' }}>
            Format file tidak didukung untuk preview ({mimeType})
        </div>
    );
};

export default FileViewer;
