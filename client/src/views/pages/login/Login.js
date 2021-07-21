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
import CIcon from '@coreui/icons-react'
import logodark from "../../../assets/elogo.png";
import cover from "../../../assets/cover.jpg";

import {Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../../services/web/userService";

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
  const url =window.location.origin+'/auth'+'/dashboard';
  const [backendErrStatus,setBackendErrStatus] =useState(false);
  const [backendErr,setBackendErr] =useState('');

  const handleSubmit=async (values, { setSubmitting})=>{
    try{
      const role= await login(values.email,values.password);
      setBackendErrStatus(false);
      setBackendErr('');
      const url =window.location.origin+'/'+`${role}`+'/dashboard';
      window.location =url;
     
    }catch (e) {
      console.log(e)
      setBackendErrStatus(true);
      setBackendErr(e.response.data);
      setSubmitting(false);
    }

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

                          <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                          <p className="text-muted">Sign in to continue</p>
                          {backendErr&&<CAlert color="danger">{backendErr}</CAlert>}
                        </div>



                        <div className="p-2 mt-5">


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
                              <CForm className="form-horizontal"  onSubmit={handleSubmit}>
                                <CFormGroup  className={`border rounded ${touched.email && errors.email ? "mb-0 border-danger" : "border-primary"}`}>
                                  <div className="row m-md-1">
                                    <div className="col" >
                                      <CIcon name="cil-user" size={'xl'} className="mt-3"  />
                                    </div>
                                    <div className="col-10">
                                      <CLabel htmlFor="username" className="mb-0">Email</CLabel>
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


                                <CFormGroup  className={`border rounded ${touched.password && errors.password ? "mb-0 border-danger" : "border-primary"}`}>
                                  <div className="row m-md-1">
                                    <div className="col" >
                                      <CIcon name="cil-lock-locked" size={'xl'} className="mt-3"  />
                                    </div>
                                    <div className="col-10">
                                      <CLabel htmlFor="password" className="mb-0">Password</CLabel>
                                      <CInput
                                        id="password"
                                        placeholder="Enter password"
                                        className="border-0 shadow-none pl-0 ml-0"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        error={errors.password}
                                      />
                                    </div>
                                  </div>
                                </CFormGroup>
                                {touched.password && errors.password &&<p className="text-danger">{errors.password}</p>}


                                <div className="custom-control custom-checkbox mt-2">
                                  <CInput type="checkbox" className="custom-control-input" id="customControlInline"/>
                                  <CLabel className="custom-control-label" htmlFor="customControlInline">Remember me</CLabel>
                                </div>

                                <div className="mt-4 text-center">
                                  <CButton
                                    color="primary"
                                    className="w-md waves-effect waves-light"
                                    style={{width:"35%"}}
                                    type="submit"
                                    // disabled={!(dirty && isValid)}
                                  >
                                    Log In
                                  </CButton>
                                </div>

                                <div className="mt-4 text-center">
                                  <div><Link to="/forgot" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Forgot your password?</Link></div>
                                </div>
                              </CForm>
                            )}</Formik>



                        </div>

                        <div className="mt-5 text-center">

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

export default Login
