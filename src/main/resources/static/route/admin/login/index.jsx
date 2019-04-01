import React from 'react';
import Hlayout from '../../components/hlayout/index.jsx';
import {Input, Form, Button, message, Icon} from 'antd';
import 'antd/dist/antd.min.css';
const FormItem = Form.Item;

class LoginForm extends React.Component {
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
          console.log("yes in values!");
          self.getLogin(JSON.stringify(values));
        }
        console.log("loginValues: ", values);
      }
    });
  }

  getLogin(queryObj) {
    // $.post('./loginPass', queryObj).done(function (result) {
    //   if (result.data.url) {
    //     window.location.href = result.data.url;
    //   }
    //     console.log("result: ", result);
    // }).fail(function (err) {
    //   message.error(err.responseJSON.message);
    // });
    $.ajax({
      url: './loginPass',
      type: 'POST',
      data: queryObj,
      contentType: "application/json;charset=utf-8",
    }).done(function(result){
      if (result.data.url) {
            window.location.href = result.data.url;
          }
            console.log("result: ", result);
    }).fail(function(err){
      message.error('error!');
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Hlayout lanSwitch={this.lanSwitch.bind(this)} langKey={this.state.langKey}>
        <div style={{padding: '40px', display: 'inline-block', marginTop: '200px', border: '1px solid #d9d9d9', borderRadius: '3px', backgroundColor: '#ffffff'}}>
          <span style={{marginBottom: '20px', fontSize: '16px', display: 'inline-block'}}>欢迎登录Proxy Service!</span>
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
                rules: [{required: true, message: 'password is empty!'}]
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} placeholder="Password" onPressEnter={this.handleOk.bind(this)} />
              )}
            </FormItem>
          </Form>
          <Button onClick={this.handleOk.bind(this)} style={{marginRight: '20px'}} type='primary'>loginaaaaaaa</Button>
        </div>
      </Hlayout>
    );
  }
}

const Login = Form.create()(LoginForm);
export default Login
