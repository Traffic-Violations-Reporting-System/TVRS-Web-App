import http from '../httpService';
import jwtDecode from "jwt-decode";

export async function login(email,password){
    const {data:jwt} =await http.post('http://localhost:4000/web/login',{email,password});
    localStorage.setItem('token',jwt);
}

export async function forgotPassword(email){
    const {data:jwt} =await http.post('http://localhost:4000/web/forgot-password',{email});
    localStorage.setItem('token',jwt);
}

export async function setPassword(newpassword){
    const {data:jwt} =await http.post('http://localhost:4000/web/set-password',{newpassword});
    localStorage.setItem('token',jwt);
}

