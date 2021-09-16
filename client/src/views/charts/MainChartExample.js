import React,{useEffect,useState} from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import {getMainChartData} from '../../services/web/dashbordService'
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {

  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const [chartData,setChartData] =useState([
      {
        label: 'A',
        backgroundColor:'transparent',
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: []
      },
      {
        label: 'Bike ',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: []
      },
      {
        label: 'Bus Accidents',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: []
      },
      {
        label: 'Three Wheeler Accidents',
        backgroundColor: 'transparent',
        borderColor: "#F9B115",
        pointHoverBackgroundColor: "#F9B115",
        borderWidth: 2,
        data: []
      },
      {
        label: 'Other Accidents',
        backgroundColor:  hexToRgba(brandInfo, 10),
        borderColor: "#3848CA",
        pointHoverBackgroundColor: "#3848CA",
        borderWidth: 2,
        data: []
      }
    ]);
  const [loading,setLoading] =useState(false);

  useEffect(() => {
    getMainChartData()
      .then(response => {
        defaultDatasets(response.data);
        setLoading(true)

      })
      .catch(error => {
        console.log("error :",error);
      });
  },[])
  // const defaultDatasets = (()=>{
  //   let elements = 6
  //   const data1 = []
  //   const data2 = []
  //   const data3 = []
  //   const data4 = []
  //   const data5 = []
  //   for (let i = 0; i <= elements; i++) {
  //     data1.push(random(50, 200))
  //     data2.push(random(80, 100))
  //     data3.push(65)
  //     data4.push(random(60, 200))
  //     data5.push(random(40, 100))
  //   }
  //
  //
  //   return [
  //     {
  //       label: 'Car Accidents',
  //       backgroundColor:'transparent',
  //       borderColor: brandInfo,
  //       pointHoverBackgroundColor: brandInfo,
  //       borderWidth: 2,
  //       data: data1
  //     },
  //     {
  //       label: 'Bike Accidents',
  //       backgroundColor: 'transparent',
  //       borderColor: brandSuccess,
  //       pointHoverBackgroundColor: brandSuccess,
  //       borderWidth: 2,
  //       data: data2
  //     },
  //     {
  //       label: 'Bus Accidents',
  //       backgroundColor: 'transparent',
  //       borderColor: brandDanger,
  //       pointHoverBackgroundColor: brandDanger,
  //       borderWidth: 1,
  //       borderDash: [8, 5],
  //       data: data3
  //     },
  //     {
  //       label: 'Three Wheeler Accidents',
  //       backgroundColor: 'transparent',
  //       borderColor: "#F9B115",
  //       pointHoverBackgroundColor: "#F9B115",
  //       borderWidth: 2,
  //       data: data4
  //     },
  //     {
  //       label: 'Other Accidents',
  //       backgroundColor:  hexToRgba(brandInfo, 10),
  //       borderColor: "#3848CA",
  //       pointHoverBackgroundColor: "#3848CA",
  //       borderWidth: 2,
  //       data: data5
  //     },
  //   ]
  // })()

  const defaultDatasets = (res)=>{
    let stateArr = [...chartData];
      for (let i = 0; i < 5; i++) {
        let k =Object.keys(res[i])[0]
        stateArr[i].data=res[i][k].slice(4, 10);

      }
    console.log("stateArr :",stateArr);
      setChartData(stateArr);


  };

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(25 / 5),
              max: 25
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()


  // render

  return (
    <CChartLine
      {...attributes}
      datasets={chartData}
      options={defaultOptions}
      labels={['Apr','May','Jun','Jul','Aus','Sep']}
    />
  )
}


export default MainChartExample
