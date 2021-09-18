import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CDataTable,
  CBadge


} from '@coreui/react'
import {getAllComplain} from "../../../services/web/complainService";


const InquiryTable = () => {

  const history = useHistory();
  const viewComplainDetails = (selectId) => history.push(`/level1/complaintmore/${selectId}`);
  const [usersData, setUsersAllData] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: complain } = await getAllComplain();
    setUsersAllData(complain);
  };


  const [details, setDetails] = useState([])


  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'date', _style: { width: '20%'} },
    { key: 'location', _style: { width: '20%'} },
    { key: 'description', _style: { width: '30%'} },
    { key: 'status', _style: { width: '10%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '0.5%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    if (status=="No Action") return 'primary'
    else if(status=="Reject") return 'danger'
    else if(status=="Review") return 'secondary'
    else if(status=="Complete") return 'success'
    return 'secondary'
  }

  return (

    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            All inquiry complaint records
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={10}
              hover
              sorter
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)} style={{width:60}}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"

                          size="sm"
                          onClick={()=>{toggleDetails(index)}}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                    )
                  },
                'details':
                  (item, index)=>{
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <h4>
                            {item.name}
                          </h4>
                          <p className="text-muted">Complaint ID :{item.id}</p>
                          <CButton size="sm" color="primary" onClick={()=>viewComplainDetails(item.id)}>
                            View Details
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    )
                  }
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

















  )


}

export default InquiryTable;
