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
import {createUserRole} from "../../../services/web/userRoleService";
import * as Yup from "yup";

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const validationSchema = Yup.object().shape({

  role: Yup.string()
    .required("User role is required")
    .min(3)
    .max(10)
    .label("User Role"),

});
const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [useRoles, setUserRoles] = useState([]);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');





  const handleSubmit=async (values, { setSubmitting, resetForm })=> {


    setAlert('');
    try {
      const result = await createUserRole(values);
      console.log(result);


      if(result.status==200) setSuccess(result.data);
      else setSuccess('')

      setAlert(result.data);
      resetForm({})
    } catch (e) {
      setAlert(e.response.data);
     setSuccess('')
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

                <div className="card-header-actions">
                </div>
              </CCardHeader>
              {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}
              <CCollapse show={collapsed} timeout={1000}>


                  <Formik
                    initialValues={{
                      role:'',

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
                          name="role"
                          label="User Role"
                          placeholder="User role"
                          value={values.role}
                          onChange={handleChange("role")}
                          visible={touched.role}
                          error={errors.role}
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
