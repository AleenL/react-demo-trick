import React from 'react';
import {LoginIn,LoginUp,UserDialog,Rule} from './component/login/src/index'
import {Route,Redirect,HashRouter} from 'react-router-dom'
import '../../public/css/login/index.pcss'
import Error404 from './component/404/index'
import {getCurretUser} from "../../public/js/leanCloud";
import Todo from './component/todo/index'
import Calendar from './component/date/index'

const Index = () =>
    <HashRouter>
        <div className="content">
            <Route exact path="/"
                   render={() => (<Redirect to={getCurretUser() ? '/todo' : '/loginUp'}/>)}/>
            <Route path="/login" component={()=> <UserDialog/>}/>
            <Route path="/loginIn" component={()=> <LoginIn/>}/>
            <Route path="/loginUp" component={()=> <LoginUp/>}/>
            <Route path="/rule" component={()=> <Rule/>}/>
            <Route path="/todo" component={()=> <Todo/>}/>
            <Route path="/date" component={()=> <Calendar />}/>
            <Route path='/404'  component={()=> <Error404/>} />
            <Route exact path="/404"
                   render={() => (<Redirect to="/404" from='*'/>)}/>
        </div>
    </HashRouter>;


export default Index;
