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
    name: 'Create User Role',
    to: '/admin/userrolecreate',
    icon: 'cilPeople',
    role:'admin'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User Role List',
    to: '/admin/userrolecreate',
    icon: 'cilPeople',
    role:'admin'
  },

   //level 1
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level1/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'New Companies',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Create Complaint',
    to: '/level1/complaints',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inquiry Companies',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Chat',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Report',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },
   //level 2
   {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level2/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    role:'level2'
  },
   //level 3
   {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level3/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    role:'level3'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Complaints',
    to: '/level3/complaintList',
    icon: 'cil-list',
    role:'level3'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Update Complaints',
    to: '/level3/updateComplaint',
    icon: 'cil-task',
    role:'level3'
  },



]

export default _nav
