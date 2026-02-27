<template>
  <q-page class="marketplace-page" padding>
    <div class="page__header">
      <div class="text-h4 q-pa-xl text-weight-bold text-title">
        Solicitações de Troca
      </div>
    </div>

    <div class="q-mt-md">
      <TradeCard
          v-for="trade in trades"
          :key="trade.id"
          :trade="trade"
          class="q-mb-md"
      />

      <div class="row justify-center q-mt-lg">
        <q-btn
            v-if="more && !loading"
            icon="arrow_downward"
            unelevated
            color="primary"
            class="btn__primary--pink"
            label="Carregar mais"
            @click="loadMore"
            :showing="loading"
        />
      </div>
    </div>
    <Loader :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import Loader from '@/components/layouts/Loader.vue'
import type { Trade, TradesResponse } from '@/types/card'
import { http } from '@/services/api'

const trades = ref<Trade[]>([])
const loading = ref(false)

const page = ref(1)
const rpp = ref(10)
const more = ref(false)

async function fetchTrades(reset = false) {
  if (loading.value) return
  loading.value = true

  try {
    if (reset) {
      page.value = 1
      trades.value = []
    }

    const { data } = await http.get<TradesResponse>('/trades', {
      params: {
        rpp: rpp.value,
        page: page.value
      }
    })

    trades.value = reset ? data.list : [...trades.value, ...data.list]
    more.value = data.more
  } finally {
    loading.value = false
  }
}

function loadMore() {
  if (!more.value) return
  page.value++
  fetchTrades()
}

onMounted(() => {
  fetchTrades(true)
})
</script>
