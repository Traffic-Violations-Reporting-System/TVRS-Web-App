import http from '../httpService';
const config = require("../../config.json");

export async function getAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/complaine/all');
}
export async function getNewAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/complaine/NewAll');
}

export function getComplain(id){
  return  http.get(`${config["BASEURL"]}`+'/'+'web/complaine/get'+'/'+id);
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
