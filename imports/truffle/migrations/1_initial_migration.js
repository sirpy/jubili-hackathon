var Migrations = artifacts.require("./Migrations.sol");
var Jubili = artifacts.require("./Jubili.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Jubili);

};
