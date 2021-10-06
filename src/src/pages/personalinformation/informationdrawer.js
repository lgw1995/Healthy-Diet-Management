import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './drawer.css';
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, InputNumber, message, Radio} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import memoryUtils from "../../utils/memoryUtils";
import fire from "../../api/commonFirebase";
//a
const { Option } = Select;

export  default  class DrawerForm extends React.Component {
    state = {
        list: {},
        visible: false,
        ratio:1.2,
    };

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
    componentDidMount() {
        this.queryInformation();
    }
    /**
     * @function：queryInformation
     * @parameter：null
     * @description： Query the matching user information through the user mailbox
     */
    queryInformation ()
    {

        var user = memoryUtils.user.username.split(".")[0];
        console.log(user)
        //Get user information
        var ref = fire.database().ref("userinformation/"+user);
        var value;
        ref.once("value",(data)=>{
            value= data.val();
            console.log(value)

            this.setState({list:value},()=>{
                console.log(this.state.list.telephone);
            })

        });






    };
    render() {

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        /**
         * @function：validateMessages
         * @parameter：null
         * @description： The rules set
         */
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        /**
         * @function：onFinish
         * @parameter：values:The user
         * @description： Determine whether the user has changed the value. If it has not changed, the original data will be written; otherwise, the new data will be written
         */
        const onFinish = values => {
            console.log(values);
            //Determine if the user has changed the value
            var user = memoryUtils.user.username.split(".")[0];
            var vaddress = (values.address === undefined ? this.state.list.address : values.address)
            var vage =  (values.age === undefined ? this.state.list.age:values.age)
            var vbmistring = (values.bmistring === undefined ? this.state.list.bmistring:values.bmistring)
            var vintr = (values.introduction === undefined ? this.state.list.introduction:values.introduction)
            var vbmi = (values.bmi === undefined ? this.state.list.bmi:values.bmi)
            var vtelephone = (values.telephone === undefined ? this.state.list.telephone:values.telephone)
            var vgender = (values.gender === undefined ? this.state.list.gender:values.gender)
            var vheight = (values.height === undefined ? this.state.list.height:values.height)
            var vweight = (values.weight === undefined ? this.state.list.weight:values.weight)
            var vfrequency =  (this.state.ratio === undefined ? this.state.list.ratio:this.state.ratio)
            var vdailycalories = 0;
            var vbmr =0;
            //Recalculate BMR
            if(vgender == 'male')
            {
                vbmr = 10*vweight+6.25*vheight-5*vage+5
                vdailycalories = vbmr*vfrequency
            }else
            {
                vbmr = 10*vweight+6.25*vheight-5*vage-161
                vdailycalories = vbmr*vfrequency
            }
            //send data
            fire.database().ref('userinformation/' + user).set({
                address:  vaddress,
                age: vage,
                introduction:vintr,
                bmi:vbmi,
                bmistring:vbmistring,
                telephone:vtelephone,
                gender:vgender,
                height:vheight,
                weight:vweight,
                frequency:vfrequency,
                dailycalories:vdailycalories,
                bmr:vbmr,
            });
            message.success("modify successfully !")
        };
        const handleChange = (value)=> {

            this.setState({ratio:value.target.value})
            console.log("handleChange:"+this.state.ratio)
        }
        return (


            <>
                <Button type="primary" onClick={this.showDrawer}>
                    <SettingOutlined />Setting
                </Button>
                <Drawer
                    title="Modify personal information "
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={'telephone'} label="Telephone">
                            <Input  ref="text" defaultValue={this.state.list.telephone}  ></Input>
                        </Form.Item>

                        <Form.Item name={'age'} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber defaultValue={this.state.list.age}/>
                        </Form.Item>

                        <Form.Item name={'height'} label="Height(cm)">
                            <Input defaultValue={this.state.list.height}/>
                        </Form.Item>

                        <Form.Item name={'weight'} label="Weight(kg)">
                            <Input defaultValue={this.state.list.weight}/>
                        </Form.Item>

                        <Form.Item name={'address'} label="Address"  >
                            <Input defaultValue={this.state.list.address}/>
                        </Form.Item>


                        <Form.Item name={'introduction' } label="Introduction">
                            <Input.TextArea defaultValue={this.state.list.introduction}/>
                        </Form.Item>
                        <Form.Item name={'Exercise frequency'} label="exercise" rules={[{  required: true,
                            message: "Please input your exercise frequency!" }]}>
                            <Radio.Group onChange={handleChange} >
                                <Radio value={1.2}>Little or no exercise</Radio>
                                <Radio value={1.3}>Exercise about 1 ~ 3 times a week</Radio>
                                <Radio value={1.5}>Exercise about 3 ~ 6 times a week</Radio>
                                <Radio value={1.7}>Exercise about 6 ~ 7 times a week</Radio>
                                <Radio value={1.9}>Exercise about 10 ~ 15 times a week</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        );
    }
}
