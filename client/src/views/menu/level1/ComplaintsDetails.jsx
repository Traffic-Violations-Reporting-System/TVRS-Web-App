import {
  CRow,
  CCol,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
  CCard,
  CCardBody,
  CTabs,
  CLabel,
  CProgress,
  CCardHeader,
  CButton,
  CImg, CFormGroup, CInput, CSelect,

} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import { ReactVideo } from "reactjs-media";
import ComplainDetailsCard from "../../../component/ComplainDetailsCard";
import {getComplain} from "../../../services/web/complainService";
import location from "../../../assets/location.png";
import clock from "../../../assets/clock.png";
import description from "../../../assets/description.png";
import plus from "../../../assets/plus.png";
import minus from "../../../assets/minus.png";
import {v4 as uuidv4} from "uuid";


const ComplaintsDetails = (props) => {

  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    { id: '1', vehicleNumber: '1', vehicleType: '1', vehicleColor: '1', vehicleStatus: '1'},
    { id: '2', vehicleNumber: '1', vehicleType: '1', vehicleColor: '1', vehicleStatus: '1'}
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    { id: '1', ageRange: 'w', gender: '', skinColor: '', personStatus: '' },
    { id: '2', ageRange: 'w', gender: '', skinColor: '', personStatus: '' }
  ]);


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

      <CCard style={{height :"100%"}}>
        <CCardBody>
          <h3>Complain Details</h3>
          <CRow>
            <CCol  sm="12">
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
          </CRow>
          <div className="row mt-4"></div>

          <CRow className="m-2">
            <p></p>
            <div className="bd-example">
              <dl className="row">

                <dt className="col-sm-3">Complaint Accuracy</dt>
                <dd className="col-sm-9">
                  <CProgress value={50.45} showValue className="mb-3"/>
                </dd>

                <dt className="col-sm-3">Status</dt>
                <dd className="col-sm-9"><p style={{paddingLeft:"40%",backgroundColor:"yellow"}}>pending</p></dd>

                <dt className="col-sm-3">Reviewed Date</dt>
                <dd className="col-sm-9">2012-10-12</dd>

                <dt className="col-sm-3 text-truncate">Violation Type</dt>
                <dd className="col-sm-9">Accident</dd>

                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">
                  <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
                </dd>

              </dl>
            </div>
          </CRow>

          <p className="text-truncate" style={{marginTop:"4px"}}><b>Related Vehicles</b></p>

          <CRow>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Vehicle Number</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Vehicle Type</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Color</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Status</CLabel>
              </CFormGroup>
            </CCol>

          </CRow>
          {inputFieldsVehicle.map((inputField) => (
            <div key={inputField.id} style={{marginTop:"5px"}}>
              <CRow>
                <CCol xs="3">
                    <CInput
                      id="vehicleNumber"
                      value={inputField.vehicleNumber}
                      readonly
                      disabled={true}

                    />
                </CCol>

                <CCol xs="3">
                    <CInput
                      id="vehicleType"
                      value={inputField.vehicleType}
                      readonly
                      disabled={true}
                    />
                </CCol>

                <CCol xs="3">
                    <CInput
                      id="vehicleType"
                      value={inputField.vehicleColor}
                      readonly
                      disabled={true}
                    />
                </CCol>

                <CCol xs="3">
                  <CInput
                      id="vehicleType"
                      value={inputField.vehicleStatus}
                      readonly
                      disabled={true}
                    />
                </CCol>
              </CRow>
            </div>

          ))}

          <p className="text-truncate" style={{marginTop:"10px"}}><b>Related People</b></p>

          <CRow>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Age Range</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Gender</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Skin Color</CLabel>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="vehicleNumber">Person Status</CLabel>
              </CFormGroup>
            </CCol>

          </CRow>
          {inputFieldsPerson.map((inputField) => (
            <div key={inputField.id} style={{marginTop:"3px"}}>
              <CRow>
                <CCol xs="3">
                  <CInput
                    id="ageRange"
                    value={inputField.ageRange}
                    readonly
                    disabled={true}

                  />
                </CCol>

                <CCol xs="3">
                  <CInput
                    id="gender"
                    value={inputField.gender}
                    readonly
                    disabled={true}
                  />
                </CCol>

                <CCol xs="3">
                  <CInput
                    id="skinColor"
                    value={inputField.skinColor}
                    readonly
                    disabled={true}
                  />
                </CCol>

                <CCol xs="3">
                  <CInput
                    id="personStatus"
                    value={inputField.personStatus}
                    readonly
                    disabled={true}
                  />
                </CCol>
              </CRow>
            </div>

          ))}

        </CCardBody>
      </CCard>


    </>
  )
}

export default ComplaintsDetails

