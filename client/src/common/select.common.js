import React from 'react';
import {CCol, CFormGroup, CLabel, CRow, CSelect} from "@coreui/react";

const AppSelect = ({ name, label, options,visible, ...rest }) => {
  return (
    <CFormGroup>
      <CRow>
        <CCol lg={2}>
          <CLabel htmlFor="role">User Level</CLabel>
        </CCol>
        <CCol lg={10}>
          <CSelect aria-label="Default select example" name={name}>
            <option disabled>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </CSelect>
        </CCol>
      </CRow>
    </CFormGroup>
  );
}
export default AppSelect;
