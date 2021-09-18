import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm, CInput,
  CRow,
  CDataTable,
  CBadge


} from '@coreui/react'
import {getAllUsers} from "../../../services/web/userService";

const UsersTable = () => {

  const history = useHistory();
  const handleEditUser = (selectId) => history.push(`/admin/edituser/${selectId}`);
  const handleViewUser = (selectId) => history.push(`/admin/viewuser/${selectId}`);
  // const handleEditUser = (selectId) =>alert(history));
  const [usersData, setUsersAllData] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: users } = await getAllUsers();
    setUsersAllData(users);
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
    { key: 'first_name', _style: { width: '20%'} },
    { key: 'serviceId', _style: { width: '20%'} },
    { key: 'email', _style: { width: '20%'} },
    { key: 'role', _style: { width: '10%'} },
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
    if (status) return 'primary'
      return 'danger'
  }

  return (

    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            All users record
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
                        {item.status ? "Active" : "Not"}
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
                          <p className="text-muted">User serviceId: {item.serviceId}</p>
                          <CButton size="sm" color="primary" onClick={()=>handleViewUser(item.id)}>
                            View User
                          </CButton>
                          <CButton size="sm" color="info" className="ml-1" onClick={()=>handleEditUser(item.id)}>
                            Edit User
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Deactivate
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

export default UsersTable;
