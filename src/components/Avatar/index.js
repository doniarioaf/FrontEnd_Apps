import React, {Fragment} from 'react';
import Skeleton          from 'react-loading-skeleton';
import IconButton        from '@material-ui/core/IconButton';
import IconDelete        from '@material-ui/icons/DeleteOutline';
import Swal              from "sweetalert2";
import * as actions     from '../../store/actions';
import {useDispatch}     from 'react-redux';
import './image.css'
// import "react-loading-skeleton/dist/skeleton.css";


const Avatar = props => {
    const dispatch = useDispatch();

    const addDefaultSrc = (ev) => {
        return ev.target.src = '/img/default.png'
    }
    // delete profile pic - start
    const deleteImageHandle = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#061956',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            // preConfirm: () => {
            //     const a = dispatch(actions.initDeleteMemberImage(props.match.params.id));
            //     return axios.delete(clientImageUrl(props.match.params.id))
            //         .then(response => {
            //             console.log('hehe',a);
            //         })
            //         .catch(error => {
            //             Swal.showValidationMessage(
            //                 `Request failed: ${error}`
            //             )
            //         })
            // },
            allowOutsideClick: false,
        }).then((result) => {
            if (result.value) {
                // dispatch(actions.initDeleteMemberImage(props.memberId, successDeleteImage, props.errorHandler));
            } else if (result.dismiss) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your image is safe :D',
                    icon: 'error',
                    // confirmButtonColor: '#061956'
                });
            }
        })
    };

    function successDeleteImage() {
        // props.deleteImageSuccess(null);
        Swal.fire({
            title: 'Deleted!',
            text: 'Your image has been deleted.',
            icon: 'success',
            // confirmButtonColor: '#061956'
        });
    }

    // delete profile pic - end

    return (
        <Fragment>
            <div className="image-container">
                <div className="round-container"  
                // onClick={() => {
                //     props.openModal()
                // }}
                >
                    {
                        props.loading ? null :
                            <div className="upload-button-container">
                                <div className="upload-button-icon-container"/>
                            </div>
                    }
                    {
                        props.loading ? <Skeleton circle={true} className={'skeleton-avatar'}/> :
                            <img className="avatar" onError={addDefaultSrc} src={props.image}/>
                    }
                </div>
            </div>
            {
                !props.loading &&
                <div className="mt-1 d-flex justify-content-center" style={{width: '100%'}}>

                    {/* <IconButton title={'Delete picture'} color="secondary"
                                aria-label="delete picture"
                                component="span" size={'medium'}
                                // hidden={props.deleteimagepermission !== undefined ? props.deleteimagepermission:false}
                                onClick={deleteImageHandle}
                    >
                        <IconDelete/>
                    </IconButton> */}

                </div>
            }

        </Fragment>
    );
};

export default Avatar;