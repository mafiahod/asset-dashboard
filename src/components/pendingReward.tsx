import React,{ useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress ,getMasterChefDoppleAddress} from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef_pancake.json'
import masterChefABI_Dopple from 'config/abi/masterchef_dopple.json'
import farmsConfig from 'config/constants/farm'
import { FarmConfig } from 'config/constants/types'


export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

export default function PendingReward() {
    const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
    const [balance, setbalance] = useState('')
    const { account } = useWeb3React()
    useEffect(() => {
        const fetchBalances = async () => {
            // const calls = [
            //     {
            //     address: getMasterChefAddress(),
            //     name: 'pendingCake',
            //     params: [251, '0x5802d51e2D4CD93a1986FcE1b96C2c951801f720'],
            //   },
            //   {
            //     address: getMasterChefDoppleAddress(),
            //     name: 'pendingDopple',
            //     params: [1, '0x5802d51e2D4CD93a1986FcE1b96C2c951801f720'],
            //   }
            // ]
          const calls = farmsConfig.map((farm) => ({
            address: getMasterChefAddress(),
            name: 'pendingCake',
            params: [farm.pid, '0x5802d51e2D4CD93a1986FcE1b96C2c951801f720'],
          }))
   
          const rawResults = await multicall(masterChefABI, calls)
       
          const results = farmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))
    console.log(results);
          setFarmsWithBalances(results)
         setbalance(results[0].balance.toString())
        }
    
        if (!account) {
          fetchBalances()
        }
      }, [balance])
    return (
        <div>
            {balance}
        </div>
    )
}

