import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RegistrationForm from "./r";
const { Option } = Select;

class RegistrationDrawer extends React.Component {
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

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer} style={{ marginRight: 8 }}>
                    <PlusOutlined /> New account
                </Button>

                <Drawer
                    title="Create a new account"
                    width={550}

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

                        </div>
                    }
                >
                    <RegistrationForm/>
                </Drawer>
            </>
        );
    }
}

export default RegistrationDrawer;