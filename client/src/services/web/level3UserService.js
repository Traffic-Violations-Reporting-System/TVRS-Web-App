import http from '../httpService';
const config = require("../../config.json");

export async function getNewComplaints(region) {  
  return await http.get(`${config["BASEURL"]}` + '/web/level3/getnew/'+region);
  //this will returns complaints those are status==Accepted
}

export async function getComplaints(region) {
  return await http.get(`${config["BASEURL"]}` + '/web/level3/getall/'+region);
  //this will returns complaints those are status==Ongoing or status==Completed
}

export function getFullComplaint(id){
  return  http.get(`${config["BASEURL"]}`+'/web/level3/get/'+id);
}

export function updateComplaint(id, complaint) {
  console.log(complaint);
  // return  http.put(`${config["BASEURL"]}`+'/web/level3/update/'+id+'/'+complaint);
} 