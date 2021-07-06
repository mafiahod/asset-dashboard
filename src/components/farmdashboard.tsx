import React,{useEffect,useState} from 'react'
import multicall from 'utils/multicall';
import BigNumber from 'bignumber.js';
import masterchefABI from 'config/abi/masterchef_pancake.json'
import { getMasterChefAddress } from 'utils/addressHelpers';
import farmsConfig from 'config/constants/farm'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import { FarmConfig } from 'config/constants/types';

export default function Farmdashboard() {
    const [state, setstate] = useState('')
    const pids = [0]
    const[refresh,setRefresh] = useState(1)
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
useEffect(() => {
    
  const fetchFarmUserEarnings = async (account: string, farmsToFetch: FarmConfig[]) => {
    const masterChefAddress = getMasterChefAddress();
  
    const rawEarnings = await multicall(masterchefABI, [{
      address: masterChefAddress,
      name: 'poolInfo',
      params: [252],
    }])


    console.log(rawEarnings[0]);
    
    const parsedEarnings = rawEarnings ? new BigNumber(rawEarnings[0].allocPoint?._hex) : BIG_ZERO
    setstate(parsedEarnings.div(100).toString())

    
  }

 
  if('0x5802d51e2D4CD93a1986FcE1b96C2c951801f720'){
fetchFarmUserEarnings('0x5802d51e2D4CD93a1986FcE1b96C2c951801f720', farmsToFetch);
  }

}, [refresh])

    return (
        <div>
            {state}
        </div>
    )
}
