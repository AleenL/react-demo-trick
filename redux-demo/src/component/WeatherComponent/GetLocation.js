//import React 
import React from 'react'
import { render } from 'react-dom'

//import React-router
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//import CSS
import './Weather.css'
import './FutureWeather.css'

//import component
import axios from 'axios'
import Feel from './Feel'
import NextWeek from './NextWeek'
import WeatherEN from './WeatherEN'



class GetLocation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			Weather:{
				now:{},
				future:[]
			},
			futureWeather:{}
		}
	}

	componentDidMount() {
		this.getLocation()

	}

	getLocation(){
		axios.get('https://weixin.jirengu.com/weather/ip')
		.then(res=>{
			this.getCityId(res.data)
		}).catch(res=>{
			console.error(Error)
		})
		
	}

	getCityId(data){
		axios.get(`https://weixin.jirengu.com/weather/cityid?location=${data.data}`)
		.then(res=>{
			this.getWeather(res.data.results[0].id)
		}).catch(res=>{
			console.error(Error)
		})
	}
/*
	getHours(data){
		let that = this;
		var CityId = new Ajax('https://weixin.jirengu.com/weather/future24h','get',{cityid:data},true)
		CityId.getMsg().then(function(result){
			that.setState({
      		 	futureWeather:result.hourly  		 
      		 })
		},function(error){
			//未获取到就返回失败
			console.log('失败')
		}).catch(function(Error){
			console.log('Error')
		})
	}
*/
	getWeather(data){
		axios.get(`https://weixin.jirengu.com/weather/now?cityid=${data}`)
		.then(res=>{
			this.setState({Weather:res.data.weather[0]})
		}).catch(res=>{
			console.error('error')
		})
	}

	render(){
		return (
			<div className='titleText'>
				<p>{this.state.Weather.now.temperature}<span>°</span></p>
				<Feel tmp={this.state.Weather.now.temperature} />
				<div className="weatherMsg">
				{
					this.state.Weather.future.map((value,index)=>{
						if(index >1 ) return;
						return <WeatherEN key={index} weather={value} />
					})
				}
					<NextWeek future={this.state.Weather.future} getDate='weather'/>
					<NextWeek future={this.state.Weather.future} getDate='tmp'/>
				</div>
			</div>
		)
	}
}

export default GetLocation