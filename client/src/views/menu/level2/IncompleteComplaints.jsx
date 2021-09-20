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
import {getInCompleteComplain} from "../../../services/web/level2UserService";
import {getCurrentUser} from "../../../services/web/userService";

const InquiryTable = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleComplain = (selectId) => history.push(`/level2/complaints/${selectId}`);
  const [complaintData, setComplaintData] = useState([]);
  useEffect(() => {
    fetchComplaintData();
  }, []);

  const fetchComplaintData = async () => {
    try{
      const { data: complain } = await getInCompleteComplain({'currentUserId':getCurrentUser().userId});
      if(!complain) setLoading(false);
      setComplaintData(complain);
      setLoading(true);
    }catch (e) {
      if(e.response.status==400) setLoading(false);
    }
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

  const getBadge = (status) => {
    switch (status) {
      case 'rejected': return 'danger'
      case 'review': return 'warning'
      case 'completed': return 'secondary'
      case 'ongoing': return 'info'
      default: return 'primary'
    }
  }

  return (

    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Your All Incompleted  complaints
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={complaintData}
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
                            <p className="text-muted">Complain ID:{item.id}</p>
                            <CButton size="sm" color="primary" onClick={()=>handleComplain(item.id)}>
                              Take Action
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
    </>
  )

}

export default InquiryTable;
