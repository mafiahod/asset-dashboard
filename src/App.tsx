import React, { useEffect, useState } from 'react';
import multicall from 'utils/multicall';
import { useWeb3React } from '@web3-react/core'
import { getjamBalance1, getjamBalance2 } from 'utils/addressHelpers'
import cakeABI from 'config/abi/testJam.json'
import './style/app.css';
import BigNumber from 'bignumber.js';

function App() {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = [{
        address: getjamBalance1(),
        name: 'balanceOf',
        params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b']
      },
      {
        address: getjamBalance2(),
        name: 'balanceOf',
        params: ['0x5802d51e2D4CD93a1986FcE1b96C2c951801f720']
      },
      {
        address: getjamBalance1(),
        name: 'balanceOf',
        params: ['0x5802d51e2D4CD93a1986FcE1b96C2c951801f720']
      }, {
        address: getjamBalance2(),
        name: 'balanceOf',
        params: ['0x85d886a282C463e4C8C9292cED78f610aE88683b']
      }]
      console.log(calls);
      const res = await multicall(cakeABI, calls)
      const parsedTokenBalances = res.map((tokenBalance) => {
        return new BigNumber(tokenBalance).toJSON()
      })
      console.log(parsedTokenBalances);
      setBalance(parsedTokenBalances);
    }

    if (true) {
      fetchAllBalances()
    }

    console.log(account);
  }, [account])

  return (
    <div >

      {balances[0]}
      <br />
      {balances[1]}
      <br />
      {balances[2]}
      <br />
      {balances[3]}

    </div>
  );
}

export default App;
