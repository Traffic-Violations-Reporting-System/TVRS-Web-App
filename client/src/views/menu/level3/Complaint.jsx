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
  CImg, CAlert, CInputGroup, CInputGroupPrepend, CInputGroupText, CInputGroupAppend
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
  const complaintId = parseInt(match.params.id);

  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    { id: uuidv4(), vehicleNumber: '',ownerNic: '', vehicleType: '', vehicleColor: '', vehicleStatus: '', acceptId: complaintId}
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    { id: uuidv4(), nic:'' , contactNo:'' ,ageRange: '', gender: '', skinColor: '', personStatus: '', acceptId: complaintId}
  ]);
  const [inputFieldsOther, setInputFieldsOther] = useState({
    violationType: '', userDescription: '', officerDescription: '', complaintStatus:'', progress: ''
  })
  const [complainer, setComplainer] = useState({full_name:'', nic:'', mphone:''})


  useEffect(() => {
    fetchComplaintData(complaintId);  
  },[]);

  const fetchComplaintData = async (complaintId) => {
    getFullComplaint(complaintId)
      .then((res) => {
        setInputFieldsOther({
          'userDescription': res.data[0].userDescription ? res.data[0].userDescription : "",
          'complaintStatus':  res.data[1].status ? res.data[1].status : "",
          'officerDescription': res.data[2].officerDescription ? res.data[2].officerDescription : "",
          'violationType': res.data[3].violationType,
          'progress': res.data[4].progress ? res.data[4].progress : "" //
        });
        const people = res.data[5].peopleList;
        const vehicles = res.data[6].vehicleList;
        const complainer = res.data[7].mobileUser;

        setInputFieldsPerson(people);
        setInputFieldsVehicle(vehicles);
        setComplainer(complainer)
      })
  };
 
  const vehiclePlusClick = () => {
    setInputFieldsVehicle([...inputFieldsVehicle, { id: uuidv4(), vehicleNumber: '', ownerNic: '', vehicleType: '', vehicleColor: '', vehicleStatus: '', acceptId: complaintId}])
  }
  
  const personPlusClick = () => {
    setInputFieldsPerson([...inputFieldsPerson, { id: uuidv4(), nic:'' ,contactNo: '',ageRange: '', gender: '', skinColor: '', personStatus: '', acceptId: complaintId}]);
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
    const complaint = {
      "complaintId":"",
      "otherDetails":"",
      "peopleList":"",
      "vehicleList":""
    };
    inputFieldsVehicle.forEach(function (v) {
      if (!Number.isInteger(v.id)) v.id = "";
    });
    inputFieldsPerson.forEach(function (p) {
      if (!Number.isInteger(p.id)) p.id = "";
    });
    
    complaint.complaintId = complaintId;
    complaint.otherDetails = inputFieldsOther;
    complaint.peopleList = inputFieldsPerson;
    complaint.vehicleList = inputFieldsVehicle;

    try {
      const result = updateComplaint(complaint);
      if (result) {
        setAlert("Complaint Update Successfull!");
        setSuccess("success");
      } 
      else {
        setAlert("Complaint Update Unsuccessfull!!");
        setSuccess("failed");
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
            <CCol  sm="8">
              <div>
                <ReactVideo
                  style={{height: '100px'}}
                  src="https://www.example.com/url_to_video.mp4"
                  poster="https://www.example.com/poster.png"
                  primaryColor="blue"
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
            <CInput id="comp_name" name="comp_name" value={complainer.full_name} disabled/>
          </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
            <CInputGroupPrepend>
            <CInputGroupText>NIC</CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="comp_nic" name="comp_nic" value={complainer.nic}/>
            </CInputGroup>
          </CFormGroup>
          <CFormGroup>
            <CInputGroup>
            <CInputGroupPrepend>
            <CInputGroupText>Contact No.</CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="comp_contact" name="comp_contact" value={complainer.mphone}/>
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
                      placeholder="Enter NIC Number"
                      value={inputField.nic ? inputField.nic: ""} //
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
                      placeholder="Enter Contact Number"
                      value={inputField.contactNo ? inputField.contactNo : ""}
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
                  value={inputField.ageRange ? inputField.ageRange : 0}
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
                  value={inputField.gender ? inputField.gender : 0}
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
                  value={inputField.skinColor ? inputField.skinColor : 0}
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
                  value={inputField.personStatus ? inputField.personStatus : 0}
                  onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                >
                <option value="0">Not selected</option>
                <option value="victim">Victim</option>
                <option value="suspect">Suspect</option>
                <option value="removed">Removed</option>
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
                            value={inputField.vehicleNumber ? inputField.vehicleNumber : ""}
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
                            value={inputField.ownerNic ? inputField.ownerNic : ""}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id, e)}
                          />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="2">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleType">Vehicle Type</CLabel>
                      <CSelect custom
                               name="vehicleType"
                               id="vehicleType"
                               onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
                      >
                        <option value="0">Not selected</option>
                        <option value="A1">A1</option>
                        <option value="A">A</option>
                        <option value="B1">B1</option>
                        <option value="B">B</option>
                        <option value="C1">C1</option>
                        <option value="C">C</option>
                        <option value="CE">CE</option>
                        <option value="D">D</option>
                        <option value="D1">D1</option>
                        <option value="DE">DE</option>
                        <option value="G1">G1</option>
                        <option value="G">G</option>
                        <option value="J">J</option>
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
                            value={inputField.vehicleStatus ? inputField.vehicleStatus: 0}
                            onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
                        >
                        <option value="victim">Victim Vehicle</option>
                        <option value="suspect">Suspect Vehicle</option>
                        <option value="removed">Removed Vehicle</option>
                        <option value="0">Not selected</option>
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
                      name="complaintStatus"
                      id="complaintStatus"
                      value={inputFieldsOther.complaintStatus}
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
 
 