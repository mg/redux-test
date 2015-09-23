import React from 'react'
import { connect } from 'react-redux'

import * as actions from './action-creators'
import Winner from './winner.jsx'

let styleResults= {
}

let styleEntry= {
}

let styleVoteCount= {
}

let styleTally= {
}

let styleManagement= {
}

let styleNext= {
}

export class Results extends React.Component {
  static propTypes= {
    pair: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    tally: React.PropTypes.object,
    next: React.PropTypes.func,
  }

  render() {
    return this.props.winner ?
      <Winner ref='winner' winner={this.props.winner}/> :
      <div style={styleResults}>
        <div style={styleTally}>
          {this.getPair().map(entry =>
            <div key={entry} className='entry' style={styleEntry}>
              <h1>{entry}</h1>
              <div style={styleVoteCount}>
                {this.getVotes(entry)}
              </div>
            </div>
          )}
        </div>
        <div style={styleManagement}>
          <button ref='next' style={styleNext} onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>
  }

  getPair() {
    return this.props.pair || []
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry)
    }
    return 0
  }
}

export const ResultsContainer= connect(state => {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  }
}, actions)(Results)
