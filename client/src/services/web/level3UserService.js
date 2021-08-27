import http from '../httpService';
import jwtDecode from "jwt-decode";
const config = require("../../config.json");

export async function getNewComplaints() {
  return await http.get(`${config["BASEURL"]}` + '/web/level3/getnew');
  //this will returns complaints those are status==accepted
}

export async function getComplaints() {
  return await http.get(`${config["BASEURL"]}` + '/web/level3/getall');
  //this will returns complaints those are status==ongoing or status==completed
}

export function getFullComplaint(id){
  return  http.get(`${config["BASEURL"]}`+'/web/level3/get/'+id);
}

export function updateComplaint(id){
  return  http.post(`${config["BASEURL"]}`+'/web/level3/update/'+id);
}