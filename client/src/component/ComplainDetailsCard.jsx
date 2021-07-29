import React from 'react';
import {CCard, CCardBody, CLabel} from "@coreui/react";
import location from "../assets/location.png";
import user from "../assets/user.png";
import clock from "../assets/clock.png";
import description from "../assets/description.png";
import { CIcon } from '@coreui/icons-react';

const ComplainDetailsCard = (props) => {

  return (
    <>
      <CCard style={{height :"100%"}}>
        <CCardBody>
          <div className="justify-content-center mb-3">
            <h5>Complain Details</h5>
          </div>

          <div className="row m-md-1">
            <div className="col" >
              <img className="mb-2 mt-2" src={location} height="25" width="25" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Detected location</CLabel>
              {/*<p>{props.complainDetails.location}</p>*/}
            </div>
          </div>



          <div className="row m-md-1">
            <div className="col " >
              <img className="mb-2 mt-2" src={clock} height="25" width="25" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Date</CLabel>
              {/*<p>{complainDetails.date}</p>*/}
            </div>
          </div>

          <div className="row m-md-1">
            <div className="col " >
              <img className="mb-2 mt-2" src={clock} height="25" width="25" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Time</CLabel>
              {/*<p>{complainDetails.time}</p>*/}
            </div>
          </div>

          <div className="row m-md-1">
            <div className="col" >
              <img className="mb-2 mt-2" src={description} height="25" width="25" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Description</CLabel>
              {/*<p>{complainDetails.description}</p>*/}
            </div>
          </div>
        </CCardBody>
      </CCard>




    </>
  )
}

export default ComplainDetailsCard


