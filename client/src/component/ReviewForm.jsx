import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CSelect,
  CTextarea
} from "@coreui/react";


const ReviewForm = () => {

  return (
    <div>
      <CCard>
        <CCardHeader>
          <h5>Review Form</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="name">Description</CLabel>
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="5"
                  placeholder="Reason for reviewing..."
                />
              </CFormGroup>
            </CCol>
          </CRow>
          
          
          <CRow>
            <CCol xs="4">
              <CButton
                color="primary"
                className="w-md waves-effect waves-light"
                style={{width:"35%"}}
                type="submit"
              >
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>


    </div>
  )
}

export default ReviewForm;


