import { http } from '@/services/api'
import type { TradesResponse } from '@/types/card'

export async function getTrades(params: { page: number; rpp: number }) {
    const { data } = await http.get<TradesResponse>('/trades', { params })
    return data
}

export async function createTrade(payload: any) {
    const { data } = await http.post('/trades', payload)
    return data
}