import React from 'react';


export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.pathname = window.location.pathname;
    }

    handleNavClassName(name,index){
        if(this.pathname.indexOf(name +'.html') !== -1){
            return 'selected'
        }else{
            return null;
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="header">
                <i className="ico-header-logo" />
                <div className="nav">
                    <a href="/index.html" className={this.handleNavClassName('index',1)}>首页</a>
                    <a href="/movie.html" className={this.handleNavClassName('movie')}>商城</a>
                    <a href="/md.html" className={this.handleNavClassName('md')}>demo演示</a>
                </div>
            </div>
        )
    }
}
