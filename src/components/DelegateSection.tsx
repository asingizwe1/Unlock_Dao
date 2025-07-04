// src/components/DelegateSection.tsx
import React, { useState } from 'react'
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

  const { toast } = useToast()
  const { delegateTo, isPending } = useDelegate()

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
        <CardHeader>
          <CardTitle>Delegate Your Voting Power</CardTitle>
          <CardDescription>
            Choose a steward or custom address
          </CardDescription>
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
        </CardContent>
      </Card>
    </div>
  )
}