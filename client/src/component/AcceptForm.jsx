import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const AcceptForm = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12">
          <CCard>

            <CCardHeader>
            <h5>Accept Complaint</h5>
              
            </CCardHeader>

            <CCardBody>

              <h6>Related Vehicles</h6>

              <CRow>
              
                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">Vehicle Number</CLabel>
                    <CInput id="name" placeholder="Enter Vehicle Number" required />
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="vehicleType">Vehicle Type</CLabel>
                    <CInput id="name" placeholder="Enter Vehicle Type" required />
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="vehicleColor">Color</CLabel>
                    <CInput id="name" placeholder="Enter Vehicle Color" required />
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth">
                      <option value="0">Not selected</option>
                      <option value="victim">Victim</option>
                      <option value="suspect">Suspect</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

              </CRow>
              <hr></hr>

              <h6>Related People</h6>

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
                      <option value="male">Male</option>
                      <option value="female">female</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol xs="3">
                  <CFormGroup>
                    <CLabel htmlFor="skinColor">Skin Color</CLabel>
                    <CSelect custom name="skinColor" id="skinColor">
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
                    <CLabel htmlFor="name">Status</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth">
                      <option value="victim">Victim</option>
                      <option value="suspect">Suspect</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>

              </CRow>
              <hr></hr>

              <h6>Other Details</h6>
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
                <CLabel htmlFor="policeRegion">Description</CLabel>
                  
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="4"
                      placeholder="Description..." 
                    />

                  </CFormGroup>
              </CCol>

              
                
              </CRow>
                <CCol col="2" sm="2" md="2" xl="2" style={{float:"right",marginRight:"5%"}} >
                  <CButton block color="info">Submit</CButton>
                </CCol>
              <CRow>

              </CRow>

              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>  
  )
}

export default AcceptForm


