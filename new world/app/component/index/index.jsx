import React from 'react';
import '../../public/css/index.pcss';
import Seconds from '../common/seconds'
import Shop from '../shop/index';
import demo1 from '../demo/demo1/index';
import demo2 from '../demo/demo2/index';
import {HashRouter,Route,NavLink} from 'react-router-dom'


const Index = () =>
    <HashRouter>
        <div>
            <div className="nav">
                <NavLink to="/" exact activeClassName="selected">首页</NavLink>
                <NavLink to="/shop" exact activeClassName="selected">商城</NavLink>
                <NavLink to="/demo1" exact activeClassName="selected">demo1</NavLink>
                <NavLink to="/demo2" exact activeClassName="selected">demo2</NavLink>
            </div>
            <Route exact path="/" component={()=><Seconds title='首页'/>}/>
            <Route path="/shop" component={Shop}/>
            <Route path="/demo1" component={demo1}/>
            <Route path="/demo2" component={demo2}/>
        </div>
    </HashRouter>

export default Index;