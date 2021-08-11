import React, {useEffect, useState} from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup, CListGroupItem,
  CRow, CWidgetSimple,

} from '@coreui/react'


import {viewUser} from "../../../services/web/userService";
import ChartLineSimple from "../../charts/ChartLineSimple";

const BasicForms = (props) => {
  const [loading, setLoading] = useState(false);
  const [actionData, setAction] = useState();
  const [userDetails, setUserDetails] = useState({});

  useEffect (() => {
    const Id = props.match.params.id;
    viewUser(Id)
      .then(response => {
          setLoading(true);
          setUserDetails(response.data['action']);
          setAction(response.data['user']);
          console.log(actionData);
          console.log(userDetails);
      })
      .catch(error => {
        setLoading(false);

      })
  },[]);


  return (
    <>
      {loading?
        <div>
          <CRow>
            <CCol xs="12" sm="6" md="4">
              <CCard>
                <CCardBody className="p-0">
                  <div style={{height:"200px",backgroundColor:"blue"}}></div>
                  <CListGroup>
                    <CListGroupItem href="#" >Profile</CListGroupItem>
                    <CListGroupItem href="#">Reason Activity</CListGroupItem>
                    <CListGroupItem href="#">Edit Profile</CListGroupItem>
                  </CListGroup>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6" md="8">

              <CCard>
                <CCardHeader>
                  Bio Graph
                </CCardHeader>
                <CCardBody>
                  <div className="bd-example">
                    <dl className="row">
                      <dt className="col-sm-3">First Name</dt>
                      <dd className="col-sm-9">a{userDetails.first_name}</dd>

                      <dt className="col-sm-3">Last Name</dt>
                      <dd className="col-sm-9">{userDetails.last_name}</dd>

                      <dt className="col-sm-3">Email</dt>
                      <dd className="col-sm-9">{userDetails.email}</dd>

                      <dt className="col-sm-3">Role</dt>
                      <dd className="col-sm-9">{userDetails.role}</dd>

                      <dt className="col-sm-3">NIC</dt>
                      <dd className="col-sm-9">{userDetails.nic}</dd>

                      <dt className="col-sm-3">Service Id</dt>
                      <dd className="col-sm-9">{userDetails.service_id}</dd>

                      <dt className="col-sm-3">Member Sence</dt>
                      {/*<dd className="col-sm-9">{userDetails['member_since']}</dd>*/}
                    </dl>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {actionData ?
              <CRow>
                <CCol sm="6" lg="6">
                  <CWidgetSimple header="Accept" text="32">
                    <ChartLineSimple style={{ height: '40px' }} borderColor="primary"/>
                  </CWidgetSimple>
                </CCol>

                <CCol sm="6" lg="6">
                  <CWidgetSimple header="Review" text="12">
                    <ChartLineSimple style={{ height: '40px' }} borderColor="secondary"/>
                  </CWidgetSimple>
                </CCol>
                <CCol sm="6" lg="6">
                  <CWidgetSimple header="Reject" text="54">
                    <ChartLineSimple style={{ height: '40px' }} borderColor="danger"/>
                  </CWidgetSimple>
                </CCol>
                <CCol sm="6" lg="6">
                  <CWidgetSimple header="Complete" text="14">
                    <ChartLineSimple style={{ height: '40px' }} borderColor="success"/>
                  </CWidgetSimple>
                </CCol>
                </CRow>
            :"no"}


        </div>
        :"no out" }


    </>
  )
}

export default BasicForms
