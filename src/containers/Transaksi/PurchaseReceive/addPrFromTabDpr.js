import React from 'react';
import AddPr from './add';
import * as pathmenu from '../../shared/pathMenu';

export default function AddPrFromDpr(props) {
    const id = props.match.params.id;
    return(
        <AddPr
        from={"FROMDPR"}
        linkurl = {pathmenu.addpurchasereceivefromtabpenerimaanbarang}
        />
    )
}