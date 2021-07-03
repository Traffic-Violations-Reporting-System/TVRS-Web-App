import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm, CFormControl, CFormFeedback, CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CInvalidFeedback, CLabel,
  CRow, CValidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Formik} from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(8)
    .label("Password"),
});


const Login = () => {
  const url =window.location.origin+'/'+'dashboard';

  const handleSubmit=(values)=>{

    console.log(values);
    // window.location =url
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>

                  <Formik
                    initialValues={{email:'',password:''}}
                    validationSchema ={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        touched,
                        dirty,
                        isValid

                      })=>(
                      <>
                        <CForm onSubmit={handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>

                          <CFormGroup>
                            <CInputGroup className="mb-4">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                name="email"
                                className={touched.email ?  errors.email? "is-invalid":"is-valid":null}
                                type="text"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange("email")}
                                error={errors.email}
                              />
                              {touched.email && errors.email &&<CInvalidFeedback>{errors.email}</CInvalidFeedback>}
                            </CInputGroup>
                          </CFormGroup>

                          <CFormGroup>
                            <CInputGroup className="mb-4">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                className={touched.password ?  errors.password? "is-invalid":"is-valid":null}
                                type="text"
                                name="password"
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange("password")}
                                error={errors.password}
                              />
                              {touched.password && errors.password &&<CInvalidFeedback>{errors.password}</CInvalidFeedback>}
                            </CInputGroup>
                          </CFormGroup>


                          <CRow>
                            <CCol xs="6">
                              <CButton type="submit" color="primary" className="px-4" disabled={!(dirty && isValid)}>Login</CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton color="link" className="px-0">Forgot password?</CButton>
                            </CCol>
                          </CRow>
                        </CForm>
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
