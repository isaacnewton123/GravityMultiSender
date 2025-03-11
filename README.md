# Gravity MultiSender

<div align="center">
  <img src="https://raw.githubusercontent.com/isaacnewton123/GravityMultiSender/refs/heads/main/DALL%C2%B7E%202025-01-25%2003.12.54%20-%20A%20minimalist%20logo%20design%20for%20'GravityMultiSender'%20using%20only%20the%20letter%20'G'.%20The%20'G'%20should%20be%20stylized%20with%20a%20modern%2C%20sleek%2C%20and%20tech-inspired%20feel%2C%20.webp" alt="Gravity MultiSender Logo" width="200"/>
  <h3>Send tokens to multiple addresses in one transaction</h3>
</div>

## Overview

Gravity MultiSender is a web application that allows users to send native G tokens or ERC-20 tokens to multiple addresses in a single transaction on the Gravity blockchain. This tool is perfect for distributing rewards, airdrops, payments, or any bulk token transfer needs.

## Features

- ✅ Send native G tokens to multiple addresses
- ✅ Batch processing for large recipient lists (up to 200 addresses per batch)
- ✅ CSV file upload for easy recipient import
- ✅ Direct text input for recipient addresses and amounts
- ✅ Real-time validation of addresses and amounts
- ✅ Transaction previews before sending
- ✅ Detailed transaction summaries
- ✅ Dark mode support
- ✅ Responsive design for mobile and desktop

## Live Demo

Visit [gravitymultisender.xyz](https://gravitymultisender.xyz) to use the application.

## Smart Contract

The MultiSender smart contract enables efficient token distribution with a 1% service fee on all transactions. The contract is deployed on the Gravity Alpha Mainnet at: [`0xc96928ECcC15D4Af06f4277D8D291384fB47133a`](https://explorer.gravity.xyz/address/0xc96928ECcC15D4Af06f4277D8D291384fB47133a)

### Contract Features

- Batch sending of native G tokens
- Maximum batch size of 200 recipients to prevent gas issues
- 1% service fee on all transactions
- Emergency functions to recover stuck tokens or ETH (owner only)
- Comprehensive error handling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gravity-multisender.git
   cd gravity-multisender
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage Guide

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the top-right corner.
2. Select your wallet provider (Metamask, WalletConnect, etc.).
3. Ensure you're connected to the Gravity Alpha Mainnet.

### Sending Tokens to Multiple Recipients

1. **Prepare Your Recipient List**:
   - Format: `address,amount` (one per line)
   - Example:
     ```
     0x123...abc,1.5
     0x456...def,2.75
     ```

2. **Upload Your List**:
   - Either drag & drop a CSV file containing your recipient list
   - Or paste your list directly into the text area

3. **Review Transaction Details**:
   - Check the total amount, recipient count, and service fee
   - Click "Preview Transactions" to see the full list of recipients

4. **Send Tokens**:
   - Click "Send Tokens" to initiate the transaction(s)
   - Confirm the transaction in your wallet

5. **Transaction Results**:
   - View transaction status and hash
   - Check the explorer for transaction details

## CSV Format

The CSV file should have the following format:
- Two columns: address and amount
- No header row (optional)
- One recipient per line
- Addresses must be valid Ethereum addresses (starting with 0x)
- Amounts must be positive numbers

Example:
```
0x1234567890123456789012345678901234567890,1.5
0x2345678901234567890123456789012345678901,2.75
0x3456789012345678901234567890123456789012,0.5
```

## Technical Stack

- **Frontend**: React.js, Vite
- **Styling**: Custom CSS
- **Web3 Integration**: wagmi, RainbowKit
- **File Parsing**: PapaParse
- **Network**: Gravity Alpha Mainnet

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact us at [support@gravity.xyz](mailto:support@gravity.xyz) or join our [Discord community](https://discord.gg/gravity).

---

<div align="center">
  <p>© 2025 Gravity MultiSender - All rights reserved</p>
</div>
