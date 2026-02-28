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
            selectable
            :selected="selection.has(card.id)"
            @toggle="selection.toggle"
        />
      </div>
    </div>

      <SelectionBar
          :count="selection.count.value"
          :loading="loadingAction"
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

    <Loader :showing="loading"/>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {Card} from "@/types/card";
import CardItem from "@/components/cards/CardItem.vue";
import SelectionBar from "@/components/cards/SelectionBar.vue";
import {useQuasar} from "quasar";
import Loader from "@/components/layouts/Loader.vue";
import {usePaginatedList} from "@/composables/usePaginatedList";
import {addCardsToDeck, getCards} from "@/services/cards.service";
import {useSelectionSet} from "@/composables/useSelectionSet";

const $q = useQuasar()
const loadingAction = ref(false)
const selection = useSelectionSet<string>()

async function addSelectedToDeck() {
  if (selection.count.value === 0) return

  try {
    loadingAction.value = true
    await addCardsToDeck(selection.toArray())

    $q.notify({ type: 'positive', message: 'Cartas adicionadas ao deck com sucesso!' })
    selection.clear()
  } catch (error: any) {
    $q.notify({ type: 'negative', message: error?.response?.data?.message || 'Erro ao adicionar cartas.'})
  } finally {
    loadingAction.value = false
  }
}

const { items: cards, more, loading, fetch, loadMore } = usePaginatedList<Card>(getCards, { rpp: 12 })


onMounted(() => {
  fetch(true)
})
</script>