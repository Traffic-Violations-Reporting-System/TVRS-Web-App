import http from '../httpService';
import jwtDecode from "jwt-decode";

export async function login(email,password){
    const {data:jwt} =await http.post('http://localhost:4000/web/login',{email,password});
    localStorage.setItem('token',jwt);

}

