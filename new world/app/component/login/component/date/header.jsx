import React from 'react'

export default class Header extends React.Component{
    render(){
        return(
            <div className='userHeader'>
                <div className='avatar'>
                    <img src={require('../../../../public/image/peopele-sky.png')} alt=""/>
                </div>
                <div className='userInfo'>
                    <p>{this.props.user} 早上好。</p>
                    <p>重庆 小雨 轻度污染</p>
                </div>
            </div>
        )
    }
}