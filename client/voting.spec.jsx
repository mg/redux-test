import React from 'react/addons'
import { Voting } from './voting.jsx'
import { expect } from 'chai'

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = React.addons.TestUtils

describe('Voting ->', () => {
  it('renders pair of buttons when there is no winner yet', () => {
    const component = renderIntoDocument(<Voting pair={['A', 'B']} vote={()=>{}}/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
  })

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(<Voting winner='A'/>)
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('A');
  })
})
