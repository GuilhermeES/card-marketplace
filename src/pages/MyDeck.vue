<template>
  <q-page class="cards-page" padding>
    <div class="text-h4 q-pa-xl text-weight-bold text-title">
      Meu Deck
    </div>
    <div class="row q-col-gutter-md">
      <div
          v-for="card in cards"
          :key="card.id"
          class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      >
        <CardItem :card="card" />
      </div>
    </div>

    <Loader :showing="loading"/>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { http } from '@/services/api'
import {Card} from "@/types/card";
import CardItem from "@/components/cards/CardItem.vue";
import Loader from "@/components/layouts/Loader.vue";

const cards = ref<Card[]>([])
const loading = ref(false)

async function fetchCards(reset = false) {
  if (loading.value) return
  loading.value = true

  try {
    const { data } = await http.get<Card[]>('/me/cards')
    cards.value = data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCards(true)
})
</script>