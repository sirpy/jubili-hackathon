import Web3 from 'web3'
import JubiliContract from '/imports/truffle/build/contracts/Jubili.json'
import Contract from 'truffle-contract'

export let Jubili = null;
export const InitJubili = async () => {
  let Jubili = Contract(JubiliContract)
  await Jubili.defaults({from:web3.eth.defaultAccount})
  await this.Jubili.setProvider(web3.currentProvider)
  let contract = await this.Jubili.deployed()
  console.log("Started Jubili contract",contract)
  Jubili = contract
}
