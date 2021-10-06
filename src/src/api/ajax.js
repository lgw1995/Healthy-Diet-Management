import axios from 'axios'
import {message} from "antd";
export default function ajax(url,data={},type='GET'){

    return new Promise(function (resolve,reject){
        let promise
        if(type === 'GET'){

            promise = axios.get(url,{params:data})//query parameter
        }else{
            message.info(url);
            promise = axios.post(url,data)
        }
        promise.then(response =>{
            // if success
            resolve(response.data)
        }).catch(error => {
            message.error('error:'+error.message)
        })
    })
}

//login request interface
//ajax('/login',{username:'TestUsername',password:'TestPassword'},POST).then()
