import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

// ✅ Step 1: Define getLibrary
function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider);
}

// ✅ Step 2: Wrap your app in Web3ReactProvider
createRoot(document.getElementById("root")!).render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>
);