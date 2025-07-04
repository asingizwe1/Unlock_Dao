
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, User, Users } from "lucide-react";

interface Steward {
  address: string;
  name: string;
  avatar: string;
  votes: string;
  description: string;
}

interface StewartDropdownProps {
  stewards: Steward[];
  onSelect: (address: string) => void;
  walletAddress: string;
}

export const StewartDropdown: React.FC<StewartDropdownProps> = ({
  stewards,
  onSelect,
  walletAddress
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSteward, setSelectedSteward] = useState<Steward | null>(null);

  const handleSelect = (steward: Steward | null, address?: string) => {
    if (address) {
      onSelect(address);
      setSelectedSteward(null);
    } else if (steward) {
      setSelectedSteward(steward);
      onSelect(steward.address);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-16 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg"
      >
        <div className="flex items-center space-x-3">
          {selectedSteward ? (
            <>
              <Avatar className="w-10 h-10 ring-2 ring-purple-200">
                <AvatarImage src={selectedSteward.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-serif">
                  {selectedSteward.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-serif italic text-lg text-gray-800">{selectedSteward.name}</p>
                <p className="text-sm text-gray-500 font-light">{selectedSteward.votes} delegated</p>
              </div>
            </>
          ) : (
            <span className="text-gray-500 font-serif italic text-lg">Select a steward...</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute z-50 w-full mt-2 shadow-2xl border-2 bg-white/95 backdrop-blur-md border-purple-200">
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {/* Self Delegation Option - Circular Design */}
            <button
              onClick={() => handleSelect(null, walletAddress)}
              className="w-full p-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-b transition-all duration-300 text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-serif italic text-xl text-purple-700 mb-1">Delegate to Yourself</p>
                  <p className="text-sm text-gray-600 font-light">Participate directly in governance</p>
                  <p className="text-xs text-purple-500 font-light mt-1">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </p>
                </div>
              </div>
            </button>

            {/* Steward Options - Circular Design */}
            {stewards.map((steward, index) => (
              <button
                key={steward.address}
                onClick={() => handleSelect(steward)}
                className="w-full p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-b last:border-b-0 transition-all duration-300 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300 group-hover:scale-105">
                      <AvatarImage src={steward.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-serif text-lg">
                        {steward.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <p className="font-serif italic text-xl text-gray-800">{steward.name}</p>
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                        {steward.votes}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 font-light mb-1">{steward.description}</p>
                    <p className="text-xs text-gray-400 font-light">
                      {steward.address.slice(0, 8)}...{steward.address.slice(-6)}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {/* Custom Address Option - Circular Design */}
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full p-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-300 text-left border-t-2 border-gray-100 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-serif italic text-xl text-green-700 mb-1">Enter Custom Address</p>
                  <p className="text-sm text-gray-600 font-light">Delegate to any Ethereum address</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
