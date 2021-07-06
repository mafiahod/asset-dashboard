import React,{useEffect,useState} from 'react'
import multicall from 'utils/multicall';
import BigNumber from 'bignumber.js';
import masterchefABI from 'config/abi/masterchef_pancake.json'
import { getMasterChefAddress } from 'utils/addressHelpers';
import farmsConfig from 'config/constants/farm'
import { FarmConfig } from 'config/constants/types';

export default function UserInfo() {
    const pids = [0]
    //const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
const[refresh,setRefresh] = useState(1)
    const [LPBalance,setLPBalance] = useState([])
useEffect(() => {
const fetchFarmUserStakedBalances = async (account: string) => {
    const masterChefAddress = getMasterChefAddress()
  
    const calls = farmsConfig.map((farm) => {
      return {
        address: masterChefAddress,
        name: 'userInfo',
        params: [farm.pid, account],
      }
    })
  
    const rawStakedBalances = await multicall(masterchefABI, calls)
    const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
      
      return new BigNumber(stakedBalance[0]._hex).toJSON()
    })
    console.log(parsedStakedBalances);
   setLPBalance(parsedStakedBalances)
  }

fetchFarmUserStakedBalances('0x5802d51e2D4CD93a1986FcE1b96C2c951801f720')
}, [refresh])
return (
        <div>
            {LPBalance}
        </div>
    )
}
