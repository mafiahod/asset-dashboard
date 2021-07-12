import BigNumber from 'bignumber.js'
import { farmsConfig } from 'config/constants'
import { useWeb3React } from '@web3-react/core'
import masterChefABI from 'config/abi/masterchef_pancake.json'
import { useEffect,useState } from 'react'
import { getMasterChefAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'
import multicall from 'utils/multicall'

export default function useLPBalance() {
    const [LPBalance, setLPBalance] = useState([])
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
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
          
            const rawStakedBalances = await multicall(masterChefABI, calls)
            const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
              
              return new BigNumber(stakedBalance[0]._hex).toJSON()
            })
           
           setLPBalance(parsedStakedBalances)
          }
         // fetchFarmUserStakedBalances(account)
        fetchFarmUserStakedBalances('0x5802d51e2D4CD93a1986FcE1b96C2c951801f720')
        
     
            
        }, [account,fastRefresh])
        return LPBalance
}

