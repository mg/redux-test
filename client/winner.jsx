import React from 'react'

let styleWinner = {

}

export default class Winner extends React.Component {
  static propTypes = {
    winner: React.PropTypes.string.isRequired
  }

  render() {
    return <div style={styleWinner}>
      Winner is {this.props.winner}!
    </div>
  }
}
