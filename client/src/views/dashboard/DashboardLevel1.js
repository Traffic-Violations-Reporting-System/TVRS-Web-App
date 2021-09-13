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
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import {getCasesSummaryLineChart,getGenderBasedanalysisBarchart,getNumberOfAccidentsInThisYearBarchart,getTotalCasesLineChart} from "../../services/web/dashbordService.js";

import MainChartExample from '../charts/MainChartExample'
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = (props) => {
  //chart1
  const [chart1 ,setChart1] =useState([
    {
      label: 'No. of recorded complaints',
      backgroundColor: '#4a90e2',
      data: []
    }
  ]);


  //chart2
  const [chart2 ,setChart2]=useState([
    {
      backgroundColor: [],
      data:[]
    }
  ]);
  const [chartLabel2 ,setChartLabel2]=useState([]);

//chart 3
  const [chart3 ,setChart3]=useState([
    {
      label: 'Pending',
      backgroundColor: 'red',
      data: []
    },
    {
      label: 'Accept',
      backgroundColor: '#607d8b',
      data: []
    },
    {
      label: 'Complete',
      backgroundColor: '#0F7FFF',
      data: []
    }
  ]);

  //chart 4
  const [chart4 ,setChart4]=useState([
    {
      label: 'Male',
      backgroundColor: '#E91E63',
      data: []
    },
    {
      label: 'Female',
      backgroundColor: '#F8E71C',
      data: []
    },
  ]);


  useEffect(() => {
    //chart1
    getTotalCasesLineChart()
      .then(response => {
        totalCasesLineChart(response.data);
      })
      .catch(error => {
        totalCasesLineChart([40, 20, 12,4,5,6,7,8,9,10,12,15]);
      });

    //chart2
    getNumberOfAccidentsInThisYearBarchart()
      .then(response => {
        numberOfAccidentsInThisYearBarchart();
      })
      .catch(error => {
        numberOfAccidentsInThisYearBarchart();
      });

    //chart 3
    getCasesSummaryLineChart()
      .then(response => {
        console.log("chart",response.data.accept);
        console.log("chart",response.data.pending);
        console.log("chart",response.data.complete);
        casesSummaryLineChart(response.data.accept,response.data.pending,response.data.complete);
      })
      .catch(error => {
        casesSummaryLineChart(
          [40, 20, 12,4,5,6,7,8,9,10,12,15],
          [30, 10, 12,43,5,6,17,18,19,70,17,25],
          [40, 20, 12,4,5,6,47,28,29,90,19,1],
        );
      });

    //chart 4
    getGenderBasedanalysisBarchart()
      .then(response => {
        genderBasedanalysisBarchart(response.data.male,response.data.female);
      })
      .catch(error => {
        genderBasedanalysisBarchart(
          [40, 20, 12,4,5,6,7,8,9,10,12,15],
          [30, 10, 12,43,5,6,17,18,19,70,17,25],
        );

      });
  },[]);

  //1
  const totalCasesLineChart =(arr) =>{
    let newState = [...chart1];
    newState[0].data = arr;
    setChart1(newState);
  };

  //2
  const numberOfAccidentsInThisYearBarchart =() =>{
    let newState2 = [...chart2];
    let newStateLabel2 = ['Bus', 'Car', 'Motor Bike', 'Three wheelers','Foot Bike','Passengers'];
    newState2[0].data = [56, 25, 19, 28,21,36,53];
    newState2[0].backgroundColor = [
      '#795548',
      '#009ce0',
      '#ff9800',
      '#00d084',
      '#525252',
      '#b80000',
      '#f78da7'
    ];

    setChart2(newState2);
    setChartLabel2(newStateLabel2);
  };
  //3
  const casesSummaryLineChart=(acceptArr,pendingArr,completeArr) =>{
    let newState3 = [...chart3];
    newState3[0].data = acceptArr;
    //
    newState3[1].data = pendingArr;
    //
    newState3[2].data = completeArr;
    //
    setChart3(newState3);
  };
  //4
  const genderBasedanalysisBarchart=(maleArr,femaleArr) =>{
    let newState4 = [...chart4];
    newState4[0].data = maleArr;
    newState4[1].data = femaleArr;
    setChart4(newState4);
  };
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Accidents</h4>
              <div className="small text-muted">November 2020</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
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

            Fault Analysis
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
            Analysis - accidents caused by vehicles in Current Year
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={chart2}
              labels={chartLabel2}
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
        <CCard>
          <CCardHeader>
            Cases Summary
          </CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={chart3}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>

      <CCard>
        <CCardHeader>
          Cases Summary
        </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={chart4}
            options={{
              tooltips: {
                enabled: true
              }
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>
      </CCardGroup>
    </>
  )
}

export default Dashboard

