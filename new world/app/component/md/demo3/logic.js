//Refast 使用logic.js中defaults方法的返回值初始化组件的state
import * as localStore from './localStore';
import AV from '../../../public/js/leanCloud'


let TestObject = AV.Object.extend('todoList');
let testObject = new TestObject();


let getObject = new AV.Query('todolist');


const leantest = (list) => {
    testObject.save(
        {array:list}
    ).then(todo => todo.id)
        .catch(err => console.log(err))
}


const getData = (id) =>{
    getObject.get(id).then(todo => todo).catch( () => {})
}


export default{
    //defaults 的参数 props 是组件初始化时的 props
    //defaults 函数返回的对象会用来初始化组件的 state

    defaults(props){
        return{
            list: []
        }
    },
    handleAdd({getState,setState},title){
        if(title){
            let list = getState().list;//获取state的list值
            list.push({id:list.length + 1, title:title, status:1});//将title的信息push到list中
            setState({list:list})//更新新的list
            leantest(list)
        }else{
            alert("can't empty!!!")
        }
    },
    handleItemEdit({getState,setState},someState){
        let {id,status} = someState,list = getState().list;//获取someState中的id和status,获取state中的list
        list.find(data => data.id === id).status = status;//在list中的data里对比和someState中的id相等的data,data的status赋值给status
        setState({list:list})//更新新的list
        leantest(list)
    }
}