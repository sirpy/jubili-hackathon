import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import { withRouter } from "react-router-dom";

const style = {
  paper: {
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const SideBar = (props) => (
  <div>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem primaryText="Stake" leftIcon={<RemoveRedEye />}  onClick={() => props.history.push('/account/stake')}/>
        <MenuItem primaryText="Stake Friend" leftIcon={<PersonAdd />} onClick={() => props.history.push('/account/stakefriend')}/>
        <MenuItem primaryText="Share" leftIcon={<PersonAdd />} />
        <MenuItem primaryText="Get links" leftIcon={<ContentLink />} />
        <Divider />
        <MenuItem primaryText="Make a copy" leftIcon={<ContentCopy />} />
        <MenuItem primaryText="Download" leftIcon={<Download />} />
        <Divider />
        <MenuItem primaryText="Remove" leftIcon={<Delete />} />
      </Menu>
    </Paper>
  </div>
);

export default withRouter(SideBar);
