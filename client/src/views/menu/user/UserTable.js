import React, {useEffect, useState} from 'react'
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



const UsersTable = () => {
  const usersData = [
    {id: 0, name: 'John Doe', serviceId: '2018/01/01',nic:'951234354V', role: 'Guest', status: 'Pending'},
    {id: 1, name: 'Samppa Nori', serviceId: '2018/01/01',nic:'951234354V', role: 'Member', status: 'Active'},
    {id: 2, name: 'Estavan Lykos', serviceId: '2018/02/01',nic:'951234354V', role: 'Staff', status: 'Banned'},
    {id: 3, name: 'Chetan Mohamed', serviceId: '2018/02/01',nic:'951234354V', role: 'Admin', status: 'Inactive'},
    {id: 4, name: 'Derick Maximinus', serviceId: '2018/03/01',nic:'951234354V', role: 'Member', status: 'Pending'},
    {id: 5, name: 'Friderik Dávid', serviceId: '2018/01/21',nic:'951234354V', role: 'Staff', status: 'Active'},
    {id: 6, name: 'Yiorgos Avraamu', serviceId: '2018/01/01',nic:'951234354V', role: 'Member', status: 'Active'},
    {id: 7, name: 'Avram Tarasios', serviceId: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 8, name: 'Quintin Ed', serviceId: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 9, name: 'Enéas Kwadwo', serviceId: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 10, name: 'Agapetus Tadeáš', serviceId: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 11, name: 'Carwyn Fachtna', serviceId: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 12, name: 'Nehemiah Tatius', serviceId: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 13, name: 'Ebbe Gemariah', serviceId: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 14, name: 'Eustorgios Amulius', serviceId: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 15, name: 'Leopold Gáspár', serviceId: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 16, name: 'Pompeius René', serviceId: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 17, name: 'Paĉjo Jadon', serviceId: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 18, name: 'Micheal Mercurius', serviceId: '2018/02/01', role: 'Admin', status: 'Inactive'},
    {id: 19, name: 'Ganesha Dubhghall', serviceId: '2018/03/01', role: 'Member', status: 'Pending'},
    {id: 20, name: 'Hiroto Šimun', serviceId: '2018/01/21', role: 'Staff', status: 'Active'},
    {id: 21, name: 'Vishnu Serghei', serviceId: '2018/01/01', role: 'Member', status: 'Active'},
    {id: 22, name: 'Zbyněk Phoibos', serviceId: '2018/02/01', role: 'Staff', status: 'Banned'},
    {id: 23, name: 'Aulus Agmundr', serviceId: '2018/01/01', role: 'Member', status: 'Pending'},
    {id: 42, name: 'Ford Prefect', serviceId: '2001/05/25', role: 'Alien', status: 'Don\'t panic!'}
  ]

  const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)

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
    { key: 'name', _style: { width: '20%'} },
    'serviceId',
    'nic',
    { key: 'role', _style: { width: '20%'} },
    { key: 'status', _style: { width: '20%'} },
    {
      key: 'show_details',
      label: '',
      _style: { width: '0.5%' },
      sorter: false,
      filter: false
    }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (

    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            All Users are here
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
                            {item.username}
                          </h4>
                          <p className="text-muted">User Service Id: {item.serviceId}</p>
                          <CButton size="sm" color="primary" >
                            View User
                          </CButton>
                          <CButton size="sm" color="info" className="ml-1">
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
