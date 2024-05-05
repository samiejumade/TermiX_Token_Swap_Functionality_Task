import { ethers } from "ethers";
import { Percent, Token, TradeType, ChainId, CurrencyAmount } from '@uniswap/sdk-core';
import { AlphaRouter, SwapOptions, SwapRoute } from '@uniswap/smart-order-router';
import { BigNumber } from '@ethersproject/bignumber';
require('dotenv').config();

async function swapTokens(
    tokenAAddress: string,
    tokenBAddress: string,
    amountIn: number,
    wallet: ethers.Wallet
): Promise<void> {
    try {
        // Connect to the Ethereum test network
        const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ZdizMbGfOfUDnGZBli0ciCFs14I-qk-T');

        // Connect wallet
        const signer = wallet.connect(provider);

        // Define token A and token B
        const tokenA = new Token(ChainId.SEPOLIA, tokenAAddress, 18, 'Token A', 'TKA');
        const tokenB = new Token(ChainId.SEPOLIA, tokenBAddress, 18, 'Token B', 'TKB');

        // Initialize the Uniswap router
        const router = new AlphaRouter({ chainId: ChainId.SEPOLIA, provider: provider });

        // Convert amountIn to CurrencyAmount
        const amountInCurrencyAmount = CurrencyAmount.fromRawAmount(tokenA, ethers.utils.parseUnits(amountIn.toString(), tokenA.decimals).toString());

        // Get the route for the token swap
        const route = await router.route(
            amountInCurrencyAmount,
            tokenB,
            TradeType.EXACT_INPUT,
            {
                recipient: wallet.address,
                slippageTolerance: new Percent(5, 100),
                deadline: Math.floor(Date.now() / 1000 + 1800),
                type: TradeType.EXACT_INPUT
            },
            {
                maxSwapsPerPath: 1
            }
        ) as SwapRoute;
        
        const transaction = {
            data: route.route[0].route.encoded,
            to: route.route[0].route.tokenPath[1].address,
            value: ethers.utils.parseEther('0'), // If token A is not Ether, this should be 0
            from: wallet.address,
            gasPrice: route.gasPriceWei,
            gasLimit: "800000"
        };
        if ('encoded' in route.route[0].route) {
            transaction.data = route.route[0].route.encoded;
        }
    
        if ('tokenPath' in route.route[0].route) {
            transaction.to = route.route[0].route.tokenPath[1].address;
        }
        // Sign and send the transaction
        const tx = await signer.sendTransaction(transaction);
        await tx.wait();

        console.log('Token swap completed successfully!');
    } catch (error) {
        console.error('Error during token swap:', error);
        throw error;
    }
}

// Example usage:
const tokenAAddress = '0x9ef870fDf44fAD7eF6DBcfaA68BeF95025721Bd7'; // Token A is DAI address
const tokenBAddress = '0x6aFb45bfa367ab2E4e55FAA2B1aDAb1bBC5E9A0F'; // Token B is USDC address
const amountIn = 1; // Replace with actual amount of Token A to input
const wallet = new ethers.Wallet('process.env.RIVATE_KEY'); // Replace with actual private key

// Call the swapTokens function
swapTokens(tokenAAddress, tokenBAddress, amountIn, wallet)
    .then(() => console.log('Token swap completed successfully!'))
    .catch(error => console.error('Token swap failed:', error));