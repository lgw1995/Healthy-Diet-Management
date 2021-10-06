import React, {Component} from 'react';
import {v4 as uuid} from 'uuid'
import fire from "../../api/commonFirebase";
import { Image } from 'antd';
import memoryUtils from "../../utils/memoryUtils";

export default class PicturesWall extends React.Component {
    //Local URL parameters
    state = {
        imageUrl:null,
        dis:false,
    }
    //
    getImgUrl = ()=>{
        return this.state.imageUrl
    }




    render() {
        let imageUrl = null;

        /**
         * @function：readImages
         * @parameter： file data
         * @description： Read the image information from Firebase to the local page
         */
        const readImages = async (e)=>{
            const id = uuid()
            //file data
            const file = e.target.files[0]
            //Link to the Firebase image repository
            const imagesRef = fire.storage().ref("images").child(id)
            await imagesRef.put(file);
            //Download the pictures
            imagesRef.getDownloadURL().then((url)=>{
                console.log(url)
                this.setState({imageUrl:url})
                this.setState({dis:true})
                memoryUtils.imgUrl = url;
            })
            console.log(file)
        }
        return (
            <div>
                <input disabled={this.state.dis} type="file" accept="image/*"onChange={readImages}/>
                <Image
                    width={300}
                    src={this.state.imageUrl}
                />
            </div>
        )
    }
}

