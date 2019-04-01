import React from 'react';
import Hlayout from '../../components/hlayout/index.jsx';
import { Form, Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
import Dbset from '../dbset/index.jsx';
import Secret from '../secret/index.jsx';
import 'antd/dist/antd.min.css';
// import { ajaxSetup } from '../../../utils/ajaxSetup.js';
// ajaxSetup();

class ProsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Hlayout>
                <Tabs
                  defaultActiveKey="1"
                  tabPosition="left"
                >
                  <TabPane tab={<span><Icon type="setting" />dataSource</span>} key="1">
                    <Dbset/>
                  </TabPane>
                  <TabPane tab={<span><Icon type="home" />users</span>} key="2">Content of tab 2</TabPane>
                  <TabPane tab={<span><Icon type="security-scan" />secret</span>} key="3">
                    <Secret />
                  </TabPane>
                </Tabs>
            </Hlayout>
        );
    }
}

const Pros = Form.create()(ProsForm);
export default Pros

