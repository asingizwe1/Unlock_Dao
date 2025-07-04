// src/components/DelegateSection.tsx
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Users, Vote, CheckCircle, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useDelegate } from '@/hooks/useDelegate'
import { SelfDelegateOption } from '@/components/SelfDelegateOption'
import { StewartDropdown } from '@/components/StewartDropdown'
interface HistoryEntry {
  timestamp: string
  action: string
}
interface DelegateSectionProps {
  walletAddress: string
}


const stewards = [
  {
    address: "0xD2BC5cb641aE6f7A880c3dD5Aee0450b5210BE23",
    name: "stellaachenbach.eth",
    avatar: "/lovable-uploads/2.png",
    votes: "2.72M",
    description: "DeFi governance specialist with 3+ years experience",
  },
  {
    address: "0x38B826a4426A0D4d9b4377AC57C9Af0308281c5D",
    name: "Ceci Sakura",
    avatar: "/lovable-uploads/2.png",
    votes: "301.57K",
    description: "Community advocate and protocol researcher",
  },
  {
    address: "0x9dED35Aef86F3c826Ff8fe9240f9e7a9Fb2094e5",
    name: "_Cryptosmonitor",
    avatar: "/lovable-uploads/2.png",
    votes: "2.26M",
    description: "Analytics expert and governance strategist",
  },
  {
    address: "0xE215A2F256731B3dA911E01f9707d281936519fd",
    name: "Jae Shin",
    avatar: "/lovable-uploads/2.png",
    votes: "22.66K",
    description: "Technical contributor and security auditor",
  },
  {
    address: "0x04d49D4479B45e019bB9789716fc302da8e601Be",
    name: "happ3nxyz.eth",
    avatar: "/lovable-uploads/2.png",
    votes: "708.56K",
    description: "Web3 developer and ecosystem builder",
  },
]

export const DelegateSection: React.FC<DelegateSectionProps> = ({

  walletAddress,
}) => {
  const { account, active } = useWeb3React()
  const [selectedDelegate, setSelectedDelegate] = useState('')
  const [customAddress, setCustomAddress] = useState('')
  const [delegationCount, setDelegationCount] = useState(1247)
  // Load history on mount
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('votingHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history on change
  useEffect(() => {
    localStorage.setItem('votingHistory', JSON.stringify(history));
  }, [history]);
  const { toast } = useToast()
  const { delegateTo, isPending } = useDelegate()
  const handleDeleteVotingRights = () => {
    // Simulate deletion logic (replace with actual logic if needed)
    toast({
      title: 'Voting Rights Deleted',
      description: 'Your voting rights have been removed.',
    });

    // Add to history
    setHistory(prev => [
      { timestamp: new Date().toISOString(), action: 'Deleted voting rights' },
      ...prev,
    ]);
  };
  const handleDelegate = async (to: string) => {
    if (!active) {
      toast({ title: 'Wallet not connected', variant: 'destructive' })
      return
    }
    try {
      toast({
        title: 'Delegation Initiated',
        description: 'Confirm in your wallet',
      })
      await delegateTo(to as `0x${string}`)
      setDelegationCount((c) => c + 1)
      toast({
        title: 'Delegation Successful',
        description: `You delegated to ${to.slice(0, 6)}…${to.slice(-4)}`,
      })
    } catch (err: any) {
      toast({
        title: 'Delegation Failed',
        description: err.message || 'Try again',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-purple-50/80 border-purple-200">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p>Total Delegations</p>
              <h2>{delegationCount.toLocaleString()}</h2>
            </div>
            <Users />
          </CardContent>
        </Card>
        <Card className="bg-blue-50/80 border-blue-200">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p>Active Stewards</p>
              <h2>{stewards.length}</h2>
            </div>
            <Vote />
          </CardContent>
        </Card>
        <Card className="bg-green-50/80 border-green-200">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p>Your Status</p>
              <h2>Ready to Delegate</h2>
            </div>
            <CheckCircle />
          </CardContent>
        </Card>
      </div>

      {/* Self Delegate Option */}
      <SelfDelegateOption
        walletAddress={walletAddress}
        onSelect={() => setSelectedDelegate(walletAddress)}
      />

      {/* Delegation Form */}
      <Card className="border-gray-200 shadow-lg">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Delegate Your Voting Power</CardTitle>
            <CardDescription>Choose a steward or custom address</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(prev => !prev)}
            className="mt-2 md:mt-0 px-6 border-purple-500 text-purple-700 hover:bg-purple-50 hover:border-purple-600 transition"

          >
            🕘 History {history.length > 0 && <span className="ml-1 text-blue-600">({history.length})</span>}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <Label>Select a Steward</Label>
          <StewartDropdown
            stewards={stewards}
            onSelect={(addr) => setSelectedDelegate(addr)}
            walletAddress={walletAddress}
          />

          <Label>Or Enter Custom Address</Label>
          <Input
            placeholder="0x..."
            value={customAddress}
            onChange={(e) => {
              setCustomAddress(e.target.value)
              setSelectedDelegate(e.target.value)
            }}
          />

          {selectedDelegate && (
            <Card className="bg-purple-50 p-4 flex justify-between">
              <div className="flex items-center space-x-2">
                <User className="text-purple-600" />
                <span>
                  {selectedDelegate.slice(0, 6)}…{selectedDelegate.slice(-4)}
                </span>
              </div>
              <Badge>Ready</Badge>
            </Card>
          )}

          <Button
            onClick={() => handleDelegate(selectedDelegate)}
            disabled={!selectedDelegate || isPending}
            className="w-full"
          >
            {isPending ? (
              'Pending…'
            ) : (
              <>
                <Vote className="mr-2" />
                Delegate Voting Power
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteVotingRights}
            className="w-full"
          >
            🗑️ Delete Voting Rights
          </Button>
        </CardContent>
        {showHistory && (
          <div className="mt-4 border p-3 rounded bg-gray-50 text-sm">
            <p className="font-medium mb-2">Your Deletion History ({history.length})</p>
            <ul className="space-y-1">
              {history.map((entry, idx) => (
                <li key={idx}>
                  <span className="font-medium text-gray-700">#{idx + 1}</span> — 🗑️ {entry.action} at{" "}
                  {new Date(entry.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  )
}