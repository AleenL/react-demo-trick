import React from 'react';
import {signUp,logOut,getCurretUser} from '../../../../../public/js/leanCloud'


class LoginUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:getCurretUser() || 'ddd',
            formData:{
                username:'',
                password:''
            }
        }
    }

    signUp(e){
        e.preventDefault()
        let {username, password} = this.state.formData

        let success = (user) => {this.getUser(user)}
        let error = (error) => {console.log(error)}

        signUp(username,password,success,error)

    }

    getUser(user){
        this.setState({user:user})
    }


    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))//拷贝state
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    logOut(){
        logOut()
    }


    render(){
        return(
            <div className='sign-wrapper signUp-wrapper'>
                <div className='signUp-image'>
                    <p className='people image vibrate-1' />
                    <p className='moon image slide-bottom' />
                </div>
                <h3>{this.state.user}</h3>
                <p onClick={this.logOut.bind(this)}>登出</p>
                <form className="signUp" onSubmit={this.signUp.bind(this)}>
                    <div className="row">
                        <input type="username"
                               placeholder={'username'}
                               onChange={this.changeFormData.bind(this, 'username')}
                               value={this.state.formData.username}
                        />
                    </div>
                    <div className="row">
                        <input type="password"
                               placeholder={'password'}
                               onChange={this.changeFormData.bind(this, 'password')}
                               value={this.state.formData.password}
                        />
                    </div>
                    <div className="row actions">
                        <button type="submit">登录</button>
                    </div>
                    <p className='forget'></p>
                </form>
            </div>
        )
    }
}


export default LoginUp;