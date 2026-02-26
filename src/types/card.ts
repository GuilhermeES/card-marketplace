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