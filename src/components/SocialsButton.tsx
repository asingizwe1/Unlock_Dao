// src/components/SocialsButton.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Instagram,
  Twitter,
  X as XIcon,
  ExternalLink,
  User,
} from "lucide-react";

interface StewardSocial {
  name: string;
  icon: React.FC<any>;
  url: string;
}

interface Steward {
  name: string;
  address: string;
  description: string;
  socials: StewardSocial[];
}

export const SocialsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const stewards: Steward[] = [
    {
      name: "stellaachenbach.eth",
      address: "0xD2BC…BE23",
      description:
        "Designer, digital creator; Founder of The Alana Project; Lead Steward at Unlock Protocol DAO",
      socials: [
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://instagram.com/stellaachenbach",
        },
        {
          name: "X",
          icon: XIcon,
          url: "https://x.com/stellaachenbach",
        },
        {
          name: "Twitter",
          icon: Twitter,
          url: "https://twitter.com/stellaachenbach",
        },
      ],
    },
    {
      name: "Ceci Sakura",
      address: "0x38B8…C5D",
      description:
        "Marketing & Comms Steward at Unlock Protocol DAO; Core member at Ethereum Bolivia; beekeeper & architect",
      socials: [
        {
          name: "X",
          icon: XIcon,
          url: "https://x.com/ceci-sakura",
        },
        {
          name: "Twitter",
          icon: Twitter,
          url: "https://twitter.com/ceci-sakura",
        },
        {
          name: "Tally",
          icon: ExternalLink,
          url: "https://tally.xyz/ceci-sakura.eth",
        },
      ],
    },
    {
      name: "_Cryptosmonitor",
      address: "0x9dED…9E5",
      description:
        "Posts on blockchain events like European Blockchain Convention; Delegate in Unlock DAO governance",
      socials: [
        {
          name: "Twitter",
          icon: Twitter,
          url: "https://twitter.com/_Cryptosmonitor",
        },
        {
          name: "Tally",
          icon: ExternalLink,
          url: "https://tally.xyz/_Cryptosmonitor",
        },
      ],
    },
    {
      name: "Jae Shin",
      address: "0xE215…19FD",
      description:
        "CEO & Web3 founder; active product strategist; transition from enterprise to Web3",
      socials: [
        {
          name: "LinkedIn",
          icon: ExternalLink,
          url: "https://linkedin.com/in/jae-shin",
        },
        {
          name: "X",
          icon: XIcon,
          url: "https://x.com/mobilejae",
        },
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://instagram.com/jyuuns",
        },
      ],
    },
    {
      name: "happ3nxyz.eth",
      address: "0x04d4…01Be",
      description:
        "Web3 events directory focused on tech & blockchain; community and project spotlights",
      socials: [
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://instagram.com/happ3nxyz",
        },
        {
          name: "Twitter",
          icon: Twitter,
          url: "https://twitter.com/happ3nxyz",
        },
        {
          name: "Website",
          icon: ExternalLink,
          url: "https://unlock-protocol.com/",
        },
      ],
    },
  ];

  return (
    <div className="relative inline-block">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2
          bg-gradient-to-r from-yellow-400 to-purple-600
          hover:from-yellow-300 hover:to-purple-500
          text-white px-4 py-2 rounded
        "
      >
        <User className="w-4 h-4" />
        <span>Know your delegate</span>
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 z-50 shadow-xl border bg-white">
          <CardContent className="p-4 space-y-4">
            {stewards.map((s) => (
              <div key={s.address} className="space-y-1">
                <h4 className="font-semibold text-gray-800">
                  {s.name}{" "}
                  <span className="text-xs text-gray-500">
                    ({s.address})
                  </span>
                </h4>
                <p className="text-sm text-gray-600">{s.description}</p>
                <div className="flex space-x-3 pt-1">
                  {s.socials.map((soc) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* backdrop to close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};