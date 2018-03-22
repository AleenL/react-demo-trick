import React from 'react';
import '../../public/css/index/index.pcss';
import '../../public/css/normalize.pcss';
import apiRequestAsync from '../../public/js/apiRequestAsync';


class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time:''
        }
    }

    tick(){
        const time = new Date().getHours();
        if(time>=9 && time<17){
            this.setState({time:'afternoon'})
        }else if(time>=17 || time<5){
            this.setState({time:'night'})
        }else{
            this.setState({time:'morning'})
        }
    }

    async handleIpDress() {
        let todoList = await apiRequestAsync.get('ipDress');
        console.log(todoList)
        let todoList2 = await apiRequestAsync.get('cityId',{loaction:todoList});
        console.log(todoList2)
        // let todoList3 = await apiRequestAsync.get('todoList');
        // this.setState({data:this.state.data.concat(todoList3.list)})
    }

    componentDidMount() {
        this.tick();
        setInterval(() => this.tick(),10000);
        this.handleIpDress()
    }

    render(){
        return(
            <div className={`${this.state.time} background`}>
                <p>hello</p>
            </div>
        )
    }
}

export default Index