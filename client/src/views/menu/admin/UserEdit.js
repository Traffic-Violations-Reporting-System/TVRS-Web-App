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
import {getUserRoles, getUser, updateUser, getPoliceDivision} from "../../../services/web/userService";
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
  role_id: Yup.string()
    .required("Role is required")
    .label("role"),

});
const BasicForms = (props) => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [useRoles, setUserRoles] = useState([]);
  const [divisionData, setDivison] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [initialValues, setInitialValues] = useState({
    first_name:'',
    last_name:'',
    email:'',
    role_id:'',
    region_id:'',

  });
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUser(props);
    fetchDivision(props);
  }, []);

  const fetchUser = async (props) => {
    const { data: roles } = await getUserRoles();
    setUserRoles(roles);

    const userId = props.match.params.id;
    setSelectedUser(userId)
    const { data: user } = await getUser(userId);


      const newMessageObj = {
        first_name: user.first_name,
        last_name:user.last_name,
        email:user.email,
        role_id:user.role_id,
        region_id:user.region_id,
    };
      setInitialValues(newMessageObj);
    //  setInitialValues({user});
      console.log(initialValues);
  };

  const fetchDivision = async () => {
    const { data: division } = await getPoliceDivision();
    setDivison(division);

  };
  const handleSubmit=async (values, { setSubmitting, resetForm })=> {

    console.log(values);
    console.log(selectedUser);

    setAlert('');
    try {

      const result = await updateUser(values,selectedUser);
      if(result.status==200) setSuccess(result.data);
      else setSuccess('')
      setAlert(result.data);


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
                Edit Profile
                <div className="card-header-actions">
                </div>
              </CCardHeader>
              {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}
              <CCollapse show={collapsed} timeout={1000}>


                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
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


                        <AppSelect
                          name="role_id"
                          label="Select Role"
                          options={useRoles}
                          onChange={handleChange("role_id")}
                          value={values.role_id}
                          visible={touched.role_id}
                          error={errors.role_id}

                        />
                          {values.role_id==='4'?
                            <AppSelect
                              name="region_id"
                              label="Select Region"
                              options={divisionData}
                              onChange={handleChange("region_id")}
                              value={values.region_id}
                              visible={touched.region_id}
                              error={errors.region_id}
                            />
                            :null
                          }

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
