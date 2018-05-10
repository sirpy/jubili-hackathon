import React from 'react'
import Web3 from 'web3'
import {JubiliCredit} from '/client/jubili.js'
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'


export default class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount:'',
      address:'0x0'
    }
    this.initListeners()

  }

  //listen to new user event
  initListeners() {

  }
  componentWillUpdate() {
    // this.isJubiliUser()
  }
  async pay() {
    // let res = await Jubili.stakeFriend(this.state.friendEmail,parseInt(this.state.stake*100),this.state.trust)
    let res =  JubiliCredit.transfer(this.state.address,this.state.amount*100)
    res.then(() => this.setState({payed:true})).catch(() => console.log("payment canceled"))    
    console.log("submited payment",res)

  }

  render() {
    return (
      <ValidatorForm onSubmit={() => this.pay()}>
        <div>
          <TextValidator
                    hintText="Friend Address 0x...."
                    onChange={(e,v) => this.setState({address:v})}
                    name="friendAddr"
                    value={this.state.address}
                    validators={['required']}
                    errorMessages={["This field is required","Invalid address format"]}
                />
        </div>
        <div>
          <TextValidator
            hintText="Amount"
            onChange={(e,v) => this.setState({amount:v})}
            name="stake"
            value={this.state.amount}
            validators={['required', 'matchRegexp:^[0-9]+(\.[0-9]{1,2})?$']}
            errorMessages={["This field is required","Invalid amount"]}
            />
        </div>
      <div>
        <RaisedButton type="submit" label="Pay" style={{marginTop:'20px'}}/>
      </div>
      </ValidatorForm>
    )
  }


}
