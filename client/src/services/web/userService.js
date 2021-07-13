import http from '../httpService';
import jwtDecode from "jwt-decode";

export async function login(email,password){
    const {data:jwt} =await http.post('http://localhost:4000/web/login',{email,password});
    localStorage.setItem('token',jwt);
    if(jwt){
      return jwtDecode(jwt).role;
    } 
    return null;
}
export async function forgotPassword(email){
    const {data:jwt} =await http.post('http://localhost:4000/web/forgot',{email});
    localStorage.setItem('token',jwt);
}

export async function setPassword(newpassword,confirmpassword,token,email){
    const {data:jwt} =await http.post('http://localhost:4000/web/set',{newpassword,confirmpassword,token,email});
    localStorage.setItem('token',jwt);
}

export async function getUserRoles() {
  return await http.get('http://localhost:4000/web/user/roles');
}

export function register(user){ 
  return  http.post('http://localhost:4000/web/user/register',user);
}
export async function getAllUsers() {
  return await http.post('http://localhost:4000/web/user/view');
}
export function getUser(id){
  return  http.get('http://localhost:4000/web/user/select'+'/'+id);
}

export function updateUser(user,selectedUser){
      
  return  http.put('http://localhost:4000/web/user/update'+'/'+selectedUser,user);
}

export function getCurrentUser(){

  const jwt =localStorage.getItem('token');
  if(jwt) return jwtDecode(jwt);
  return false;
}
