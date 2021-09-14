import React, {useContext, useState} from 'react';
import {

  CButton,
  CCard, CCardBody,
  CCardHeader, CCarousel, CCarouselControl, CCarouselInner, CCarouselItem,
  CCol, CForm, CFormGroup, CInputRadio, CLabel, CRow, CSelect,
} from "@coreui/react";
import {ReactVideo} from "reactjs-media";

import {Formik} from "formik";
import AppSelect from "../common/form/AppSelect";
import {margeVideoRefRelatedComplaints,InsertAccept} from "../services/web/complainService";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import {UserContext} from '../App'


const validationSchema = Yup.object().shape({
  isCompany: Yup.boolean(),
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
    const [activeIndex] = useState(1)
    const [activeVideo,setActiveVideo] = useState("");
    const history = useHistory();

    const handleSubmit= async (values, { setSubmitting, resetForm })=> {

    if(values.transactionCategory==='option1'){
        try{
          console.log(acceptObject);
          const r =await InsertAccept(acceptObject);
          history.push(`/level1/newInquiryList`);
        }catch (e) {
          console.log("error occur in adding a complaints");
        }
        setAcceptObject("");
    }else if(values.transactionCategory==="option2"){
         try{
           await margeVideoRefRelatedComplaints({"complainId":values.videoRef,"userId":currentUserId});
           history.push(`/level1/newInquiryList`);
         }catch (e) {
           console.log("error occur in marge complain");
         }

    }else if(values.transactionCategory==="option3"){
      console.log(history);
      history.push(`/level1/newInquiryList`);
    }


  };
  const selectVideo=async (values)=> {
    console.log(values);
    setActiveVideo(values);
  };


  return (
    <div>
      <CCard>
        <CCardHeader className="font-weight-bold">
          Similar Complaint Found!
        </CCardHeader>


       <CRow>
         <CCol  sm="8">
           <div>
             <ReactVideo
               style={{height: '200px'}}
               src={"https://dev9aj0eiuvoo.cloudfront.net/GraphQL.mp4"}
               primaryColor="blue"
               // other props
             />
           </div>
         </CCol>
         <CCol sm="2">
           <CCardBody>
           {videoRefArr.map((video, index) => (

               <div key={video.id} className="justify-content-center mb-3">
                 <CButton key={video.id} onClick={()=>selectVideo("https://dev9aj0eiuvoo.cloudfront.net/GraphQL.mp4")}>{video.id}</CButton>
               </div>
           ))}
           </CCardBody>
         </CCol>
       </CRow>

        <div style={{margin: '20px'}}>
          <Formik
            initialValues={{ transactionCategory:'', videoRef:'0',}}
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
                <button type="reset" className="btn btn-secondary">
                  Reset
                </button>
              </CForm>
            )}
          </Formik>
        </div>

      </CCard>
    </div>
  );
};

export default SimilarVideoLoadingCard


