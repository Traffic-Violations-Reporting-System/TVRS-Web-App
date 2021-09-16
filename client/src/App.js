import jwtDecode from 'jwt-decode';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import './scss/style.scss';
import {getCurrentUser} from "./services/web/userService";
import { setPassword } from './services/web/userService';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const ForgotPassword = React.lazy(() => import('./views/pages/forgot/ForgotPassword'));
const SetPassword = React.lazy(() => import('./views/pages/set/SetPassword'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
export const UserContext = React.createContext();

function App(){
  const [currentUserRole,setCurrentUserRole]=useState();
  const [currentUserId,setCurrentUserId]=useState();
  const [acceptObject,setAcceptObject]=useState('');


  useEffect(() => {
    const user =getCurrentUser();
    console.log(user.role);
    setCurrentUserRole(user.role);
    setCurrentUserId(user.userId);
  },[]);

  const PublicRoute = ({ currentUserRole, ...props }) => {

    return currentUserRole
        ? (<Redirect to="/admin/dashboard" />)
        : (<Route {...props} />)
};

return (

      <UserContext.Provider value={
        {
          "currentUserId":currentUserId,
          "acceptObject":acceptObject,
           "setAcceptObject":setAcceptObject
        }
      }>


        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <PublicRoute
                userrole={currentUserRole}
                path="/login"
                component={Login}
            />

              <Route exact path="/forgot" name="Forgot password page" render={props => <ForgotPassword {...props}/>} />
              <Route exact path="/set" name="Set Password Page" render={props => <SetPassword {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route  path="/admin" name="Home" render={props => <TheLayout {...props} userrole={currentUserRole}/>} />
              <Route  path="/level1" name="Home" render={props => <TheLayout {...props} userrole={currentUserRole}/>} />
              <Route  path="/level2" name="Home" render={props => <TheLayout {...props} userrole={currentUserRole}/>} />
              <Route  path="/level3" name="Home" render={props => <TheLayout {...props} userrole={currentUserRole}/>} />

             <Redirect from="/" to="/login" />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
      </UserContext.Provider>
    );

}

export default App;
