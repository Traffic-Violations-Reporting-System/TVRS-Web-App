import React, {useEffect, useState} from 'react'
import {CCol, CProgress, CRow} from "@coreui/react";

import {footerFiveCard} from "../../services/web/dashbordService"

const ChardFooter  = (props) => {

  const [dataRecord ,setDataRecord] =useState({});
  const [loading ,setLoading] =useState(false);
  const bgColors = ["success","info","warning","danger","#fff"];

  useEffect (() => {
    footerFiveCard()
      .then(response => {
        setDataRecord(response.data);
        setLoading(true);
      })
      .catch(error => {
        setDataRecord(0);
      });
  },[]);

  return (
    <>
      {loading ?
          <CRow className="text-center">
            {dataRecord.map((x,i) =>(
              <CCol md sm="12" className="mb-sm-2 mb-0" key={i}>
                <div className="text-muted">{x.label}</div>
                <strong>{x.record} Cases ({ parseFloat(x.percentage).toFixed(2)}%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color={bgColors[i]}
                  value={40}
                />
              </CCol>
            ))}
          </CRow>
        :
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
      }
    </>
  )
}


export default ChardFooter
