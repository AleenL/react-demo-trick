import React from 'react';
import Demo1 from './demo1/Demo.bundle'
import Demo2 from './demo2/Demo2.bundle'
import {BundleFun} from '../../public/js/Bundle'
import {NavLink,Route,Redirect,HashRouter} from 'react-router-dom'
import '../../public/css/demo.pcss'

const Index = () =>
    <HashRouter>
        <div className="content">
            <div className="nav">
                <NavLink to="/Demo1" activeClassName="selected" exact>demo1</NavLink>
                <NavLink to="/Demo2" activeClassName="selected">demo2</NavLink>
            </div>
            <Route exact path="/"
                   render={() => (<Redirect to="/Dome1"/>)}/>
            <Route path="/Demo1" component={()=> BundleFun(Demo1)}/>
            <Route path="/Demo2" component={(props)=> BundleFun(Demo2,props)}/>
        </div>
    </HashRouter>;

export default Index
