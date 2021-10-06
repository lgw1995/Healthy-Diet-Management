
/*
routing component of Login page
 */
import React,{Component,Option} from "react";
import {Link, Redirect} from "react-router-dom";
import 'antd/dist/antd.css';
import { message} from 'antd';
import loginjpg from './images/login1.jpg'
import Demo from './l'
import memoryUtils from "../../utils/memoryUtils";
import '../login/loginstyle.css'


/**
 * @class：Login
 * @parameter：
 * @description： Drawer components
 */
export default class Login extends Component{

    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    topggleForm = () =>{
        var container = document.querySelectorAll('container');
        console.log(container);
        container.classList.toggle('active');
    }

    render() {
        //Check whether to log in
        if(memoryUtils.user.username){
            message.success("Automatic login successful ! " + memoryUtils.username)
            return <Redirect to = '/personal'/>
        }
        return (
            <div className="login">
                <section className="login-section">

                    <div className="login-container">
                        <div className="login-img">
                            <div className="imgBx"><img src={loginjpg} alt=""/></div>
                        </div>
                        <div className="login-user">
                            <h2>Login</h2>
                            <Demo/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}