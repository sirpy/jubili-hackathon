import React from 'react'
import Web3 from 'web3'
import JubiliContract from '/imports/truffle/build/contracts/Jubili.json'
// import JubiliTokenContract from '/imports/truffle/build/contracts/JubiliToken.json'
import Contract from 'truffle-contract'
import {Jubili} from '/client/jubili.js'


//1. on state change checks if user has account on contract (contract.isUser)
//2. if exists then redirect to main page
//3. otherwise show create account button
//4. onclick it will sign a message to create account and send to server method
//5. server executes on contract
//6. client listens to web3 event NewUser (create listener in constructor and destroy on unmount)
//7. on event redirect to main screen
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.isJubiliUser()
    this.state = {
      isUser:false
    }
  }

  componentWillUpdate() {
    this.isJubiliUser()
  }
  async isJubiliUser() {
    let isUser = await Jubili.isUser()
    if(isUser)
      this.setState({isUser:true})
  }
  render() {
    if(this.state.isUser)
      return <Redirect path="/"/>
    else
    return <div>welcome</div>
  }


}
