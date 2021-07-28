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
import React, {useEffect, useState} from 'react';
import { ReactVideo } from "reactjs-media";


import DocsLink from "../../../reusable/DocsLink";
import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
import {getComplain} from "../../../services/web/complainService";

const Dashboard = (props) => {
  const [active, setActive] = useState(1)
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  const [complainDetails, setComplain] = useState();

  useEffect(() => {
    fetchUser(props);
  }, []);

  const fetchUser = async (props) => {
    const userId = props.match.params.id;
    const { data: complain } = await getComplain(userId);
    setComplain(complain);

    console.log(complain);
  };
  return (
    <>
    <h3>CMID000{props.match.params.id}</h3>

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
          <ComplainDetailsCard complainDetails={complainDetails} />
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

