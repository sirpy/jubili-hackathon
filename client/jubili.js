import Web3 from 'web3'
import JubiliContract from '/imports/truffle/build/contracts/Jubili.json'
import JubiliCreditContract from '/imports/truffle/build/contracts/JubiliCredit.json'
import Contract from 'truffle-contract'

export var Jubili = null
export var JubiliCredit = null
export const InitJubili = async () => {
  let c = Contract(JubiliContract)
  await c.defaults({from:web3.eth.defaultAccount})
  await c.setProvider(web3.currentProvider)
  let contract = await c.deployed()
  console.log("Started Jubili contract",contract)
  contract.allEvents({fromBlock:'latest'}).watch((err,res) => console.log(err,res))

  let jc = Contract(JubiliCreditContract)

  let tokenAddr = await contract.jblCredit()
  console.log("token address",tokenAddr)
  await jc.defaults({from:web3.eth.defaultAccount})
  await jc.setProvider(web3.currentProvider)
  let creditcontract = await jc.at(tokenAddr)
  creditcontract.allEvents({fromBlock:'latest'}).watch((err,res) => console.log(err,res))


  Jubili = contract
  JubiliCredit = creditcontract
}
