import React from 'react';
import {CCol, CFormGroup, CLabel, CRow, CSelect} from "@coreui/react";

const AppSelect = ({ name,error, label,value, options,visible, ...rest }) => {
  return (
    <CFormGroup>
      <CRow>
        <CCol lg={2}>
          <CLabel htmlFor="role">{label}</CLabel>
        </CCol>
        <CCol lg={10}>
          <CSelect value={value} name={name}  {...rest} className={visible && error?"is-invalid":""}>
            <option value="">Select user levels</option>
            {options.map(option =>
              <option
                key={option['id']}
                value={option['id']}
              >{option['role']}</option>
            )}
          </CSelect>
          {visible && error &&<p className="text-danger">{error}</p>}
        </CCol>
      </CRow>
    </CFormGroup>
  );
}
export default AppSelect;
