import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CFormGroup,
  CRow,
  CLabel,
  CAlert,
  
} from '@coreui/react'
import logodark from "../../../assets/elogo.png";
import CIcon from '@coreui/icons-react'
import cover from "../../../assets/cover.jpg";

import {Formik} from "formik";
import * as Yup from "yup";
import {forgotPassword} from "../../../services/web/userService";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required")
    .label("Email"),
});

const ForgotPassword = () => {

  const [backendErr, setBackendErr] = useState('');
  const [alertType,setAlertType] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {

    try{
      await forgotPassword(values.email);   
      setAlertType('success');
      setBackendErr('Please check the email for instructions to reset your password');
    }catch (e) {
      console.log(e);
      setAlertType('danger');
      setBackendErr(e.response.data);
      setSubmitting(false);
    }
    //console.log(alertType);
  }
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
                          <img className="mb-2 mt-0" src={logodark} height="35" alt="logo"/>
                          </div>

                          <h4 className="font-size-18 mt-4">Reset Password</h4>
                          <p className="text-muted">Reset your password to TVRS.</p>
                          {backendErr && alertType == "success" && <CAlert color="success">{backendErr}</CAlert>}
                          {backendErr&&alertType=="danger"&&<CAlert color="danger">{backendErr}</CAlert>}
                        </div>

                        <div className="p-2 mt-5">
                          <Formik
                            initialValues={{email:''}}
                            validationSchema ={validationSchema}
                            onSubmit={handleSubmit}
                          >
                            {({
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                                touched
                              })=>(
                              <CForm className="form-horizontal"  onSubmit={handleSubmit}>
                                
                                <CFormGroup  className={`border rounded ${touched.email && errors.email ? "mb-0 border-danger" : "border-primary"}`}>
                                  <div className="row m-md-1">
                                    <div className="col" >
                                      <CIcon name="cil-user" size={'xl'} className="mt-3"  />
                                    </div>
                                    <div className="col-10">
                                      <CLabel htmlFor="email" className="mb-0">Email</CLabel>
                                      <CInput
                                        id="email"
                                        name="email"
                                        placeholder="Enter user email"
                                        className="border-0 shadow-none pl-0 ml-0"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        error={errors.email}
                                      />
                                    </div>
                                  </div>
                                </CFormGroup>
                                {touched.email && errors.email &&<p className="text-danger">{errors.email}</p>}


                                <div className="mt-4 text-center">
                                  <CButton
                                    color="primary"
                                    className="w-md waves-effect waves-light"
                                    style={{width:"35%"}}
                                    type="submit"
                                  >
                                    Request
                                  </CButton>
                                </div>

                              </CForm>
                            )}</Formik>
                          
                        </div>

                        <div className="mt-5 text-center">
                        <p>Don't you want to reset the password ? <Link to="/login" className="font-weight-medium text-primary"> Log in </Link> </p>         
                          <p>© 2021, 3rd Year Group Project | TVRS</p>
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
                  
                  backgroundImage:  `url(${cover})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '70vw',
                  height: '100vh'

                }}
                
                >
              </div>

            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}

export default ForgotPassword;
