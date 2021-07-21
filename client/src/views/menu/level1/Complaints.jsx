import {
  CRow,
  CButton,
  CForm,
  CLabel,
  CInput,
  CTextarea,
  CCol,
  CSelect,

} from '@coreui/react';
import React from 'react';


import location from "../../../assets/location.jpg";
import user from "../../../assets/user.png";
import clock from "../../../assets/clock.png";

const Dashboard = () => {
  return (
    <>
    <h3>Complaint reference number - K7814596</h3>

     <CRow className="mb-3">
       <CCol>
         <div className="embed-responsive embed-responsive-4by3"  style={{width:"100%", height:"300px"}}>
           <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/UduRBqNqphI"
                   allowFullScreen></iframe>
         </div>
       </CCol>
     </CRow>

    <CRow className="justify-content-center pt-2">
        <CButton color="success" className="w-md waves-effect waves-light mr-2"style={{width:"15%"}}>ACCEPT</CButton>
        <CButton color="danger" className="w-md waves-effect waves-light mr-2"style={{width:"15%"}}>REJECT</CButton>
        <CButton color="warning" className="w-md waves-effect waves-light mr-2"style={{width:"15%"}}>SEND TO LEVEL 2</CButton>
        <CButton color="primary" className="w-md waves-effect waves-light mr-2"style={{width:"15%"}}>RATE USER</CButton>
    </CRow>

    <CRow className="mt-6">

       <CCol lg={8}>

        <CForm>
          <div className="mb-3">
              <CLabel>Complain Type</CLabel>
            <CSelect>
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </CSelect>
          </div>
          <div className="mb-3">
              <CLabel>Description </CLabel>
              <CTextarea
              component="textarea"
              id="exampleFormControlTextarea1"
              rows="3"
              value="This vehicle numbered KV - 7272 did an improper passing on 11th July
              2021 at Marive Drive. they nearly hit the three wheeler on the opposite
              side. "
              />
          </div>
          <CButton  color="primary" className="w-md waves-effect waves-light" href="#">Submit</CButton>
        </CForm>

      </CCol>

      <CCol lg={4} className="mt-5">
        <div className="row m-md-1">
            <div className="col" >
              <img className="mb-2 mt-0" src={location} height="45" />
             </div>
              <div className="col-8">
                    <CLabel htmlFor="username" className="mb-0 font-weight-bold">Detected location</CLabel>
                    <p>Mount Lavinia, Sri Lanka</p>
              </div>
        </div>

        <div className="row m-md-1">
          <div className="col " >
            <img className="mb-2 mt-0" src={user} height="45" />
          </div>
          <div className="col-8">
            <CLabel htmlFor="username" className="mb-0 font-weight-bold">Complainant</CLabel>
            <p>Sandaru Anuththara De SIlva</p>
          </div>
        </div>

        <div className="row m-md-1">
          <div className="col " >
            <img className="mb-2 mt-0" src={clock} height="45" />
          </div>
          <div className="col-8">
            <CLabel htmlFor="username" className="mb-0 font-weight-bold">Time</CLabel>
            <p>10.12 AM</p>
          </div>
        </div>
        </CCol>
    </CRow>

    </>
  )
}

export default Dashboard

