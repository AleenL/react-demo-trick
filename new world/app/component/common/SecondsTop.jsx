import React from 'react';
//
// const SecondsTop = ({title}) =>
//     [
//         <div className="top1" key='value1'>
//             这个是{title}
//         </div>,
//         <div className="bd_logo1" key='value2'>
//             这是我的家乡，叫做日历苛责
//         </div>
//     ]
//
//
//
//
// export default SecondsTop

export default class SecondsTop extends React.Component{
    render(){
        return(
            [
                <div className="top1" key='value1'>
                   这个是{this.props.title}
                 </div>,
                <div className="bd_logo1" key='value2'>
                    这是我的家乡
                </div>
            ]
        )
    }
}