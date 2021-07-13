import React from 'react';

//admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const UserRegister = React.lazy(() => import('./views/menu/user/UserRegistration'));
const UserTable = React.lazy(() => import('./views/menu/user/UserTable'));
const UserEdit = React.lazy(() => import('./views/menu/user/UserEdit'));
const UserRoleAdd = React.lazy(() => import('./views/menu/user/UserRoleAdd'));

//level1
const DashboardLvel1 = React.lazy(() => import('./views/dashboard/DashboardLevel1'));

//level2


const routes = [
  //admin
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard ,role:'admin' },
  { path: '/admin/register', name: 'Register', component: UserRegister, exact: true ,role:'admin'},
  { path: '/admin/usertable', name: 'Users', component: UserTable, exact: true ,role:'admin'},
  { path: '/admin/edituser/:id', name: 'EditUsers', component: UserEdit, exact: true,role:'admin' },
  { path: '/admin/userrolecreate', name: 'Create User Role', component: UserRoleAdd, exact: true,role:'admin' },

  //level1
  { path: '/level1/dashboard', name: 'Dashboard', component: DashboardLvel1 ,role:'level1' },
  { path: '/level1/videofeed', name: 'Video Feed', component: DashboardLvel1 ,role:'level1' },
];

export default routes;
