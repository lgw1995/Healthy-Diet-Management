import fire from "../../api/commonFirebase";
import "antd/dist/antd.css";
import {Form, Input, Button, message, InputNumber,Radio} from "antd";
import React,{Component} from "react";
class  RegistrationForm extends Component{
    state = {
        ratio:1.2,
        gender:'male',
    }
     formItemLayout = {
        labelCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 8
            }
        },
        wrapperCol: {
            xs: {
                span: 24
            },
            sm: {
                span: 16
            }
        }
    };
     tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    };

    /**
     * @function：onFinish
     * @parameter：Various information about registered users
     * @description： Calculate BMI, BMR and so on and store them in the database
     */
     onFinish = (v) => {
         v.gender = this.state.gender
         v.frequency = this.state.ratio
         //Calculate BMI
         v.bmi = v.weight / ((v.height / 100.0)*(v.height / 100.0)) ;
         //Calculate BMR by sex
         if(v.gender == 'male') {
             //Male BMR algorithm calculation
             v.bmr = 10*v.weight+6.25*v.height-5*v.age+5
             v.dailycalories = v.bmr*v.frequency
         }else {
             //Female algorithm is calculation
             v.bmr = 10*v.weight+6.25*v.height-5*v.age-161
             v.dailycalories = v.bmr*v.frequency
         }
         v.bmistring = this.GetBmitostring(v.bmi);
         console.log(v)
         //send create user request
        fire.auth().createUserWithEmailAndPassword(v.email,v.password).then((u)=>{
            var user =v.email.split(".")[0];
            fire.database().ref('userinformation/' + user).set({
                address:'null',
                age: v.age,
                weight:v.weight,
                height:v.height,
                introduction:'null',
                gender:v.gender,
                telephone:'null',
                bmi:v.bmi,
                bmistring:v.bmistring,
                frequency:v.frequency,
                dailycalories:v.dailycalories,
                bmr:v.bmr
            });
            message.success(v.email+" Create success!")
        }).catch((error)=>{
            message.error(error.message);
        });
    };
    /**
     * @function：GetBmitostring
     * @parameter：BMI
     * @description：Generate the corresponding string based on BMI
     */
    GetBmitostring = (fac)=>{
        var fst = "";
        if(fac<18.5) fst = "Underweight <18.5 ";
        if(fac>=18.5 && fac<25) fst = "Normal weight  18.5–24.9";
        if(fac>=25 && fac<30) fst = "Overweight 25–29.9";
        if(fac>=30) fst = "Obesity BMI of 30 or greater";
        return fst.toString();
    }
    render() {
        const handleChange = (value)=> {

            this.setState({ratio:value.target.value})
            console.log("handleChange:"+this.state.ratio)
        }
        const genderChange = (value)=> {
            console.log("genderChange:"+value.target.value)
            this.setState({gender:value})
        }
        return(
            <Form
                {...this.formItemLayout}
                form={this.form}
                name="register"
                onFinish={this.onFinish}

                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!"
                        },{
                            min: 6,
                            message: "Please enter a length of at least 6 digits"
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!"
                        },
                        {
                            min: 6,
                            message: "Please enter a length of at least 6 digits"
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                );
                            }
                        })
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="height"
                    label="Height(cm)"
                    rules={[
                        {
                            required: true,
                            message: "Please input your height !"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="weight"
                    label="Weight(kg)"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Weight !"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={'age'} label="Age" rules={[{ required: true,type: 'number', min: 0, max: 99 }]}>
                    <InputNumber/>
                </Form.Item>

                <Form.Item name={'gender'} label="Gender">
                    <Radio.Group onChange={genderChange} defaultValue={'male'} value={this.state.gender}>
                        <Radio value={'male'}>male</Radio>
                        <Radio value={'female'}>female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name={'Exercise frequency'} label="exercise" rules={[{ required: true}]}>
                    <Radio.Group onChange={handleChange} >
                        <Radio value={1.2}>Little or no exercise</Radio>
                        <Radio value={1.3}>Exercise about 1 ~ 3 times a week</Radio>
                        <Radio value={1.5}>Exercise about 3 ~ 6 times a week</Radio>
                        <Radio value={1.7}>Exercise about 6 ~ 7 times a week</Radio>
                        <Radio value={1.9}>Exercise about 10 ~ 15 times a week</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>
        )
    }
}
export default RegistrationForm;