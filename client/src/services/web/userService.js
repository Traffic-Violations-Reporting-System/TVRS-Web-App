import http from '../httpService';
import jwtDecode from "jwt-decode";
const config = require("../../config.json");

export async function login(email,password){
    const {data:jwt} =await http.post(`${config["BASEURL"]}`+'/'+'web/login',{email,password});
    localStorage.setItem('token',jwt);
    if(jwt){
      return jwtDecode(jwt).role;
    }
    return null;
}
export async function forgotPassword(email){
    const {data:jwt} =await http.post(`${config["BASEURL"]}`+'/'+'web/forgot',{email});
    localStorage.setItem('token',jwt);
}

export async function setPassword(newpassword,confirmpassword,token,email){
    const {data:jwt} =await http.post(`${config["BASEURL"]}`+'/'+'web/set',{newpassword,confirmpassword,token,email});
    localStorage.setItem('token',jwt);
}

export async function getUserRoles() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/user/roles');
}

export function register(user){
  return  http.post(`${config["BASEURL"]}`+'/'+'web/user/register',user);
}
export async function getAllUsers() {
  return await http.post(`${config["BASEURL"]}`+'/'+'web/user/view');
}
export function getUser(id){
  return  http.get(`${config["BASEURL"]}`+'/'+'web/user/select'+'/'+id);
}

export function updateUser(user,selectedUser){

  return  http.put(`${config["BASEURL"]}`+'/'+'web/user/update'+'/'+selectedUser,user);
}

export function viewUser(id){

  return  http.get(`${config["BASEURL"]}`+'/'+'web/user/profile'+'/'+id);
}

export function getCurrentUser(){

  const jwt = localStorage.getItem('token');
  if(jwt) return jwtDecode(jwt);
  return false;
}
export function logout(){
  localStorage.removeItem('token');
}
export function getJwt(){
  return localStorage.getItem('token');
}
export async function getPoliceDivision() {
  return await http.get(`${config["BASEURL"]}`+'/'+'web/user/division');
}
