import React from 'react';
import 'antd/dist/antd.min.css';
import Hlayout from '../../components/hlayout/index.jsx';
const passwordPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
import {Input, Form, Button, message, Icon} from 'antd';
const FormItem = Form.Item;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            langKey: 'cn'
        };
    }

    lanSwitch(type) {
        this.setState({
            langKey: type
        });
    }

    handleOk() {
        const self = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.name && values.password) {
                    self.getRegister(JSON.stringify(values));
                }
            }
        });
    }

    getRegister(queryObj) {
        // $.post('/getRegister', queryObj).done(function (result) {
        //     //window.location.href = '/login';
        //     console.log("register: ", result);
        //     if(result.code) {
        //         message.error(result.message);
        //     } else {
        //         window.location.href = '/login';
        //     }
        // }).fail(function (err) {
        //     message.error('Register fail!', err);
        // });
        $.ajax({
            url: './getRegister',
            type: 'POST',
            data: queryObj,
            contentType: "application/json;charset=utf-8",
          }).done(function(result){
            if(result.code) {
                        message.error(result.message);
                    } else {
                        window.location.href = '/login';
                    }
                  console.log("result: ", result);
          }).fail(function(err){
            message.error('Register fail!', err);
          });
    }

    passwordCheck(rule, value, callback) {
        if (!value) {
            callback('password is empty');
        } else {
            if(passwordPattern.test(value)){
                callback();
            } else {
                callback("密码格式不对!");
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Hlayout lanSwitch={this.lanSwitch.bind(this)} langKey={this.state.langKey}>
                <div style={{padding: '40px', display: 'inline-block', marginTop: '200px', border: '1px solid #d9d9d9', borderRadius: '3px', backgroundColor: '#ffffff'}}>
                    <span style={{marginBottom: '20px', fontSize: '16px', display: 'inline-block'}}>欢迎注册proxy</span>
                    <Form style={{width: '360px'}}>
                        <FormItem>
                            {getFieldDecorator('name', {
                                initialValue: '',
                                rules: [{required: true, message: 'username is empty!'}]
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{validator: this.passwordCheck.bind(this)}]
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} placeholder="Password" onPressEnter={this.handleOk.bind(this)}/>
                            )}
                        </FormItem>
                    </Form>
                    <Button onClick={this.handleOk.bind(this)} style={{marginRight: '20px'}} type='primary'>register</Button>
                </div>
            </Hlayout>
        );
    }
}
const Register = Form.create()(RegisterForm);
export default Register
