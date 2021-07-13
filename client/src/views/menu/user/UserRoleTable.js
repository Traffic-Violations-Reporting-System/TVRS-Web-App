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



const BasicForms = () => {


  

 
  return (
    <>
      <CRow>
        <CCol xs="12">
        
            <CCard>
              <CCardHeader className="font-weight-bold">
                User Roles
                <div className="card-header-actions">
                </div>
              </CCardHeader>
              
              <CCardBody>

              </CCardBody>
              <CCardFooter>
                           
              </CCardFooter>

            
            </CCard>
      
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
