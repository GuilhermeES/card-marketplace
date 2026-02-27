<template>
  <q-card
      class="card-item"
      flat
      bordered
      clickable
      @click="$emit('toggle', card.id)"
  >
    <q-img
        :src="card.imageUrl"
        ratio="0.72"
        class="card-img"
        spinner-color="white"
    />

    <q-card-section class="card-body">
      <div class="card-name ellipsis-2-lines">{{ card.name }}</div>
      <div class="card-desc">{{ card.description }}</div>
    </q-card-section>

    <q-btn
        v-if="selectable"
        :icon="selected ? 'check' : 'add'"
        :label="selected ? 'Adicionado' : 'Adicionar ao Deck'"
        class="btn-add q-ma-md btn__primary"
        :class="{ 'btn__primary--pink': selected }"
        unelevated
        @click.stop="$emit('toggle', card.id)"
    />

    <div v-if="selected" class="selected-overlay"></div>
  </q-card>
</template>

<script setup lang="ts">
import type { Card } from '@/types/card'

const props = withDefaults(
    defineProps<{
      card: Card
      selected?: boolean
      selectable?: boolean
    }>(),
    {
      selected: false,
      selectable: false
    }
)

const emit = defineEmits<{
  (e: 'toggle', id: string): void
}>()

function handleClick() {
  emit('toggle', props.card.id)
}
</script>

<style lang="scss" scoped>
.card-item {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background: $background-color;
  border-color: rgba(255,255,255,.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: 0.5s all;
  
  &:hover{
    cursor: pointer;
    transform: scale(1.02);
  }
}

.card-body {
  padding: 12px;
  flex: 1;
}

.card-desc {
  font-size: 12px;
  opacity: .7;
}

.card-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom:10px;
}

.btn-add {
  font-size: 12px;
  margin: 12px;
}

.selected-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>