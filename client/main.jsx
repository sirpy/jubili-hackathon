import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {InitJubili} from '/client/jubili.js'
import Login from '/client/Login.jsx'
import Invite from '/client/Invite.jsx'
import SideBar from '/client/SideBar'
import UserBadges from '/client/Badges.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'


const Account = () => (
  <div>hello</div>
)
const Layout = (props) => (
	<main style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex'}}>
        <UserBadges/>
      </div>
			<aside style={{display:'flex'}}>
				<SideBar/>
			</aside>
			<div style={{display:'flex',flexDirection:'column'}}>
      <Switch>
        <Route path="/account" component={Account}/>
        <Route path="/invite" component={Invite}/>
      </Switch>
			</div>
	</main>
)

const CleanLayout = (props) => (
	<main style={{display:'flex', flexDirection:'column'}}>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
	</main>
)

var layoutAssignments = {
  '/login': CleanLayout,
  // '/pricing': FullLayout,
  // '/signup': SimpleLayout,
  // '/login': SimpleLayout
}

var layoutPicker = function(props){
  var LayoutS = layoutAssignments[props.location.pathname];
  console.log("layout",props,LayoutS)
  return LayoutS ? <LayoutS/> : <Layout/>;
};

class Main extends React.Component {
  render(){
    return (
      <Router>
        <Route path="*" render={layoutPicker}/>
      </Router>
    );
  }
}

// const Routes = () => {
//   return (
//     <Router>
//       <L>
//
//       </Route>
//       <Route>
//         <Switch>
//           <Route path="/x" component={Login}/>
//         </Switch>
//       </Route>
//     </Router>
//   )
//
// }
const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);


const initWeb3 = async () => {
		if (typeof window.web3 === 'undefined') {
			// no web3, use fallback
			console.error("Please use a web3 browser");
		} else {
			// window.web3 == web3 most of the time. Don't override the provided,
			// web3, just wrap it in your Web3.
			web3 = new Web3(window.web3.currentProvider);
      console.log("defaultAccount",window.web3.eth.defaultAccount)
			// the default account doesn't seem to be persisted, copy it to our
			// new instance
			if(window.web3.eth.defaultAccount)
				web3.eth.defaultAccount = window.web3.eth.defaultAccount
			else {
				let accounts = await web3.eth.getAccounts()
				console.log("user accounts",accounts)
				web3.eth.defaultAccount = accounts[0]

			}
      await InitJubili()
		}

}
Meteor.startup( async (f) => {
	await initWeb3()
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
} );
