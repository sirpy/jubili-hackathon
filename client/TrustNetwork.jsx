import React from 'react'
import Web3 from 'web3'
import {Jubili} from '/client/jubili.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

const styles = {
  row: {display:'flex',flexDirection:'row',justifyContent:'space-between'}
}
export default class TrustNetwork extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
      <div style={{width:'300px',fontSize:'24px'}}>
        <div style={styles.row}>
          <div style={{display:'flex'}}>Matan Cohen</div>
          <div style={{display:'flex'}}>Collateral: 5</div>
        </div>
        <div style={styles.row}>
          <div style={{display:'flex'}}>Sefi Merkel</div>
          <div style={{display:'flex'}}>Collateral: 5</div>
        </div>
      </div>
    )
  }


}
