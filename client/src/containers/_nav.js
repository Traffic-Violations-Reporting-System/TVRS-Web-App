import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Menu']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    role:'admin'
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'User Register',
  to: '/admin/register',
    icon: 'cil-star',
    role:'admin'

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Users',
    to: '/admin/usertable',
    icon: 'cil-star',
    role:'admin'

 },
 {
    _tag: 'CSidebarNavItem',
    name: 'User Role List',
    to: '/admin/rolelist',
    icon: 'cilPeople',
    role:'admin'
  },
  
   //level 1
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'New Complaint',
    to: '/level1/newInquiryList',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inquiry Complaint',
    to: '/level1/inquiryList',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Incomplete Complaint',
    to: '/level1/draftList',
    icon: 'cil-star',
    role:'level1'
  },
  
   //level 2
   {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level2/dashboard',
    icon: 'cil-star',
    role:'level2'
  },
   //level 3
   {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level3/dashboard',
    icon: 'cil-star',
    role:'level3'
  },




]

export default _nav
