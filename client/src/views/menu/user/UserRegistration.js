import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CRow,

} from '@coreui/react'

import { DocsLink } from 'src/reusable'
import {Formik} from "formik";
import {login} from "../../../services/web/userService";
import AppInput from "../../../common/input.common";
import AppSelect from "../../../common/select.common";

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const handleSubmit= (values)=>{
    console.log(values)
  }
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


                  <Formik
                    initialValues={{
                      first_name:'',
                      last_name:'',
                      email:'',
                      nic:'',
                      sid:'',
                      roleId:'',
                      region:''


                    }}

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
                        />
                        <AppInput
                          type="text"
                          name="last_name"
                          label="Last Name"
                          placeholder="Enter First Name"
                          value={values.last_name}
                          onChange={handleChange("last_name")}
                          visible={touched.last_name}
                        />

                        <AppInput
                          type="email"
                          name="email"
                          label="Email Address"
                          placeholder="Enter Enter Address"
                          value={values.email}
                          onChange={handleChange("email")}
                          visible={touched.email}
                        />



                        <AppInput
                          type="text"
                          name="nic"
                          label="NIC Number"
                          placeholder="Enter NIC number"
                          value={values.nic}
                          onChange={handleChange("nic")}
                          visible={touched.nic}
                        />

                        <AppInput
                          type="text"
                          name="sid"
                          label="Service ID"
                          placeholder="Enter Service ID"
                          value={values.sid}
                          onChange={handleChange("sid")}
                          visible={touched.sid}
                        />

                        <AppSelect
                          name="roleId"
                          label="Select Role"
                          options=""
                          onChange={handleChange("roleId")}
                          value={values.roleId}
                          visible={touched.roleId}
                        />

                        <AppInput
                          type="text"
                          name="region"
                          label="Region"
                          placeholder="Enter region"
                          value={values.region}
                          onChange={handleChange("region")}
                          visible={touched.region}
                        />

                      </CCardBody>
                        <CCardFooter>
                           <CButton type="submit" style={{width:"15%"}}  color="primary" >Submit</CButton>
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
