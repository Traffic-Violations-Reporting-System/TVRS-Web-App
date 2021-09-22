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
    icon: 'cil-user-follow',
    role:'admin'

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Users',
    to: '/admin/usertable',
    icon: 'cil-cursor',
    role:'admin'

 },
 {
    _tag: 'CSidebarNavItem',
    name: 'About',
    to: '/admin/rolelist',
    icon: 'cilPeople',
    role:'admin'
  },

   //level 1
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/level1/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'New Complaint',
    to: '/level1/newInquiryList',
    icon: 'cil-task',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Accepted Complaint',
    to: '/level1/inquiryList',
    icon: 'cil-list',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Draft Complaint',
    to: '/level1/draftList',
    icon: 'cil-warning',
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
  {
    _tag: 'CSidebarNavItem',
    name: 'New Complaint',
    to: '/level2/newInquiryList',
    icon: 'cil-task',
    role:'level2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inquiry Complaints',
    to: '/level2/inquiryList',
    icon: 'cil-list',
    role:'level2'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Incomplete Complaints',
    to: '/level2/draftsList',
    icon: 'cil-warning',
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
    name: 'New Complaints',
    to: '/level3/newComplaints',
    icon: 'cil-list',
    role:'level3'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Ongoing Complaints',
    to: '/level3/ongoingComplaints',
    icon: 'cil-list',
    role:'level3'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Completed Complaints',
    to: '/level3/completedComplaints',
    icon: 'cil-task',
    role:'level3'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Complaint Reports',
    to: '/level3/allComplaints',
    icon: 'cil-star',
    role:'level3'
  },



]

export default _nav
