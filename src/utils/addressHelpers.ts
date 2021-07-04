import { MAINNET_CHAIN_ID } from '../config'
import addresses from '../config/constants/contracts'
import tokens from '../config/constants/tokens'
import { Address } from '../config/constants/types'


export const getAddress = (address: Address): string => {
    const chainId = '97'
  
    return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID]
  }
export const getMulticallAddress = () => {
    return getAddress(addresses.multiCall)
  }


export const getjamBalance1 = () => {
    return getAddress(addresses.jamBalance1)
  }

export const getjamBalance2 = () => {
    return getAddress(addresses.jamBalance2)
  }
