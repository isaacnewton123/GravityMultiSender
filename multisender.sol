// SPDX-License-Identifier: MIT
pragma solidity 0.8.26
;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract GravityMultiSender {
    address public immutable owner;
    uint256 public constant TAX_PERCENTAGE = 1; // 1% tax
    uint256 public constant MAX_BATCH_SIZE = 200; // Limit batch size to prevent gas issues
    
    event TokenTransfer(address indexed token, address indexed recipient, uint256 amount, uint256 tax);
    event NativeTransfer(address indexed recipient, uint256 amount, uint256 tax);
    event TokenRecovery(address indexed token, uint256 amount);
    event NativeRecovery(uint256 amount);
    
    error InvalidArraySize();
    error InvalidAddress();
    error InsufficientBalance();
    error TransferFailed();
    error TaxTransferFailed();
    error NothingToRecover();
    error LengthMismatch();
    error NotOwner();
    
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if(msg.sender != owner) revert NotOwner();
        _;
    }

    // Calculate tax amount with precision handling
    function calculateTax(uint256 amount) public pure returns (uint256) {
        // Multiply first to avoid precision loss
        return (amount * TAX_PERCENTAGE) / 100;
    }

    function multiSendToken(
        address token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        if(recipients.length != amounts.length) revert LengthMismatch();
        if(recipients.length == 0 || recipients.length > MAX_BATCH_SIZE) revert InvalidArraySize();
        
        IERC20 tokenContract = IERC20(token);
        uint256 batchSize = recipients.length;
        
        for(uint256 i = 0; i < batchSize;) {
            if(recipients[i] == address(0)) revert InvalidAddress();
            
            uint256 taxAmount = calculateTax(amounts[i]);
            uint256 transferAmount = amounts[i] - taxAmount;
            
            bool success = tokenContract.transferFrom(msg.sender, recipients[i], transferAmount);
            if(!success) revert TransferFailed();
            
            if (taxAmount > 0) {
                success = tokenContract.transferFrom(msg.sender, owner, taxAmount);
                if(!success) revert TaxTransferFailed();
            }

            emit TokenTransfer(token, recipients[i], transferAmount, taxAmount);

            unchecked {
                ++i;
            }
        }
    }

    function multiSendNative(
        address[] calldata recipients, 
        uint256[] calldata amounts
    ) external payable {
        if(recipients.length != amounts.length) revert LengthMismatch();
        if(recipients.length == 0 || recipients.length > MAX_BATCH_SIZE) revert InvalidArraySize();
        
        uint256 batchSize = recipients.length;
        uint256 totalAmount;
        uint256 totalTax;
        
        // Calculate totals
        for(uint256 i = 0; i < batchSize;) {
            uint256 taxAmount = calculateTax(amounts[i]);
            totalTax += taxAmount;
            totalAmount += (amounts[i] - taxAmount);

            unchecked {
                ++i;
            }
        }
        
        if(msg.value < (totalAmount + totalTax)) revert InsufficientBalance();
        
        // Process transfers
        for(uint256 i = 0; i < batchSize;) {
            if(recipients[i] == address(0)) revert InvalidAddress();
            
            uint256 taxAmount = calculateTax(amounts[i]);
            uint256 transferAmount = amounts[i] - taxAmount;
            
            payable(recipients[i]).transfer(transferAmount);
            
            emit NativeTransfer(recipients[i], transferAmount, taxAmount);

            unchecked {
                ++i;
            }
        }
        
        // Send accumulated tax to owner
        if (totalTax > 0) {
            payable(owner).transfer(totalTax);
        }
    }

    // Emergency function to recover stuck tokens
    function recoverTokens(address token) external onlyOwner {
        IERC20 tokenContract = IERC20(token);
        uint256 balance = tokenContract.balanceOf(address(this));
        if(balance == 0) revert NothingToRecover();
        
        bool success = tokenContract.transfer(owner, balance);
        if(!success) revert TransferFailed();
        
        emit TokenRecovery(token, balance);
    }

    // Emergency function to recover stuck ETH
    function recoverEth() external onlyOwner {
        uint256 balance = address(this).balance;
        if(balance == 0) revert NothingToRecover();
        
        payable(owner).transfer(balance);
        
        emit NativeRecovery(balance);
    }
}
