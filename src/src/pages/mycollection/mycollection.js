import React, {Component} from 'react';
import {Card, Button, Popover, Tooltip, Image, Divider, Tag, Row, message,Alert} from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';

import plantTest from './image/erro.png';

import {EnvironmentTwoTone,FireTwoTone,DeploymentUnitOutlined,WarningOutlined,NodeIndexOutlined,HeartTwoTone} from '@ant-design/icons';
import memoryUtils from "../../utils/memoryUtils";
import fire from "../../api/commonFirebase";

const { Meta } = Card;
const desc = ['terrible', 'bad', 'aaa', 'good', 'wonderful'];


export default class myCollection extends Component{
    state = {
        value: 3,
        list:[],
    };

    handleChange = value => {
        this.setState({ value });
    };

    /**
     * @function：queryCollection
     * @parameter： null
     * @description： Query all the favorites and render the page in real time
     */
    queryCollection=()=>
    {
        var user = memoryUtils.user.username;
        var ref = fire.database().ref("foodcollection").orderByChild("id").equalTo(user).once("value",(data)=>{
            const value = data.val();
            console.log(value);
            const valuelist = [];
            //Store the data in the parameters of the render page
            for(let id in value) {
                if(value[id].imageurl == null)
                {
                    value[id].imageurl =plantTest;
                }
                valuelist.push({_ID:id,ID:value[id].ID,
                        name:value[id].name,
                        calories:value[id].calories,
                        carbohydrates:value[id].carbohydrates,
                        fat:value[id].fat,
                        fiber:value[id].fiber,
                        imageurl:value[id].imageurl,
                        protein:value[id].protein,type:value[id].type
                    }
                );
            }
            console.log(valuelist);
            this.setState({list:valuelist})
            console.log(this.state.list);
        });
        this.setState({loading:false})

    }
    componentDidMount() {
        this.queryCollection();

    }
    /**
     * @function：DeleteCollection
     * @parameter： user information
     * @description： Delete the corresponding favorites with the corresponding  ID
     */
    DeleteCollection =(user)=>{
        var Myuser = memoryUtils.user.username;
        var ref = fire.database().ref("foodcollection/"+user._ID).remove()
        this.queryCollection();
        message.success("Delete success!:"+user.name)
        this.setState({loading:false})
    }

    render() {

        const { value,list } = this.state;

        const renderCard = (card,index)=>{
            return(

                <Card
                    hoverable
                    style={{ width: 290 }}
                    cover={
                        <Image width={290} height={290} alt="example" src={card.imageurl}   fallback="data:image/png;base64,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"
                        />}
                    className="box"
                >
                    <Meta title={card.name} >

                    </Meta>
                    <Divider />
                    <Alert
                        message=""
                        description={card.type}
                        type="info"
                        showIcon
                    />
                    <Divider />
                    <Tag color="red" icon={< FireTwoTone  ></FireTwoTone>} color="red">
                        Calories:{card.calories}
                    </Tag>
                    <Divider type="vertical" />
                    <Tag icon={ <WarningOutlined />} color="orange">
                        Fat:{card.fat}
                    </Tag>
                    <Divider type="vertical" />

                    <Tag icon={< DeploymentUnitOutlined  ></DeploymentUnitOutlined>} color="orange">
                        Sugar:{card.carbohydrates}
                    </Tag>
                    <Divider type="vertical" />
                    <Tag icon={<NodeIndexOutlined />} color="green">
                        Fiber:{card.fiber}
                    </Tag>
                    <Divider type="vertical" />
                    <Tag icon={<HeartTwoTone twoToneColor="#eb2f96"/>} color="green">
                        Protein:{card.protein}
                    </Tag>

                    <Divider/>

                    <Button type="primary" shape="round"  icon={<DeleteOutlined />} onClick={()=>this.DeleteCollection(card)}/>
                </Card>
            )
        }
        return (
            //Use a map to traverse the card data and display it on the page
            <Row className="grid">
                {list.map(renderCard)}
            </Row>

        )
    }
}