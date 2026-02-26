<template>
  <q-page class="cards-page" padding>
      <div class="text-h4 q-pa-xl text-weight-bold text-title">
        Cartas
        <p class="text-subtitle1">
          Clique sobre as cartas que desejar adicionar ao deck
        </p>
      </div>
    <div class="row q-col-gutter-md">
      <div
          v-for="card in cards"
          :key="card.id"
          class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      >
        <CardItem
            :card="card"
            :selected="isSelected(card.id)"
            @toggle="toggleSelect"
        />
      </div>
    </div>

      <SelectionBar
          :count="selectedCount"
          :loading="loadingAction"
          @clear="clearSelection"
          @confirm="addSelectedToDeck"
      />

      <div v-if="!loading && more" class="load-more">
        <q-btn
            icon="arrow_downward"
            unelevated
            color="primary"
            class="btn__primary--pink"
            label="Carregar mais"
            @click="loadMore"
        />
      </div>

    <q-inner-loading :showing="loading">
      <q-spinner size="50px" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { http } from '@/services/api'
import {ApiResponse, Card} from "@/types/card";
import CardItem from "@/components/cards/CardItem.vue";
import SelectionBar from "@/components/cards/SelectionBar.vue";
import {useQuasar} from "quasar";

const cards = ref<Card[]>([])
const loading = ref(false)
const loadingAction = ref(false)
const page = ref(1)
const rpp = ref(10)
const more = ref(false)
const selectedIds = ref<Set<string>>(new Set())
const selectedCount = computed(() => selectedIds.value.size)
const $q = useQuasar()

function isSelected(cardId: string) {
  return selectedIds.value.has(cardId)
}

function toggleSelect(cardId: string) {
  const next = new Set(selectedIds.value)

  if (next.has(cardId)) {
    next.delete(cardId)
  } else {
    next.add(cardId)
  }

  selectedIds.value = next
}

function clearSelection() {
  selectedIds.value = new Set()
}

async function addSelectedToDeck() {
  if (selectedIds.value.size === 0) return

  const payload = {
    cardIds: Array.from(selectedIds.value)
  }

  try {
    loadingAction.value = true

    await http.post('/me/cards', payload)

    $q.notify({
      type: 'positive',
      message: 'Cartas adicionadas ao deck com sucesso!'
    })

    selectedIds.value = new Set()

  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erro ao adicionar cartas.'
    })
  } finally {
    loadingAction.value = false
  }
}

async function fetchCards(reset = false) {
  if (loading.value) return
  loading.value = true

  try {
    if (reset) {
      page.value = 1
      cards.value = []
    }

    const { data } = await http.get<ApiResponse>('/cards', {
      params: {
        rpp: rpp.value,
        page: page.value
      }
    })

    cards.value = reset ? data.list : [...cards.value, ...data.list]

    more.value = data.more
  } finally {
    loading.value = false
  }
}

function loadMore() {
  if (!more.value) return
  page.value++
  fetchCards()
}

onMounted(() => {
  fetchCards(true)
})
</script>

<style lang="scss">
.cards-page {
  min-height: 100%;
  color: #fff;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>