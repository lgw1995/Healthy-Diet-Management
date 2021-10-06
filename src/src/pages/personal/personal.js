/*
routing component of personal page
 */
import React,{Component} from "react";
import {Redirect,Link,Route,Switch} from 'react-router-dom'

import {message,Image,Button,Modal} from "antd";

import { Layout, Menu, Breadcrumb } from 'antd';
import {
   ExclamationCircleOutlined ,
    SearchOutlined,
    CalendarOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    CommentOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './personal.css'

import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { withRouter } from 'react-router-dom';

import {formateDate} from "../../utils/dateUtils";
import Comments from "../comments/comments.js"
import About from "../about/about";
import PlantListComponent from "../../foodlist/foodList";
import PersonalInformation from "../personalinformation/personalinformation"
import myCollection from "../mycollection/mycollection";
import Plan from "../plan/plan";
import addFoodcard from "../addfoodcard/addfoodcard";

const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
 class Personal extends Component{
    state = {
        collapsed: false,
        currentTime:formateDate(Date.now()),
    };
      this = this
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
     /**
      * @function：showDeleteConfirm
      * @parameter：null
      * @description： User logout operation
      */
      showDeleteConfirm =()=> {
         confirm({
             title: 'Warning notices',
             icon: <ExclamationCircleOutlined />,
             content: 'Are you really ready to log out?',
             okText: 'Yes',
             okType: 'danger',
             cancelText: 'No',
             onOk:()=> {
                 console.log('OK');
                 //Deletes user information stored locally
                 storageUtils.removeUser();
                 memoryUtils.user={};
                 memoryUtils.userID = {};

                 message.success("log out success!");
                 //Page jump
                 this.props.history.replace('/');
                 this.forceUpdate();

             },
             onCancel() {
                 console.log('Cancel');
             },
         });
     }
     /**
      * @function：getTime
      * @parameter：null
      * @description： Gets the current time and date
      */
     getTime=()=>{
          setInterval(()=>{
              //Format time and date
              const currentTime = formateDate(Date.now())
              this.setState({currentTime})
          },1000)
     }
     componentDidMount() {
        this.getTime();
     }

     render() {
        const{currentTime} = this.state
        const user = memoryUtils.user.username;
        console.log("per:"+user)
        //Check whether to log in
        if(!user){
            return <Redirect to = '/login'/>
        }




        const { collapsed } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>


                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} width={300}>
                    <div className="logo" style={{ minHeight: '15vh' }}> </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />} >
                            <Link to ='/personal/about/about'>About</Link>

                        </Menu.Item>

                        <SubMenu key="sub1" icon={<UserOutlined />} title={user} >
                            <Menu.Item key="3"> <Link to ='/personal/personalinformation'>Personal information</Link></Menu.Item>
                            <Menu.Item key="4"> <Link to ='/personal/mycollection'>My food collection</Link></Menu.Item>
                            <Menu.Item key="5"> <Link to ='/personal/addfoodcard'>Add custom card</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="2" icon={<CalendarOutlined />}>
                           <Link to ='/personal/plan'>Plan</Link>
                        </Menu.Item>


                        <Menu.Item key="9" icon={<SearchOutlined />}>
                            <Link to ='/personal/search'>Search</Link>
                        </Menu.Item>
                        <Menu.Item key="13" icon={<CommentOutlined />}>
                            <Link to ='/personal/comments'>Comment</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                {/*Log out button*/}
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ margin: '0 16px' }}>
                        <div>
                            <Button onClick={this.showDeleteConfirm} type="dashed">Log out</Button>
                            <span> &ensp;   &ensp;   </span>
                            <span style={{ right: '80px' }}>{currentTime}</span>
                        </div>

                    </Header>

                    <Content style={{ margin: '0 16px' }}>
                        <div>
                            {/*Routing management for personal pages*/}
                            <Switch>
                                <Route path='/personal/mycollection' component={myCollection}/>
                                <Route path='/personal/personalinformation' component={PersonalInformation}/>
                                <Route path='/personal/about' component={About}/>
                                <Route path='/personal/plan' component={Plan}/>
                                <Route path='/personal/addfoodcard' component={addFoodcard}/>
                                <Route path='/personal/search' component={PlantListComponent}/>
                                <Route path='/personal/comments' component={Comments}></Route>
                                <Redirect to='/personal/about'/>
                            </Switch>
                        </div>

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>CS385 Team Chromium Copyright © 2020</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(Personal);