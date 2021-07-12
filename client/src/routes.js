import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const UserRegister = React.lazy(() => import('./views/menu/user/UserRegistration'));
const UserTable = React.lazy(() => import('./views/menu/user/UserTable'));
const UserEdit = React.lazy(() => import('./views/menu/user/UserEdit'));
const UserRoleAdd = React.lazy(() => import('./views/menu/user/UserRoleAdd'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: UserRegister, exact: true },
  { path: '/usertable', name: 'Users', component: UserTable, exact: true },
  { path: '/edituser/:id', name: 'EditUsers', component: UserEdit, exact: true },
  { path: '/userrolecreate', name: 'User Role Create', component: UserRoleAdd, exact: true },

];

export default routes;
