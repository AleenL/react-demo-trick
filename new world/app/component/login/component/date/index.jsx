import React from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarMain from './CalendarMain'
import '../../../../public/css/date/index.pcss'

const displayDaysPerMonth = (year)=> {

    //定义每个月的天数，如果是闰年第二月改为29天
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
    }

    //以下为了获取一年中每一个月在日历选择器上显示的数据，
    //从上个月开始，接着是当月，最后是下个月开头的几天

    //定义一个数组，保存上一个月的天数
    let daysInPreviousMonth = [].concat(daysInMonth)
    daysInPreviousMonth.unshift(daysInPreviousMonth.pop())

    //获取每一个月显示数据中需要补足上个月的天数
    let addDaysFromPreMonth = new Array(12)
        .fill(null)
        .map((item, index)=> {
            let day = new Date(year, index, 1).getDay()
            if (day === 0) {
                return 6
            } else {
                return day - 1
            }
        })

    //已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    return new Array(12)
        .fill([])
        .map((month, monthIndex)=> {
            let addDays = addDaysFromPreMonth[monthIndex],
                daysCount = daysInMonth[monthIndex],
                daysCountPrevious = daysInPreviousMonth[monthIndex],
                monthData = []
            //补足上一个月
            for (; addDays > 0; addDays--) {
                monthData.unshift(daysCountPrevious--)
            }
            //添入当前月
            for (let i = 0; i < daysCount;) {
                monthData.push(++i)
            }
            //补足下一个月
            for (let i = 42 - monthData.length, j = 0; j < i;) {
                monthData.push(++j)
            }
            return monthData
        })
}

export default class Calendar extends React.Component {
    constructor() {
        //继承React.Component
        super()
        let now = new Date()
        this.state = {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate(),
            picked: false,
            today:true
        }
    }

    //切换到下一个月
    nextMonth(index) {
        let thisYear = new Date().getFullYear()
        let thisMonth = new Date().getMonth()-1
        let day = parseInt(index,10)>0 ? index : this.state.day
        let year = this.state.year
        let month = this.state.month


        if(thisYear===this.state.year&&thisMonth===this.state.month){
            this.setState({
                today:true
            })
        }else{
            this.setState({
                today:false
            })
        }


        if (this.state.month === 11) {
            this.setState({
                year: ++year,
                month: 0,
                day:day
            })
        } else {
            this.setState({
                month: ++month,
                day:day
            })
        }
        console.log(this.state.year,this.state.month,thisYear,thisMonth)
    }
    //切换到上一个月
    prevMonth(index) {
        let thisYear = new Date().getFullYear()
        let thisMonth = new Date().getMonth()+1
        let day = parseInt(index,10)>0 ? index : this.state.day
        let year = this.state.year
        let month = this.state.month

        if(thisYear===this.state.year&&thisMonth===this.state.month){
            this.setState({
                today:true
            })
        }else{
            this.setState({
                today:false
            })
        }


        if (this.state.month === 0) {
            this.setState({
                year: --year,
                month: 11,
                day:day
            })
        } else {
            this.setState({
                month: --month,
                day:day
            })
        }

    }
    //选择日期
    datePick(day) {
        this.setState({day})
    }
    //切换日期选择器是否显示
    datePickerToggle() {
        this.refs.main.style.height =
            this.refs.main.style.height === '460px' ?
                '0px' : '460px'
    }
    //标记日期已经选择
    picked() {
        this.setState({
            picked:true
        })
    }

    render() {
        let props = {
            viewData: displayDaysPerMonth(this.state.year),
            datePicked: `${this.state.year} 年
                   ${this.state.month + 1} 月
                   ${this.state.day} 日`
        }
        return (

            <div className="output" id='calendarContainer'>
                <div className="dateBox">
                    <div className="main" ref="main">
                        <CalendarHeader prevMonth={this.prevMonth.bind(this)}
                                        nextMonth={this.nextMonth.bind(this)}
                                        year={this.state.year}
                                        month={this.state.month}
                                        day={this.state.day}/>
                        <CalendarMain {...props}
                                      prevMonth={this.prevMonth.bind(this)}
                                      nextMonth={this.nextMonth.bind(this)}
                                      datePick={this.datePick.bind(this)}
                                      year={this.state.year}
                                      month={this.state.month}
                                      day={this.state.day}
                                      today={this.state.today}/>
                    </div>
                </div>
            </div>
        )
    }
}
