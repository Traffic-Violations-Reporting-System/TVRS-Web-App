import React, { lazy } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'

import MainChartExample from '../charts/MainChartExample'
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))



const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Accidents</h4>

            </CCol>
            <CCol sm="7" className="d-none d-md-block">

              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Car Accidents</div>
              <strong>29 Drivers (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bike Accidents</div>
              <strong>24 Drivers (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Bus Accidents</div>
              <strong>78 Drivers (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Three Wheeler Accidents</div>
              <strong>22 Drivers (30%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Other Accidents</div>
              <strong>37 Drivers (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCardGroup columns className = "cols-2" >
        <CCard>
          <CCardHeader>

            Number of newly added mobile users - Monthly Analysis
          </CCardHeader>

          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: 'Monthly analysis',
                  backgroundColor: '#ab149e',
                  data: [140, 210, 112, 319, 156, 140, 139, 280, 240, 320, 212, 171]
                }
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>


        <CCard>
          <CCardHeader>
            System Analysis - Web users
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#e91e63',
                    '#f8e71c',
                    '#00d084',
                  ],
                  data: [156,315,219]
                }
              ]}
              labels={['Level 1', 'Level 2', 'Level 3']}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
      <CCardGroup columns className = "cols-2">




      </CCardGroup>

    </>
  )
}

export default Dashboard

