import makeStore from './store'
import startServer from './server'
import entries from './entries'

export const store = makeStore()
startServer(store)

store.dispatch({
  type: 'SET_ENTRIES',
  entries: entries
});
store.dispatch({type: 'NEXT'})
