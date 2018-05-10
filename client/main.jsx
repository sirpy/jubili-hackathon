import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

const Login = () => (
  <div>Welcome</div>
)
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  )

}
const App = () => (
  <MuiThemeProvider>
    <Routes />
  </MuiThemeProvider>
);



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
