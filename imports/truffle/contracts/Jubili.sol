pragma solidity ^0.4.18;

/* import './JubiliToken.sol';
import './JubiliCredit.sol'; */
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
  mapping(string => mapping(address => Friend)) public userFriends;

  /* JubiliToken public jblToken;
  JubiliCredit public jblCredit; */

  event JubiliNewUser(address indexed user);
  //emailto need to be replaced with a secret
  event JubiliStakeFriend(address indexed from,string indexed to,uint amount, uint8 trustScore);

  function Jubili() public {
    totalStaking = 0;
    /* jblCredit = new JubiliCredit();
    jblToken = new JubiliToken(); */
  }
  function getFriends(address user) public constant returns (address[]) {
    return users[user].friends;
  }
  function isUser()  public constant returns (bool) {
    return users[msg.sender].gotBonus;
  }

  function newUser() public {
    if(users[msg.sender].gotBonus)
      return;
    users[msg.sender].gotBonus = true ;
    jblCredit.updateCreditLine(msg.sender,SOCIAL_TRUST_NEW);
    emit JubiliNewUser(msg.sender);
  }

  function stakeFriend(address friend,uint amount,uint8 trust) public {
    require(jblToken.stakeFriend(msg.sender,friend,amount)==true);
    totalStaking.add(amount);
    User storage userRecord = users[msg.sender];
    Friend storage friendRecord = userFriends[msg.sender][friend];
    bool isExistingFriend = friendRecord.isExistingFriend;
    if(!isExistingFriend)
      userRecord.friends.push(friend);
    friendRecord.staking = friendRecord.staking.add(amount);
    friendRecord.trust = trust;
    friendRecord.isExistingFriend = true;
    emit JubiliStakeFriend(msg.sender,friend,amount,trust);
    //if new connection (opposite friendship exists but this one is new)
    if(isExistingFriend==false && userFriends[friend][msg.sender].isExistingFriend==true)
    {
      jblToken.giveBonus(msg.sender,SOCIAL_TRUST_FRIEND,JubiliToken.TrustBonus.NewFriend);
      jblToken.giveBonus(friend,SOCIAL_TRUST_FRIEND,JubiliToken.TrustBonus.NewFriend);
    }

  }

}

}
