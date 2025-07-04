// components/ConnectWallet.tsx
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "@/lib/connectors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Web3Provider } from "@ethersproject/providers";

interface ConnectWalletProps {
  onConnect: (address: string) => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const { activate, account } = useWeb3React<Web3Provider>();

  const { toast } = useToast();

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      await activate(injected, undefined, true);

      const provider = new Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      onConnect(address);
      toast({
        title: "Wallet Connected!",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error) {
      console.error("MetaMask connection error:", error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/20 backdrop-blur-md border-white/30">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Connect Your Wallet</CardTitle>
        <CardDescription className="text-white/80">
          Connect with MetaMask to start delegating your voting power
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={connectWallet}
          className="w-full h-12 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 hover:from-yellow-500 hover:via-purple-600 hover:to-pink-600 text-white text-lg font-semibold shadow-lg"
        >
          <Wallet className="w-5 h-5 mr-2" />
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect MetaMask"}
        </Button>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="flex items-center space-x-2 text-sm text-white/80">
            <Shield className="w-4 h-4 text-green-300" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-white/80">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Fast</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};