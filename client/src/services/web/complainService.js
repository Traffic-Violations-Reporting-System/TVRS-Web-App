import http from '../httpService';
const config = require("../../config.json");

export async function getAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/complaine/all');
}
export async function getNewAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/complaine/NewAll');
}


export function getComplain(id,data){
  return  http.put(`${config["BASEURL"]}`+'/'+'web/complaine/get'+'/'+id,data);
}
export function InsertAccept(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/create',data);
}
export function InsertReject(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/reject',data);
}
export function InsertReview(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/review',data);
}
export function getComplainAction(id){
  return  http.get(`${config["BASEURL"]}`+'/'+'web/complaine/action'+'/'+id);
}

export function getInCompleteComplain(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/incompleteComplain',data);
}

export function findSimilarComplaint(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/findSimilar',data);
}
export function margeVideoRefRelatedComplaints(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/complaine/margeVideoRefRelatedComplaints',data);
}

