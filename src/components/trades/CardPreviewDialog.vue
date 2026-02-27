<template>
  <q-dialog v-model="model">
    <q-card class="cardModal">

      <q-card-section class="cardModal__top row items-start justify-between">
        <div class="cardModal__title">
          {{ card?.name }}
        </div>

        <q-btn
            flat
            round
            dense
            icon="close"
            color="white"
            @click="close"
        />
      </q-card-section>

      <q-card-section class="cardModal__content">

        <div class="cardModal__imgWrap" v-if="card">
          <img
              :src="card.imageUrl"
              :alt="card.name"
              class="cardModal__img"
          />
        </div>

        <div class="cardModal__desc" v-if="card?.description">
          {{ card.description }}
        </div>

        <div class="cardModal__desc" v-else>
          Sem descrição.
        </div>

      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types/card'

const props = defineProps<{
  modelValue: boolean
  card: Card | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.cardModal {
  width: min(760px, 92vw);
  border-radius: 18px;
  background: #0f0f14;
  border: 1px solid rgba(255, 255, 255, 0.10);
}

.cardModal__top {
  padding: 14px 14px 0;
}

.cardModal__title {
  color: #fff;
  font-weight: 850;
  letter-spacing: 0.2px;
  font-size: 16px;
  max-width: 90%;
}

.cardModal__content {
  padding: 14px;
}

.cardModal__imgWrap {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cardModal__img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain; /* não corta */
}

.cardModal__desc {
  margin-top: 14px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>