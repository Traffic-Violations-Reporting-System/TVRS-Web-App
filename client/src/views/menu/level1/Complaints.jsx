import {
  CRow,
  CCol,
  CTabContent, CTabPane, CNav, CNavItem, CNavLink, CCard, CCardBody, CTabs,

} from '@coreui/react';
import React, {useCallback, useEffect, useState} from 'react';


import ReactPlayer from 'react-player'
import AcceptForm from "../../../component/AcceptForm";
import RejectForm from "../../../component/RejectForm";
import ReviewForm from "../../../component/ReviewForm";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
import SimilarVideoLoadingCard from "../../../component/SimilarVideoLoading";

import {getComplain} from "../../../services/web/complainService";
import {getCurrentUser} from "../../../services/web/userService";
const config = require("../../../config.json");
const Dashboard = (props) => {
  const [complainDetails, setComplain] = useState();
  const [complainId, setComplainId] = useState();
  const [loading, setLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [videoRefArr, setVideoRefArr] = useState([]);

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
  const wrapperSetSimilarLoading = useCallback(val => {
    setSimilarLoading(val);
  }, [setSimilarLoading]);
  const wrapperSetVideoRefArr = useCallback(val => {
    setVideoRefArr(val);
  }, [setVideoRefArr]);

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
                height='350px'
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
              { similarLoading? <SimilarVideoLoadingCard videoRefArr={videoRefArr} />:<CTabs>
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
                    <AcceptForm
                        complainId={complainId}
                        parentSetSimilarLoading={wrapperSetSimilarLoading}
                        parentSetVideoRefArr={wrapperSetVideoRefArr}
                    />
                  </CTabPane>

                  <CTabPane>
                    <RejectForm complainId={complainId} />
                  </CTabPane>

                  <CTabPane>
                    <ReviewForm complainId={complainId} />
                  </CTabPane>

                </CTabContent>
              </CTabs>}
            </CCardBody>
          </CCard>
        </CRow>

      </div> : <h2></h2> }
      </>
  )
}

export default Dashboard;

