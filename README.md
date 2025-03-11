# GravityMultiSender

<div align="center">
  <img src="https://raw.githubusercontent.com/isaacnewton123/GravityMultiSender/refs/heads/main/DALL%C2%B7E%202025-01-25%2003.12.54%20-%20A%20minimalist%20logo%20design%20for%20'GravityMultiSender'%20using%20only%20the%20letter%20'G'.%20The%20'G'%20should%20be%20stylized%20with%20a%20modern%2C%20sleek%2C%20and%20tech-inspired%20feel%2C%20.webp" alt="Gravity MultiSender Logo" width="200"/>
  
  <h3>🚀 Professional Token Distribution Platform for the Gravity Blockchain</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Solidity](https://img.shields.io/badge/Solidity-0.8.26-e6e6e6?logo=solidity&logoColor=white)](https://soliditylang.org/)

  <p align="center">
    <a href="https://gravitymultisender.xyz" target="_blank">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#smart-contract">Smart Contract</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage-guide">Usage Guide</a> •
    <a href="#documentation">Documentation</a>
  </p>
</div>

## 🌟 Overview

**GravityMultiSender** is an advanced, user-friendly web application built specifically for the Gravity blockchain ecosystem. It enables users to send native G tokens or any ERC-20 tokens to multiple addresses simultaneously in a single transaction, drastically reducing gas costs and transaction times.

This tool is essential for:
- Token project teams distributing airdrops
- DAOs distributing rewards to members
- Companies paying salaries or bonuses in cryptocurrency
- Marketers distributing promotional tokens
- Any organization needing efficient mass token distribution

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>Core Functionality</h3>
      <ul>
        <li>✅ Send tokens to up to 200 addresses per transaction</li>
        <li>✅ Support for native G tokens and ERC-20 tokens</li>
        <li>✅ Automatic batch processing for large lists</li>
        <li>✅ Real-time transaction status and confirmation</li>
        <li>✅ Detailed transaction history and receipts</li>
        <li>✅ Gas optimization techniques</li>
      </ul>
    </td>
    <td width="50%">
      <h3>User Experience</h3>
      <ul>
        <li>✅ Intuitive, modern interface with dark mode</li>
        <li>✅ Drag-and-drop CSV file upload</li>
        <li>✅ Direct text input for recipient lists</li>
        <li>✅ Interactive transaction preview</li>
        <li>✅ Responsive design for all devices</li>
        <li>✅ Comprehensive error handling and validation</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>Security & Reliability</h3>
      <ul>
        <li>✅ Non-custodial architecture</li>
        <li>✅ Client-side address validation</li>
        <li>✅ Verified, open-source smart contract</li>
        <li>✅ Comprehensive error handling</li>
        <li>✅ Emergency recovery functions</li>
        <li>✅ Transaction simulation before execution</li>
      </ul>
    </td>
    <td width="50%">
      <h3>Integration & Access</h3>
      <ul>
        <li>✅ Connect with multiple wallet providers</li>
        <li>✅ Support for WalletConnect protocol</li>
        <li>✅ Direct links to block explorer</li>
        <li>✅ Chaindata verification</li>
        <li>✅ Network detection and switching</li>
        <li>✅ API access for developers (coming soon)</li>
      </ul>
    </td>
  </tr>
</table>



## 🔗 Live Application

Experience GravityMultiSender now at [gravitymultisender.xyz](https://gravitymultisender.xyz)

## 📜 Smart Contract

The MultiSender smart contract is the backbone of this application, providing secure and efficient token distribution functionality on the Gravity blockchain.

### Contract Details

- **Address**: [`0xc96928ECcC15D4Af06f4277D8D291384fB47133a`](https://explorer.gravity.xyz/address/0xc96928ECcC15D4Af06f4277D8D291384fB47133a)
- **Network**: Gravity Alpha Mainnet
- **Compiler Version**: Solidity 0.8.26
- **Contract Type**: Non-upgradeable
- **License**: MIT

### Key Contract Functions

```solidity
// Send native G tokens to multiple recipients in one transaction
function multiSendNative(
    address[] calldata recipients, 
    uint256[] calldata amounts
) external payable

// Send ERC-20 tokens to multiple recipients in one transaction
function multiSendToken(
    address token,
    address[] calldata recipients,
    uint256[] calldata amounts
) external

// Calculate tax amount for a given value
function calculateTax(uint256 amount) public pure returns (uint256)
```

### Security Features

- **Error Handling**: Comprehensive custom errors with descriptive messages
- **Reentrancy Protection**: Function logic prevents reentrancy attacks
- **Input Validation**: Thorough validation of all function parameters
- **Gas Optimization**: Uses unchecked blocks and other gas optimization techniques
- **Emergency Recovery**: Functions to recover accidentally sent tokens or ETH (owner only)

### Service Fee Structure

The contract applies a modest 1% service fee on all transactions. This fee:
- Supports ongoing development and maintenance
- Ensures long-term sustainability of the service
- Helps fund new features and improvements
- Secures the infrastructure for reliable operation

## 🛠️ Technical Architecture

GravityMultiSender is built with a modern, scalable tech stack designed for performance and reliability:

<table>
  <tr>
    <th>Layer</th>
    <th>Technologies</th>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React" />
      <img src="https://img.shields.io/badge/Vite-5.1.1-646CFF?logo=vite&logoColor=white" alt="Vite" />
      <img src="https://img.shields.io/badge/CSS3-Custom_CSS-1572B6?logo=css3&logoColor=white" alt="CSS3" />
    </td>
  </tr>
  <tr>
    <td><strong>Web3 Integration</strong></td>
    <td>
      <img src="https://img.shields.io/badge/wagmi-2.1.2-3C3C3D?logo=ethereum&logoColor=white" alt="wagmi" />
      <img src="https://img.shields.io/badge/viem-2.3.1-3C3C3D?logo=ethereum&logoColor=white" alt="viem" />
      <img src="https://img.shields.io/badge/RainbowKit-2.0.1-7B36ED?logo=ethereum&logoColor=white" alt="RainbowKit" />
    </td>
  </tr>
  <tr>
    <td><strong>Data Handling</strong></td>
    <td>
      <img src="https://img.shields.io/badge/TanStack_Query-5.8.4-FF4154?logo=react-query&logoColor=white" alt="TanStack Query" />
      <img src="https://img.shields.io/badge/PapaParse-5.4.1-000000" alt="PapaParse" />
    </td>
  </tr>
  <tr>
    <td><strong>Smart Contract</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Solidity-0.8.26-363636?logo=solidity&logoColor=white" alt="Solidity" />
      <img src="https://img.shields.io/badge/ERC20-Standard-3C3C3D?logo=ethereum&logoColor=white" alt="ERC20" />
    </td>
  </tr>
  <tr>
    <td><strong>Network</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Gravity_Alpha_Mainnet-1625-3C3C3D?logo=ethereum&logoColor=white" alt="Gravity Alpha Mainnet" />
    </td>
  </tr>
</table>

## 🚀 Installation & Development

Follow these steps to set up GravityMultiSender for local development:

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/GravityMultiSender.git
cd GravityMultiSender
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. **Start the development server**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

4. **Access the application**

Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
VITE_PROJECT_ID=your_wallet_connect_project_id
VITE_EXPLORER_URL=https://explorer.gravity.xyz
VITE_RPC_URL=https://rpc.gravity.xyz
```

## 📋 Usage Guide

### Connecting Your Wallet

1. Navigate to [gravitymultisender.xyz](https://gravitymultisender.xyz)
2. Click the "Connect Wallet" button in the top-right corner
3. Select your preferred wallet provider (MetaMask, WalletConnect, etc.)
4. Confirm the connection in your wallet
5. The application will automatically detect if you're on the Gravity Alpha Mainnet
6. If you're on a different network, you'll be prompted to switch networks

### Preparing Your Recipient List

You have two options for entering your recipient list:

#### Option 1: Upload a CSV File

1. Create a CSV file with the following format:
   ```
   0x1234567890123456789012345678901234567890,1.5
   0x2345678901234567890123456789012345678901,2.75
   0x3456789012345678901234567890123456789012,0.5
   ```
   Each line should contain an address and amount separated by a comma.

2. Drag and drop your CSV file onto the upload area, or click "Choose File" to select it

#### Option 2: Direct Text Input

1. Enter your recipient list directly in the text area using the same format:
   ```
   0x1234567890123456789012345678901234567890,1.5
   0x2345678901234567890123456789012345678901,2.75
   0x3456789012345678901234567890123456789012,0.5
   ```

### Sending Tokens

1. Once your recipient list is loaded, review the transaction summary:
   - Total number of recipients
   - Total token amount
   - Service fee (1%)
   - Number of batches (if applicable)

2. Click "Preview Transactions" to review the detailed list of recipients

3. Click "Send Tokens" to initiate the transaction

4. Confirm the transaction in your wallet (you'll need to confirm once per batch if you have more than 200 recipients)

5. Track the transaction status in real-time:
   - Transaction preparation
   - Pending transaction
   - Transaction confirmation
   - Success or failure notification

6. You can view transaction details in the block explorer by clicking the transaction hash or "View on Explorer" link

## 📏 CSV Format Specifications

For optimal results, follow these guidelines for your CSV file:

### Required Format

- **Column Structure**: Two columns - address and amount
- **Delimiters**: Comma-separated values (`,`)
- **Addresses**: Must be valid Ethereum addresses (42 characters starting with `0x`)
- **Amounts**: Must be positive numbers (decimal values allowed)
- **Headers**: No header row required (will be automatically detected and skipped if present)

### Example CSV Structure

```csv
0x1234567890123456789012345678901234567890,1.5
0x2345678901234567890123456789012345678901,2.75
0x3456789012345678901234567890123456789012,0.5
```

### Advanced Format Options

You can also include headers and additional data if needed:

```csv
address,amount,note
0x1234567890123456789012345678901234567890,1.5,Team member bonus
0x2345678901234567890123456789012345678901,2.75,Marketing reward
0x3456789012345678901234567890123456789012,0.5,Community prize
```

> **Note**: Only the first two columns (address and amount) will be processed. Additional columns will be ignored.



## 👥 Contributing

We welcome contributions from the community! Here's how you can help:

### Contribution Guidelines

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style and Standards

- Follow the existing code style
- Write clear, commented, and testable code
- Include unit tests for new features
- Update documentation as needed

### Development Process

- Issues are tracked on GitHub
- Pull requests require review before merging
- Continuous integration checks must pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ❓ Frequently Asked Questions

<details>
<summary><strong>What is the maximum number of recipients in a single transaction?</strong></summary>
<br>
The MultiSender contract limits each batch to 200 recipients to prevent gas limit issues. If you have more than 200 recipients, the application will automatically split them into multiple batches.
</details>

<details>
<summary><strong>Is there a fee for using GravityMultiSender?</strong></summary>
<br>
Yes, the service charges a 1% fee on all transactions to support ongoing development and maintenance of the platform.
</details>

<details>
<summary><strong>Can I send ERC-20 tokens?</strong></summary>
<br>
Yes, GravityMultiSender supports both native G tokens and any ERC-20 token on the Gravity blockchain.
</details>

<details>
<summary><strong>How do I know my transaction was successful?</strong></summary>
<br>
The application provides real-time status updates and confirms when transactions are completed. You can also verify all transactions on the Gravity Explorer using the provided links.
</details>

<details>
<summary><strong>Do I need to approve tokens before sending?</strong></summary>
<br>
Yes, for ERC-20 tokens, you'll need to approve the MultiSender contract to spend your tokens. The application will guide you through this process when needed.
</details>

## 📞 Support & Contact

- **Website**: [gravitymultisender.xyz](https://gravitymultisender.xyz)
- **Email**: [hanifmaulana1997@gmail.com](mailto:hanifmaulana1997@gmail.com)
- **Twitter**: [@isaac_newton252](https://twitter.com/isaac_newton252)
- **Telegram**: [t.me/isaacnewton1234](https://t.me/isaacnewton1234)
- **Github Issues**: [Report bugs or request features](https://github.com/isaacnewton123/GravityMultiSender/issues)

## 🔍 Connect with Gravity Ecosystem

<div align="center">
  <a href="https://gravity.xyz" target="_blank"><img src="https://img.shields.io/badge/Website-gravity.xyz-4F0FB6?style=for-the-badge" alt="Website" /></a>
  <a href="https://explorer.gravity.xyz" target="_blank"><img src="https://img.shields.io/badge/Explorer-explorer.gravity.xyz-4C54D2?style=for-the-badge" alt="Explorer" /></a>
  <a href="https://twitter.com/isaac_newton252" target="_blank"><img src="https://img.shields.io/badge/Twitter-@isaac__newton252-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
  <a href="https://t.me/isaacnewton1234" target="_blank"><img src="https://img.shields.io/badge/Telegram-isaacnewton1234-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
</div>

---

<div align="center">
  <p>© 2025 GravityMultiSender - All rights reserved</p>
</div>
