import AV from 'leancloud-storage'

let APP_ID = 'OvVqY6JyIgXMvhPg5WUDCdie-gzGzoHsz';
let APP_KEY = 'dV4NCQ056iRz1wloKCxBqjlc';

//初始化leanCloud
AV.init({
    appId:APP_ID,
    appKey:APP_KEY
});

//创建一个对象
export default AV

export function signIn(username, password, successFn, errorFn){
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined

}

export function signUp(username, password, successFn, errorFn){
    console.log(username,password)
    //登录接口
    AV.User.logIn(username,password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined

}

export function logOut(){
    AV.User.logOut()
    return undefined
}

export function getCurretUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

function getUserFromAVUser(AVUser){
    console.log(AVUser)
    return AVUser.id
}

export const setTodo = (list) => {
    let user = AV.User.current()
    user.set('todo',{array:list}
    ).then(todo => todo.id)
        .catch(err => console.log(err))
}