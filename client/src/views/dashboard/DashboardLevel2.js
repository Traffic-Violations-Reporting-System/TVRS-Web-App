import React, {lazy, useEffect, useState} from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
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
import FiveChardFooter from "../charts/FiveBouttomCard";
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.jsx'))

const Dashboard = (props) => {
  //chart1
  const [chart1 ,setChart1] =useState([
    {
      label: 'No. of recorded complaints',
      backgroundColor: '#4a90e2',
      data: []
    }
  ]);
  
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
      label: 'Accept',
      backgroundColor: '#82d257',
      data: []
    },
    {
      label: 'Total',
      backgroundColor: '#74a6de',
      data: []
    }
  ]);

  //chart 4
  const [chart4 ,setChart4]=useState([
    {
      label: 'Male',
      backgroundColor: '#5ea3e9',
      data: []
    },
    {
      label: 'Female',
      backgroundColor: '#e288b6',
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
        numberOfAccidentsInThisYearBarchart(response.data['vehicles'],response.data['data'],response.data['color']);
      })
      .catch(error => {
        numberOfAccidentsInThisYearBarchart(
          ['A', 'A1','B','B1', 'C','C1','CE','D','D1','DE','G','G1','J'],
          [56, 25, 19, 28,21,36,53,8,9,10,11,13,14],
          [
            '#795548',
            '#009ce0',
            '#ff9800',
            '#00d084',
            '#525252',
            '#b80000',
            '#f78da7',
            '#297292',
            '#8bba88',
            '#9d7659',
            '#cb4d4d',
          ]
        );
      });

    //chart 3
    getCasesSummaryLineChart()
      .then(response => {
        casesSummaryLineChart(response.data.accept,response.data.total);
      })
      .catch(error => {
        casesSummaryLineChart(
          [40, 20, 12,4,5,6,7,8,9,10,12,15],
          [30, 10, 12,43,5,6,17,18,19,70,17,25]

        );
      });

    //chart 4
    getGenderBasedanalysisBarchart()
      .then(response => {
        genderBasedanalysisBarchart(response.data['male'],response.data['female']);
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
  const numberOfAccidentsInThisYearBarchart =(v,d,c) =>{
    let newState2 = [...chart2];
    let newStateLabel2 = v;
    newState2[0].data = d;
    newState2[0].backgroundColor =c;


    setChart2(newState2);
    setChartLabel2(newStateLabel2);
  };
  //3
  const casesSummaryLineChart=(acceptArr,totalArr) =>{
    let newState3 = [...chart3];
    newState3[0].data = acceptArr;
    //
    newState3[1].data = totalArr;
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

            Total Cases in Current Year
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
            Overrole vehicles involvement in Current Year
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

            Gender base involvement in Current Year
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
        <CCard>
          <CCardHeader>

            Cases Summary in Current Year
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
          Gender base involvement in Current Year
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

