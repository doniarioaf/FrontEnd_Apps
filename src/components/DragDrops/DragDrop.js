import React, {useState, useEffect} from 'react';
import PropTypes                    from 'prop-types';
import Swal                         from "sweetalert2";
import {useDropzone}                from "react-dropzone";
import {useTranslation}             from 'react-i18next';
import {Container, Button}          from 'reactstrap';

const DragDrop = props => {
    const [files, setFiles] = useState([]);
    const i18n = useTranslation('translations');
    const MAX_SIZE = 1048576;
    const {getRootProps, getInputProps, isDragActive} =
        useDropzone({
            accept: props.acceptFileTypes,
            multiple: props.multiple,
            maxSize: MAX_SIZE,
            onDrop: acceptedFiles => {
                if (props.multiple) {
                    props.setPhotos(props.name, acceptedFiles, acceptedFiles.length);
                } else {
                    props.setPhotos(props.name, acceptedFiles[0], 1);
                }
                setFiles(acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                ));
            },
            onDropRejected: rejectedFiles => {
                if (rejectedFiles[0].size > MAX_SIZE) {
                    console.log('error size');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: i18n.t('member.data-add.error.FILE_LIMIT'),
                        customClass: {
                            container: 'swal2-container-custom'
                        }
                    });
                }
            }
        });

    const img = {
        width: "50%",
        height: "50%"
    };

    // useEffect(() => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    const handleRemove = (thePath) => {
        files.splice(files.findIndex(({path}) => path === thePath), 1);
        props.setPhotos(props.name, (files.length === 0 ? null : files), -1);
    };

    const theFile = files.map(file => {
        if (file.preview !== null) {
            return (
                <div key={"File " + file.path} className="mb-3 center-parent">
                    <h5>
                        {file.path} - {file.size} bytes
                    </h5>
                    <img src={file.preview} style={img} alt="File Preview"/>
                    <Button close style={{position: 'relative', left: 20, float: 'none'}}
                            onClick={() => handleRemove(file.path)}/>
                </div>
            )
        } else {
            return (
                <div key={"File " + file.path} className="center-parent">
                    <h4>{i18n.t('forms.FILE_UPLOAD')}</h4>
                    <em className="fas fa-circle-notch fa-spin fa-2x text-muted"/>
                </div>
            )
        }
    });

    return (
        <Container className="container-md mt-3">
            <section>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input name={props.name} {...getInputProps()} />
                    <p className="text-center box-placeholder m-0">
                    {/* {props.page && props.page == 'promotionmanagement' ? i18n.t('File Must Be JPEG, PNG, or SVG. Max File Size: 500 KB.'):i18n.t('forms.DRAGDROP_TITLE')} */}
                        {!isDragActive && i18n.t('forms.DRAGDROP_TITLE')}
                        {isDragActive && i18n.t('forms.DRAGDROP_TITLE')}

                        
                    </p>
                </div>
                <aside>
                    {files.length > 0 && theFile}
                </aside>
            </section>
        </Container>
    );
};

DragDrop.propTypes = {
    multiple: PropTypes.bool,
    name: PropTypes.string,
    setPhotos: PropTypes.func,
    acceptFileTypes: PropTypes.string
};

DragDrop.defaultProps = {
    multiple: false,
};

export default DragDrop;