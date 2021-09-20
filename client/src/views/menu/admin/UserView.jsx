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
import policeImg from "../../../assets/police.png";
import {useHistory} from "react-router-dom";

const BasicForms = (props) => {
  const [loading, setLoading] = useState(false);
  const [actionData, setAction] = useState();
  const [userDetails, setUserDetails] = useState({});

  useEffect (() => {
    const Id = props.match.params.id;
    viewUser(Id)
      .then(response => {
        setLoading(true);
        setAction(response.data['action']);
        setUserDetails(response.data['user']);

      })
      .catch(error => {
        setLoading(false);

      })
  },[]);
  const history = useHistory();
  const handleEditUser = (selectId) => history.push(`/admin/edituser/${selectId}`);

  return (
    <>
      {loading?
        <div>
          <CRow>
            <CCol xs="12" sm="6" md="4">
              <CCard>
                <CCardBody className="p-0">
                  <div
                    style={{
                      padding:"2px",
                      height:"200px",
                      width:"100%",
                      backgroundImage:  `url(${policeImg})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',

                    }}>

                  </div>
                  <CListGroup>
                    <CListGroupItem href="#" >Profile</CListGroupItem>
                    <CListGroupItem href="#">Recent activity</CListGroupItem>
                    <CListGroupItem href="#" onClick={()=>handleEditUser(props.match.params.id)}>Edit Profile</CListGroupItem>
                  </CListGroup>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs="12" sm="6" md="8">

              <CCard>
                <CCardHeader>
                  User Profile
                </CCardHeader>
                <CCardBody>
                  <div className="bd-example">
                    <dl className="row">
                      <dt className="col-sm-3">First Name</dt>
                      <dd className="col-sm-9">{userDetails.first_name}</dd>

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
                      <dd className="col-sm-9">{userDetails['member_since']}</dd>
                    </dl>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {actionData ?
            // {status: "accept", count: 2}
            <CRow>
              {actionData.map(({status,count})=>(
                <CCol sm="6" lg="6" key={`${status}`}>
                  <CWidgetSimple header={`${status}`} text={`${count}`}>
                    <ChartLineSimple style={{ height: '40px' }} borderColor="primary"/>
                  </CWidgetSimple>
                </CCol>
              ))}
            </CRow>
            :"no"}


        </div>
        :"null" }


    </>
  )
}

export default BasicForms
