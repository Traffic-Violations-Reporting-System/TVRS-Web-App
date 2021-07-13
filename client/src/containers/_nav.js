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
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,

  },

  {
    _tag: 'CSidebarNavItem',
    name: 'User Register',
    to: '/register',
    icon: 'cilPencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users Table',
    to: '/usertable',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create User Role',
    to: '/userrolecreate',
    icon: 'cilPeople',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User Role',
    to: '/userrole',
    icon: 'cilMagnifyingGlass',
  },



]

export default _nav
