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
  CFormGroup,
  CRow,
  CLabel, CDropdownItem,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  return (
    <>
      <div className="home-btn d-none d-sm-block">
        <Link to="/"><i className="mdi mdi-home-variant h2 text-white"></i></Link>
      </div>

      <div>
        <CContainer fluid className="p-0" style={{backgroundColor: 'white'}}>
          <CRow className="no-gutters">
            <CCol lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <CRow className="justify-content-center">
                    <CCol lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="/" className="logo"></Link>
                          </div>

                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">Sign in to continue to TVRS.</p>
                        </div>



                        <div className="p-2 mt-5">
                          <CForm className="form-horizontal" >


                            <CFormGroup className="border border-primary rounded">
                              <div className="row m-md-1">
                                <div className="col" >
                                  <CIcon name="cil-user" size={'xl'} className="mt-3"  />
                                </div>
                                <div className="col-10">
                                  <CLabel htmlFor="email" className="mb-0">Username</CLabel>
                                  <CInput id="email" placeholder="Enter username" className="border-0 shadow-none pl-0 ml-0"   />
                                </div>
                              </div>
                            </CFormGroup>

                            <CFormGroup className="border border-primary rounded">
                              <div className="row m-md-1">
                                <div className="col" >
                                  <CIcon name="cil-lock-locked" size={'xl'} className="mt-3"  />
                                </div>
                                <div className="col-10">
                                  <CLabel htmlFor="password" className="mb-0">Password</CLabel>
                                  <CInput  id="password" placeholder="Enter password"  className="border-0 shadow-none pl-0 ml-0"  />
                                </div>
                              </div>
                            </CFormGroup>



                            <div className="custom-control custom-checkbox mt-2">
                              <CInput type="checkbox" className="custom-control-input" id="customControlInline"/>
                              <CLabel className="custom-control-label" htmlFor="customControlInline">Remember me</CLabel>
                            </div>

                            <div className="mt-4 text-center">
                              <CButton color="primary" className="w-md waves-effect waves-light" style={{width:"35%"}} type="submit">Log In</CButton>
                            </div>

                            <div className="mt-4 text-center">
                              <div><i className="mdi mdi-lock mr-1"></i> Forgot your password?</div>
                            </div>
                          </CForm>
                        </div>

                        <div className="mt-5 text-center">

                          <p>© 2021 UCSC G-47 with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p>
                        </div>
                      </div>

                    </CCol>
                  </CRow>
                </div>
              </div>
            </CCol>
            <CCol lg={8}>

              <div style={
                {
                  backgroundColor:'yellow',
                  backgroundImage:"url('https://wallpaperplay.com/walls/full/2/d/8/13598.jpg')",
                  height: '100%',

                }}>
                ghjju
              </div>

            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}

export default Login
