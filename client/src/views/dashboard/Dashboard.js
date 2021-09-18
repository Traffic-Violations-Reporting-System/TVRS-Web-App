import React, {lazy, useEffect, useState} from 'react'
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
  CChartDoughnut,

} from '@coreui/react-chartjs'
import { adminUserAnalysisBarChart, adminTotalMobileUsersLineChart} from "../../services/web/dashbordService.js";
import MainChartExample from '../charts/MainChartExample';
import FiveChardFooter from "../charts/FiveBouttomCard";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.jsx'))
const Dashboard = () => {
  //chart1
  const [chart1 ,setChart1] =useState([
    {
      label: 'Monthly analysis',
      backgroundColor: '#2f91e9',
      data: []
    }
  ]);


  //chart2
  const [chart2 ,setChart2]=useState([
    {
      backgroundColor: [
        '#e91e63',
        '#f8e71c',
        '#00d084',
        '#2c9ce5',
      ],
      data: []
    }
  ]);

  useEffect(() => {
    //chart1
    adminTotalMobileUsersLineChart()
      .then(response => {
        totalMobileUsersLineChart(response.data);
      })
      .catch(error => {
        totalMobileUsersLineChart([40, 20, 12,4,5,6,7,8,9,10,12,15]);
      });

    //chart2
    adminUserAnalysisBarChart()
      .then(response => {
        userAnalysisBarChart(response.data);
      })
      .catch(error => {
        userAnalysisBarChart([156,315,219,667]);
      });



  },[]);

  //1
  const totalMobileUsersLineChart =(arr) =>{
    let newState = [...chart1];
    newState[0].data = arr;
    setChart1(newState);
  };
  //2
  const userAnalysisBarChart =(arr) =>{
    let newState = [...chart2];
    newState[0].data = arr;
    setChart2(newState);
  };



  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Most Violated Rules in Last 6 month</h4>
              <div className="small text-muted">September 2021</div>
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
         <FiveChardFooter  />
        </CCardFooter>
      </CCard>
      <CCardGroup columns className = "cols-2" >
        <CCard>
          <CCardHeader>

            Number of newly added mobile users
          </CCardHeader>

          <CCardBody>
            <CChartBar
              datasets={chart1}
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
              datasets={chart2}
              labels={['admin','Level 1', 'Level 2', 'Level 3']}
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

