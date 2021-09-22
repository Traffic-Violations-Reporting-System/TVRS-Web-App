import React from 'react';

//admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const UserRegister = React.lazy(() => import('./views/menu/admin/UserRegistration'));
const UserTable = React.lazy(() => import('./views/menu/admin/UserTable'));
const UserEdit = React.lazy(() => import('./views/menu/admin/UserEdit'));
const UserRoleAdd = React.lazy(() => import('./views/menu/admin/UserRoleAdd'));
const UserRoleList = React.lazy(() => import('./views/menu/admin/UserRoleList'));
const UserView = React.lazy(() => import('./views/menu/admin/UserView'));

//level1
const DashboardLvel1 = React.lazy(() => import('./views/dashboard/DashboardLevel1'));
const Complaints = React.lazy(() => import('./views/menu/level1/Complaints.jsx'));
const InquiryComplain = React.lazy(() => import('./views/menu/level1/InquiryComplain'));
const NewComplainList = React.lazy(() => import('./views/menu/level1/NewComplainList'));
const ComplaintsDetails = React.lazy(() => import('./views/menu/level1/ComplaintsDetails'));
const IncompleteComplainList = React.lazy(() => import('./views/menu/level1/InCompleteComplainList'));

//level2
const DashboardLvel2 = React.lazy(() => import('./views/dashboard/DashboardLevel2'));
const ComplaintActions = React.lazy(() => import('./views/menu/level2/Complaints.jsx'));
const InquiryComplaints = React.lazy(() => import('./views/menu/level2/InquiryComplaint.jsx'));
const NewComplaintsList = React.lazy(() => import('./views/menu/level2/NewComplaintsList.jsx'));
const ComplaintDetails = React.lazy(() => import('./views/menu/level2/ComplaintDetails.jsx'));
const IncompleteComplaintsList = React.lazy(() => import('./views/menu/level2/IncompleteComplaints.jsx'));

//level3
const DashboardLvel3 = React.lazy(() => import('./views/dashboard/DashboardLevel3'));
const NewComplaints = React.lazy(() => import('./views/menu/level3/NewComplaints.jsx'));
const OngoingComplaints = React.lazy(() => import('./views/menu/level3/OngoingComplaints'));
const CompletedComplaints = React.lazy(() => import('./views/menu/level3/CompletedComplaints.jsx'));
const Complaint = React.lazy(() => import('./views/menu/level3/Complaint.jsx'));
const ComplaintReport = React.lazy(() => import('./views/menu/level3/ComplaintReport.jsx'));
const AllComplaints = React.lazy(() => import('./views/menu/level3/AllComplaints.jsx'));


const routes = [
  //admin
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard ,role:'admin' },
  { path: '/admin/register', name: 'Register', component: UserRegister, exact: true ,role:'admin'},
  { path: '/admin/usertable', name: 'All Users', component: UserTable, exact: true ,role:'admin'},
  { path: '/admin/edituser/:id', name: 'Edit User', component: UserEdit,exact: true,role:'admin' },
  { path: '/admin/userrolecreate', name: 'About', component: UserRoleAdd, exact: true, role: 'admin' },
  { path: '/admin/rolelist', name: 'User Role List', component: UserRoleList, exact: true,role:'admin' },
  { path: '/admin/viewuser/:id', name: 'View users', component: UserView,exact: true,role:'admin' },


  //level1
  { path: '/level1/dashboard', name: 'Dashboard', component: DashboardLvel1 ,role:'level1' },
  { path: '/level1/complaints/:id', name: 'Complaints', component: Complaints,exact: true,role:'level1' },
  { path: '/level1/inquiryList', name: 'Accepted', component: InquiryComplain ,role:'level1' },
  { path: '/level1/newInquiryList', name: 'New Complaints', component: NewComplainList ,role:'level1' },
  { path: '/level1/complaintmore/:id', name: 'Complaint Details', component: ComplaintsDetails ,role:'level1' },
  { path: '/level1/draftList', name: 'Draft Complaints', component: IncompleteComplainList ,role:'level1' },

  //level2
  { path: '/level2/dashboard', name: 'Dashboard', component: DashboardLvel2 ,role:'level2' },
  { path: '/level2/complaints/:id', name: 'Complaints', component: ComplaintActions,exact: true,role:'level2' },
  { path: '/level2/inquiryList', name: 'Inquiry Complaint', component: InquiryComplaints ,role:'level2' },
  { path: '/level2/newInquiryList', name: 'New Complaints', component: NewComplaintsList ,role:'level2' },
  { path: '/level2/complaintmore/:id', name: 'Complaint Details', component: ComplaintDetails ,role:'level2' },
  { path: '/level2/draftsList', name: 'Incomplete Complaints', component: IncompleteComplaintsList ,role:'level2' },

  //level3
  { path: '/level3/dashboard', name: 'Dashboard', component: DashboardLvel3, role: 'level3' },
  { path: '/level3/newComplaints', name: 'New Complaints', component: NewComplaints, role: 'level3' },
  { path: '/level3/ongoingComplaints', name: 'Ongoing Complaints', component: OngoingComplaints, role: 'level3' },
  { path: '/level3/completedComplaints', name: 'Completed Complaints', component: CompletedComplaints, role: 'level3' },
  { path: '/level3/complaint/:id', name: 'Complaint View', component: Complaint, role: 'level3' },
  { path: '/level3/complaintReport/:id', name: 'Complaint Report', component: ComplaintReport, role: 'level3' },
  { path: '/level3/allComplaints', name: 'All Complaints', component: AllComplaints, role: 'level3' },




];

export default routes;
