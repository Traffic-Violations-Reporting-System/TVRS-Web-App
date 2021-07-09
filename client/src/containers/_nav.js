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
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users Table',
    to: '/usertable',
    icon: 'cil-star',
  },



]

export default _nav
