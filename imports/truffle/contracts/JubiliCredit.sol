pragma solidity ^0.4.18;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract JubiliCredit is MintableToken {
    string public name = "Jubili Credit";
    string public symbol = "JBLC";
    uint8 public decimals = 2;


    uint256 public constant INITIAL_SUPPLY = 0;
    mapping (address => uint256) public creditLines;

    event CreditLine(address indexed user,uint256 amount);

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    function JubiliCredit() public {
    }

    function getCreditLine() public returns (uint256) {
      return creditLines[msg.sender];
    }
    function getDebt() public returns (uint256) {
      return balances
    }
    /**
    * @dev Function to give trust tokens bonus
    * @param _to The address that will receive the trust tokens.
    * @param _amount The amount of new creditline
    * @return A boolean that indicates if the operation was successful.
    */
   function updateCreditLine(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
     totalSupply = totalSupply_.add(_amount);
     uint256 toadd = _amount - creditLine[_to]
     creditLines[_to].add(toadd)
     balances[_to] = balances[_to].add(_amount);
     emit CreditLine(_to,_amount);
     emit Transfer(address(0), _to, _amount);
     return true;
   }

}
