import React,{useEffect,useState} from 'react'
import erc20ABI from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js';
import { getjamBalance1 } from 'utils/addressHelpers'
import { getjamBalance2 } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
export default function Tokenbalance() {
    const account ='0x5802d51e2D4CD93a1986FcE1b96C2c951801f720'
useEffect(() => {
    const fetchBalanceWallet = async ()=>{
    const calls =  [{         
          address: getjamBalance1(),
          name: 'balanceOf',
          params: [account],
        },
        {         
            address: getjamBalance2(),
            name: 'balanceOf',
            params: [account],
          },
        {         
            address: getjamBalance1(),
            name: 'balanceOf',
            params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b'],
          },
          {         
            address: getjamBalance2(),
            name: 'balanceOf',
            params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b'],
          },
          {         
            address: getjamBalance2(),
            name: 'balanceOf',
            params: ['0x4ec3261CC5524AA3175F539489C3830c7466CaB2'],
          }
    ]
    const rawTokenBalances = await multicall(erc20ABI, calls)
    const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toJSON()
      })
    console.log(parsedTokenBalances   );
}
if(account){
    fetchBalanceWallet()
}
}, [account])

    
     

    return (
        <div>
            
        </div>
    )
}
