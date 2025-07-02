# eth-messenger - Encrypt and Decrypt Messages

Encrypts and decrypts messages using a public/private key pair.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

Navigate to the tool's directory and install dependencies:
```bash
cd tools/eth-messenger
npm install
```

## Usage

```bash
# To Encrypt
./eth-messenger.js encrypt <publicKey> <message>

# To Decrypt
./eth-messenger.js decrypt <privateKey> <encrypted_json_string>
```

**Examples:**
```bash
./eth-messenger.js encrypt 0x... 'Hello, world!'
./eth-messenger.js decrypt 0x... '{"iv":"...","ephemPublicKey":"...","ciphertext":"...","mac":"..."}'
```
