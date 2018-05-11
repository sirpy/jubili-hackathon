import React from 'react'
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import GroupWorkIcon from 'material-ui/svg-icons/action/group-work';
import AccountBalanceWalletIcon from 'material-ui/svg-icons/action/account-balance-wallet';
import LoyaltyIcon from 'material-ui/svg-icons/action/loyalty';
import {withRouter} from 'react-router-dom'
import {JubiliCredit} from '/client/jubili.js'

  const style= {
    headline: {textAlign: "center", fontSize: "42px", fontStyle: "italic", margin: "5px 0", color:"#323b73"},
    icons: { verticalAlign: "bottom"},
    container: {display:'flex', justifyContent:'space-around', width: "100%", fontSize: "20px"}
  }

class Badges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.initListeners()
  }
  componentWillMount() {
    // this.initListeners()
  }
  async initListeners() {
    let balance =  await JubiliCredit.balanceOf(web3.eth.defaultAccount)
    let cline = await JubiliCredit.getCreditLine()
    let debt = await JubiliCredit.getDebt()
    console.log("account:",{balance,cline,debt})
    // balance.then((x) => {console.log("account data",{x})})

    // let balance = await JubiliCredit.balanceOf()


    this.setState({
      trustScore: 5,
      balance: (balance.toNumber() - cline.toNumber())/100,
      creditLine:cline.toNumber()/100,
      debt:debt.toNumber()/100
    })
  }


  render() {
    return (
      <Paper style={{width: "100%", paddingTop:"10px"}}>
        <div style={style.container}>
          <div>
            <GroupWorkIcon tooltip="Trust Score" style={style.icons}/>
            <span>Trust Score: {this.state.trustScore}</span>
          </div>
          <div>
            <AccountBalanceWalletIcon style={style.icons}/>
            <span>Balance: {this.state.balance}</span>
          </div>
          <div>
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
