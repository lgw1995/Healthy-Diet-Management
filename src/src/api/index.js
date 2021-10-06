/*
* Contains N request interface function modules
* */
import ajax from './ajax'
const BASE = 'http://localhost:3000'
//login

export const reqLogin = (username,password) => ajax(BASE+'/Login',{username,password},'POST')

//Registered users
export const reqRegister = (username,password,email) => ajax(BASE+'/Login',{username,password,email},'POST')