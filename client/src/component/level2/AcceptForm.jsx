import React,{useState,useContext} from 'react'
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
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../App';

import {InsertAccept} from "../services/web/complainService";
import { useHistory } from 'react-router-dom';


const AcceptForm = ({complainId,parentSetSimilarLoading,parentSetVideoRefArr}) => {
  const history = useHistory();
  const {currentUserId,setAcceptObject} = useContext(UserContext);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');

  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    { id: uuidv4(), vehicleNumber: '', vehicleType: '', vehicleColor: '', vehicleStatus: ''}
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    { id: uuidv4(), ageRange: '', gender: '', skinColor: '', personStatus: '' }
  ]);
  const [inputFieldsOther, setInputFieldsOther] = useState({
    violationType: '', ComplaintAccuracy: '', description: '',ComplaintId:'',UserId:''
  })
//************************************************************************
  const [violationTypeErr, setViolationTypeErr] = useState({});
  const [complaintAccuracyErr, setComplaintAccuracyErr] = useState({});
  const [descriptionErr, setDescriptionErr] = useState({});
  const [vehiclesError, setVehicleError] = useState({});
  const [peopleError, setPersonError] = useState({});

  const formValidations =()=>{
    const vehicleError ={};
    const personError ={};
    const violationErr={};
    const complaintAccErr={};
    const descriptionErr={};
    let isValid =true;
    let vArray = inputFieldsVehicle;
    let pArray = inputFieldsPerson;
    let dv = false;
    let dp = false;
    vArray.map( el=>{
      delete el["id"]
      if(!Object.values(el).some(v => v) ){

        dv=true;
      }
    });

    pArray.map( el=>{
      delete el["id"]
      if(!Object.values(el).some(v => v) ){

        dp=true;
      }
    });
    if(dv && dp){
      isValid=false;
      vehicleError.notvalid = 'At least one vehicle or person details should added to become a valid complaint';
      personError.notvalid = 'At least one vehicle or person details should added to become a valid complaint';
    }

    if(inputFieldsOther.violationType===''){
      violationErr.notSelected = 'Violation type is required';
      isValid=false;
    }
    if(inputFieldsOther.ComplaintAccuracy===''){
      complaintAccErr.notSelected = 'Complaint accuracy is required';
      isValid=false;
    }
    if(inputFieldsOther.description === ""){
      descriptionErr.short ='Description is required';
      isValid=false;
    }
    else if(inputFieldsOther.description.trim().length<5){
      descriptionErr.short ='Description is too short';
      isValid=false;
    }
    setVehicleError(vehicleError);
    setPersonError(personError);
    setViolationTypeErr(violationErr);
    setComplaintAccuracyErr(complaintAccErr);
    setDescriptionErr(descriptionErr);
    return isValid;

  }
// //**************************************************************************

//   const findSimilar =async () => {

//     const isValid =formValidations();
//     if(!isValid) return;

//     try {

//       const findObj={"vehicles":""};
//       findObj.vehicles=inputFieldsVehicle;
//       const result = await findSimilarComplaint(findObj);
//       if(result.status==200){
//         const jsonObj={
//           "accepts":"",
//           "vehicles":"",
//           "people":""
//         };

//         inputFieldsOther.ComplaintId=complainId;
//         inputFieldsOther.UserId=currentUserId;
//         inputFieldsVehicle.forEach(function(v){ delete v.id });
//         inputFieldsPerson.forEach(function(v){ delete v.id });

//         findObj.accepts=inputFieldsOther;
//         findObj.vehicles=inputFieldsVehicle;
//         findObj.people=inputFieldsPerson;


//         setAcceptObject(findObj);
//         parentSetVideoRefArr(result.data);
//         parentSetSimilarLoading(true);
//       }
//     }catch (e) {

//       if(e.response.status==400){
//         await handleSubmits();
//       }


