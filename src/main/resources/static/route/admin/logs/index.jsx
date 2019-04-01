import React from 'react';
import Hlayout from '../../components/hlayout/index.jsx';
import {Input, Form, Button, message, Icon, Table} from 'antd';
import 'antd/dist/antd.min.css';

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Hlayout>
                <div style={{padding: '20px'}}>
                    <h1>logs</h1>
                </div>
            </Hlayout>
        );
    }
}

export default Logs
