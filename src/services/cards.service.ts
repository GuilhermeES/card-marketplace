import { http } from '@/services/api'
import type {ApiResponse, Card} from '@/types/card'

export async function getCards(params: { page: number; rpp: number }): Promise<{ list: Card[]; more: boolean }> {
    const { data } = await http.get<ApiResponse>('/cards', { params })
    return {
        list: data.list,
        more: data.more
    }
}

export async function getMyCards(): Promise<Card[]> {
    const { data } = await http.get<Card[]>('/me/cards')
    return data
}

export async function addCardsToDeck(cardIds: string[]) {
    const { data } = await http.post('/me/cards', { cardIds })
    return data
}