//     }
//   }
  const handleSubmits = async (e) => {

    const jsonObj={
      "accepts":"",
      "vehicles":"",
      "people":""

    };

    inputFieldsOther.ComplaintId=complainId;
    inputFieldsOther.UserId=currentUserId;
    inputFieldsVehicle.forEach(function(v){ delete v.id });
    inputFieldsPerson.forEach(function(v){ delete v.id });

    jsonObj.accepts=inputFieldsOther;
    jsonObj.vehicles=inputFieldsVehicle;
    jsonObj.people=inputFieldsPerson;

    try {
      const result = await InsertAccept(jsonObj);
      console.log(result);
      if(result.status==200) setSuccess(result.data);
      else setSuccess('')
      setAlert(result.data);
      history.push(`/level2/newInquiryList`);
    }catch (e) {
      console.log("error ",e.response.data);
      if(e.response.status==400){
        setAlert(e.response.data);
      }

    }
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
            {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}
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

                {inputFieldsVehicle.map((inputField,index) => (
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
                            onChange={ (e) => handleChangeInputVehicle(inputField.id, e)}
                          />
                    </CFormGroup>
                  </CCol>

                  <CCol xs="3">
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

                  <CCol xs="3">
                    <CFormGroup>
                      <CLabel htmlFor="vehicleColor">Color</CLabel>
                          <CInput
                            id="vehicleColor"
                            name="vehicleColor"
                            placeholder="Enter Vehicle Color" value={inputField.vehicleColor}
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
                            onChange={ (e) => handleChangeInputVehicle(inputField.id,e)}
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
                {Object.keys(vehiclesError).map((key)=>{
                  return  <p className="text-danger">{vehiclesError[key]}</p>
                })}

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
                <div key={inputField.id}>
                  <CRow>

                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="ageRange">Age Range</CLabel>

                      <CSelect custom
                               name="ageRange"
                               id="ageRange"
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

                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="gender">Gender</CLabel>
                      <CSelect custom
                               name="gender"
                               id="gender"
                               onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                      >
                      <option value="0">Not selected</option>
                      <option value="male">Male</option>
                      <option value="female">female</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="skinColor">Skin Color</CLabel>
                      <CSelect custom
                               name="skinColor"
                               id="skinColor"
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

                <CCol xs="3">
                <CFormGroup>
                    <CLabel htmlFor="personStatus">Status</CLabel>
                      <CSelect custom
                               name="personStatus"
                               id="personStatus"
                               onChange={ (e) => handleChangeInputPerson(inputField.id,e)}
                      >
                      <option value="0">Not selected</option>
                      <option value="victim">Victim</option>
                      <option value="suspect">Suspect</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>



              </CRow>
                </div>
              ))}
                {Object.keys(peopleError).map((key,index)=>{
                  return  <p key={index} className="text-danger">{peopleError[key]}</p>
                })}
              <hr></hr>
                <p className="lead" style={{marginTop:"4px"}}><b>Other Details</b></p>
              <CRow>


                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="violationType">Violation Type</CLabel>
                      <CSelect custom
                               name="violationType"
                               id="violationType"
                               onChange={ (e) => handleChangeInputOther(e)}
                      >
                      <option value="">Not selected</option>
                      <option value="1">Accident</option>
                      <option value="2">Reckless Driving</option>
                    </CSelect>
                  </CFormGroup>
                  {Object.keys(violationTypeErr).map((key,index)=>{
                    return  <p key={index} className="text-danger">{violationTypeErr[key]}</p>
                  })}
                </CCol>


                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="ComplaintAccuracy">Complaint Accuracy</CLabel>
                      <CSelect custom
                               name="ComplaintAccuracy"
                               id="ComplaintAccuracy"
                               onChange={ (e) => handleChangeInputOther(e)}
                      >
                      <option value="">Not selected</option>
                      <option value="Low">Low</option>
                      <option value="Low Medium">Low Medium</option>
                      <option value="Low Medium">Medium</option>
                      <option value="Medium High">Medium High</option>
                      <option value="High">High</option>
                    </CSelect>
                  </CFormGroup>
                  {Object.keys(complaintAccuracyErr).map((key)=>{
                    return  <p className="text-danger">{complaintAccuracyErr[key]}</p>
                  })}
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
                {Object.keys(descriptionErr).map((key)=>{
                  return  <p className="text-danger">{descriptionErr[key]}</p>
                })}


              </CCol>

              </CRow>

              <CCol col="2" sm="2" md="2" xl="2" style={{float:"right"}} >
                  <CButton block color="primary" onClick={handleSubmits}>Accept</CButton>

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


