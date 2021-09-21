import React, {useContext, useState} from 'react';
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

import * as Yup from "yup";
import {UserContext} from "../App";
import {useHistory} from "react-router-dom";
const validationSchema = Yup.object().shape({

  description: Yup.string()
    .required("description is required")
    .min(3)
    .max(50)
    .label("description"),
});


const ReviewForm = ({complainId}) => {

  const history = useHistory();
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');
  const {currentUserId} = useContext(UserContext);


  const handleSubmit=async (values, { setSubmitting, resetForm })=> {

    values.UserId=currentUserId;

    values.ComplaintId=complainId;

    console.log(values);
    setAlert('');
    try {
      const result = await InsertReview(values);
      if(result.status==200) setSuccess(result.data);
      else setSuccess('')

      setAlert(result.data);
      resetForm({})
      history.push(`/level1/newInquiryList`);
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

          Review Complaint
          <div className="card-header-actions">
          </div>
        </CCardHeader>
        {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}

        <Formik
          initialValues={{
            description:'',
          }}
          validationSchema ={validationSchema}
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



