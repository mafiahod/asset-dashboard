import React, { useEffect, useState } from 'react';
import multicall from 'utils/multicall';
import { useWeb3React } from '@web3-react/core'
import { getjamBalance1, getjamBalance2 } from 'utils/addressHelpers'
import cakeABI from 'config/abi/testJam.json'
import './style/app.css';
import BigNumber from 'bignumber.js';
import PoolInfo from 'components/poolInfo';
import UserInfo from 'components/userInfo';
import PendingReward from 'components/pendingReward';
import Tokenbalance from 'components/tokenbalance';
import FarmCard from 'components/farmCard';
import {token2} from 'config/constants/token2';
function App() {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = token2.map( (farm)=> {
        return {
          address: farm.address[56],
         name: 'balanceOf',
         params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b']
        }
      })
      console.log(calls);
      // const calls = [{
      //   address: getjamBalance1(),
      //   name: 'balanceOf',
      //   params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b']
      // },
      // {
      //   address: getjamBalance2(),
      //   name: 'balanceOf',
      //   params: ['0x5802d51e2D4CD93a1986FcE1b96C2c951801f720']
      // },
      // {
      //   address: getjamBalance1(),
      //   name: 'balanceOf',
      //   params: ['0x5802d51e2D4CD93a1986FcE1b96C2c951801f720']
      // }, {
      //   address: getjamBalance2(),
      //   name: 'balanceOf',
      //   params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b']
      // }]
       const res = await multicall(cakeABI, calls)
      
      const parsedTokenBalances = res.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toJSON()
      })
      // console.log(parsedTokenBalances);
      setBalance(parsedTokenBalances);
    }

    if (true) {
      fetchAllBalances()
    }

    // console.log(account);
  }, [account,balances[0],balances[1]])

  return (
    <div >
{/* <Tokenbalance/> */}
     {
       balances[0]
     }
     {
       balances[1]
     }
   {/* <PoolInfo/> */}

 <FarmCard/>

    </div>
  );
}

export default App;
