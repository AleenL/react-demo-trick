import React from 'react';
import Demo1 from './demo1/index'
import Demo2 from './demo2/index'
import {NavLink,Route,Redirect,HashRouter} from 'react-router-dom'
import '../../public/css/demo.pcss'

const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/dome1" activeClassName="selected" exact>demo1</NavLink>
                <NavLink to="/dome2" activeClassName="selected">demo2</NavLink>
            </div>
            <Route exact path="/"
                   render={() => (<Redirect to="/Dome1"/>)}/>
            <Route path="/dome1" component={Demo1}/>
            <Route path="/dome2" component={Demo2}/>
        </div>
    </HashRouter>

export default Index
