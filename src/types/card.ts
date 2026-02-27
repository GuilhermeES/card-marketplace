export type TradeCardType = 'OFFERING' | 'RECEIVING'

export type Card = {
    id: string
    name: string
    description: string
    imageUrl: string
    createdAt: string
}

export type ApiResponse = {
    list: Card[]
    rpp: number
    page: number
    more: boolean
}

export type TradeCard = {
    id: string
    cardId: string
    tradeId: string
    type: TradeCardType
    card: Card
}

export type TradeUser = {
    name: string
}

export type Trade = {
    id: string
    userId: string
    createdAt: string
    user: TradeUser
    tradeCards: TradeCard[]
}

export type TradesResponse = {
    list: Trade[]
    rpp: number
    page: number
    more: boolean
}