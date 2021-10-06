import React, {Component} from 'react';
import { Carousel,Divider } from 'antd';
import './type.css'
export default class About extends Component{
    render() {
        const contentStyle = {
            height: '300px',
            color: '#fff',
            lineHeight: '200px',
            textAlign: 'center',
            background: '#364d79',
        };
        return (

            <div className="indexcss">
                <section className="services-section">
                    <div className="inner-width">
                        <h1>Our <strong>Food App</strong></h1>
                        <Carousel autoplay>

                            <div className="service">
                                <div className="service-icon">
                                    <i className="fas fa-paint-brush"></i>
                                </div>
                                <div className="service-name">Design</div>
                                <div className="service-desc">You can customize your favorite cards and add them to your daily food list</div>
                            </div>


                            <div className="service">
                                <div className="service-icon">
                                    <i className="fas fa-database"></i>
                                </div>
                                <div className="service-name">Our Food Database</div>
                                <div className="service-desc">We have a strong food database so you can find the food you want here!
                                </div>
                            </div>


                            <div className="service">
                                <div className="service-icon">
                                    <i className="fas fa-pencil-alt"></i>
                                </div>
                                <div className="service-name">Search Food</div>
                                <div className="service-desc">You can search for the foods you want to know about in our APP !
                                </div>
                            </div>



                            <div className="services owl-carousel">
                                <div className="service">
                                    <div className="service-icon">
                                        <i className="fas fa-headset"></i>
                                    </div>
                                    <div className="service-name">Health</div>
                                    <div className="service-desc">Calculate your daily calorie and fat intake by customizing.
                                        your three meals a day!
                                    </div>
                                </div>
                            </div>
                        </Carousel>


                    </div>
                </section>

            </div>
        )
    }
}