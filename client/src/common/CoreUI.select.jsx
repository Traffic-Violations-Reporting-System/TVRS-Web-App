import React from 'react';
import {CRow, CCol, CLabel, CInput, CFormGroup, CTextarea, CCardBody, CSelect} from "@coreui/react";

const CoreSelect =({ name,error, label,value, options,visible, ...rest })=> {
  return (
    <CRow>
        <CCol xs="12">
          <CFormGroup>
            <CLabel htmlFor="name">{label}</CLabel>
            <CSelect value={value} name={name}  {...rest} className={visible && error?"is-invalid":""}>
              <option value="">Select option</option>
              {options.map(option =>
                <option
                  key={option['id']}
                  value={option['id']}
                >{option['value']}</option>
              )}
            </CSelect>
          </CFormGroup>
        </CCol>
        {visible && error &&<p className="text-danger">{error}</p>}
      </CRow>
  );
}

export default CoreSelect;
