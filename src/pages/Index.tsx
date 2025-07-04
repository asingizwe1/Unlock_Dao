// pages/index.tsx
import { AiAdvisorPanel } from "@/components/AiAdvisorPanel";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LoadingScreen } from "@/components/LoadingScreen";
import { DelegateSection } from "@/components/DelegateSection";
import { ProposalsSection } from "@/components/ProposalsSection";
import { AnalyticsSection } from "@/components/AnalyticsSection";
import { ConnectWallet } from "@/components/ConnectWallet";
import { SocialsButton } from "@/components/SocialsButton";
import { Users, Vote, BarChart3, Shield, ExternalLink } from "lucide-react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [activeTab, setActiveTab] = useState("delegate");
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (newTab: string) => {
    setShowTransition(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setShowTransition(false);
    }, 300);
  };

  if (isLoading || showTransition) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Color Wave Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-purple-500 to-purple-700">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <img
                  src="/lovable-uploads/dd54b562-c219-4e53-90c7-fc20da7ef42e.png"
                  alt="Unlock Protocol"
                  className="h-16 w-auto opacity-70 filter drop-shadow-xl"
                />
              </div>
              <h1 className="text-6xl font-serif italic text-white drop-shadow-lg mb-6">
                Unlock Protocol DAO
              </h1>
              <p className="text-xl text-white/90 mb-8 drop-shadow-md font-light leading-relaxed">
                Delegate your governance power and shape the future of Unlock Protocol with elegance and precision
              </p>
              <Badge variant="secondary" className="text-lg px-6 py-3 mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm font-light">
                <Shield className="w-5 h-5 mr-2" />
                Secure Governance Platform
              </Badge>
            </div>

            <ConnectWallet
              onConnect={(address) => {
                setWalletAddress(address);
                setIsConnected(true);
              }}
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <Users className="w-10 h-10 text-yellow-300 mb-3" />
                  <CardTitle className="text-white font-serif italic text-xl">Delegate Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-light">Choose trusted stewards or delegate to yourself</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <Vote className="w-10 h-10 text-purple-300 mb-3" />
                  <CardTitle className="text-white font-serif italic text-xl">Live Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-light">Stay updated with active governance votes</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-2xl transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <BarChart3 className="w-10 h-10 text-pink-300 mb-3" />
                  <CardTitle className="text-white font-serif italic text-xl">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 font-light">Track delegation trends and participation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with color waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-purple-200/30 to-purple-300/30">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-sm border-b-2 border-gray-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src="/lovable-uploads/dd54b562-c219-4e53-90c7-fc20da7ef42e.png"
                alt="Unlock Protocol"
                className="h-10 w-auto opacity-80"
              />
              <h1 className="text-3xl font-serif italic bg-gradient-to-r from-yellow-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Unlock DAO
              </h1>
              <Badge variant="outline" className="text-sm font-light border-2">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <SocialsButton />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConnected(false)}
                className="border-2 hover:border-purple-300 transition-all duration-300"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-lg grid-cols-3 bg-white/60 backdrop-blur-sm border-2 border-gray-200 shadow-xl h-14">
                <TabsTrigger
                  value="delegate"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-serif italic text-lg transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Delegate
                </TabsTrigger>
                <TabsTrigger
                  value="proposals"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-serif italic text-lg transition-all duration-300"
                >
                  <Vote className="w-5 h-5 mr-2" />
                  Proposals
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white font-serif italic text-lg transition-all duration-300"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="delegate" className="space-y-6">
              <DelegateSection walletAddress={walletAddress} />
              <AiAdvisorPanel userAddress={walletAddress} />

            </TabsContent>

            <TabsContent value="proposals" className="space-y-6">
              <ProposalsSection />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
