import React from 'react';
import {CRow, CCol, CLabel, CInput, CFormGroup, CTextarea, CCardBody} from "@coreui/react";

const CoreTextArea =({name,error,label,placeholder,value,onChange,visible})=> {
  return (
      <CRow>
        <CCol xs="12">
          <CFormGroup>
            <CLabel htmlFor="name">{label}</CLabel>
            <CTextarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={visible && error?"is-invalid":""}
            />
          </CFormGroup>
        </CCol>
        {visible && error &&<p className="text-danger">{error}</p>}
      </CRow>
  );
}

export default CoreTextArea;
