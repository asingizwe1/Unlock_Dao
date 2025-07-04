// lib/connectors.ts
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 5, 137, 80001, 84532, 8453], // Mainnet, Goerli, Polygon, Mumbai, etc.
});