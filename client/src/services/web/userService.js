import http from '../httpService';
import jwtDecode from "jwt-decode";

export async function login(email,password){
    const {data:jwt} =await http.post('http://localhost:4000/web/login',{email,password});
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
