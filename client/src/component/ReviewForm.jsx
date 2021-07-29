import React, {useState} from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol, CCollapse, CForm,
} from "@coreui/react";
import {InsertReview} from "../services/web/complainService";

import CoreTextArea from "../common/CoreUI.textarea";
import {Formik} from "formik";

const ReviewForm = () => {
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit=async (values, { setSubmitting, resetForm })=> {
    values.userId="2";
    values.ComplaintId="2";

    console.log(values);
    setAlert('');
    try {
      const result = await InsertReview(values);
      if(result.status==200) setSuccess(result.data);
      else setSuccess('')

      setAlert(result.data);
      resetForm({})
    } catch (e) {
      setAlert(e.response.data);
      setSubmitting(false);
      console.log(e.response.data);
    }
  };

  return (
    <div>
      <CCard>
        <CCardHeader className="font-weight-bold">
          User Registration
          <div className="card-header-actions">
          </div>
        </CCardHeader>
        {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}

        <Formik
          initialValues={{
            description:'',
          }}
          onSubmit={handleSubmit}
        >
          {({
              values,
              errors,
              handleChange,
              handleSubmit,
              touched,
              dirty,
              isValid

            })=>(
            <CForm className="form-horizontal"  onSubmit={handleSubmit}>
              <CCardBody>
                <CoreTextArea
                  type="text"
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  value={values.description}
                  onChange={handleChange("description")}
                  visible={touched.description}
                  error={errors.description}
                />
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="submit"
                  style={{width:"105",height:"38"}}
                  color="primary"
                  disabled={!(dirty && isValid)}
                >Submit</CButton>

              </CCardFooter>
            </CForm>
          )}</Formik>
      </CCard>
    </div>
  );
};

export default ReviewForm;



