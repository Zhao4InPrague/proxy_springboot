import React from 'react';
import {Layout, Divider} from 'antd';
const {Header, Content} = Layout;

class Hlayout extends React.Component {
  constructor(props) {
    super(props);
  }

  lanSwitch(type) {
    this.props.lanSwitch(type);
  }

  render() {
    let {children} = this.props;
    return (
      <Layout style={{height: '100%'}}>
        <Header className="header">
          <div className="logo" style={{lineHeight: '64px', color: '#ffffff'}}>
            <span style={{fontSize: '20px'}}>Proxy Service</span>
            <span style={{display: 'inline-block', float: 'right'}}>
                <a onClick={this.lanSwitch.bind(this, 'en')}>english</a>
                <Divider type="vertical" />
                <a onClick={this.lanSwitch.bind(this, 'cn')}>中文</a>
            </span>
          </div>
        </Header>
        <Content style={{height: '100%', backgroundColor: '#f0f2f5', display: 'inline-block', textAlign: 'center'}}>
          {children}
        </Content>
      </Layout>
    );
  }
}

export default Hlayout;
