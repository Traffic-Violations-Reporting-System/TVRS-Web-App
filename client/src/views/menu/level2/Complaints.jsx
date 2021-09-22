import {
   CRow,
   CCol,
   CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardBody, CTabs,
 
 } from '@coreui/react';
 import React, {useEffect, useState} from 'react';
 
 
 import ReactPlayer from 'react-player'
 import AcceptForm from "../../../component/AcceptForm";
 import RejectForm from "../../../component/RejectForm";
 import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
 
 
 import {getComplain} from "../../../services/web/level2UserService";
 import {getCurrentUser} from "../../../services/web/userService";
 
 const config = require("../../../config.json");
 
 const Dashboard = (props) => {
   const [complainDetails, setComplain] = useState();
   const [complainId, setComplainId] = useState();
   const [loading, setLoading] = useState(false);
  
 
   useEffect (() => {
     fetchComplain(props);
   },[]);
 
   const fetchComplain = async (props) => {
     try{
       const complainId = props.match.params.id;
       setComplainId(complainId);
       const { data: complain} = await getComplain(complainId,{'currentUserId':getCurrentUser().userId});
       if(complain)  setComplain(complain);
       setLoading(true);
     }catch (e) {
       if(e.response.status==400) setLoading(false);
 
     }
   };
   
 
   return (
     <>
       {loading ? <div>
         <h3>Complaint Evidence Details</h3>
 
         <CRow>
           <CCol  sm="8">
             <div>
               <ReactPlayer
                 url={complainDetails ?`${config["VideoStreamURl"]}`+"/"+complainDetails.reference :null}
                 controls
                 height='400px'
                 width='100%'
               />
             </div>
           </CCol>
           <CCol  sm="4">
             <ComplainDetailsCard complainDetails={complainDetails}  />
           </CCol>
         </CRow>
 
 
         <CRow className="mt-5">
           <CCard style={{width:"100%"}}>
             <CCardBody>
               <CTabs>
                 <CNav variant="tabs">
                   <CNavItem>
                     <CNavLink>
                       <span text-color="green">Accept</span>
                     </CNavLink>
                   </CNavItem>
 
                   <CNavItem>
                     <CNavLink>
                       <span>Reject</span>
                     </CNavLink>
                   </CNavItem>
 
                 </CNav>
 
                 <CTabContent>
 
                   <CTabPane>
                     <AcceptForm complainId={complainId} />
                   </CTabPane>
 
                   <CTabPane>
                     <RejectForm complainId={complainId} />
                   </CTabPane>
 
                 </CTabContent>
               </CTabs>
             </CCardBody>
           </CCard>
         </CRow>
 
       </div> : <h2></h2> }
       </>
   )
 }
 
 export default Dashboard;
 
 