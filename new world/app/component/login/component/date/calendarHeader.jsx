import React from 'react'

export default class CalendarHeader extends React.Component {
    render() {
        let arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return (
            <div className="calendarHeader">
                <p className="prev"
                    onClick={this.props.prevMonth}>
                </p>
                <p className="dateInfo">
                    {arr[this.props.month]} {this.props.year}
                </p>
                <p className="next"
                      onClick={this.props.nextMonth}>
                </p>
            </div>
        )
    }
}
