// src/hooks/useDelegate.ts
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'ethers'

const UP_TOKEN_ADDRESS =
    '0xac27fa800955849d6d17cc8952ba9dd6eaa66187'

const abi = [
    {
        type: 'function' as const,
        name: 'delegate' as const,
        stateMutability: 'nonpayable' as const,
        inputs: [{ name: 'delegatee' as const, type: 'address' as const }],
        outputs: [],
    },
] as const

export function useDelegate() {
    const { account, library } = useWeb3React()
    const [isPending, setIsPending] = useState(false)

    const delegateTo = async (delegatee: `0x${string}`) => {
        if (!account) throw new Error('Please connect your wallet first')
        if (!library) throw new Error('No Web3 provider found')

        // cast the Ethers.js provider
        const signer = library.getSigner(account)
        const contract = new Contract(UP_TOKEN_ADDRESS, abi, signer)

        setIsPending(true)
        try {
            const tx = await contract.delegate(delegatee)
            await tx.wait()
            return tx
        } finally {
            setIsPending(false)
        }
    }

    return { delegateTo, isPending }
}