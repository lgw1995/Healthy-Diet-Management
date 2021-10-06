import React, {Component} from 'react';
import {Badge, Descriptions, Divider , message,Modal,Button} from "antd";
import memoryUtils from "../../utils/memoryUtils";
import DrawerForm from './informationdrawer'
import fire from "../../api/commonFirebase";

import {Redirect} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();
const { confirm } = Modal;
export default class PersonalInformation extends Component{
    state = {
        list: {},
    };
    componentDidMount() {
        this.queryInformation();
    }

    /**
     * @function：queryInformation
     * @parameter：null
     * @description： The query data is displayed via Firbase
     */
    queryInformation () {
        var user = memoryUtils.user.username.split(".")[0];
        console.log(user)
        //query userinformation data
        var ref = fire.database().ref("userinformation/" + user);
        var value;
        //get userinformation data
        ref.once("value", (data) => {
            value = data.val();
            console.log(value)

            this.setState({list: value}, () => {
                console.log(this.state.list.telephone);
            })
        });
    };
    render() {
        /**
         * @function：showDeleteConfirm
         * @parameter：null
         * @description：Delete account operations and delete all data information for this account
         */
        function showDeleteConfirm() {
            confirm(
                {
                title: 'Delete the account',
                icon: <ExclamationCircleOutlined />,
                content: ' Are you sure you want to delete your account? Any information that contains you will disappear!',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    //Login your account again
                    fire.auth().signInWithEmailAndPassword(memoryUtils.user.username,memoryUtils.user.password)
                    var user = fire.auth().currentUser
                    console.log("signIn:"+user)
                    //delete account
                    user.delete().then(function() {
                        //If successful
                        var user = memoryUtils.user.username;
                        //delete food collection
                        fire.database().ref("foodcollection").orderByChild("id").equalTo(user).once("value",(data)=> {

                            const value = data.val();
                            for (let id in value) {
                                fire.database().ref("foodcollection/" + id).remove()
                            }
                        });
                        //delete comments data
                        fire.database().ref("comments").orderByChild("ID").equalTo(user).once("value",(data)=> {

                            const value = data.val();
                            for (let id in value) {
                                fire.database().ref("comments/" + id).remove()
                            }
                        });
                        //delete userinformation data
                        fire.database().ref("userinformation/"+memoryUtils.user.username.split('.')[0]).remove()
                        memoryUtils.user = {};
                        message.success("Delete succeed")
                    }).catch(function(error) {
                        // An error happened.
                        message.error(error.toString())
                    });

                    return <Redirect to = '/login/'/>

                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
        const user = memoryUtils.user;
        return (

            <div style={{ background: '#ffffff',top: '-16px'  }}>
                <Divider />
                <Descriptions title=" &nbsp;  &nbsp; &nbsp;User Info" bordered>
                    <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
                    <Descriptions.Item label="Advice">{this.state.list.bmistring}</Descriptions.Item>

                    <Descriptions.Item label="BMR">{this.state.list.bmr}</Descriptions.Item>
                    <Descriptions.Item label="daily Kcal">{this.state.list.dailycalories} Kcal</Descriptions.Item>
                    <Descriptions.Item label="BMI">{this.state.list.bmi}</Descriptions.Item>

                    <Descriptions.Item label="Address" span={2}>
                        {this.state.list.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="online" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">{this.state.list.gender}</Descriptions.Item>
                    <Descriptions.Item label="Age">{this.state.list.age}</Descriptions.Item>
                    <Descriptions.Item label="Height">{this.state.list.height}</Descriptions.Item>
                    <Descriptions.Item label="Weight">{this.state.list.weight}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{this.state.list.telephone}</Descriptions.Item>
                    <Descriptions.Item label=" Introduction">
                        {this.state.list.introduction}
                    </Descriptions.Item>
                </Descriptions>
                <DrawerForm/>
                <Button className="site-button-ghost-wrapper"  danger onClick={showDeleteConfirm} type="dashed">
                    Delete the account
                </Button>
            </div>

        )
    }
}