import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CLabel,
  CProgress,
  CFormGroup, CInput,

} from '@coreui/react';
import React, {useEffect, useState} from 'react';
import { ReactVideo } from "reactjs-media";
import {getComplainAction} from "../../../services/web/complainService";



const ComplaintsDetails = (props) => {

  const [inputFieldsVehicle, setInputFieldsVehicle] = useState([
    //{ id: '1', vehicleNumber: '1', vehicleType: '1', vehicleColor: '1', vehicleStatus: '1'},
    //{ id: '2', vehicleNumber: '1', vehicleType: '1', vehicleColor: '1', vehicleStatus: '1'}
  ]);
  const [inputFieldsPerson, setInputFieldsPerson] = useState([
    // { id: '1', ageRange: 'w', gender: '', skinColor: '', personStatus: '' },
    // { id: '2', ageRange: 'w', gender: '', skinColor: '', personStatus: '' }
  ]);


  const [complainDetails, setComplain] = useState({});
  const [complainStatus, setStatus] = useState('');
  const [LastUpdateDate, setLastUpdateDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [peopleList, setPeopleList] = useState();
  const [vehicleList, setVehicleList] = useState();


  useEffect (() => {
    const complainId = props.match.params.id;
    getComplainAction(complainId)
      .then(response => {
        setLoading(true);
        console.log(response.data);
        if("accept" ===response.data[3].userAction) {
          setComplain(response.data[0]);
          setLastUpdateDate(response.data[1]);
          setStatus(response.data[2]);
          setPeopleList(response.data[0].People);
          setVehicleList(response.data[0].Vehicles);
        };


        setError('');

      })
      .catch(error => {
        setLoading(false);
        setComplain({});
        setError('something went wrong');
        console.log(complainDetails);
      })
  },[]);

  const  selectAccuracy=(option)=>{
    switch(option) {
      case "Low":
        return 15;
        break;
      case "Low Medium":
        return 30;
        break;
      case "Medium":
        return 50;
        break;
      case "Medium High":
        return 75;
        break;
      case "High":
        return 100;
        break;
      default:
        return 10;
    }
  };

  return (
    <>
      {loading ?
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
            <div className="row mt-4">

            </div>

            <CRow className="m-2">
              <p></p>
              <div className="bd-example">
                <dl className="row">

                  <dt className="col-sm-3">Complaint Accuracy</dt>
                  <dd className="col-sm-9">
                    <CProgress value={selectAccuracy(complainDetails.ComplaintAccuracy)} showValue className="mb-3"/>
                  </dd>

                  <dt className="col-sm-3">Status</dt>
                  <dd className="col-sm-9"><p style={{paddingLeft:"40%",backgroundColor:"yellow"}}>
                    {complainStatus.status}
                  </p></dd>

                  <dt className="col-sm-3">Last Action Date</dt>
                  <dd className="col-sm-9">{LastUpdateDate.updateDate}</dd>

                  <dt className="col-sm-3 text-truncate">Violation Type</dt>
                  <dd className="col-sm-9">{complainDetails.violationType}</dd>

                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">
                    <p>{complainDetails.description}</p>
                  </dd>

                </dl>
              </div>
            </CRow>


            {vehicleList ? vehicleList.map((inputField) => (
             <>
                 <p className="text-truncate" style={{marginTop:"10px",marginBottom:"2px"}}><b>Related Vehicles</b></p>
                 <CRow style={{marginBottom:"0"}}>
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
               <div key={inputField.id} style={{marginTop:"5px"}}>
                 <CRow>
                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.vehicleNumber}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.vehicleType}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.vehicleColor}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.vehicleStatus}</div>
                   </CCol>
                 </CRow>
               </div>
             </>

            )):null}


            { peopleList ? peopleList.map((inputField) => (
             <>
               <p className="text-truncate" style={{marginTop:"10px",marginBottom:"2px"}}><b>Related People</b></p>
               <CRow style={{marginBottom:"0"}}>
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
               <div key={inputField.id} style={{marginTop:"3px"}}>
                 <CRow>
                   <CCol xs="3" >
                     <div style={{height:'100%', backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.ageRange}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.gender}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.skinColor}</div>
                   </CCol>

                   <CCol xs="3">
                     <div style={{backgroundColor: '#D1D1D1',padding:'5px',borderRadius:'5px'}}>{inputField.personStatus}</div>
                   </CCol>
                 </CRow>
               </div>
             </>

            )):null

            }

          </CCardBody>
        </CCard>:
        "Not allow"
      }



    </>
  )
}

export default ComplaintsDetails
