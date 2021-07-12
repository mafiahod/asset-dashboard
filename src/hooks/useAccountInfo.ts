import bscscan, { account,token } from 'bsc-scan'

import { useEffect, useState } from 'react'
bscscan.setUrl('https://api.bscscan.com/')
bscscan.setApiKey('HYFBHIQE6P7VBW1PQ7YSEHCZQ3P3SANKXK')


const AccountInfo =  ()=>{
// const [res, setres] = useState([])
    useEffect(() => {

const fetchAccountInfo = async()=>{
        try {
            //const balance = await account.getBnbBalance('0x765090aB712984081aeE059eA7025C48a4198183')
           await token.getAccountBalanceForTokenContractAddress('0x401d72D63B5a9b106b78A09fe0843861d16fe7AD','0x39e6e19ff5f3f83b7cd2aaea3327fa29679d1452').then(res => console.log(res))
         
          } catch (err) {
            console.log(err)
          }
        }
        fetchAccountInfo()
    }, [1])
    
}

export default AccountInfo