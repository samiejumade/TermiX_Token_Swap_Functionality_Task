# Uniswap Token Swapper

This project is a simple script to swap tokens on Uniswap using the Uniswap SDK and ethers.js.

## Prerequisites

- Node.js and npm installed on your machine.
- An Ethereum wallet with some testnet Ether for gas fees.
- The private key for your Ethereum wallet.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the necessary dependencies.

## Configuration

Create a `.env` file in the root directory of the project and add your Ethereum wallet's private key:

```env
PRIVATE_KEY=youractualprivatekey

Replace youractualprivatekey with your actual private key.

Usage
The swapTokens function in server.ts is used to swap tokens. It takes four arguments:

tokenAAddress: The address of the token you want to swap from.
tokenBAddress: The address of the token you want to swap to.
amountIn: The amount of token A you want to swap.
wallet: An ethers.js Wallet instance.

Running the Script
To run the script, use the command node server.js in your terminal.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT

```

Please replace the placeholder text with the actual information about your project.