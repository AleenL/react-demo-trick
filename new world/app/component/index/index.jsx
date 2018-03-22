import React from 'react';
import '../../public/css/index/index.pcss';
import '../../public/css/normalize.pcss';
import apiRequestAsync from '../../public/js/apiRequestAsync';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            data: null
        }
    }

    tick() {
        const time = new Date().getHours();
        if (time >= 9 && time < 17) {
            this.setState({time: 'afternoon'})
        } else if (time >= 17 || time < 5) {
            this.setState({time: 'night'})
        } else {
            this.setState({time: 'morning'})
        }
    }

    async handleIpDress() {
        let todoList = await apiRequestAsync.get('weatherMock');
        this.setState({
            data: todoList.weather[0]
        })

    }

    componentDidMount() {
        this.tick();
        setInterval(() => this.tick(), 10000);
    }

    componentWillMount(){
        this.handleIpDress()
    }

    render() {
        const {data} = this.state
        return (
            <div className={`${this.state.time} background`}>
                {data && <p>{console.log(data.now.temperature)}</p>}
            </div>
        )
    }
}

export default Index