import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CImg, CAlert, CInputGroup, CInputGroupPrepend, CInputGroupText, CDataTable
} from '@coreui/react'

import ReactPlayer from 'react-player'
import { v4 as uuidv4 } from 'uuid';
import {getFullComplaint} from "../../../services/web/level3UserService";
import { useHistory } from 'react-router-dom';
const config = require("../../../config.json");

const ComplaintReport = ({ match }) => {
   const history = useHistory();
   const [alert, setAlert] = useState('');
   const [success, setSuccess] = useState('');
   const complaintId = parseInt(match.params.id);
   const [videoUrl, setVideoUrl] = useState();

   const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
      { id: uuidv4(), vehicleNumber: '', ownerNic: '', vehicleType: '', vehicleColor: '', vehicleStatus: '', acceptId: complaintId }
   ]);
   const [inputFieldsPerson, setInputFieldsPerson] = useState([
      { id: uuidv4(), nic: '', contactNo: '', ageRange: '', gender: '', skinColor: '', personStatus: '', acceptId: complaintId }
   ]);
   const [inputFieldsOther, setInputFieldsOther] = useState({
      violationType: '', userDescription: '', officerDescription: '', complaintStatus: '', progress: '', newProgress: ''
   })
   const [complainer, setComplainer] = useState({ full_name: '', nic: '', mphone: '' })


   useEffect(() => {
      fetchComplaintData(complaintId);
   }, []);

   const fetchComplaintData = async (complaintId) => {
      getFullComplaint(complaintId)
         .then((res) => {
            setInputFieldsOther({
               'userDescription': res.data[0].basics.complaint.description ? res.data[0].basics.complaint.description : "",
               'complaintStatus': res.data[0].basics.complaint.complaint_status ? res.data[0].basics.complaint.complaint_status : "",
               'officerDescription': res.data[0].basics.description ? res.data[0].basics.description : "",
               'violationType': res.data[0].basics.violationType,
               'progress': res.data[0].basics.Progresses ? res.data[0].basics.Progresses : ""
            });
            const complainer = res.data[0].basics.complaint.mobile_user;
            const videoRef = res.data[0].basics.complaint.video_ref.reference;
            const people = res.data[1].peopleList;
            const vehicles = res.data[2].vehicleList;
        
            setVideoUrl(videoRef);
            setComplainer(complainer);
            setInputFieldsPerson(people);
            setInputFieldsVehicle(vehicles);

         })
   };
   return (
      <>
      <CCard style={{ height: "100%" }}>
        <CCardHeader>
          <h3>Complaint Details</h3>
        </CCardHeader>
        {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}
        <CCardBody>
          <h5>Evidence</h5>
          <CRow>
            <CCol  sm="8">
              <div>
              <ReactPlayer
                url={videoUrl ?`${config["VideoStreamURl"]}`+"/"+videoUrl :null}
                controls
                height='400px'
                width='100%'
              />
              </div>
            </CCol>
            <CCard>
           
        <CCardHeader>
          <h5>Complainer's Details</h5>
       </CCardHeader>
       <CCardBody>
       <CForm>
          <CFormGroup>
            <CInputGroup>
            <CInputGroupPrepend>
            <CInputGroupText>Name</CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="comp_name" name="comp_name" defaultValue={complainer.full_name} />
          </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
            <CInputGroupPrepend>
            <CInputGroupText>NIC</CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="comp_nic" name="comp_nic" defaultValue={complainer.nic} />
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
            <CInputGroupPrepend>
            <CInputGroupText>Contact No.</CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="comp_contact" name="comp_contact" defaultValue={complainer.mphone}  />
            </CInputGroup>
          </CFormGroup>     
        </CForm>
        </CCardBody>
      </CCard>
      </CRow>
      </CCardBody>
      </CCard>
   
      <CCard>
        <CCardBody>
        <CForm>
        <CRow>
          <p className="lead" style={{marginLeft:"15px",marginTop:"4px",fontWeight:"650"}}>Related People</p>
          </CRow>

          {inputFieldsPerson.map((inputField, index) => (
          <div key={index}>
          <CRow>
          <CCol xs="2">
              <CFormGroup>
                <CLabel htmlFor="nic">NIC</CLabel>
                    <CInput
                      id="nic"
                      name="nic"
                     //  placeholder="Enter NIC Number"
                      defaultValue={inputField.nic ? inputField.nic: ""}      
                    />
              </CFormGroup>
          </CCol>
          <CCol xs="2">
              <CFormGroup>
                <CLabel htmlFor="contactNo">Contact No.</CLabel>
                    <CInput
                      id="contactNo"
                      name="contactNo"
                     //  placeholder="Enter Contact Number"
                      value={inputField.contactNo ? inputField.contactNo : ""}
                     
                    />
              </CFormGroup>
          </CCol>
          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="ageRange">Age Range</CLabel>
                <CSelect custom
                  name="ageRange"
                  id="ageRange"
                  value={inputField.ageRange ? inputField.ageRange : 0}
                > 
                <option defaultValue={inputField.ageRange}>{inputField.ageRange}</option>       
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="gender">Gender</CLabel>
                <CSelect custom
                  name="gender"
                  id="gender"
                  value={inputField.gender ? inputField.gender : 0}  
                >
               <option defaultValue={inputField.gender}>{inputField.gender}</option>
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
            <CFormGroup>
              <CLabel htmlFor="skinColor">Skin Color</CLabel>
                <CSelect custom
                  name="skinColor"
                  id="skinColor"
                  value={inputField.skinColor ? inputField.skinColor : 0}   
                >
               <option defaultValue={inputField.skinColor}>{inputField.skinColor}</option>
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="personStatus">Status</CLabel>
                <CSelect custom
                  name="personStatus"
                  id="personStatus"
                  value={inputField.personStatus ? inputField.personStatus : 0} 
                >
               <option defaultValue={inputField.personStatus}>{inputField.personStatus}</option>
              </CSelect>
            </CFormGroup>
          </CCol>
          </CRow>
          <hr></hr>
          </div>
          ))}
            
          <hr></hr>
          <CRow>
            <p className="lead " style={{marginLeft:"15px",marginTop:"4px",fontWeight:"700"}}>Related Vehicles</p>
          </CRow>
          
          {inputFieldsVehicle.map((inputField) => (
                <div key={inputField.id}>
                <CRow>
                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleNumber">Vehicle Number</CLabel>
                          <CInput
                            id="vehicleNumber"
                            name="vehicleNumber"
                           //  placeholder="Enter Vehicle Number"
                            value={inputField.vehicleNumber ? inputField.vehicleNumber : ""}  
                          />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleNumber">Owner NIC</CLabel>
                          <CInput
                            id="ownerNic"
                            name="ownerNic"
                           //  placeholder="Enter Owner NIC"
                            value={inputField.ownerNic ? inputField.ownerNic : ""}   
                          />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleType">Vehicle Type</CLabel>
                      <CSelect custom
                        name="vehicleType"
                        id="vehicleType"
                        value={inputField.vehicleType ? inputField.vehicleType : 0}   
                      >
                     <option defaultValue={inputField.vehicleType}>{inputField.vehicleType}</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>

                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleColor">Color</CLabel>
                          <CInput
                            id="vehicleColor"
                            name="vehicleColor"
                            placeholder="Enter Vehicle Color" 
                            value={inputField.vehicleColor ? inputField.vehicleColor : ""}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleStatus">Status</CLabel>
                        <CSelect custom
                            name="vehicleStatus"
                            id="vehicleStatus"
                            value={inputField.vehicleStatus ? inputField.vehicleStatus: 0}   
                         >
                        <option defaultValue={inputField.vehicleStatus}>{inputField.vehicleStatus}</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  </CRow>
                  <hr></hr>  
                </div>
                
                ))}
                
            
            <hr></hr>
            
            <CRow>

              <CCol xs="6">
              <CFormGroup >
                <CLabel htmlFor="userDescription">Complainer Description</CLabel>
                    <CTextarea
                      name="userDescription"
                      id="userDescription"
                      rows="4"
                      placeholder="Description..."
                      value={inputFieldsOther.userDescription}
                      disabled
                    />
              </CFormGroup>
              </CCol>
              <CCol xs="6">
              <CFormGroup >
                <CLabel htmlFor="officerDescription">Officer Description</CLabel>
                    <CTextarea
                      name="officerDescription"
                      id="officerDescription"
                      rows="4"
                      placeholder="Officer Description..."
                      value={inputFieldsOther.officerDescription}
                      disabled
                    />
              </CFormGroup>
              </CCol>

            </CRow>
            <CRow>
              <CCol xs="3">
                <CFormGroup>
                  <CLabel htmlFor="violationType">Violation Type</CLabel>
                    <CSelect custom
                      name="violationType"
                      id="violationType"
                    >
                    <option defaultValue={inputFieldsOther.violationType}>{inputFieldsOther.violationType}</option>
                    </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="3">
                <CFormGroup>
                  <CLabel htmlFor="status">Complaint Status</CLabel>
                    <CSelect custom
                      name="complaintStatus"
                      id="complaintStatus"
                      value={inputFieldsOther.complaintStatus}
                    >
                     <option defaultValue={inputFieldsOther.complaintStatus}>{inputFieldsOther.complaintStatus}</option>
                    </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <hr></hr>
            <CRow>
            <p className="lead " style={{marginLeft:"15px",marginTop:"4px",fontWeight:"700"}}>Complaint Progress</p>
            </CRow>
            <CRow>  
            <CCol xs="9">
              <CDataTable
                items={inputFieldsOther.progress} 
                fields={[
                  { key: 'Date', _classes: 'font-weight-bold' }, 'Progress'
                ]}
                hover
                striped
                clickableRows  
                scopedSlots={{
                  'Date':
                    (item) => (
                    <td>
                      {item.createdAt.split('T')[0]}
                    </td>
                    ),
                  'Progress':
                    (item) => (
                    <td>
                      {item.progress}
                    </td>
                  )   
                }}
              /> 
            </CCol>
            </CRow>

            <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
              <CButton block color="success">Get PDF</CButton>
            </CCol>
            <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
              <CButton block color="primary" onClick={() => history.goBack()}>Back</CButton>
            </CCol>

        </CForm>
        </CCardBody>
      </CCard>  
    
    </>
   );
}

export default ComplaintReport;