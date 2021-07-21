import {
  CRow,
  CButton,
  CForm,
  CLabel,
  CInput,
  CTextarea,
  CCol,
  CSelect, CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardHeader, CCardBody, CTabs,

} from '@coreui/react';
import React, {useState} from 'react';
import { ReactVideo } from "reactjs-media";

import location from "../../../assets/location.jpg";
import user from "../../../assets/user.png";
import clock from "../../../assets/clock.png";
import DocsLink from "../../../reusable/DocsLink";
import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";

const Dashboard = () => {
  const [active, setActive] = useState(1)
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

  return (
    <>
    <h3>Complaint Reference Number - K7814596</h3>

     <CRow >
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
                    Accept
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Reject
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Review
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

