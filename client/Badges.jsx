import React from 'react'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {withRouter} from 'react-router-dom'
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
      socialToken: 10,
      creditLine:300
    })
  }

  render() {
    return (
      <div>
      <Badge
      badgeContent={this.state.trustScore}
      primary={true}
      >
      <NotificationsIcon tooltip="Trust Score"/>
      <div>trust</div>
      </Badge>
      <Badge
      badgeContent={this.state.balance}
      secondary={true}
      >
      <IconButton tooltip="Notifications">
      <NotificationsIcon />
      </IconButton>
      </Badge>
      </div>

    )

  }
}
export default withRouter(Badges);
