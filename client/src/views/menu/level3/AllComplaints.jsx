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
import {getAllComplaints} from "../../../services/web/level3UserService";


const getBadge = ComplaintAccuracy => {
  switch (ComplaintAccuracy) {
    case 'Low': return 'danger'
    case 'Low Medium': return 'warning'
    case 'Medium': return 'secondary'
    case 'Medium High': return 'info'
    case 'High': return 'success'
    default: return 'primary'
  }
}

const getBadgeStatus = status => {
   switch (status) {
     case 'ongoing': return 'warning'
     case 'completed': return 'success'
     default: return 'primary'
   }
 }

const NewComplaints = () => {

  const history = useHistory()

  //paginations and tracking pages
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/level3/newComplaints?page=${newPage}`)
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
    const { data: complaints } = await getAllComplaints(userRegion);
    setComplaintsData(complaints);
    
  };
console.log(complaintsData)

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            New Complaints List
            <small className="text-muted"> click to select</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={complaintsData} //complaintsData
            fields={[
              { key: 'Complaint_id', _classes: 'font-weight-bold' },
              'violationType', 'ComplainedDate', 'ComplaintAccuracy', 'Status'
            ]}
            hover
            columnFilter
            tableFilter
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/level3/complaintReport/${item.id}/`)}
            //level3/newComplaints/:id
            scopedSlots={{
              'Complaint_id':
                (item) => (
                  <td>
                    {item.complaint.complainant_id}
                  </td>
                ),
              'ComplainedDate':
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
                      <CBadge color={getBadgeStatus(item.complaint.complaint_status)}>
                        {item.complaint.complaint_status.charAt(0).toUpperCase() + item.complaint.complaint_status.slice(1)}
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

export default NewComplaints
