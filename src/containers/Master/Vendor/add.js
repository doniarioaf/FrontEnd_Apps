import React from 'react';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { addVendor_Permission } from '../../shared/permissionMenu';
import * as pathmenu from '../../shared/pathMenu';
import VendorForm, { validasiType } from './VendorForm';

// re-exported so any existing imports of `validasiType` from './add' keep working
export { validasiType };

export default function AddVendor(props) {
    reloadToHomeNotAuthorize(addVendor_Permission, 'TRANSACTION');

    return (
        <VendorForm
            mode="ADD"
            headingLink={pathmenu.addVendor}
            headingLabel={'Add Vendor'}
        />
    )
}