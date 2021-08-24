import http from '../httpService';
import jwtDecode from "jwt-decode";
const config = require("../../config.json");

export async function getAllComplaints() {
   return await http.get(`${config["BASEURL"]}`+'/'+'web/user/view');
 }