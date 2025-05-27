pragma solidity ^0.8.20;

contract SimpleWallet {
    mapping(address => uint256) private balances;
    mapping(address => bool) private hasMinted;

    function mint(address user, uint256 amount) public {
        if (!hasMinted[user]) {
            balances[user] += amount;
            hasMinted[user] = true;
        }
    }

    function transfer(address from, address to, uint256 amount) public {
        if (balances[from] >= amount) {
            balances[from] -= amount;
            balances[to] += amount;
        }
    }

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }
}
