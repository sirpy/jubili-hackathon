import Web3 from 'web3'
import JubiliContract from '/imports/truffle/build/contracts/Jubili.json'
import Contract from 'truffle-contract'

export var Jubili = null
export const InitJubili = async () => {
  let c = Contract(JubiliContract)
  await c.defaults({from:web3.eth.defaultAccount})
  await c.setProvider(web3.currentProvider)
  let contract = await c.deployed()
  console.log("Started Jubili contract",contract)
  Jubili = contract
}
