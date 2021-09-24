import React, {useContext, useState,useEffect} from 'react';
import {
  CCardBody, CCol, CForm, CFormGroup, CInputRadio, CLabel, CListGroup, CListGroupItem, CRow
} from "@coreui/react";

import ReactPlayer from 'react-player'
import {Formik} from "formik";
import AppSelect from "../common/form/AppSelect";
import {margeVideoRefRelatedComplaints,InsertAccept,InsertReject} from "../services/web/complainService";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import {UserContext} from '../App'
const config = require("../config.json");

const validationSchema = Yup.object().shape({

  transactionCategory: Yup.string()
    .required("Option is required")
    .label("Options"),
  videoRef: Yup.string()
    .when('transactionCategory', {
      is: 'option2',
      then: Yup.string().required('Video is required'),
      otherwise: Yup.string()
    }),
});

const SimilarVideoLoadingCard = ({videoRefArr}) => {
  const {acceptObject,currentUserId,setAcceptObject} = useContext(UserContext);

  const [activeVideo,setActiveVideo] = useState('');
  const [activeTab, setActiveTab] = useState(1);


  const history = useHistory();

  useEffect (() => {
    const x ={"video" :(`${config["VideoStreamURl"]}`+'/'+videoRefArr[0].reference).toString()};
    setActiveVideo(x.video);
  },[])


  const handleSubmit= async (values, { setSubmitting, resetForm })=> {

    if(values.transactionCategory==='option1'){
      try{
        // console.log(acceptObject); return;
        await InsertAccept(acceptObject);
        history.push(`/level1/newInquiryList`);
      }catch (e) {
        console.log("error occur in adding a complaints",e);
      }

    }else if(values.transactionCategory==="option2"){
      try{
        await margeVideoRefRelatedComplaints({"complainId":values.videoRef,"userId":currentUserId});
        history.push(`/level1/newInquiryList`);
      }catch (e) {
        console.log("error occur in marge complain");
      }

    }else if(values.transactionCategory==="option3"){
      try{
        await InsertReject({"description":'This Complaint Already add',"reason":'already added',"ComplaintId":acceptObject.accepts.ComplaintId,"UserId":currentUserId});
        history.push(`/level1/newInquiryList`);
      }catch (e) {
        console.log("error occur in reject complain");
      }
    }


  };
  const selectVideo= ({id,reference})=> {
    const x ={"video" :(`${config["VideoStreamURl"]}`+'/'+reference).toString()};

    setActiveTab(id);
    setActiveVideo(x.video);
    console.log(activeVideo);
  };


  return (
    <div>
      <div>
        <h3 className="font-weight-bold justify-content-center">
          Similar Complaint Found!
        </h3>
        <hr/>

        <CRow>
          <CCol  md="8">
            <div>
              <ReactPlayer
                style={{height: '200px'}}
                url={activeVideo}
                controls

              />
            </div>
          </CCol>
          <CCol md="4"  style={{justifyContent: 'center'}}>
            <CCardBody>
              <CListGroup id="list-tab" role="tablist">
                {videoRefArr.map((video, index) => (

                  <CListGroupItem
                    key={index}
                    value ={video.id}
                    onClick={() => selectVideo(video)}
                    action  active={activeTab === video.id}
                  >
                    Video Number {index+1}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>

          </CCol>
        </CRow>

        <div style={{margin: '20px'}}>
          <Formik
            initialValues={{ transactionCategory:'', videoRef:'',}}
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
                isValid,
                visible

              }) => (
              <CForm onSubmit={handleSubmit}>
                <CFormGroup row>
                  <CCol md="2">
                    <CLabel>Type</CLabel>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom id="inline-radio1"
                        name="inline-radios"
                        onChange={handleChange("transactionCategory")}
                        value="option1"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">continue</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom id="inline-radio2"
                        name="inline-radios"
                        value="option2"
                        onChange={handleChange("transactionCategory")}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">marge</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom id="inline-radio3"
                        name="inline-radios"
                        value="option3"
                        onChange={handleChange("transactionCategory")}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">reject</CLabel>
                    </CFormGroup>
                    <br />
                    {touched.transactionCategory && errors.transactionCategory &&<p className="text-danger">{errors.transactionCategory}</p>}
                  </CCol>

                </CFormGroup>

                {values.transactionCategory === "option2" && (
                  <AppSelect
                    name="videoRef"
                    label="video Ref"
                    options={videoRefArr}
                    onChange={handleChange("videoRef")}
                    value={values.videoRef}
                    visible={touched.videoRef}
                    error={errors.videoRef}
                  />
                )}

                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                &nbsp;
                {/*<button type="reset" className="btn btn-secondary">*/}
                {/*  Reset*/}
                {/*</button>*/}
              </CForm>
            )}
          </Formik>
        </div>

      </div>
    </div>
  );
};

export default SimilarVideoLoadingCard
