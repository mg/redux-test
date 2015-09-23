import React from 'react'
import Router, { Route, DefaultRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

import reducer from './reducer.js'
import { setState } from './action-creators.js'
import remoteActionMiddleware from './remote-action-middleware.js'

import App from './app.jsx'
import { VotingContainer } from './voting.jsx'
import { ResultsContainer } from './results.jsx'

const socket= io(`${location.protocol}//${location.hostname}:8090`)
socket.on('state', state =>
  store.dispatch(setState(state))
)

const createStoreWithMiddleware= applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
const store = createStoreWithMiddleware(reducer)

const routes= (
  <Route handler={App}>
    <Route path='/results' handler={ResultsContainer}/>
    <DefaultRoute handler={VotingContainer}/>
  </Route>
)

Router.run(routes, Root => {
  React.render(
    <Provider store={store}>
      {() => <Root/>}
    </Provider>,
    document.getElementById('app'))
})
