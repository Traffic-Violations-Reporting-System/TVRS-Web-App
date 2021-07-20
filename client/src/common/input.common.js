import React from 'react';
import {CRow, CCol, CLabel, CInput, CFormGroup} from "@coreui/react";

const AppInput =({name,error,label,placeholder,value,onChange,visible})=> {
  return (
    <CFormGroup>
      <CRow>
        <CCol lg={2}>
          <CLabel htmlFor="fn">{label}</CLabel>
        </CCol>
        <CCol lg={10} >
          <CInput
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={visible && error?"is-invalid":""}
          />
          {visible && error &&<p className="text-danger">{error}</p>}
        </CCol>

      </CRow>
    </CFormGroup>
  );
}

export default AppInput;
