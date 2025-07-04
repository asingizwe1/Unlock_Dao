
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface SelfDelegateOptionProps {
  walletAddress: string;
  onSelect: () => void;
}

export const SelfDelegateOption: React.FC<SelfDelegateOptionProps> = ({
  walletAddress,
  onSelect
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer" onClick={onSelect}>
      <CardContent className="p-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
            <User className="w-9 h-9 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-serif italic text-purple-700 mb-2">Delegate to Yourself</h3>
            <p className="text-gray-600 font-light text-lg mb-3">Participate directly in governance</p>
            <p className="text-sm text-purple-500 font-light tracking-wide bg-white/60 px-3 py-1 rounded-full inline-block">
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
