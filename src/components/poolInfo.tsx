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
    
  const fetchFarmUserEarnings = async (farmsToFetch: FarmConfig[]) => {
    const masterChefAddress = getMasterChefAddress();
  
    const rawEarnings = await multicall(masterchefABI, [{
      address: masterChefAddress,
      name: 'poolInfo',
      params: [252],
    }])


    console.log(rawEarnings);
    
    const parsedEarnings = rawEarnings ? new BigNumber(rawEarnings[0].allocPoint?._hex) : BIG_ZERO
    setstate(parsedEarnings.div(100).toString())

    
  }

 
  if(true){
fetchFarmUserEarnings(farmsToFetch);
  }

}, [refresh])

    return (
        <div>
            {state}
        </div>
    )
}
