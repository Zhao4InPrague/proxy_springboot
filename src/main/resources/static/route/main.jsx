// main.js
import React from 'react';
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Login from './admin/login/index.jsx';
import Register from './admin/register/index.jsx';
import Pros from './admin/pros/index.jsx';
import './index.css';

// render(<Login />, document.getElementById('root'));

render((
    <Router>
        <Switch>
        <div>
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/pros" component={Pros}/>
        </div>
        </Switch>
    </Router>
), document.getElementById('root'));