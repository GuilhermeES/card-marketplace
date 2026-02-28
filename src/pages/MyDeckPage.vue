<template>
  <q-page class="trade-page" padding>
    <div class="trade-page__header">
      <div class="text-h4 q-pa-xl text-weight-bold text-title">
          Meu Deck
        <p class="text-subtitle1">
          Selecione pelo menos uma carta em <strong>Minha coleção</strong> e outra em <strong>Cartas que quero receber</strong> <br> para criar sua solicitação de troca.
        </p>
      </div>
    </div>

    <div class="row q-pt-none q-mt-none q-col-gutter-lg trade-page__grid justify-between">
      <div class="col-12 col-md-6 q-pt-none">
        <TradePanel
            title="Minha coleção"
            icon="backpack"
            :count="offering.count.value"
            :cards="myCards"
            :loading="loadingMine"
            :col-class="mineColClass"
            :is-selected="offering.isSelected"
            @toggle="offering.toggle"
        />
      </div>

      <div class="col-12 col-md-6 q-pt-none">
        <TradePanel
            title="Cartas que quero receber"
            icon="sync"
            :count="receiving.count.value"
            :cards="allCards"
            :loading="loadingAll"
            :col-class="allColClass"
            :is-selected="receiving.isSelected"
            :show-load-more="moreAll && !loadingAll && allCards.length > 0"
            @toggle="receiving.toggle"
            @load-more="loadMoreAll"
        />
      </div>
    </div>

    <SelectionBar
        fixed
        :count="offering.count.value + receiving.count.value"
        :offering-count="offering.count"
        :receiving-count="receiving.count"
        :require-both="true"
        :loading="submitting"
        @confirm="onConfirm"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { http } from '@/services/api'
import SelectionBar from '@/components/cards/SelectionBar.vue'
import type {ApiResponse, Card, TradeCardType} from '@/types/card'
import TradePanel from "@/components/trades/TradePanel.vue";
import {useSelectionIds} from "@/composables/useSelectionIds";

const $q = useQuasar()

const myCards = ref<Card[]>([])
const allCards = ref<Card[]>([])
const loadingMine = ref(false)
const loadingAll = ref(false)
const submitting = ref(false)

const pageAll = ref(1)
const rppAll = ref(6)
const moreAll = ref(true)

const offering = useSelectionIds()
const receiving = useSelectionIds()

const mineColClass = 'col-6 col-sm-4 col-md-6 col-lg-6 col-xl-4'
const allColClass = 'col-6 col-sm-4 col-md-6 col-lg-6 col-xl-4'

async function fetchMyCards() {
  if (loadingMine.value) return
  loadingMine.value = true
  try {
    const { data } = await http.get<Card[]>('/me/cards')
    myCards.value = data
  } finally {
    loadingMine.value = false
  }
}

async function fetchAllCards(reset = false) {
  if (loadingAll.value) return
  loadingAll.value = true
  try {
    if (reset) {
      pageAll.value = 1
      allCards.value = []
      moreAll.value = true
    }

    const { data } = await http.get<ApiResponse>('/cards', {
      params: { rpp: rppAll.value, page: pageAll.value }
    })

    allCards.value = reset ? data.list : [...allCards.value, ...data.list]
    moreAll.value = data.more
  } finally {
    loadingAll.value = false
  }
}

function loadMoreAll() {
  if (!moreAll.value || loadingAll.value) return
  pageAll.value++
  fetchAllCards(false)
}

const tradePayload = computed(() => ({
  cards: [
    ...offering.ids.value.map(cardId => ({ cardId, type: 'OFFERING' as TradeCardType })),
    ...receiving.ids.value.map(cardId => ({ cardId, type: 'RECEIVING' as TradeCardType }))
  ]
}))

async function onConfirm() {
  if (!offering.count.value || !receiving.count.value) {
    $q.notify({ type: 'warning', message: 'Selecione ao menos 1 carta para oferecer e 1 para receber.' })
    return
  }

  try {
    submitting.value = true
    await http.post('/trades', tradePayload.value)
    $q.notify({ type: 'positive', message: 'Solicitação de troca enviada!' })
    offering.clear()
    receiving.clear()
  } catch (e: any) {
    $q.notify({ type: 'negative', message: e.response?.data?.message || 'Erro ao enviar solicitação.' })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchMyCards()
  fetchAllCards()
})
</script>
