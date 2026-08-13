import React from 'react';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { editVendor_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import VendorForm from './VendorForm';

export default function EditVendor(props) {
    reloadToHomeNotAuthorize(editVendor_Permission, 'TRANSACTION');
    const id = props.match.params.id;

    return (
        <VendorForm
            mode="EDIT"
            id={id}
            headingLink={pathmenu.editVendor + '/' + id}
            headingLabel={'Edit Vendor'}
        />
    )
}