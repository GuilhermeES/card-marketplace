<template>
  <q-card class="panel">
    <q-card-section class="panel__head">
      <div class="panel__title">
        <q-icon
            v-if="icon"
            :name="icon"
            size="18px"
            class="q-mr-sm panel__icon"
        />
        {{ title }}
        <q-badge v-if="count" rounded class="q-ml-sm">
          {{ count }}
        </q-badge>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="panel__body">
      <div class="row q-col-gutter-sm">
        <div
            v-for="card in cards"
            :key="card.id"
            :class="colClass"
        >
          <CardItem
              :card="card"
              selectable
              :selected="isSelected(card.id)"
              add-label="Adicionar"
              @toggle="() => emit('toggle', card.id)"
          />
        </div>

        <div v-if="!loading && !cards.length" class="text-caption q-pa-sm text-grey-6">
          Nenhuma carta encontrada.
        </div>
      </div>

      <div v-if="showLoadMore" class="row justify-center q-mt-md">
        <div class="load-more">
          <q-btn
              icon="arrow_downward"
              unelevated
              color="primary"
              class="btn__primary--pink"
              label="Carregar mais"
              @click="emit('load-more')"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>

  <Loading :showing="loading" size="34px" />
</template>

<script setup lang="ts">
import type { Card } from '@/types/card'
import CardItem from '@/components/cards/CardItem.vue'
import Loading from '@/components/layouts/Loader.vue'

const props = defineProps<{
  title: string
  icon?: string
  count: number
  cards: Card[]
  loading: boolean
  colClass: string
  isSelected: (id: string) => boolean
  showLoadMore?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'load-more'): void
}>()
</script>

<style scoped lang="scss">
.panel {
  background: $background-color;
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  color: rgba(255, 255, 255, 0.92);
}

.panel__head {
  padding: 12px 14px !important;
}

.panel__title {
  font-weight: 900;
  font-family: "Cinzel", serif;
  letter-spacing: 0.3px;
  font-size: 16px;
}

.panel__body {
  padding: 12px 14px 14px !important;
  position: relative;
}

.q-separator {
  opacity: 0.12;
}

.q-badge{
  background: $dark-pink;
}
</style>