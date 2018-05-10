pragma solidity ^0.4.18;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract JubiliCredit is MintableToken {
    string public name = "Jubili Credit";
    string public symbol = "JBLC";
    uint8 public decimals = 2;


    uint256 public constant INITIAL_SUPPLY = 0;
    mapping(address => uint256) public creditLines;

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
      return balances[msg.sender] - creditLines[msg.sender];
    }
    /**
    * @dev Function to give trust tokens bonus
    * @param _to The address that will receive the trust tokens.
    * @param _amount The amount of new creditline
    * @return A boolean that indicates if the operation was successful.
    */
   function updateCreditLine(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
     int toadd = int(_amount) - int(creditLines[_to]);
     creditLines[_to] = _amount;
     totalSupply_ = uint(int(totalSupply_) + toadd);
     if(toadd<0 && balances[_to]>creditLines[_to])
      balances[_to] = creditLines[_to];
     if(toadd>0)
      balances[_to] = balances[_to].add(uint(toadd));
     emit CreditLine(_to,_amount);
     emit Transfer(address(0), _to, _amount);
     return true;
   }

}
