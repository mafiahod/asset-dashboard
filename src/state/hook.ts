import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { fetchFarmsPublicDataAsync } from './actions'
import { State,FarmsState,Farm } from './types'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useRefresh from 'hooks/useRefresh'
import { useWeb3React } from '@web3-react/core'
import { farmsConfig } from 'config/constants'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'


export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
 // const { account } = useWeb3React()
 const account = "0x856b63349fB6c818ea7cD7305483Ae0EF6956f6c";
// const account ="0x7F69905c8BDdBA686e363889788F59583b566B40"
  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}


export const useFarms = (): FarmsState => {
    const farms = useSelector((state: State) => state.farms)
    return farms
  }

export const usePriceCakeBusd = (): BigNumber => {
    const cakeBnbFarm = useFarmFromPid(251)
   
    return new BigNumber(cakeBnbFarm.token.busdPrice)
  }

export const useFarmFromPid = (pid): Farm => {
    const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
    return farm
  }  
  