import React from 'react'
import SecondsBottom from './secondCount'
import SecondsTop from './SecondsTop'
import {urlParam,isMobile} from "../public/js/utils";
import apiRequest from '../public/js/apiRequest'


export default class Seconds extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            seconds:0,
            data:[
                {id: 1, title: '前端人人1'},
                {id: 2, title: '前端人人2'},
                {id: 3, title: '前端人人3'},
                {id: 4, title: '前端人人4'},
                {id: 5, title: '前端人人5'},
                {id: 6, title: '前端人人6'},
                {id: 7, title: '前端人人7'},
                {id: 8, title: '前端人人8'},
                {id: 9, title: '前端人人9'}
            ],
            show:'',
        }
    }

    tick(){
        this.setState(prevState => ({
            seconds:prevState.seconds+1
        }))
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(),1000)
        apiRequest.get('ipDress',{}, data => console.log(data.code))
    }

    componentWillUnmount(){
        clearTimeout(this.interval)
    }

    isMobile(e){
        if(isMobile(e.target.value)){
            this.setState({
                show: '是'
            })
        }else{
            this.setState({
                show: '不是'
            })
        }
    }

    render(){
        const {seconds,data,show} = this.state;
        return (
            <div className="cont">
                <div className="top">
                    <SecondsTop title={this.props.title}/>
                    <p>这个网页的路径是：{urlParam('name')}</p>
                    {
                        data.map((data)=>(
                            <li key={data.id}>
                                <p>今天我们来到了</p>
                                <a href="">{data.title}</a>
                            </li>
                        ))
                    }
                </div>
                <div>
                    <input type="text" onChange={this.isMobile.bind(this)}/>
                    <p>这个{show}手机号</p>
                </div>
                <SecondsBottom seconds={this.state.seconds}/>
                <SecondsBottom seconds={seconds}/>
            </div>
        )
    }
}