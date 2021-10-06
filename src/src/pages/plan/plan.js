import React, {Component} from 'react';
import {Tabs,Progress } from 'antd';
import Breakfast from "./breakfast";
import Dinner from "./dinner";
import Lunch from "./lunch";



const { TabPane } = Tabs;

export default class Plan extends Component{

    render() {


        return (
            <div className="card-container">


                <Tabs type="card">

                    <TabPane tab="Breakfast" key="1">
                        <Breakfast></Breakfast>
                    </TabPane>
                    <TabPane tab="Lunch" key="2">
                        <Lunch></Lunch>
                    </TabPane>
                    <TabPane tab="Dinner" key="3">
                       <Dinner/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}