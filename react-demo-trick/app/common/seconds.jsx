import React from 'react'

export default class Seconds extends React.Component{
    constructor(...args){
        super(...args);
        this.state={
            seconds:0
        }
    }

    tick(){
        this.setState(prevState => ({
            seconds:prevState.seconds+1
        }))
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(),1000)
    }

    componentWillUnmount(){
        clearTimeout(this.interval)
    }

    render(){
        return (
            <div className="cont">
                <div className="top">
                    <div className="bd_logo1">
                        这是{this.props.title}
                    </div>
                </div>
                <div className="bottom">
                    Seconds:{this.state.seconds}
                </div>
            </div>
        )
    }
}