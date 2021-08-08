import {
  CRow,
  CCol,
  CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardBody, CTabs,

} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import { ReactVideo } from "reactjs-media";



import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
import {getComplain} from "../../../services/web/complainService";

const ComplaintsDetails = (props) => {
 const [complainDetails, setComplain] = useState();
  const [complainId, setComplainId] = useState();

  useEffect (() => {

  },[]);

  const fetchComplain = async (props) => {
    const complainId = props.match.params.id;
    setComplainId(complainId);
    const { data: complain } = await getComplain(complainId);
    if(complain)  setComplain(complain);


    console.log("complainDetails :");
    console.log(complainDetails);
  };

  return (
    <>
    <h3>CMID000{props.match.params.id}</h3>

     <CRow>
       <CCol  sm="8">
          <ComplainDetailsCard complainDetails={complainDetails}  />
       </CCol>
     </CRow>
    </>
  )
}

export default ComplaintsDetails

