#!/usr/bin/env node

const EthCrypto = require('eth-crypto');
const fs = require('fs');

const usage = () => {
    console.error(`
Usage:
  To Encrypt: ./eth-messenger.js encrypt <publicKey> <message>
  To Decrypt: ./eth-messenger.js decrypt <privateKey> <encrypted_json_string>

Examples:
  ./eth-messenger.js encrypt 0x... 'Hello, world!'
  ./eth-messenger.js decrypt 0x... '{"iv":"...","ephemPublicKey":"...","ciphertext":"...","mac":"..."}'
`);
    process.exit(1);
};

const main = async () => {
    const [command, arg1, arg2] = process.argv.slice(2);

    if (!command || !arg1 || !arg2) {
        usage();
    }

    try {
        if (command === 'encrypt') {
            const publicKeyHex = arg1;
            const message = arg2;

            // The public key from 'cast' is 64 bytes (128 hex chars), often with a '0x' prefix.
            // We need to ensure it's in the 65-byte uncompressed format (with a '04' prefix).
            if (publicKeyHex.length !== 130 && publicKeyHex.length !== 128) {
                 console.error("Error: Invalid raw public key. Must be 128 or 130 hex characters.");
                 process.exit(1);
            }

            // Remove 0x prefix if it exists
            const rawKey = publicKeyHex.startsWith('0x') ? publicKeyHex.substring(2) : publicKeyHex;

            // Prepend the '04' uncompressed key identifier and convert to a Buffer
            const fullKey = '04' + rawKey;
            const pubkeyBuffer = Buffer.from(fullKey, 'hex');


            const encrypted = await EthCrypto.encryptWithPublicKey(pubkeyBuffer, message);
            console.log(JSON.stringify(encrypted));

        } else if (command === 'decrypt') {
            const privateKey = arg1;
            const encryptedString = arg2;

            if (privateKey.length !== 64 && privateKey.length !== 66) {
                 console.error("Error: Invalid private key. Must be 64 or 66 hex characters.");
                 process.exit(1);
            }
            
            const encryptedObject = JSON.parse(encryptedString);
            const decrypted = await EthCrypto.decryptWithPrivateKey(privateKey, encryptedObject);
            console.log(decrypted);

        } else {
            usage();
        }
    } catch (e) {
        console.error(`An error occurred: ${e.message}`);
        process.exit(1);
    }
};

main();