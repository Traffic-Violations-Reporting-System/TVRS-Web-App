import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Formik} from 'formik';

const Login = () => {
  const url =window.location.origin+'/'+'dashboard';

  const handleSubmit=(values)=>{
    console.log(window.location.origin+'/'+'dashboard');
    window.location =url
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>

                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>

                  <Formik
                    initialValues={{email:'',password:''}}
                    onSubmit={handleSubmit}
                  >
                    {({
                        values,
                        handleChange,
                        handleSubmit,

                      })=>(
                      <>
                        <form onSubmit={handleSubmit}>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              name="email"
                              value={values.email}
                              onChange={handleChange("email")}
                              placeholder="Username"

                            />
                          </CInputGroup>

                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange("password")}
                              placeholder="Password"

                            />
                          </CInputGroup>

                          <CRow>
                            <CCol xs="6">
                              <CButton
                                color="primary"
                                type="submit"
                                className="px-4"
                              >Login
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton color="link" className="px-0">Forgot password?</CButton>
                            </CCol>
                          </CRow>


                        </form>
                      </>
                    )}
                  </Formik>


                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>

                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
