import React from 'react/addons'
import { List } from 'immutable'
import Vote from './vote.jsx'
import { expect } from 'chai'

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = React.addons.TestUtils

describe('Vote ->', () => {
  it('renders a pair of buttons', () => {
    const component= renderIntoDocument(<Vote pair={['A', 'B']} vote={()=>{}}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].getDOMNode().textContent).to.equal('A')
    expect(buttons[1].getDOMNode().textContent).to.equal('B')
  })

  it('invokes callback when a button is clicked', () => {
    let votedWith
    const vote = (entry) => votedWith = entry

    const component= renderIntoDocument(<Vote pair={['A', 'B']} vote={vote}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    Simulate.click(buttons[0].getDOMNode());
    expect(votedWith).to.equal('A')
  })

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(<Vote pair={['A', 'B']} hasVoted='A' vote={()=>{}}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons[0].getDOMNode().hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].getDOMNode().hasAttribute('disabled')).to.equal(true)
  })

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(<Vote pair={['A', 'B']} hasVoted='A' vote={()=>{}}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons[0].getDOMNode().textContent).to.contain('Voted')
  })

})
