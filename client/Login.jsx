import React from 'react'
import Web3 from 'web3'
import JubiliContract from '/imports/truffle/build/contracts/Jubili.json'
// import JubiliTokenContract from '/imports/truffle/build/contracts/JubiliToken.json'
import Contract from 'truffle-contract'
import {Jubili} from '/client/jubili.js'
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'


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
      console.log("login",Jubili)
    this.isJubiliUser()
    this.initListeners()
    this.state = {
      isUser:false
    }
  }

  //listen to new user event
  initListeners() {
    
  }
  componentWillUpdate() {
    // this.isJubiliUser()
  }
  async isJubiliUser() {
    let isUser = await Jubili.isUser()
    if(isUser)
      this.setState({isUser:true})
  }
  async createUser() {
    await Jubili.newUser()
    this.setState({isUser:true})
  }
  render() {
    if(this.state.isUser)
      return <Redirect to="/"/>
    else
    return (
      <ValidatorForm onSubmit={() => this.createUser()}>
        <RaisedButton type="submit" label="Join With Jubili" style={{marginTop:'20px'}}/>
        <RaisedButton type="submit" label="Join With UPort" style={{marginTop:'20px'}}/>
        <RaisedButton type="submit" label="Join With Civic" style={{marginTop:'20px'}}/>
        <RaisedButton type="submit" label="Join With BrightID" style={{marginTop:'20px'}}/>
      </ValidatorForm>
    )
  }


}
