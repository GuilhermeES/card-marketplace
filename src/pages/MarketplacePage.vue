<template>
  <q-page class="marketplace-page" padding>
    <div class="page__header">
      <div class="text-h4 q-pa-xl text-weight-bold text-title">
        Solicitações de Troca
      </div>
    </div>

    <div class="trade-list-wrapper q-mt-md">
      <TradeCard
          v-for="trade in items"
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
import { onMounted } from 'vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import Loader from '@/components/layouts/Loader.vue'
import type { Trade } from '@/types/card'
import {usePaginatedList} from "@/composables/usePaginatedList";
import { getTrades } from '@/services/trades.service'

const { items, more, loading, fetch, loadMore } = usePaginatedList<Trade>(getTrades, { rpp: 6 })

onMounted(() => {
  fetch(true)
})
</script>

