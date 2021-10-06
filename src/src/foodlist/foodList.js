import React from 'react';
import Modal from 'react-awesome-modal';
import './Modal.css';
import './food.css'
import "firebase/auth";
import memoryUtils from "../../src/utils/memoryUtils";
import {Card, Avatar, Image, Input, Empty} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {message} from "antd/es";

const {Meta} = Card;
const {Search} = Input;

class PlantListComponent extends React.Component {
    /*
        state:
        visible: Control pop-up window display
        num: The index of the food displayed in the pop-up window in the search list
        selected: Default options in the select box in the pop-up window
        items: All food returned from the database
        displayitems: List of foods displayed based on search results
     */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            visible: false,
            num: 0,
            selected: "breakfast",
            items: [],
            displayitems: []
        };
        this.onSearch = this.onSearch.bind(this);
    }


    /**
     * @function：getPlantData
     * @description：Get all food information from the database
     */
    getPlantData() {
        fetch("https://cs385-food.firebaseio.com/food.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        displayitems: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    /**
     * @function：foodcollection
     * @parameter： food object
     * @description： Add food infomation to the collection table
     */
    foodcollection(food) {

        fetch("https://cs385-food.firebaseio.com/foodcollection.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    name: food.name,
                    type: this.state.selected,
                    calories: food.calories,
                    carbohydrates: food.carbohydrates,
                    fat: food.fat,
                    fiber: food.fiber,
                    imageurl: food.imageurl,
                    protein: food.protein,
                    id: memoryUtils.user.username
                }
            )

        })
        this.closeModal();
        message.success(food.name + " has been added to your Collection!");
    }

    /**
     * @function：handleChange
     * @parameter： index
     * @description：Change the selected value according to the selected value in the select box
     */
    handleChange(value) {
        console.log(value)
        this.setState({
            selected: value
        });
    }

    componentDidMount() {
        this.getPlantData();
    }

    /**
     * @function：openModal
     * @parameter： input
     * @description：Open the pop-up window and set the index of the food to be displayed
     */
    openModal(input) {
        this.setState({
            visible: true,
            num: input
        });
    }

    /**
     * @function：closeModal
     * @description：Close popup window
     */
    closeModal() {
        this.setState({
            visible: false
        });
    }

    /**
     * @function：onSearch
     * @parameter： text
     * @description：Match the food name according to the incoming text and return the list
     */
    onSearch(text) {
        var items = this.state.items;
        var result = [];
        items.filter(item => {
                if (item.name.includes(text)) {
                    result.push(item)
                }
            }
        );
        console.log(result.length);
        this.setState({
            displayitems: result
        });
    }

    render() {
        const {error, isLoaded, items, displayitems, num} = this.state;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div> Loading...</div>;
        } else if (displayitems.length > 0) {
            return (
                <div>
                    <Search placeholder="input food name" onSearch={this.onSearch} enterButton/>

                    <div className="row">
                        <div className="column">

                            {displayitems.map((food, i) => (
                                <div className="foods testa" key={i}>
                                    <Card

                                        style={{width: 242}}
                                        cover={
                                            <Image
                                                alt="example"
                                                src={food.imageurl}
                                            />
                                        }
                                        actions={[
                                            <PlusCircleOutlined key="add" onClick={() => this.openModal(i)}/>
                                        ]}
                                    >
                                        <Meta
                                            title={food.name}
                                            description={"calories:" + food.calories + " | fat:" + food.fat}
                                        />
                                    </Card>
                                </div>

                            ))}

                        </div>
                    </div>


                    <Modal visible={this.state.visible} width="400" height="400" effect="fadeInUp"
                           background-color="red" onClickAway={() => this.closeModal()}>
                        <div className="Modal">
                            <h4 style={{color: "black"}}>{displayitems[num].name}</h4>
                            <text style={{color: "black"}}>fat: {displayitems[num].fat}<br></br></text>
                            <text style={{color: "black"}}>calories: {displayitems[num].calories}<br></br></text>
                            <text style={{color: "black"}}>carbohydrates: {displayitems[num].carbohydrates}<br></br>
                            </text>
                            <text style={{color: "black"}}>fiber: {displayitems[num].fiber}<br></br></text>
                            <text style={{color: "black"}}>protein: {displayitems[num].protein}<br></br></text>
                        </div>


                        <div className="select-box">
                            <div className="sel-list">
                                <select id="foodselect" value={this.state.selected}
                                        onChange={e => this.handleChange(e.target.value)}>
                                    <option value="breakfast">breakfast</option>
                                    <option value="lunch">lunch</option>
                                    <option value="dinner">dinner</option>
                                </select>
                            </div>

                            <div class="sel-btn">
                                <button class="sel-btn" id="addFood" onClick={() => this.foodcollection(items[num])}>Add
                                    to
                                    Collection
                                </button>
                            </div>
                        </div>


                    </Modal>

                </div>

            );
        } else {
            return (
                <div>
                    <Search placeholder="input food name" onSearch={this.onSearch} enterButton/>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            );
        }
    }
}

export default PlantListComponent;
