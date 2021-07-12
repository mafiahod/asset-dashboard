
export interface Address {
    97?: string
    56: string
  }
  export interface Token {
    symbol: string
    address?: Address
    decimals?: number
    projectLink?: string
    busdPrice?: string
  }
  
export interface FarmConfig {
    pid: number
    lpSymbol: string
    lpAddresses: Address
    token: Token
    quoteToken: Token
    multiplier?: string
    isCommunity?: boolean
    dual?: {
      rewardPerBlock: number
      earnLabel: string
      endBlock: number
    }
  }

  export interface Token2{
    symbol: string
    address?:Address
    decimals:number
  }