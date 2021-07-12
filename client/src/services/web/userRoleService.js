import http from '../httpService';




export function createUserRole(userRole){
  return  http.post('http://localhost:4000/web/user/createUserRole',userRole);
}