import React from 'react';
import {Form, Button, message, Input, Table, Modal} from 'antd';
const FormItem = Form.Item;
import 'antd/dist/antd.min.css';

class aformForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOk() {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log(values);
            self.addDbset(JSON.stringify(values));
        }
        });
    }

    addDbset(obj) {
        let self = this;
        // $.post('./addDbset', obj, 'json').done(function (result) {
        //     // if (result.data.url) {
        //     //   window.location.href = result.data.url;
        //     // }
        //       console.log("result: ", result);
        //       self.props.onReload(result);
        //   }).fail(function (err) {
        //     message.error('error!');
        //   });
        $.ajax({
            url: './addDbset',
            type: 'POST',
            data: obj,
            contentType: "application/json;charset=utf-8",
        }).done(function(result){
            console.log(result);
            self.props.onReload(result);
        }).fail(function(err){
            message.error('error!');
        });
    }

    handleCancel() {
        this.props.onClose();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
        labelCol: {
            xs: {span: 28},
            sm: {span: 4},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 18},
        },
        };
        return (
            <Modal
            visible={this.props.aVisible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            width="600px"
          >
            <Form style={{padding: '30px'}}>
                <FormItem
                {...formItemLayout}
                label="host"
                >
                    {getFieldDecorator('host', {
                    rules: [{required: true, message: '请输入host!'}]
                    })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="user"
                >
                    {getFieldDecorator('user', {
                    rules: [{required: true, message: '请输入user!'}]
                    })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="password"
                >
                    {getFieldDecorator('password', {
                    rules: [{required: true, message: '请输入password!'}]
                    })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="database"
                >
                    {getFieldDecorator('database', {
                    rules: [{required: true, message: '请输入database!'}]
                    })(
                    <Input />
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="port"
                >
                    {getFieldDecorator('port', {
                    rules: [{required: true, message: '请输入port!'}]
                    })(
                    <Input />
                    )}
                </FormItem>
            </Form>
          </Modal>
        );
    }
}

const Aform = Form.create()(aformForm);
export default Aform
