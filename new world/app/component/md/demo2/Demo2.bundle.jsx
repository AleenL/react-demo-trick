import React from 'react'
import {Route, NavLink,Redirect} from 'react-router-dom'
import Demo3 from './demo2-1'
import Demo4 from './demo2-2'

const Demo2 = ({match}) =>
    <div>
        <div className="nav">
            <NavLink to={`${match.url}/demo2-1`} activeClassName='selected' exact>demo2-1</NavLink>
            <NavLink to={`${match.url}/demo2-2`} activeClassName='selected' exact>demo2-2</NavLink>
        </div>
        <Route exact path={`${match.url}`} render={() => (<Redirect to={`${match.url}/demo2-1`}/>)}/>
        <Route path={`${match.url}/demo2-1`} component={Demo3}/>
        <Route path={`${match.url}/demo2-2`} component={Demo4}/>
    </div>;

export default Demo2