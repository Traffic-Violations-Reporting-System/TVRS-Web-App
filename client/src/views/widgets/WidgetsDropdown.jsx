import React, {useEffect, useState} from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import {getTopFourCardData} from "../../services/web/dashbordService";

const WidgetsDropdown = () => {
  const [dataset ,setDataSet] =useState([]);
  const [chart1 ,setChart1] =useState([]);
  const [chart2 ,setChart2] =useState([]);
  const [chart3 ,setChart3] =useState([]);
  const [chart4 ,setChart4] =useState([]);
  useEffect (() => {
    getTopFourCardData()
      .then(response => {
        setDataSet(response.data['arrayResult']);
        setChart1(response.data['mobile']);
        setChart2(response.data['complaint']);
        setChart3(response.data['accept']);
        setChart4(response.data['reject']);
      })
      .catch(error => {
        setDataSet([9823,82378,56754,25625]);
        setChart1([15, 39, 54, 64, 71, 55, 40,8,9,10,11,12]);
        setChart2([1, 18, 9, 17, 34, 22, 11]);
        setChart3([78, 81, 80, 45, 34, 12, 40]);
        setChart4([78, 81, 80, 45, 34, 12, 40]);
      });

  },[]);


  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={dataset[0]}
          text="Mobile Users"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={chart1}
              pointHoverBackgroundColor="primary"
              label="Users"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={dataset[1]}
          text="Complaints"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={chart2}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Complaints"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={dataset[2]}
          text="Accepted Complaints"
          footerSlot={
            <ChartBarSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={chart3}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Complaints"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={dataset[3]}
          text="Rejected Complaints"
          footerSlot={
            <ChartBarSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={chart4}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="danger"
              label="Complaints"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
      {/*<CCol sm="6" lg="3">*/}
      {/*  <CWidgetDropdown*/}
      {/*    color="gradient-danger"*/}
      {/*    header={dataset[3]}*/}
      {/*    text="Rejected Complaints"*/}
      {/*    dataPoints={chart4}*/}
      {/*    footerSlot={*/}
      {/*      <ChartBarSimple*/}
      {/*        className="mt-3 mx-3"*/}
      {/*        style={{height: '70px'}}*/}
      {/*        backgroundColor="rgb(250, 152, 152)"*/}
      {/*        label="Complaints"*/}
      {/*        labels="months"*/}
      {/*      />*/}
      {/*    }*/}
      {/*  >*/}
      {/*  </CWidgetDropdown>*/}
      {/*</CCol>*/}
    </CRow>
  )
}

export default WidgetsDropdown
