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
  CLabel, CAlert, 

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {Formik} from "formik";
import * as Yup from "yup";
import { setPassword } from "../../../services/web/userService";
import logodark from "../../../assets/elogo.png";
import cover from "../../../assets/cover.jpg";


const validationSchema = Yup.object().shape({
  newpassword: Yup.string()
    .required("Password is required")
    .min(8)
    .label("New Password"),
  confirmpassword: Yup.string()
    .required("Password is required")
    .min(8)
    .label("Confirm Password")
    .test("password-match", "Password fields fields must be equal", function (value) {
      return this.parent.newpassword === value;
    }),
});

const SetPassword = (props) => {
  const url =window.location.origin+'/login';
  const [backendErrStatus,setBackendErrStatus] =useState(false);
  const [backendErr, setBackendErr] = useState('');

  //for get url parameters
  function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
                
      if (pair[0] == variable) {
        return pair[1];
      }
    }
     return(false);
  }
  const email = getQueryVariable('email');
  // console.log(email);
  const token = getQueryVariable('token');
  // console.log(token);
  if (!email && !token) window.location = url;
  

  const handleSubmit = async (values, { setSubmitting})=>{
    try{
      await setPassword(values.newpassword,values.confirmpassword,token,email);
      setBackendErrStatus(false);
      setBackendErr('');
      window.location =url
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

                          <h4 className="font-size-18 mt-4">Set New Password</h4>
                          <p className="text-muted">Set your new password to TVRS.</p>
                          {backendErr&&<CAlert color="danger">{backendErr}</CAlert>}
                        </div>



                        <div className="p-2 mt-5">


                          <Formik
                            initialValues={{newpassword:'',confirmpassword:''}}
                            validationSchema ={validationSchema}
                            onSubmit={handleSubmit}
                          >
                            {({
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                                touched

                            }) => (
                              
                              <CForm className="form-horizontal" onSubmit={handleSubmit}>
                                
                                <CFormGroup  className={`border rounded ${touched.newpassword && errors.newpassword ? "mb-0 border-danger" : "border-primary"}`}>
                                  <div className="row m-md-1">
                                    <div className="col" >
                                      <CIcon name="cil-lock-locked" size={'xl'} className="mt-3"  />
                                    </div>
                                    <div className="col-10">
                                      <CLabel htmlFor="newpassword" className="mb-0">New Password</CLabel>
                                      <CInput
                                        id="newpassword"
                                        placeholder="Enter new password"
                                        className="border-0 shadow-none pl-0 ml-0"
                                        name="newpassword"
                                        type="password"
                                        value={values.newpassword}
                                        onChange={handleChange("newpassword")}
                                        error={errors.newpassword}
                                      />
                                    </div>
                                  </div>
                                </CFormGroup>
                                {touched.newpassword && errors.newpassword &&<p className="text-danger">{errors.newpassword}</p>}


                                <CFormGroup  className={`border rounded ${touched.confirmpassword && errors.confirmpassword ? "mb-0 border-danger" : "border-primary"}`}>
                                  <div className="row m-md-1">
                                    <div className="col" >
                                      <CIcon name="cil-lock-locked" size={'xl'} className="mt-3"  />
                                    </div>
                                    <div className="col-10">
                                      <CLabel htmlFor="password" className="mb-0">Confirm Password</CLabel>
                                      <CInput
                                        id="confirmpassword"
                                        type="password"
                                        placeholder="Enter password"
                                        className="border-0 shadow-none pl-0 ml-0"
                                        name="confirmpassword"
                                        value={values.confirmpassword}
                                        onChange={handleChange("confirmpassword")}
                                        error={errors.confirmpassword}
                                      />
                                    </div>
                                  </div>
                                </CFormGroup>
                                {touched.confirmpassword && errors.confirmpassword &&<p className="text-danger">{errors.confirmpassword}</p>}

                                <div className="mt-4 text-center">
                                  <CButton
                                    color="primary"
                                    className="w-md waves-effect waves-light"
                                    style={{width:"50%"}}
                                    type="submit"
                                  >
                                    Set Password
                                  </CButton>
                                </div>

                              </CForm>
                            )}</Formik>
                          
                        </div>

                        <div className="mt-5 text-center">
                        <p>Back to <Link to="/login" className="font-weight-medium text-primary"> Log in </Link> </p>      
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
                  backgroundColor:'#fff',
                  backgroundImage:`url(${cover})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '70vw',
                  height: '100vh'

                }}>
              </div>

            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}

export default SetPassword
