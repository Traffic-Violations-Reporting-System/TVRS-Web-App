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
  CImg, CAlert
} from '@coreui/react'

import { ReactVideo } from "reactjs-media";

import plus from "../../../assets/plus.png";
import { v4 as uuidv4 } from 'uuid';
import {updateComplaint, getFullComplaint} from "../../../services/web/level3UserService";
import { useHistory } from 'react-router-dom';


const Complaint = ({ match }) => {
  const history = useHistory();
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState({})
  const complaintId = match.params.id;

  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    { id: uuidv4(), vehicleNumber: '',ownerNic: '', vehicleType: '', vehicleColor: '', vehicleStatus: ''}
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    { id: uuidv4(), nic:'' , contactNo:'' ,ageRange: '', gender: '', skinColor: '', personStatus: '' }
  ]);
  const [inputFieldsOther, setInputFieldsOther] = useState({
    violationType: '', userDescription: '', officerDescription: '', complaintStatus:'', progress: ''
  })

  useEffect(() => {
    fetchComplaintData(complaintId);  
  },[]);

  const fetchComplaintData = async (complaintId) => {
    getFullComplaint(complaintId)
      .then((res) => {
        setInputFieldsOther({
          'userDescription': res.data[0].userDescription,
          'complaintStatus': res.data[1].status,
          'officerDescription': res.data[2].officerDescription,
          'violationType': res.data[3].violationType,
          'progress': res.data[4].progress
        });
        const people = res.data[5].peopleList;
        const vehicles = res.data[6].vehicleList;
        setInputFieldsPerson(people);
        setInputFieldsVehicle(vehicles);
        
      })
  };
 
  const vehiclePlusClick = () => {
    setInputFieldsVehicle([...inputFieldsVehicle, { id: uuidv4(), vehicleNumber: '', vehicleType: '', vehicleColor: '', vehicleStatus: '' }])
  }
  
  const personPlusClick = () => {
    setInputFieldsPerson([...inputFieldsPerson, { id: uuidv4(), ageRange: '', gender: '', skinColor: '', personStatus: '' }]);
  }
  
  const handleChangeInputVehicle = (id, event) => {
    const newInputFields = inputFieldsVehicle.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFieldsVehicle(newInputFields);
  }

  const handleChangeInputPerson = (id, event) => {
    const newInputFields = inputFieldsPerson.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFieldsPerson(newInputFields);
  }

  const handleChangeInputOther = (event) => {
    setInputFieldsOther({ ...inputFieldsOther, [event.target.name]: event.target.value });
  }

  const handleSubmit = (e) => {
    let complaint = [];
    complaint.push({ "otherDetails": inputFieldsOther });
    complaint.push({ "peopleList": inputFieldsPerson });
    complaint.push({ "vehicleList": inputFieldsVehicle });

    try {
      const result = updateComplaint(complaintId, complaint);
      if (result) {
        setAlert("Complaint Update Successfull!");
        setSuccess("success");
      } 
      else {
        
      } 
    } catch (error) {
      console.log("Update failed")
    }
  }

  const handleReset = () => {
    window.location.reload();
  }
  
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
            <CCol  sm="12">
              <div>
                <ReactVideo
                  style={{height: '100px'}}
                  src="https://www.example.com/url_to_video.mp4"
                  poster="https://www.example.com/poster.png"
                  primaryColor="blue"
                  // other props
                />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
        <CForm>
        <CRow>
          <p className="lead" style={{marginLeft:"15px",marginTop:"4px",fontWeight:"650"}}>Related People</p>
          <div className="c-avatar" style={{marginLeft:"25px"}}>
            <CButton><CImg
              src={plus}
              className="c-avatar-img"
              style={{ width: "25px" }}
              onClick={() => personPlusClick()}
            /></CButton>
          </div>

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
                      placeholder="Enter NIC Number" value={inputField.nic}
                      onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                    />
              </CFormGroup>
          </CCol>
          <CCol xs="2">
              <CFormGroup>
                <CLabel htmlFor="contactNo">Contact No.</CLabel>
                    <CInput
                      id="contactNo"
                      name="contactNo"
                      placeholder="Enter Contact Number" value={inputField.contactNo}
                      onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                    />
              </CFormGroup>
          </CCol>
          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="ageRange">Age Range</CLabel>
                <CSelect custom
                  name="ageRange"
                  id="ageRange"
                  value={inputField.ageRange}
                  onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                >
                <option value="0">Not selected</option>
                <option value="Below 18">Below 18</option>
                <option value="18-30">18 - 30</option>
                <option value="30-50">30-50</option>
                <option value="50-70">50-70</option>
                <option value="Above 70">Above 70</option>
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="gender">Gender</CLabel>
                <CSelect custom
                  name="gender"
                  id="gender"
                  value={inputField.gender}
                  onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                >
                <option value="0">Not selected</option>
                <option value="male">Male</option>
                <option value="female">female</option>
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
            <CFormGroup>
              <CLabel htmlFor="skinColor">Skin Color</CLabel>
                <CSelect custom
                  name="skinColor"
                  id="skinColor"
                  value={inputField.skinColor}
                  onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                >
                <option value="0">Not selected</option>
                <option value="fair">Fair</option>
                <option value="medium">Medium</option>
                <option value="olive">Olive</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
              </CSelect>
            </CFormGroup>
          </CCol>

          <CCol xs="2">
          <CFormGroup>
              <CLabel htmlFor="personStatus">Status</CLabel>
                <CSelect custom
                  name="personStatus"
                  id="personStatus"
                  value={inputField.personStatus}
                  onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                >
                <option value="0">Not selected</option>
                <option value="victim">Victim</option>
                <option value="suspect">Suspect</option>
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
              <div className="c-avatar" style={{marginLeft:"15px"}}>
                <CButton> <CImg
                  src={plus}
                  className="c-avatar-img"
                  style={{ width: "25px" }}
                  onClick={() => vehiclePlusClick()}
                /></CButton>
              </div>
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
                            placeholder="Enter Vehicle Number"
                            value={inputField.vehicleNumber}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id, e)}
                          />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleNumber">Owner NIC</CLabel>
                          <CInput
                            id="ownerNic"
                            name="ownerNic"
                            placeholder="Enter Owner NIC"
                            value={inputField.ownerNic}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id, e)}
                          />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
                    <CFormGroup> 
                      <CLabel htmlFor="vehicleType">Vehicle Type</CLabel>
                          <CInput
                            id="vehicleType"
                            name="vehicleType"
                            placeholder="Enter Vehicle Type"
                            value={inputField.vehicleType}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleColor">Color</CLabel>
                          <CInput
                            id="vehicleColor"
                            name="vehicleColor"
                            placeholder="Enter Vehicle Color" 
                            value={inputField.vehicleColor}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleStatus">Status</CLabel>
                        <CSelect custom
                            name="vehicleStatus"
                            id="vehicleStatus"
                            value={inputField.vehicleStatus}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
                        >
                        
                        <option value="0">Not selected</option>
                        <option value="victim">Victim Vehicle</option>
                        <option value="suspect">Suspect Vehicle</option>
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
                    <option value={inputFieldsOther.violationType}>{inputFieldsOther.violationType}</option>
                    </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="3">
                <CFormGroup>
                  <CLabel htmlFor="status">Complaint Status</CLabel>
                    <CSelect custom
                      name="status"
                      id="status"
                      onChange={ (e) => handleChangeInputOther(e)}
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
            <CCol xs="8">
              <CFormGroup >
                <CLabel htmlFor="progress">Complaint Progress</CLabel>
                    <CTextarea
                      name="progress"
                      id="progress"
                      rows="7"
                      placeholder="Officer Description..."
                      value={inputFieldsOther.progress}
                      onChange={ (e) => handleChangeInputOther(e)}
                    />
              </CFormGroup>
              </CCol>
            </CRow>

            <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
              <CButton block color="success" onClick={handleSubmit}>Submit</CButton>
            </CCol>
            <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
              <CButton block color="dark" onClick={handleReset}>Reset</CButton>
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
 
 export default Complaint
 
 