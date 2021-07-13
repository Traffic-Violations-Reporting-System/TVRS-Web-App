import React, {useEffect, useState} from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm, CInput,
  CRow,

} from '@coreui/react'

import { DocsLink } from 'src/reusable'
import {Formik} from "formik";
import AppInput from "../../../common/input.common";
import AppSelect from "../../../common/select.common";
import {getUserRoles,register} from "../../../services/web/userService";
import * as Yup from "yup";

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const validationSchema = Yup.object().shape({

  first_name: Yup.string()
    .required("First name is required")
    .min(3)
    .max(50)
    .label("First name"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(3)
    .max(50)
    .label("Last name"),
  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required")
    .label("Email"),
  service_id: Yup.string()
    .required("service id required")
    .label("service id"),
  nic: Yup.string()
    .required("nic is required")
    .matches('^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$',"enter valid NIC number")
    .label("Nic"),
  role_id: Yup.string()
    .required("Role is required")
    .label("role"),

});
const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [useRoles, setUserRoles] = useState([]);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    const { data: roles } = await getUserRoles();
    console.log(roles);
    setUserRoles(roles);
  };

  const handleSubmit=async (values, { setSubmitting, resetForm })=> {

    setAlert('');
    try {
      const result = await register(values);
      if(result.status==200) setSuccess(result.data);
      else setSuccess('')

      setAlert(result.data);
      resetForm({})
    } catch (e) {
      setAlert(e.response.data);
      setSubmitting(false);
      console.log(e.response.data);
    }
  };
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
              {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}
              <CCollapse show={collapsed} timeout={1000}>


                  <Formik
                    initialValues={{
                      first_name:'',
                      last_name:'',
                      email:'',
                      nic:'',
                      service_id:'',
                      role_id:'',

                    }}
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
                        <CCardBody>
                        <AppInput
                          type="text"
                          name="first_name"
                          label="First Name"
                          placeholder="Enter First Name"
                          value={values.first_name}
                          onChange={handleChange("first_name")}
                          visible={touched.first_name}
                          error={errors.first_name}
                        />
                        <AppInput
                          type="text"
                          name="last_name"
                          label="Last Name"
                          placeholder="Enter Last Name"
                          value={values.last_name}
                          onChange={handleChange("last_name")}
                          visible={touched.last_name}
                          error={errors.last_name}
                        />

                        <AppInput
                          type="email"
                          name="email"
                          label="Email Address"
                          placeholder="Enter Enter Address"
                          value={values.email}
                          onChange={handleChange("email")}
                          visible={touched.email}
                          error={errors.email}
                        />



                        <AppInput
                          type="text"
                          name="nic"
                          label="NIC Number"
                          placeholder="Enter NIC number"
                          value={values.nic}
                          onChange={handleChange("nic")}
                          visible={touched.nic}
                          error={errors.nic}
                        />

                        <AppInput
                          type="text"
                          name="service_id"
                          label="Service ID"
                          placeholder="Enter Service ID"
                          value={values.service_id}
                          onChange={handleChange("service_id")}
                          visible={touched.service_id}
                          error={errors.service_id}
                        />

                        <AppSelect
                          name="role_id"
                          label="Select Role"
                          options={useRoles}
                          onChange={handleChange("role_id")}
                          value={values.role_id}
                          visible={touched.role_id}
                          error={errors.role_id}
                        />

                      </CCardBody>
                        <CCardFooter>
                           <CButton
                             type="submit"
                             style={{width:"105",height:"38"}}
                             color="primary"
                             disabled={!(dirty && isValid)}
                           >Submit</CButton>

                        </CCardFooter>
                      </CForm>
                    )}</Formik>





              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms