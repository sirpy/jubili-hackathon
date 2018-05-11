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

const styles = {
  loginButton: {
    width:'300px',
    margin:'10px'
  },
  headline: {textAlign: "center", fontSize: "42px", fontStyle: "italic", marginTop: "20%", color:"#323b73"},
  subheader: {textAlign: "center", fontSize: "30px", marginTop: "10%",marginBottom:'10%'},
  loginheader: {textAlign: "center", fontSize: "20px",fontWeight:'bold'},
}
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
    console.log("isUser",isUser)
    // if(isUser)
    //   this.setState({isUser:true})
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
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className="--titan " style={{textAlign:'center'}}>
          <div style={styles.headline} className="--titan ">Welcome To Jubili</div>
          <div style={styles.subheader}>Intrest Free Credit When You Need It</div>
        </div>
        <div style={styles.loginheader}>Prove you are human:</div>
        <div>
          <RaisedButton type="submit" label="Join With Jubili" style={styles.loginButton} onClick={() => this.createUser()}/>
        </div>
        <div>
        <RaisedButton type="submit" label="Join With UPort" style={styles.loginButton} icon={  <img src='/uport.svg' width={'30px'} />}/>
        </div>
        <div>
          <RaisedButton type="submit" label="Join With Civic" style={styles.loginButton} icon={  <img src='/civic.svg' width={'30px'} />}/>
        </div>
        <div>
          <RaisedButton type="submit" label="Join With BrightID" iconStyle={{verticalAlign:'top'}} style={styles.loginButton} icon={  <img src='https://www.brightid.org/wordpress/wp-content/uploads/2018/02/logo-31.jpg' style={{verticalAlign:'top'}} width={'100px'} />}/>
          </div>
      </div>
    )
  }


}
