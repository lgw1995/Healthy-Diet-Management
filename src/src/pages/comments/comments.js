import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import React,{Component} from "react";
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";
import fire from "../../api/commonFirebase";
const { TextArea } = Input;

/**
 * @function：CommentList
 * @parameter：comments information
 * @description： Set the comment list objcet
 */
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

/**
 * @function：Editor
 * @parameter：Component
 * @description： Displays the style of the comment area
 */
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);


export  default class Comments extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };
    /**
     * @function：postUserData
     * @parameter：comments data
     * @description：Send the comment data to FireBase for storage
     */
    postUserData(input)
    {
        console.log()
        var userURL = "https://cs385-food.firebaseio.com/comments.json";
        fetch("https://cs385-food.firebaseio.com/comments.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            //send comments data to firebase
            body: JSON.stringify({
                //Could also just set an ID as an array in the DB, add the plants to each one (more efficient)
                ID: input.author, // REPLACE "test" WITH userID
                avatar: 'https://firebasestorage.googleapis.com/v0/b/cs385-food.appspot.com/o/images%2F%E5%81%A5%E5%BA%B7%E9%A3%9F%E5%93%81.png?alt=media&token=b4a12b96-4f91-4115-9089-f6ba052bd094',
                author:input.author,
                content:input.content,
                datetime: input.datetime
            })
        })
    }


    /**
     * @function：queryComments
     * @parameter：null
     * @description：Query all the comments in the Firebase database and display them on the page
     */
    queryComments=()=>
    {
        var user = memoryUtils.user.username;
        //firebase query
        var ref = fire.database().ref("comments").once("value",(data)=>{
            const value = data.val();
            console.log(value);
            const valuelist = [];
            //Iterate through all the comments stored in the state
            for(let id in value) {

                valuelist.push({author:value[id].author,ID:value[id].ID,avatar:value[id].avatar,content:value[id].content,datetime:value[id].datetime});
            }
            console.log(valuelist);
            this.setState({comments:valuelist})
            console.log(this.state.comments);
        });
    }

    componentDidMount() {
        this.queryComments();

    }

    /**
     * @function：handleSubmit
     * @parameter：null
     * @description：Display commit save
     */
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                    author: memoryUtils.user.username,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/cs385-food.appspot.com/o/images%2F%E5%81%A5%E5%BA%B7%E9%A3%9F%E5%93%81.png?alt=media&token=b4a12b96-4f91-4115-9089-f6ba052bd094',
                    content: <p>{this.state.value}</p>,
                    datetime: formateDate(Date.now()),
                },
                ...this.state.comments,
            ],
        });
        let list={author: memoryUtils.user.username,content: this.state.value, datetime: formateDate(Date.now())}
        this.postUserData(list)
    };

    handleChange = e => {

        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
            <>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://firebasestorage.googleapis.com/v0/b/cs385-food.appspot.com/o/images%2F%E5%81%A5%E5%BA%B7%E9%A3%9F%E5%93%81.png?alt=media&token=b4a12b96-4f91-4115-9089-f6ba052bd094"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}

