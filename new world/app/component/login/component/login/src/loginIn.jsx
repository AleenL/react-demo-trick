import React from 'react';
import {signIn} from '../../../../../public/js/leanCloud'


class LoginIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'helo',
            formData:{
                username:'',
                password:''
            }
        }
    }

    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData

        let success = (user) => {this.getUser(user)}
        let error = (error) => {console.log(error)}

        signIn(username,password,success,error)

    }

    getUser(user){
        this.setState({user:user.attributes.username})
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))//拷贝state
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }




    render(){
        return(
            <div className='sign-wrapper'>
                <div className='signUp-image'>
                    <p className='plan image vibrate-1' />
                    <p className='star image slide-bottom' />
                </div>
                <form className="signUp" onSubmit={this.signIn.bind(this)}>
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
                        <button type="submit">注册</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default LoginIn;