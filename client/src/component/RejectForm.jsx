import React, {useContext, useState} from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol, CCollapse, CForm,
} from "@coreui/react";
import {InsertReject} from "../services/web/complainService";

import CoreTextArea from "../common/CoreUI.textarea";
import CoreTextSelect from "../common/CoreUI.select";
import {Formik} from "formik";
import * as Yup from "yup";
import {UserContext} from "../App";
import { useHistory } from 'react-router-dom';

const validationSchema = Yup.object().shape({

  description: Yup.string()
    .required("description is required")
    .min(3)
    .max(50)
    .label("description"),
  userRating: Yup.string()
    .required("User Rating is required")
    .label("role"),
  reason: Yup.string()
    .required("Reason is required")
    .label("role"),

});
const RejectForm = ({complainId}) => {
  const history = useHistory();
  const currentUserId = useContext(UserContext);
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');
  const [UserRating, setUserRating] = useState([
    { "id": 1, "value": "1"},
    { "id": 2, "value": "2"},
    { "id": 3, "value": "3"},
    { "id": 4, "value": "4"}
  ]);
  const [Reason, setReason] = useState([
    { "id": 1, "value": "not clear"},
    { "id": 2, "value": "bad"},
    { "id": 3, "value": "dark"},
    { "id": 4, "value": "other"}
  ]);
  const handleSubmit=async (values, { setSubmitting, resetForm })=> {
    values.userId=currentUserId;
    values.ComplaintId=complainId;

    console.log(values);
    setAlert('');
    try {
      const result = await InsertReject(values);
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
          User Registration
          <div className="card-header-actions">
          </div>
        </CCardHeader>
        {alert&&<CAlert color={success ? "success" : "danger"}>{alert}</CAlert>}


        <Formik
          initialValues={{
            description:'',
            reason:'',
            userRating:'',
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
                <CoreTextSelect
                  name="reason"
                  label="Reason"
                  options={Reason}
                  onChange={handleChange("reason")}
                  value={values.reason}
                  visible={touched.reason}
                  error={errors.reason}
                />

                <CoreTextSelect
                  name="userRating"
                  label="User Rating"
                  options={UserRating}
                  onChange={handleChange("userRating")}
                  value={values.userRating}
                  visible={touched.userRating}
                  error={errors.userRating}
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

export default RejectForm


