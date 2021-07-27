import http from '../httpService';
const config = require("../../config.json");
export async function getAllComplain() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/complaine/all');
}
