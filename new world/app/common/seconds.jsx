import React from 'react'
import SecondsBottom from './secondCount'
import SecondsTop from './SecondsTop'
import {urlParam,isMobile} from "../public/js/utils";
import "babel-polyfill";
import apiRequestAsync from '../public/js/apiRequestAsync';


export default class Seconds extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            seconds:0,
            data:[

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
        this.handleIpDress()

    }

    async handleIpDress() {
        let todoList = await apiRequestAsync.get('todoList');
        console.log(todoList);
        let todoList2 = await apiRequestAsync.get('todoList');
        console.log(todoList2)
        let todoList3 = await apiRequestAsync.get('todoList');
        console.log(todoList3)
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