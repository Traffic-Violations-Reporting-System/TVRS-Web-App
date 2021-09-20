import http from '../httpService';
const config = require("../../config.json");

export async function getNewComplaints(region) {  
  return await http.get(`${config["BASEURL"]}/web/level3/getnew/`+region);
  //this will returns complaints those are status==Accepted
}

export async function getOngoingComplaints(region) {
  return await http.get(`${config["BASEURL"]}/web/level3/getongoing/`+region);
  //this will returns complaints those are status==Ongoing 
}

export async function getCompletedComplaints(region) {
  return await http.get(`${config["BASEURL"]}/web/level3/getcompleted/`+region);
  //this will returns complaints those are status==Completed
}

export async function getAllComplaints(region) {
  return await http.get(`${config["BASEURL"]}/web/level3/getall/`+region);
  //this will returns complaints those are status==Completed status==Ongoing st
}

export function getFullComplaint(id){
  return  http.get(`${config["BASEURL"]}/web/level3/get/`+id);
}

export function updateComplaint(complaint) {
  return  http.put(`${config["BASEURL"]}/web/level3/update`,complaint);
} 