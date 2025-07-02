#!/usr/bin/env node
const { ethers } = require('ethers');

if (process.argv.length !== 5) {
    console.log("Usage: node verify.js <message> <address> <signature>");
    console.log("Example: node verify.js 'Hello, Ethereum!' 0x742d35Cc... 0x1b2c3d...");
    console.log("Note: Use single quotes around message to avoid shell issues with special characters");
    process.exit(1);
}

const [,, message, expectedAddress, signature] = process.argv;

try {
    // Add 0x prefix if missing
    const formattedSignature = signature.startsWith('0x') ? signature : '0x' + signature;
    const formattedExpected = expectedAddress.startsWith('0x') ? expectedAddress : '0x' + expectedAddress;
    
    const recoveredAddress = ethers.verifyMessage(message, formattedSignature);
    const valid = recoveredAddress.toLowerCase() === formattedExpected.toLowerCase();
    
    console.log(`Message: ${message}`);
    console.log(`Expected: ${formattedExpected}`);
    console.log(`Recovered: ${recoveredAddress}`);
    console.log(`Valid: ${valid}`);
    
    process.exit(valid ? 0 : 1);
} catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
}
