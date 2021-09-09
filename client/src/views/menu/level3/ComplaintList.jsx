import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import {getCurrentUser} from "../../../services/web/userService";
import {getComplaints} from "../../../services/web/level3UserService";


const getBadge = ComplaintAccuracy => {
  switch (ComplaintAccuracy) {
    case 'Very Low': return 'danger'
    case 'Low': return 'warning'
    case 'Acceptable': return 'secondary'
    case 'High': return 'info'
    case 'Very High': return 'success'
    default: return 'primary'
  }
}

const getBadgeStatus = ComplaintStatus => {
  switch (ComplaintStatus) {
    case 'ongoing': return 'warning'
    case 'completed': return 'success'
    default: return 'primary'
  }
}

const ComplaintList = () => {

  const history = useHistory()

  //paginations and tracking pages
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/level3/complaintList?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  
  
  //handle table data
  const [complaintsData, setComplaintsData] = useState([]);
   
  useEffect(() => {
    const user = getCurrentUser();
    fetchComplaintsData(user.region);
  },[]);

  const fetchComplaintsData = async (userRegion) => {
    const { data: complaints } = await getComplaints(userRegion);
    setComplaintsData(complaints);
  };


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Opened Complaints
            <small className="text-muted"> click to select</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={complaintsData} //complaintsData
            fields={[
              { key: 'id', _classes: 'font-weight-bold' },
              'violationType', 'createdAt', 'ComplaintAccuracy', 'Status'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/level3/complaint/${item.id}`)}
            //level3/newComplaints/:id
            scopedSlots = {{
              'createdAt':
                (item) => (
                  <td>
                    {item.createdAt.split('T')[0]}
                  </td>
                ),
              'ComplaintAccuracy':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.ComplaintAccuracy)}>
                      {item.ComplaintAccuracy}
                    </CBadge>
                  </td>
                ),
              'Status':
                (item)=>(
                  <td>
                    <CBadge color={getBadgeStatus(item.Complaint.status)}>
                      {item.Complaint.status}
                    </CBadge>
                  </td>
                ),
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={10}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ComplaintList
