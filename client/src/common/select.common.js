import React from 'react';
import {CCol, CFormGroup, CLabel, CRow, CSelect} from "@coreui/react";

const AppSelect = ({ name, label,value, options,visible, ...rest }) => {
  return (
    <CFormGroup>
      <CRow>
        <CCol lg={2}>
          <CLabel htmlFor="role">User Level</CLabel>
        </CCol>
        <CCol lg={10}>
          <CSelect name={name}  {...rest} >
            <option value="default"  disabled>Open this select user levels</option>
            {options.map(option =>
              <option
                key={option['id']}
                value={option['id']}
              >{option['role']}</option>
            )}
          </CSelect>
        </CCol>
      </CRow>
    </CFormGroup>
  );
}
export default AppSelect;
