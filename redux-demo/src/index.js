

import React from 'react'
import { render } from 'react-dom'
import Root from './Redux/Root'

render(
  <Root />,
  document.getElementById('root')
)


/*import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './Redux/App'
import todoApp from './Redux/reducers'
import Routers from './component/Router'
import './index.css'

export let store = createStore(todoApp)
console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  rootElement
)*/
/*
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './Redux/AsynsAction'
import rootReducer from './Redux/AsynsReducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)

store.dispatch(selectSubreddit('reactjs'))
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)*/