import React, {useState, useEffect} from "react";
import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { numToMoney } from "../../shared/globalFunc";
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

function VendorDialog({open, toggle,errorHandler}){

  const [vendors,setVendors] = useState([]);
  const [search,setSearch] = useState("");
  const [page,setPage] = useState(0);
  const size = 10;
  const [total,setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchVendor = () => {
    setLoading(true);
    let obj = new Object();
    obj.offset = page * size;
    obj.limit = size;
    obj.search = search ;
    dispatch(actions.getPinjamanData({ url: '/listSisaPinjamanVendor', type: 'POST', payload: obj }, successHandler, errorHandler));
  };

   function successHandler(data, propsdata) {
        if (data.data) {
            const theData = data.data.data.reduce((obj, el) => [
                ...obj,
                {
                    'id': el.idvendor,
                    'vendorName': el.vendorName+' ('+el.vendorAlias+')',
                    'sisaPinjaman':el.sisaPinjaman?numToMoney(el.sisaPinjaman):0,
                }
            ], []);
            
              if(theData !== null && theData.length > 0){
                setVendors(theData);
                setTotal(data.data.totalElements?data.data.totalElements:0);
              }else{
              setVendors(theData);
              setTotal(data.data.totalElements?data.data.totalElements:0);
              setPage(page == 0 ?page:page - 1);
            }
        }
        setLoading(false);
    }

  useEffect(()=>{
    if(open){
      
      fetchVendor();
    }
  },[page, open]);

  const handleSearch = () =>{
    setPage(0);
    fetchVendor();
  }

  const handleClose = () => {
    setPage(0);
    setSearch("");
    setVendors([]);
    toggle(); // menutup modal
  };

  return(

    <Modal isOpen={open} toggle={handleClose} size="lg">

      <ModalHeader toggle={handleClose}>
        List Pinjaman
      </ModalHeader>

      <ModalBody>

        <div className="d-flex mb-3">

          <input
            className="form-control"
            placeholder="Cari vendor..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <button
            className="btn btn-primary ms-2"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>

      <div style={{position:"relative"}}>
        {loading && (
          <div
            style={{
              position:"absolute",
              width:"100%",
              height:"100%",
              background:"rgba(255,255,255,0.7)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              zIndex:10
            }}
          >
            <div className="spinner-border text-primary"/>
          </div>
        )}
        <table className="table table-bordered table-sm">

          <thead className="table-light">
            <tr>
              <th>Nama Vendor</th>
              <th width="200">Sisa Pinjaman</th>
            </tr>
          </thead>

          <tbody>

            {vendors.map(v=>(
              <tr key={v.idvendor}>
                <td>{v.vendorName}</td>
                <td className="text-end">
                  {v.sisaPinjaman}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        </div>

        <div className="d-flex justify-content-between">

          <button
            className="btn btn-secondary"
            disabled={page === 0}
            onClick={()=>setPage(page-1)}
          >
            Prev
          </button>

          <span>
            Page {page+1}
          </span>

          <button
            className="btn btn-secondary"
            disabled={(page+1)*size >= total}
            onClick={()=>setPage(page+1)}
          >
            Next
          </button>

        </div>

      </ModalBody>

    </Modal>

  )

}

export default VendorDialog;