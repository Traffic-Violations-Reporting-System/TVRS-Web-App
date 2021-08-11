import http from '../httpService';
const config = require("../../config.json");



export function createUserRole(userRole){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/user/rolesadd',userRole);
}
