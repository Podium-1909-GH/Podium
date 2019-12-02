/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserProfile} from './user-profile'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('UserProfile', () => {
  let userProfile

  beforeEach(() => {
    userProfile = shallow(<UserProfile email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userProfile.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
