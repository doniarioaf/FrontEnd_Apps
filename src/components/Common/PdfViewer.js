import React from 'react';

/**
 * PdfViewer — Reusable PDF Viewer Component (berbasis iframe, tanpa dependency tambahan)
 *
 * Props:
 * @param {string}   fileUrl        - URL, blob URL, atau data URL file PDF (wajib)
 * @param {string}   [fileName]     - Nama file saat di-download (default: 'document.pdf')
 * @param {string}   [height]       - Tinggi area viewer (default: '500px')
 * @param {boolean}  [showDownload] - Tampilkan tombol Download custom (default: true)
 * @param {function} [onDownload]   - Override fungsi download custom, jika tidak diisi pakai default
 */
const PdfViewer = ({
    fileUrl,
    fileName = 'document.pdf',
    height = '500px',
    showDownload = true,
    onDownload,
}) => {
    if (!fileUrl) return null;

    const handleDownload = () => {
        if (onDownload) {
            onDownload(fileUrl, fileName);
            return;
        }

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

            <div style={{ height }}>
                <iframe
                    src={fileUrl}
                    title={fileName}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            </div>
        </div>
    );
};

export default PdfViewer;
