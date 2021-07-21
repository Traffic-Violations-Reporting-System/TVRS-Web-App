import React from 'react';
import {CCard, CCardBody, CLabel} from "@coreui/react";
import location from "../assets/location.png";
import user from "../assets/user.png";
import clock from "../assets/clock.png";
import description from "../assets/description.png";
import { CIcon } from '@coreui/icons-react';

const ComplainDetailsCard = () => {

  return (
    <>
      <CCard style={{height :"100%"}}>
        <CCardBody>
          <div className="justify-content-center mb-3">
            <h5>Complain Details</h5>
          </div>

          <div className="row m-md-1">
            <div className="col" >
              <img className="mb-2 mt-0" src={location} height="45" width="45" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Detected location</CLabel>
              <p>Mount Lavinia, Sri Lanka</p>
            </div>
          </div>



          <div className="row m-md-1">
            <div className="col " >
              <img className="mb-2 mt-0" src={user} height="45" width="45" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Complainant</CLabel>
              <p>Sandaru Anuththara De SIlva</p>
            </div>
          </div>

          <div className="row m-md-1">
            <div className="col " >
              <img className="mb-2 mt-0" src={clock} height="45" width="45" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Time</CLabel>
              <p>10.12 AM</p>
            </div>
          </div>

          <div className="row m-md-1">
            <div className="col" >
              <img className="mb-2 mt-0" src={description} height="45" width="45" />
            </div>
            <div className="col-8">
              <CLabel htmlFor="username" className="mb-0 font-weight-bold">Description</CLabel>
              <p>Free Description icons in various UI design styles for web and mobile. Download free static and animated Description vector icons in PNG, SVG, GIF formats.</p>
            </div>
          </div>
        </CCardBody>
      </CCard>




    </>
  )
}

export default ComplainDetailsCard


