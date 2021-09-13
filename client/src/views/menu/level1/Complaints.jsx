import {
  CRow,
  CCol,
  CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardBody, CTabs, CSpinner,

} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import { ReactVideo } from "reactjs-media";


import DocsLink from "../../../reusable/DocsLink";
import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
import {getComplain} from "../../../services/web/complainService";
import {getCurrentUser} from "../../../services/web/userService";
import loadingImage from "../../../assets/loading.gif";
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
      console.log(complainDetails);
    }catch (e) {
      if(e.response.status==400) setLoading(false);

    }
  };
  return (
    <>
      {loading ? <div>
        <h3>Complaint id :{props.match.params.id}</h3>

        <CRow>
          <CCol  sm="8">
            <div>
              <ReactVideo
                style={{height: '200px'}}
                src={complainDetails ?"https://dev9aj0eiuvoo.cloudfront.net/"+complainDetails.reference :null}
                poster={loadingImage}
                primaryColor="blue"
                // other props
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

                  <CNavItem>
                    <CNavLink>
                      <span>Review</span>
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

                  <CTabPane>
                    <ReviewForm complainId={complainId} />
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

