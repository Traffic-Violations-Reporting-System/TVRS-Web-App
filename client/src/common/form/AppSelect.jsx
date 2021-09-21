import React from 'react';
import {CCol, CFormGroup, CLabel, CRow, CSelect} from "@coreui/react";

const AppSelect = ({ name,error, label,value, options,visible, ...rest }) => {
  return (
    <CFormGroup>
      <CRow>
        <CCol md={2}>
          <CLabel htmlFor="reference">User Level</CLabel>
        </CCol>
        <CCol md={4}>
          <CSelect value={value} name={name}  {...rest} className={visible && error?"is-invalid":""}>
            <option value="">Select Related Video</option>
            {options.map((option,index) =>
              <option
                key={option['id']}
                value={option['id']}
              >Number {index} video</option>
            )}
          </CSelect>
          {visible && error &&<p className="text-danger">{error}</p>}
        </CCol>
      </CRow>
    </CFormGroup>
  );
}
export default AppSelect;
