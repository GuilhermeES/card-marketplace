<template>
  <q-page class="marketplace-page" padding>
    <PageHeader
        title="Minhas Solicitações de Troca"
    />

    <div class="trade-list-wrapper q-mt-md">
      <template v-if="myTrades.length > 0">
        <TradeCard
            v-for="trade in myTrades"
            :key="trade.id"
            :trade="trade"
            class="q-mb-md"
            :showRemove="true"
            :removeLoading="removingId === trade.id"
            @remove="handleRemove"
        />
      </template>

      <div
          v-else-if="!loading && myTrades.length === 0"
          class="trade-empty q-pl-xl q-pt-none"
      >
        Nenhuma solicitação feita ainda
      </div>
    </div>
    <Loader :showing="loading" />
  </q-page>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import Loader from '@/components/layouts/Loader.vue'
import type { Trade } from '@/types/card'
import {usePaginatedList} from "@/composables/usePaginatedList";
import {getTrades, removeTrade} from '@/services/trades.service'
import PageHeader from "@/components/layouts/PageHeader.vue";
import {useQuasar} from "quasar";
import {useAuthStore} from "@/stores/auth";

const $q = useQuasar()
const auth = useAuthStore()
const removingId = ref<string | null>(null)
const { items, loading, fetch } = usePaginatedList<Trade>(getTrades, { rpp: 10000 })

const myTrades = computed(() => {
  if (!auth.user) return []

  return items.value.filter(
      trade => trade.userId === auth.user?.id
  )
})

async function handleRemove(trade: Trade) {
  $q.dialog({
    title: 'Remover solicitação',
    message: 'Tem certeza que deseja remover esta solicitação de troca?',
    ok: {
      label: 'Remover',
      color: 'negative'
    },
    cancel: {
      label: 'Cancelar',
      flat: true
    },
  }).onOk(async () => {
    try {
      removingId.value = trade.id
      await removeTrade(trade.id)

      $q.notify({ type: 'positive', message: 'Solicitação removida!' })

      await fetch(true)

    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.response?.data?.message || 'Erro ao remover solicitação'
      })
    } finally {
      removingId.value = null
    }
  })
}

onMounted(() => {
  fetch(true)
})
</script>

<style scoped>
.trade-empty{
  color: white;
  font-size: 18px;
  font-weight: 300;
}
</style>