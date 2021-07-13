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
    name: 'Users Table',
    to: '/admin/usertable',
    icon: 'cil-star',
    role:'admin'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create User Role',
    to: '/admin/userrolecreate',
    icon: 'cil-star',
    role:'admin'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashbord',
    to: '/level1/dashboard',
    icon: 'cil-star',
    role:'level1'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Video Feed',
    to: '/level1/videofeed',
    icon: 'cil-star',
    role:'level1'
  },




]

export default _nav
