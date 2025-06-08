# Crypto Tools

A collection of command-line utilities for cryptocurrency operations, built with Node.js and ethers.js.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kerneldump/Tools.git
cd Tools
```

2. Install dependencies:
```bash
npm install ethers
```

## Tools

### verify.js - Ethereum Message Signature Verification

Verifies Ethereum message signatures using the `eth_sign` standard.

**Usage:**
```bash
node verify.js <message> <address> <signature>
```

**Parameters:**
- `message`: The original message that was signed
- `address`: The Ethereum address that supposedly signed the message
- `signature`: The signature to verify (with or without '0x' prefix)

**Examples:**
```bash
# Basic verification
node verify.js 'Hello, Ethereum!' 0x742d35Cc6aB16ae46C5e9DC2B4E2aA548C6e4194 0x1b2c3d4e5f...

# Message with special characters (use single quotes)
node verify.js 'Message with spaces & symbols!' 0x742d35Cc6aB16ae46C5e9DC2B4E2aA548C6e4194 0x1b2c3d4e5f...
```

**Output:**
```
Message: Hello, Ethereum!
Expected: 0x742d35Cc6aB16ae46C5e9DC2B4E2aA548C6e4194
Recovered: 0x742d35Cc6aB16ae46C5e9DC2B4E2aA548C6e4194
Valid: true
```

**Exit Codes:**
- `0`: Signature is valid
- `1`: Signature is invalid or error occurred

## Features

- **Flexible Input**: Accepts addresses and signatures with or without '0x' prefix
- **Case Insensitive**: Address comparison is case-insensitive
- **Error Handling**: Comprehensive error handling with descriptive messages
- **Shell-Friendly**: Proper exit codes for scripting

## Common Use Cases

- Verifying authenticity of signed messages
- Authentication systems using Ethereum signatures
- Audit trails and proof of ownership
- Integration with dApps and smart contracts

## Contributing

This repository is designed to be a growing collection of crypto utilities. 

- Key generation and management
- Transaction signing and broadcasting
- Multi-signature operations
- Token operations
- DeFi integrations
- And more!

## License

MIT License - see LICENSE file for details

## Security Notes

- Always verify message signatures before trusting signed content
- Never share private keys or seed phrases
- Use this tool in secure environments for sensitive operations
- Double-check addresses and signatures before processing