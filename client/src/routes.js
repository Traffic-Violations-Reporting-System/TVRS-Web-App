import React from 'react';

//admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const UserRegister = React.lazy(() => import('./views/menu/admin/UserRegistration'));
const UserTable = React.lazy(() => import('./views/menu/admin/UserTable'));
const UserEdit = React.lazy(() => import('./views/menu/admin/UserEdit'));
const UserRoleAdd = React.lazy(() => import('./views/menu/admin/UserRoleAdd'));

//level1
const DashboardLvel1 = React.lazy(() => import('./views/dashboard/DashboardLevel1'));
const Complaints = React.lazy(() => import('./views/menu/level1/Complaints.jsx'));
const InquiryComplain = React.lazy(() => import('./views/menu/level1/InquiryComplain'));
const NewComplainList = React.lazy(() => import('./views/menu/level1/NewComplainList'));

//level2
const DashboardLvel2 = React.lazy(() => import('./views/dashboard/DashboardLevel2'));

//level3
const DashboardLvel3 = React.lazy(() => import('./views/dashboard/DashboardLevel3'));


const routes = [
  //admin
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard ,role:'admin' },
  { path: '/admin/register', name: 'Register', component: UserRegister, exact: true ,role:'admin'},
  { path: '/admin/usertable', name: 'Users', component: UserTable, exact: true ,role:'admin'},
  { path: '/admin/edituser/:id', name: 'EditUsers', component: UserEdit,exact: true,role:'admin' },
  { path: '/admin/userrolecreate', name: 'Create User Role', component: UserRoleAdd, exact: true, role: 'admin' },
  { path: '/admin/userrolecreate', name: 'Create User Role', component: UserRoleAdd, exact: true,role:'admin' },

  //level1
  { path: '/level1/dashboard', name: 'Dashboard', component: DashboardLvel1 ,role:'level1' },
  { path: '/level1/complaints', name: 'Complaints', component: Complaints ,role:'level1' },
  { path: '/level1/inquiryList', name: 'Inquiry Complain', component: InquiryComplain ,role:'level1' },
  { path: '/level1/newInquiryList', name: 'New Complain', component: NewComplainList ,role:'level1' },

  //level2
  { path: '/level2/dashboard', name: 'Dashboard', component: DashboardLvel2 ,role:'level2' },


  //level3
  { path: '/level3/dashboard', name: 'Dashboard', component: DashboardLvel3,role:'level3' },




];

export default routes;
