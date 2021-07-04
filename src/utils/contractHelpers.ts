import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from '../utils/web3'

import {
  
    getMulticallAddress
  } from '../utils/addressHelpers'

import MultiCallAbi from '../config/abi/Multicall.json'
import { DEFAULT_GAS_PRICE, TESTNET_CHAIN_ID } from '../config'
import { getSettings, getGasPriceInWei } from './settings'


export const getDefaultGasPrice = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    if (chainId === TESTNET_CHAIN_ID) {
      return 10
    }
    return DEFAULT_GAS_PRICE
  }
  
  const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
    const _web3 = web3 ?? web3NoAccount
    const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice()
  
    return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
      gasPrice: getGasPriceInWei(gasPrice).toString(),
    })
  }
  export const getMulticallContract = (web3?: Web3) => {
    console.log(getMulticallAddress())
    return getContract(MultiCallAbi, getMulticallAddress(), web3)
  }