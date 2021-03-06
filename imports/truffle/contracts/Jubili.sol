pragma solidity ^0.4.18;

/* import './JubiliToken.sol';*/
import './JubiliCredit.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Jubili  {
  using SafeMath for uint256;

  struct User {
      bool gotBonus;
      address[] friends;
      uint totalStaking;
  }
  struct Friend {
    uint256 staking;
    string friendType;
    uint8 trust;
    bool isExistingFriend;//is existing friend
    bool isMutual;
  }

  uint public totalStaking = 0;
  uint public constant SOCIAL_TRUST_NEW = 10000;

  mapping(address => User) public users;
  mapping(address => mapping(address => Friend)) public userFriends;

  /* JubiliToken public jblToken;*/
  JubiliCredit public jblCredit;

  event JubiliNewUser(address indexed user);
  //emailto need to be replaced with a secret
  event JubiliStakeFriend(address indexed from,string indexed to,uint amount, uint8 trustScore);

  function Jubili() public {
    totalStaking = 0;
    jblCredit = new JubiliCredit();
  }
  function getFriends(address user) public constant returns (address[]) {
    return users[user].friends;
  }
  function isUser()  public constant returns (bool) {
    return users[msg.sender].gotBonus;
  }

  function newUser() public returns (bool){
    if(users[msg.sender].gotBonus)
      return false;
    users[msg.sender].gotBonus = true ;
    jblCredit.updateCreditLine(msg.sender,SOCIAL_TRUST_NEW);
    emit JubiliNewUser(msg.sender);
    return true;
  }

}
