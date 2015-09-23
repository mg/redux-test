import React from 'react'
import { connect } from 'react-redux'

import Winner from './winner.jsx'
import Vote from './vote.jsx'
import * as actions from './action-creators.js'

export class Voting extends React.Component {
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref='winner' winner={this.props.winner}/> :
        <Vote {...this.props}/>
      }
    </div>
  }
}

export const VotingContainer= connect(state => {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner'),
  }
}, actions)(Voting)
