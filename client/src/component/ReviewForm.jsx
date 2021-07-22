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
                  rows="6"
                  placeholder="Content..."
                />
              </CFormGroup>
            </CCol>
          </CRow>
          
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel htmlFor="ccmonth">Reason</CLabel>
                <CSelect custom name="ccmonth" id="ccmonth">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>

                </CSelect>
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

export default ReviewForm


