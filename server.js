"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var sdk_core_1 = require("@uniswap/sdk-core");
var smart_order_router_1 = require("@uniswap/smart-order-router");
var bignumber_1 = require("@ethersproject/bignumber");
function swapTokens(tokenAAddress, tokenBAddress, amountIn, wallet) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, signer, tokenA, tokenB, router, amountInCurrencyAmount, route, transaction, _a, route, route, , route, encoded, tx;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, , 2, 3]);
                    provider = new ethers_1.ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/ZdizMbGfOfUDnGZBli0ciCFs14I-qk-T');
                    signer = wallet.connect(provider);
                    tokenA = new sdk_core_1.Token(sdk_core_1.ChainId.SEPOLIA, tokenAAddress, 18, 'Token A', 'TKA');
                    tokenB = new sdk_core_1.Token(sdk_core_1.ChainId.SEPOLIA, tokenBAddress, 18, 'Token B', 'TKB');
                    router = new smart_order_router_1.AlphaRouter({ chainId: sdk_core_1.ChainId.SEPOLIA, provider: provider });
                    amountInCurrencyAmount = sdk_core_1.CurrencyAmount.fromRawAmount(tokenA, ethers_1.ethers.utils.parseUnits(amountIn.toString(), tokenA.decimals).toString());
                    return [4 /*yield*/, router.route(amountInCurrencyAmount, tokenB, sdk_core_1.TradeType.EXACT_INPUT, {
                            recipient: wallet.address,
                            slippageTolerance: new sdk_core_1.Percent(5, 100),
                            deadline: Math.floor(Date.now() / 1000 + 1800),
                            type: sdk_core_1.TradeType.EXACT_INPUT
                        }, {
                            maxSwapsPerPath: 1
                        })];
                case 1:
                    route = _b.sent();
                    transaction = {
                        : .route[0].route
                    }, _a = void 0, route = _a.data, route = _a.route,  = _a[0], route = _a.route, encoded = _a.encoded;
                    if ('tokenPath' in route.route[0].route) {
                        to: route.route[0].route.tokenPath[1].address,
                        ;
                    }
                    value: bignumber_1.BigNumber.from(amountIn),
                        from;
                    wallet.address,
                        gasPrice;
                    route.gasPriceWei,
                        gasLimit;
                    "800000";
                    return [3 /*break*/, 3];
                case 2: return [7 /*endfinally*/];
                case 3:
                    ;
                    return [4 /*yield*/, signer.sendTransaction(transaction)];
                case 4:
                    tx = _b.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _b.sent();
                    console.log('Token swap completed successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
try { }
catch (error) {
    console.error('Error during token swap:', error);
    throw error;
}
// Example usage:
var tokenAAddress = '0x9ef870fDf44fAD7eF6DBcfaA68BeF95025721Bd7'; // Replace with actual Token A address
var tokenBAddress = '0x6aFb45bfa367ab2E4e55FAA2B1aDAb1bBC5E9A0F'; // Replace with actual Token B address
var amountIn = 100; // Replace with actual amount of Token A to input
var wallet = new ethers_1.ethers.Wallet('YOUR_PRIVATE_KEY'); // Replace with actual private key
// Call the swapTokens function
swapTokens(tokenAAddress, tokenBAddress, amountIn, wallet)
    .then(function () { return console.log('Token swap completed successfully!'); })
    .catch(function (error) { return console.error('Token swap failed:', error); });
