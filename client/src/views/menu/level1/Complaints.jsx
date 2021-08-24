import {
  CRow,
  CCol,
  CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardBody, CTabs,

} from '@coreui/react';
import React, {useState} from 'react';
import { ReactVideo } from "reactjs-media";



import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";

const Dashboard = () => {
  const [active, setActive] = useState(1)
  

  return (
    <>
    <h3>Complaint Reference Number - K7814596</h3>

     <CRow>
       <CCol  sm="8">
         <div>
           <ReactVideo
             style={{height: '200px'}}
             src="https://www.example.com/url_to_video.mp4"
             poster="https://www.example.com/poster.png"
             primaryColor="blue"
             // other props
           />
         </div>
       </CCol>
       <CCol  sm="4">
          <ComplainDetailsCard/>
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

                <CNavItem>
                  <CNavLink>
                  <span>Review</span>
                  </CNavLink>
                </CNavItem>

              </CNav>

              <CTabContent>

                <CTabPane>
                  <AcceptForm />
                </CTabPane>

                <CTabPane>
                  <RejectForm />
                </CTabPane>

                <CTabPane>
                  <ReviewForm />
                </CTabPane>
                
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CRow>

    </>
  )
}

export default Dashboard

