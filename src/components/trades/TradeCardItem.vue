<template>
  <div class="cardItem" @click="$emit('open', card)">
    <div class="cardItem__imgWrap">
      <img :src="card.imageUrl" :alt="card.name" class="cardItem__img" />
    </div>

    <div class="cardItem__name">
      {{ card.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/card'

defineProps<{ card: Card }>()

defineEmits<{
  (e: 'open', card: Card): void
}>()
</script>

<style scoped lang="scss">
.cardItem {
  cursor: pointer;
  user-select: none;
  padding: 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(157, 57, 109, 0.35);
  }
}

.cardItem__imgWrap {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
}

.cardItem__img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.cardItem__name {
  margin-top: 10px;
  color: #fff;
  font-size: 13px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>