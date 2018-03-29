import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


export default class UserDialog extends Component {
    constructor(props){
        super(props);
        this.state={
            selected:'signUp',
            formData:{
                username:'',
                password:''
            }
        }
    }

    switch(e){
        this.setState({
            selected:e.target.value
        })
    }


    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))//拷贝state
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    render() {
            // let signUpForm = (
            //       <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
            //             <div className="row">
            //                   <label>用户名</label>
            //                 <input type="username"
            //                        onChange={this.changeFormData.bind(this,'username')}
            //                        value = {this.state.formData.username}
            //                 />
            //                 </div>
            //             <div className="row">
            //                   <label>密码</label>
            //                   <input type="password"
            //                          onChange={this.changeFormData.bind(this,'password')}
            //                          value = {this.state.formData.password}
            //                   />
            //             </div>
            //             <div className="row actions">
            //                   <button type="submit">注册</button>
            //             </div>
            //       </form>
            //     )
            //     let signInForm = (
            //
            //     )
        return (
            <div className="UserDialog-Wrapper">
                <div className="loginBox">
                    <NavLink className='loginIn' to={'/loginIn'}>注册</NavLink>
                    <NavLink className='loginUp' to={'/loginUp'}>登录</NavLink>
                    <NavLink className="rule" to={'/rule'}>warning & rule</NavLink>
                </div>
            </div>
        )
    }
}