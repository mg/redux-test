import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai';

import reducer from './reducer.js';

describe('reducer ->', () => {

  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('A', 'B'),
          tally: Map({A: 1})
        })
      })
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      }
    }))
  })

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['A', 'B'],
          tally: {A: 1}
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      }
    }))
  })

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['A', 'B'],
          tally: {A: 1}
        }
      }
    }

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      }
    }))
  })

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'A'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      },
      hasVoted: 'A'
    }))
  })

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['A', 'B'],
        tally: {A: 1}
      },
      hasVoted: 'A'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['C', 'D']
        }
      }
    }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['C', 'D']
      }
    }))
  })

})
