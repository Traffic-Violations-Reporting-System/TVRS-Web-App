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
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader className="font-weight-bold">
                User Registration
                <div className="card-header-actions">
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>

                    <CFormGroup>
                      <CRow>
                        <CCol lg={2}>
                          <CLabel htmlFor="fn">First Name</CLabel>
                        </CCol>
                        <CCol lg={10}>
                          <CInput id="fn" placeholder="Enter first name" />
                        </CCol>
                      </CRow>
                    </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="ln">Last Name</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CInput id="ln" placeholder="Enter last name" />
                      </CCol>
                    </CRow>
                  </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="email">Email</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CInput id="email" placeholder="Enter email address" />
                      </CCol>
                    </CRow>


                  </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="nic">NIC</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CInput id="nic" placeholder="Enter NIC number" />
                      </CCol>
                    </CRow>
                  </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="sid">Service ID</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CInput id="sid" placeholder="Enter Service ID" />
                      </CCol>
                    </CRow>


                  </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="sid">User Level</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CSelect aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CFormGroup>

                  <CFormGroup>
                    <CRow>
                      <CCol lg={2}>
                        <CLabel htmlFor="country">Region</CLabel>
                      </CCol>
                      <CCol lg={10}>
                        <CInput id="country" placeholder="Enter region" />
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CCardBody>

                <CCardFooter>
                  <CButton type="submit" style={{width:"15%"}}  color="primary" >Submit</CButton>
                </CCardFooter>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
