import React, {Component} from 'react';
import firebase from "firebase";
import {List, Card, Table, Button, message, Tabs, Image, Col, Row, Divider, Progress, Statistic, Tag} from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import fire from "../../api/commonFirebase";
import plantTest from "../mycollection/image/erro.png";
import {
    ArrowUpOutlined,
    DeploymentUnitOutlined,
    FireTwoTone, HeartTwoTone,
    NodeIndexOutlined,
    WarningOutlined
} from '@ant-design/icons';


const { TabPane } = Tabs;

export default class Dinner extends Component{
    state = {
        loading:false,
        foodkcala:0,
        listinformation:[],
        list:[],
        fat:0,
        sugar:0,
        fiber:0,
        protein:0,
    }

    DeleteCollection =(user)=>{
        var Myuser = memoryUtils.user.username;
        var ref = fire.database().ref("foodcollection/"+user._ID).remove()
        this.queryCollection();
        message.success("Delete success!:"+user.name)
        this.setState({loading:false})
    }
    initColumns = () =>{
        this.columns = [
            {
                title: 'Food name',
                dataIndex: 'name',
            },
            {
                title: 'Kcal',
                dataIndex: 'calories',
            },
            {
                title: 'image',
                dataIndex: 'imageurl',
                render: (dataIndex) => <Image width={60} height={60}  src={dataIndex}></Image>,
            }
            ,
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                width:300,
                render: (user) => <Button onClick={()=>this.DeleteCollection(user)}>Delete</Button>,
            },

        ];
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.queryCollection();
        this.queryInformation();
    }
    queryInformation =()=>{
        var user = memoryUtils.user.username.split(".")[0];
        console.log(user)
        var ref = fire.database().ref("userinformation/" + user);
        var value;
        ref.once("value", (data) => {
            value = data.val();
            console.log(value)

            this.setState({listinformation: value}, () => {

            })
        });
    };

    queryCollection=()=>
    {
        var user = memoryUtils.user.username;
        var ref = fire.database().ref("foodcollection").orderByChild("id").equalTo(user).once("value",(data)=>{
            const value = data.val();
            console.log(value);
            const valuelist = [];
            var vcalories = 0;
            var vfat = 0;
            var vsugar = 0;
            var vfiber = 0;
            var vprotein = 0;
            for(let id in value) {
                if(value[id].imageurl == null)
                {
                    value[id].imageurl =plantTest;
                }
                if(value[id].type == "dinner")
                {
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
                var calories = parseInt(value[id].calories);
                var sugar = parseFloat(value[id].carbohydrates);
                var fat = parseFloat(value[id].fat);
                var fiber = parseFloat(value[id].fiber);
                var protein =  parseFloat(value[id].protein);
                vcalories += calories;
                vfat += fat;
                vsugar += sugar;
                vfiber += fiber;
                vprotein += protein;

            }
            console.log(valuelist);
            this.setState({list:valuelist})
            this.setState({foodkcala:vcalories})
            this.setState({sugar:vsugar})
            this.setState({fat:vfat})
            this.setState({fiber:vfiber})
            this.setState({protein:vprotein})

            console.log(this.state.list);
        });
        this.setState({loading:false})

    }

    render() {

        const {list,loading} = this.state
        const BreakfastCardTitle ="Breakfast plan";
        return (
            <div>
                <Card title={BreakfastCardTitle} >
                    <Table
                        bordered = {true}
                        dataSource={list}
                        loading = {loading}
                        columns={this.columns}
                        pagination = {{defaultPageSize:3,showQuickJumper:true}}
                    />
                </Card>
                <Divider />
                <Row gutter={16}>
                    <Col span={8}>
                        <Card  style={{ width: 350,height:250 }} title="Total intake" bordered={false}>
                            <Progress width={150} height={200}  strokeLinecap="square" type="dashboard" percent={((this.state.foodkcala/this.state.listinformation.dailycalories)*100).toFixed(2)} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card style={{ width: 350,height:250 }} title="Overflow" bordered={false}>
                            <Statistic
                                title="Overflow"
                                value={((this.state.foodkcala/this.state.listinformation.dailycalories)*100)>=100?((this.state.foodkcala/this.state.listinformation.dailycalories)*100)-100:0}
                                precision={2}
                                valueStyle={ { color: '#cf1322' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>


                        <Card  style={{ width: 350,height:250 }} title="All types of intake" bordered={false}>
                            <Tag color="red" icon={< FireTwoTone  ></FireTwoTone>} color="red">
                                Calories:{this.state.foodkcala.toFixed(2)}
                            </Tag>
                            <Divider type="vertical" />
                            <Tag icon={ <WarningOutlined />} color="orange">
                                Fat:{this.state.fat.toFixed(2)}
                            </Tag>
                            <Divider type="vertical" />

                            <Tag icon={< DeploymentUnitOutlined  ></DeploymentUnitOutlined>} color="orange">
                                Sugar:{this.state.sugar.toFixed(2)}
                            </Tag>
                            <Divider type="vertical" />
                            <Tag icon={<NodeIndexOutlined />} color="green">
                                Fiber:{this.state.fiber.toFixed(2)}
                            </Tag>
                            <Divider type="vertical" />
                            <Tag icon={<HeartTwoTone twoToneColor="#eb2f96"/>} color="green">
                                Protein:{this.state.protein.toFixed(2)}
                            </Tag>                      </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}