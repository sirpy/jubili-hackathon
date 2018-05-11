import React from 'react'
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import GroupWorkIcon from 'material-ui/svg-icons/action/group-work';
import AccountBalanceWalletIcon from 'material-ui/svg-icons/action/account-balance-wallet';
import LoyaltyIcon from 'material-ui/svg-icons/action/loyalty';
import {withRouter} from 'react-router-dom'
import {JubiliCredit} from '/client/jubili.js'
import * as Colors from 'material-ui/styles/colors';
import Joyride from 'react-joyride';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

  const style= {
    headline: {textAlign: "center", fontSize: "42px", fontStyle: "italic", marginTop: "5px", color:"#323b73"},
    icons: { verticalAlign: "bottom"},
    container: {display:'flex', justifyContent:'space-around', width: "100%", fontSize: "20px"},
    stepHeadline:{color:Colors.green500}
  }

class Badges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      run: false,
    steps: [
      {
        target: '#creditLine',
        content: <div><h2 style={style.stepHeadline}>Your intrest free credit line</h2><h3>you start with 100 JubiliCredits</h3></div>,
        placement: 'right',
        disableBeacon: true,
      },
      {
        target: '#balance',
        content: <div><h2 style={style.stepHeadline}>Account balance</h2><h3>You haven't spent or received any JubiliCredits yet</h3></div>,
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#trust',
        content: <div><h2 style={style.stepHeadline}>Increase Your TrustScore</h2><h3 style={{lineHeight:'25px'}}><List><ListItem style={{color:'black'}} leftIcon={<ActionInfo/>}>Vouch for people you know. </ListItem><ListItem style={{color:'black'}} leftIcon={<ActionInfo/>}>Collect credit history by spending and recieving credits!</ListItem></List></h3></div>,
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '#invite',
        content: <div><h2 style={style.stepHeadline}>Expand your Trust Network and credit line</h2><h3><List><ListItem style={{color:'black'}} leftIcon={<ActionInfo/>}>Vouch for friends by choosing an amount of JubiliCredits you are willing to risk in case your friend defaults.</ListItem><ListItem style={{color:'black'}} leftIcon={<ActionInfo/>}>The vouching is activated only if your friend vouch and risk his own credit for you.</ListItem></List></h3></div>,
        placement: 'right',
        continuous:false,
      },
      {
        target: '#pay',
        content: <div><h2 style={style.stepHeadline}>Pay with JubiliCredits</h2></div>,
        placement: 'right',
        continuous:false,
      },

    ]
    }
    this.initListeners()
    this.updateAccount()
  }
  componentDidMount() {
    this.setState({run:true})
  }
  componentWillMount() {
    // this.initListeners()
  }
  async updateAccount() {
    let balance =  await JubiliCredit.balanceOf(web3.eth.defaultAccount)
    let cline = await JubiliCredit.getCreditLine()
    let debt = await JubiliCredit.getDebt()
    console.log("account:",{balance,cline,debt})
    // balance.then((x) => {console.log("account data",{x})})

    // let balance = await JubiliCredit.balanceOf()
    let newBalance = (balance.toNumber() - cline.toNumber())/100
    let changed = this.state.balance!=newBalance
    if(changed)
      setTimeout(() => this.setState({balanceChanged:''}),800)
    this.setState({
      trustScore: 5,
      balance: newBalance,
      creditLine:cline.toNumber()/100,
      debt:debt.toNumber()/100,
      balanceChanged: changed?'changed':'',
    })

  }
  async initListeners() {
    JubiliCredit.allEvents({fromBlock:'latest'}).watch((err,res) => this.updateAccount())

  }

  joyrideCallback(a,b,c) {
    console.log("joyride",{a,b,c})
  }
  render() {
    console.log(Colors.amber50)
    return (

      <Paper style={{width: "100%", paddingTop:"10px"}}>
      <Joyride
        continuous
         steps={this.state.steps}
         run={this.state.run}
         callback={this.joyrideCallback}
         scrollToFirstStep
        showProgress
        showSkipButton={false}
        disableOverlayClose
        disableCloseOnEsc
       />
        <div style={style.container}>
          <div id='trust'>
            <GroupWorkIcon tooltip="Trust Score" style={style.icons}/>
            <span>Trust Score: {this.state.trustScore}</span>
          </div>
          <div id='balance' className={`balanceChanged ${this.state.balanceChanged}`}>
            <AccountBalanceWalletIcon style={style.icons}/>
            <span>Balance: <span style={{color:this.state.balance<=0?Colors.red500:''}}>{this.state.balance}</span></span>
          </div>
          <div id='creditLine'>
            <LoyaltyIcon style={style.icons}/>
            <span>Credit Line: {this.state.creditLine}</span>
          </div>
        </div>
        <div style={style.headline} className="--titan ">Jubili</div>
      </Paper>
    )

  }
}
export default withRouter(Badges);
