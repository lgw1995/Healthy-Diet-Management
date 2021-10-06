import React, {Component} from 'react';
import {Form, Input, InputNumber, Button, Card, message,Select } from 'antd';
import PicturesWall from './uploadimg'
import memoryUtils from "../../utils/memoryUtils";
const {Item} = Form


const { Option } = Select;
export default class addFoodcard extends Component{
    constructor(props) {
        super(props);
        this.pw = React.createRef()

    }
    state = {
        plan:"breakfast",
    }

    /**
     * @function：postUserData
     * @parameter： Upload food Information parameters
     * @description： Add food infomation to the card page
     */
    postUserData(values)
    {

        console.log(values)


        fetch("https://cs385-food.firebaseio.com/foodcollection.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            //POST body
            body: JSON.stringify({
                id: memoryUtils.user.username,
                name: values.foodname,
                calories:values.calories,
                carbohydrates:values.sugar,
                fat:values.fat,
                protein:values.protein,
                imageurl:values.url,
                fiber:values.fiber,
                type:values.plan
            })
        })
    }
    render() {
        //layout parameters
        const layout = {
            labelCol: {
                span:2,
            },
            wrapperCol: {
                span: 5,
            },
        };


        /**
         * @function：Button response function
         * @parameter： Upload food Information parameters
         * @description： Add food infomation to the card page
         */
        const onFinish = (values) => {
            //Prepare the image URL in advance
           values.url = this.pw.current.getImgUrl()
           values.plan= this.state.plan
            //Call transfer function
           this.postUserData(values)
           message.success("successful")
        };
        const handleChange = (value)=> {
            console.log("change:"+value)
            this.setState({plan:value})
        }
        return (

            <Card >
                <Form {...layout} name="nest-messages" onFinish={onFinish} >
                    <Form.Item
                        name={['foodname']}
                        label="Food name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={['calories']}
                        label="Calories"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={['fat']}
                        label="Fat"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={['sugar']}
                        label="Sugar"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={['fiber']}
                        label="Fiber"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['protein']}
                        label="Protein"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={['plan']}
                        label="Plan"
                    >
                        <Select defaultValue="breakfast" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="breakfast">Breakfast</Option>
                            <Option value="lunch">Lunch</Option>
                            <Option value="dinner">Dinner</Option>
                        </Select>
                    </Form.Item>



                    <Form.Item
                        name={['picture']}
                        label="Picture:"
                    >
                        <PicturesWall ref={this.pw}/>
                    </Form.Item>


                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}


