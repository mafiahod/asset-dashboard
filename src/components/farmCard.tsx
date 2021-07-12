import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import useAllEarnings from 'hooks/usePending'
import useLPBalance from 'hooks/useLPBalance';
import BigNumber from 'bignumber.js'
import useAccountInfo from 'hooks/useAccountInfo';
import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/hook';
import { Farm } from 'state/types';
import { getFarmApr } from 'utils/apr';
import isArchivedPid from 'utils/farmHelpers';
import useRefresh from 'hooks/useRefresh'
import { orderBy } from 'lodash';
import { getBalanceNumber } from 'utils/formatBalance';
// import { useLocation, useRouteMatch } from 'react-router-dom';
interface FarmWithStakedValue extends Farm {
  apr?: number
  liquidity?: BigNumber
}

const NUMBER_OF_FARMS_VISIBLE = 12
export default function FarmCard() {


  const [sortOption, setSortOption] = useState('hot')
  const { fastRefresh } = useRefresh()
  const [farms, setfarms] = useState([])
  //     const rewardLP= useAllEarnings();
  //     const balanceLP = useLPBalance();
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()

  const isActive = true
  usePollFarmsData(true)


  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))
  
  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const farmsList = useCallback((farmsToDisplay: Farm[]): FarmWithStakedValue[] => {

    let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {

      if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {

        return farm
      }
      const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
      // console.log(farm.quoteToken.busdPrice);
      // console.log( new BigNumber(farm.lpTotalInQuoteToken));
      const apr = isActive ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity) : 0

      return { ...farm, apr, liquidity: totalLiquidity }
    })


    return farmsToDisplayWithAPR
  },
    [cakePrice, isActive],
  )
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }


      //console.log(stakedOnly);
      console.log(stakedOnlyFarms);
      farmsStaked = true ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)

    // if (true) {
    //   farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    // }
    // if (true) {
    //   farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    // }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
  
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])


const rowData = farmsStakedMemoized.map((farm)=>{
const {token,quoteToken} = farm
const tokenAddress = token.address
const quoteTokenAddress = quoteToken.address
const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')
// const earnings = new BigNumber(farm.userData.earnings)
// const staking = new BigNumber(farm.userData.stakedBalance)
const earnings = getBalanceNumber(new BigNumber(farm.userData.earnings))
const staking = getBalanceNumber(new BigNumber(farm.userData.stakedBalance))
const liquidity = farm.liquidity
const multiplier = farm.multiplier

if(staking != 0){
  console.log("token",farm.token);
  console.log("reward: ", earnings);
  console.log("stakedBalance",staking);
}

  })
  useEffect(() => {

    const setfarmslist = async () => {
      farmsStakedMemoized.map((farm=>console.log(farm)))
     // await setfarms(farmsList(stakedOnlyFarms))
     // console.log(farms);
    }

     setfarmslist()
    //console.log(stakedOnlyFarms);
    //console.log(farms);

  }, [farmsLP, cakePrice, stakedOnlyFarms, fastRefresh])

  return (
    <div>

    </div>
  )
}
