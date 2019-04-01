import React from 'react';
import Hlayout from '../../components/hlayout/index.jsx';
import {Input, Form, Button, message, Icon, Table} from 'antd';
import 'antd/dist/antd.min.css';
// import { ajaxWww } from '../../../utils/ajaxSetup.js';
// ajaxWww();

class secretForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            imgFile: ""
        };
    }

    onUpload() {
        console.log("onUpload")
        let self = this;
        let formData = new FormData();
        let num = new Date().getTime();
        formData.append("image", this.state.imgFile);
        formData.append("uid", num);
        console.log("formData: ", formData);
        console.log("formDataGet: ", formData.get("image"));
        console.log("typeof uid: ", typeof num);
        // $.post('./uploadImage', JSON.stringify(formData)).done(function (result) {
        //       console.log("result: ", result);
        //   }).fail(function (err) {
        //     message.error('error!');
        //   });
        $.ajax({
            url: './uploadImage',
            type: 'POST',
            data: formData,                    // 上传formdata封装的数据
            cache: false,                      // 不缓存
            processData: false,                // jQuery不要去处理发送的数据
            contentType: false,                // jQuery不要去设置Content-Type请求头   img/productSingle/'+bean.firstProductImage.id+'.jpg   
        }).done(function(res){
            console.log(res);
            self.setState({
                imgUrl: `img/${res.data.uid}.jpg`
            });
        }).fail(function(err){
            console.log(err);
        });
    }

    onChange(event) {
        this.setState({
            imgFile: event.target.files[0]
        })
    }

    render() {
        return (
                <div style={{padding: '20px'}}>
                    <div style={{padding: "40px", width: "300px"}}>
                        <div>
                            <img src={this.state.imgUrl}/>
                        </div>
                            <Input type="file" name="pic" onChange={this.onChange.bind(this)}/>
                        <Button onClick={this.onUpload.bind(this)} type='primary'>upload</Button>
                    </div>
                </div>
        );
    }
}

const Secret = Form.create()(secretForm);
export default Secret
