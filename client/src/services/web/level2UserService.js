import http from '../httpService';
const config = require("../../config.json");

export async function getAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/level2/all');
}
export async function getNewAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/level2/newAll');
}

export function getComplain(id,data){
  return  http.put(`${config["BASEURL"]}`+'/'+'web/level2/get'+'/'+id,data);
}
export function InsertAccept(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/level2/create',data);
}
export function InsertReject(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/level2/reject',data);
}

export function getComplainAction(id) {
  return  http.get(`${config["BASEURL"]}`+'/'+'web/level2/action'+'/'+id);
}

export function getInCompleteComplain(data){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/level2/incompleteComplain',data);
}


