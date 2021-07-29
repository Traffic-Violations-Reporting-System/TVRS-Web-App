import React, {useState} from 'react';
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

const RejectForm = () => {
  const [alert, setAlert] = useState('');
  const [success, setSuccess] = useState('');
  const [UserRating, setUserRating] = useState([
    {
      "id": 1,
      "role": "admin"
    },
    {
      "id": 2,
      "role": "level1"
    },
    {
      "id": 3,
      "role": "level2"
    },
    {
      "id": 4,
      "role": "level3"
    }
  ]);
  const [Reason, setReason] = useState([
    {
      "id": 1,
      "role": "admin"
    },
    {
      "id": 2,
      "role": "level1"
    },
    {
      "id": 3,
      "role": "level2"
    },
    {
      "id": 4,
      "role": "level3"
    }
  ]);
  const handleSubmit=async (values, { setSubmitting, resetForm })=> {
    values.userId="2";
    values.ComplaintId="2";

    console.log(values);
    setAlert('');
    try {
      const result = await InsertReject(values);
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
            reason:'',
            userRating:'',
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


