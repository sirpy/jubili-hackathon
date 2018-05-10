import React from 'react'


//1. on state change checks if user has account on contract (contract.isUser)
//2. if exists then redirect to main page
//3. otherwise show create account button
//4. onclick it will sign a message to create account and send to server method
//5. server executes on contract
//6. client listens to web3 event NewUser (create listener in constructor and destroy on unmount)
//7. on event redirect to main screen
export default class Login extends React.component {
  constructor(props) {

  }

  render() {
    return <div>welcome</div>
  }


}
