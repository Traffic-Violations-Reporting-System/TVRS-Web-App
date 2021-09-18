import React, {useEffect, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane
} from "@coreui/react";


const UserRoleList = () =>{
  const [activeTab, setActiveTab] = useState(1)
  return(
    <>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            About User Role

          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="4">
                <CListGroup id="list-tab" role="tablist">
                  <CListGroupItem onClick={() => setActiveTab(0)} action active={activeTab === 0} >Admin</CListGroupItem>
                  <CListGroupItem onClick={() => setActiveTab(1)} action active={activeTab === 1} >Level1</CListGroupItem>
                  <CListGroupItem onClick={() => setActiveTab(2)} action active={activeTab === 2} >Level2</CListGroupItem>
                  <CListGroupItem onClick={() => setActiveTab(3)} action active={activeTab === 3} >Level3</CListGroupItem>
                </CListGroup>
              </CCol>
              <CCol xs="8">
                <CTabContent>
                  <CTabPane active={activeTab === 0} >
                    <p>The system administrator is the one who manages the whole web application.
                      Also, he can view the stats of the mobile application as well. He is resposible
                      for taking immediate actions if anything goes wrong in the web application. As all
                      the users in the web application are from the police department, he should be on
                      alert all the time..
                    </p>
                  </CTabPane>
                  <CTabPane active={activeTab === 1}>
                    <p>The system administrator is the one who manages the whole web application.
                      Also, he can view the stats of the mobile application as well. He is resposible
                      for taking immediate actions if anything goes wrong in the web application. As all
                      the users in the web application are from the police department, he should be on
                      alert all the time..
                    </p>
                  </CTabPane>
                  <CTabPane active={activeTab === 2}>
                    <p>The system administrator is the one who manages the whole web application.
                      Also, he can view the stats of the mobile application as well. He is resposible
                      for taking immediate actions if anything goes wrong in the web application. As all
                      the users in the web application are from the police department, he should be on
                      alert all the time..
                    </p>
                  </CTabPane>
                  <CTabPane active={activeTab === 3}>
                    <p>The system administrator is the one who manages the whole web application.
                      Also, he can view the stats of the mobile application as well. He is resposible
                      for taking immediate actions if anything goes wrong in the web application. As all
                      the users in the web application are from the police department, he should be on
                      alert all the time..
                    </p>
                  </CTabPane>
                </CTabContent>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  );
}

export default UserRoleList;
