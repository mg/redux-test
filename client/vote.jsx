import React from 'react'

let styleVote = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none'
}

let styleButton = {
  flex: '1 0 0',
  backgroundColor: '#673AB7',
  borderWidth: 0,
}

let styleLabel = {

}

export default class Vote extends React.Component {
  static propTypes= {
    pair: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    hasVoted: React.PropTypes.string,
    vote: React.PropTypes.func.isRequired,
  }

  render() {
    return <div style={styleVote}>
      {this.getPair().map((entry, idx) => {
        let button= idx === 0 ? {...styleButton, ...{borderBottom: '1px solid white'}} : styleButton
        return (
          <button key={entry} onClick={() => this.props.vote(entry)} disabled={this.isDisabled()} style={button}>
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ? <div style={styleLabel}>Voted</div> :null}
          </button>
        )
      })}
    </div>
  }

  getPair() {
    return this.props.pair || []
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }
}
