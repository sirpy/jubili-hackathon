import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {InitJubili} from '/client/jubili.js'
import Login from '/client/Login.jsx'
import SideBar from '/client/SideBar'
import UserBadges from '/client/Badges.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

const Layout = (props) => (
	<main style={{display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex'}}>
        <UserBadges/>
      </div>
			<aside style={{display:'flex'}}>
				<SideBar/>
			</aside>
			<div style={{display:'flex',flexDirection:'column'}}>
				{props.children}
			</div>
	</main>
)

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
      </Layout>
    </Router>
  )

}
const App = () => (
  <MuiThemeProvider>
    <Routes />
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
