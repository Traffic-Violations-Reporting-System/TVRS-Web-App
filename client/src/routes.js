import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const UserRegister = React.lazy(() => import('./views/menu/user/UserRegistration'));
const UserTable = React.lazy(() => import('./views/menu/user/UserTable'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: UserRegister, exact: true },
  { path: '/usertable', name: 'Users', component: UserTable, exact: true },


];

export default routes;
