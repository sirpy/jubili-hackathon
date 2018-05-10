import React from 'react'
import Badge from 'material-ui/Badge';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import GroupWorkIcon from 'material-ui/svg-icons/action/group-work';
import AccountBalanceWalletIcon from 'material-ui/svg-icons/action/account-balance-wallet';
import LoyaltyIcon from 'material-ui/svg-icons/action/loyalty';
import {withRouter} from 'react-router-dom'


  const style= {
    headline: {textAlign: "center", fontSize: "42px", fontStyle: "italic", margin: "5px 0", color:"#323b73"},
    icons: { verticalAlign: "bottom"},
    container: {display:'flex', justifyContent:'space-around', width: "100%", fontSize: "20px"}
  }

class Badges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  componentWillMount() {
    this.initListeners()
  }
  initListeners() {
    this.setState({
      trustScore: 5,
      balance: 3,
      socialTokens: 10,
      socialTokensLocked: 5,
      creditLine:300
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
