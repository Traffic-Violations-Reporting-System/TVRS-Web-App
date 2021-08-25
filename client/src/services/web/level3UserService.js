import http from '../httpService';
import jwtDecode from "jwt-decode";
const config = require("../../config.json");

export async function getNewComplaints() {
   return await http.get(`${config["BASEURL"]}`+'/'+'web/user/view');
}
export function getComplain(id){
  return  http.get(`${config["BASEURL"]}`+'/'+'web/complaine/get'+'/'+id);
}