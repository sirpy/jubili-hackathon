import React from 'react'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {withRouter} from 'react-router-dom'

let styles = {
  badgeContent:{width:'45px',height:'45px'}
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
      <div>
      <Badge
      badgeContent={this.state.trustScore}
      primary={true}
      badgeStyle={styles.badgeContent}
      >
      <NotificationsIcon tooltip="Trust Score"/>
      <div>Trust Score</div>
      </Badge>
      <Badge
      badgeContent={this.state.balance + ` (${this.state.creditLine})` }
      badgeStyle={styles.badgeContent}
      primary={true}
      style={{width:'100px'}}

      >
        <NotificationsIcon />
        <div>Balance(Credit Line)</div>
      </Badge>
      <Badge
      badgeContent={this.state.trustTokens + ` (${this.state.creditLine})` }
      badgeStyle={styles.badgeContent}
      primary={true}
      style={{width:'100px'}}

      >
        <NotificationsIcon />
        <div>Trust Tokens(Locked)</div>
      </Badge>
      </div>

    )

  }
}
export default withRouter(Badges);
