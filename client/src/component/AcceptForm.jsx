import React,{useState} from 'react'
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
  CImg
} from '@coreui/react'
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import { v4 as uuidv4 } from 'uuid';


const AcceptForm = () => {

 
  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    { id: uuidv4(), vehicleNumber: '', vehicleType: '', vehicleColor: '', vehicleStatus: '' }
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    { id: uuidv4(), ageRange: '', gender: '', skinColor: '', personStatus: '' }
  ]);
  const [inputFieldsOther, setInputFieldsOther] = useState({
    policeRegion: '', violationType: '', ComplaintAccuracy: '', description: '' 
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleClear = (e) => {
    e.preventDefault();
    //
  };
  
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
    const newInputFields = inputFieldsVehicle.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFieldsPerson(newInputFields);
  }

  const handleChangeInputOther = (id, event) => {
    const newInputFields = inputFieldsPerson.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFieldsPerson(newInputFields);
  }

 

  const vehiclePlusClick = () => {
    setInputFieldsVehicle([...inputFieldsVehicle, { id: uuidv4(), vehicleNumber: '', vehicleType: '', vehicleColor: '', vehicleStatus: '' }])
  }
  const vehicleMinusClick = (id) => {
    const values  = [...inputFieldsVehicle];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFieldsVehicle(values);
  }
  
  const personPlusClick = () => {
    setInputFieldsPerson([...inputFieldsPerson, { id: uuidv4(), ageRange: '', gender: '', skinColor: '', personStatus: '' }]);
  }
  const personMinusClick = (id) => {
    const values = [...inputFieldsPerson];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFieldsPerson(values);
  } 

  

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>

            <CCardHeader>
            <h5>Accept Complaint</h5>
              
            </CCardHeader>

            <CCardBody>
              <CForm>
              <CRow> 

                <p className="lead " style={{marginLeft:"15px",marginTop:"4px"}}><b>Related Vehicles</b></p>
                <div className="c-avatar" style={{marginLeft:"15px"}}>
                  <CButton> <CImg
                    src={plus}
                    className="c-avatar-img"
                    style={{ width: "25px" }}
                    onClick={() => vehiclePlusClick()}
                  /></CButton>
                </div>
                <div className="c-avatar" style={{marginLeft:"15px"}}>
                  <CButton><CImg
                    src={minus}
                    className="c-avatar-img"
                    style={{ width: "25px" }}
                    onClick={() => vehicleMinusClick()}
                  /></CButton>
                </div>
                
              </CRow>

                {inputFieldsVehicle.map((inputField, index) => (
                <div key={inputField.id}>
                <CRow>
                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleNumber">Vehicle Number</CLabel>
                          <CInput
                            id="vehicleNumber"
                            name="vehicleNumber"
                            placeholder="Enter Vehicle Number"
                            value={inputField.vehicleNumber}
                            onChange={ (e) => handleChangeInputVehicle(index,e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleType">Vehicle Type</CLabel>
                          <CInput
                            id="vehicleType"
                            name="vehicleType"
                            placeholder="Enter Vehicle Type"
                            value={inputField.vehicleType}
                            onChange={ (e) => handleChangeInputVehicle(index,e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleColor">Color</CLabel>
                          <CInput
                            id="vehicleColor"
                            name="vehicleColor"
                            placeholder="Enter Vehicle Color" value={inputField.vehicleColor}
                            onChange={ (e) => handleChangeInputVehicle(index,e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleStatus">Status</CLabel>
                        <CSelect custom
                          name="vehicleStatus"
                            id="vehicleStatus"
                            onChange={ (e) => handleChangeInputVehicle(index,e)}
                        >
                        <option value="0">Not selected</option>
                        <option value="victim">Victim Vehicle</option>
                        <option value="suspect">Suspect Vehicle</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  </CRow>
                </div>

                ))}
                
              <hr></hr>

              <CRow>

                <p className="lead" style={{marginLeft:"15px",marginTop:"4px"}}><b>Related People</b></p>
                <div className="c-avatar" style={{marginLeft:"25px"}}>
                  <CButton><CImg
                    src={plus}
                    className="c-avatar-img"
                    style={{ width: "25px" }}
                    onClick={() => personPlusClick()}
                  /></CButton>
                </div>
                <div className="c-avatar" style={{marginLeft:"15px"}}>
                  <CButton><CImg
                    src={minus}
                    className="c-avatar-img"
                    style={{ width: "25px" }}
                    onClick={() => personMinusClick()}
                  /></CButton>
                </div>
              </CRow>

              {inputFieldsPerson.map((inputField, index) => (
                <div key={index}>
                  <CRow>
                
                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="ageRange">Age Range</CLabel>
                    <CSelect custom name="ageRange" id="ageRange">
                      <option value="0">Not selected</option>
                      <option value="1">Below 18</option>
                      <option value="2">18 - 30</option>
                      <option value="3">30-50</option>
                      <option value="4">50-70</option>
                      <option value="6">Above 70</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="gender">Gender</CLabel>
                    <CSelect custom name="gender" id="gender">
                      <option value="0">Not selected</option>
                      <option value="male">Male</option>
                      <option value="female">female</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="skinColor">Skin Color</CLabel>
                    <CSelect custom name="skinColor" id="skinColor">
                      <option value="0">Not selected</option>
                      <option value="fair">Fair</option>
                      <option value="medium">Medium</option>
                      <option value="olive">Olive</option>
                      <option value="brown">Brown</option>
                      <option value="black">Black</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="personStatus">Status</CLabel>
                    <CSelect custom name="personStatus" id="personStatus">
                      <option value="0">Not selected</option>
                      <option value="victim">Victim</option>
                      <option value="suspect">Suspect</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                

              </CRow>
                </div>
              ))}    
              
              <hr></hr>

              <h6><b>Other Details</b></h6>
              <CRow>

                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="policeRegion">Police Region</CLabel>
                    <CSelect custom name="policeRegion" id="policeRegion">
                      <option value="0">Not selected</option>
                      <option value="1">Matara</option>
                      <option value="2">Galle</option>
                      <option value="3">Hambanthota</option>
                      <option value="4">Hakmana</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="violationType">Violation Type</CLabel>
                    <CSelect custom name="violationType" id="violationType" >
                      <option value="0">Not selected</option>
                      <option value="1">Accident</option>
                      <option value="2">Reckless Driving</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="policeRegion">Complaint Accuracy</CLabel>
                    <CSelect custom name="policeRegion" id="policeRegion">
                      <option value="0">Not selected</option>
                      <option value="1">Low</option>
                      <option value="2">Low Medium</option>
                      <option value="3">Medium</option>
                      <option value="3">Medium High</option>
                      <option value="3">High</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

              </CRow>

              <CRow>

              <CCol xs="6">     
              <CFormGroup >
                <CLabel htmlFor="description">Description</CLabel>
                    <CTextarea 
                      name="description" 
                      id="description" 
                      rows="4"
                      placeholder="Description..."
                      value={inputFieldsOther.description}
                      onChange={ (e) => handleChangeInputOther(e)} 
                    />
              </CFormGroup>
              </CCol> 
                
              </CRow>

              <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
                  <CButton block color="info" onClick={handleSubmit}>Submit</CButton>
              </CCol>
              <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
                  <CButton block color="dark" onClick={handleClear}>Clear</CButton>
              </CCol>
              
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>  
  )
}

export default AcceptForm


