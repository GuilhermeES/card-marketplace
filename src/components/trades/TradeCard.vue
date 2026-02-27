<template>
  <q-card class="trade" flat bordered>
    <q-item class="trade__header">
      <q-item-section avatar>
        <q-avatar size="44px" class="trade__avatar">
          <img :src="avatarImage" alt="avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="trade__title ellipsis">
          {{ trade.user?.name || 'Usuário' }}
        </q-item-label>
        <q-item-label caption class="trade__subtitle">
          {{ formatDate(trade.createdAt) }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator class="trade__sep" />

    <div class="trade__body row items-stretch q-col-gutter-md">
      <div class="col-12 col-md-5">
        <div class="trade__block">
          <div class="trade__blockHeader">
            <div class="trade__blockTitle">Está enviando:</div>
          </div>

          <div v-if="offering.length" class="trade__grid">
            <TradeCardItem
                v-for="tc in offering"
                :key="tc.id"
                :card="tc.card"
                @open="openCard"
            />
          </div>

          <div v-else class="trade__empty">
            Nenhuma carta
          </div>
        </div>
      </div>

      <div class="col-12 col-md-2 trade__swapCol">
        <div class="trade__swap">
          <q-icon name="sync" size="30px" class="trade__swapIcon" />
        </div>
      </div>

      <div class="col-12 col-md-5">
        <div class="trade__block">
          <div class="trade__blockHeader">
            <div class="trade__blockTitle">Recebe em troca:</div>
          </div>

          <div v-if="receiving.length" class="trade__grid">
            <TradeCardItem
                v-for="tc in receiving"
                :key="tc.id"
                :card="tc.card"
                @open="openCard"
            />
          </div>

          <div v-else class="trade__empty">
            Nenhuma carta
          </div>
        </div>
      </div>
    </div>

    <CardPreviewDialog
        v-model="cardDialog"
        :card="selectedCard"
    />

    <q-separator class="trade__sep" />
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TradeCardItem from './TradeCardItem.vue'
import type {Card, Trade, TradeCard} from '@/types/card'
import CardPreviewDialog from "@/components/trades/CardPreviewDialog.vue";

import seto from "@/assets/images/setokaiba.jpg";
import joey from "@/assets/images/joey.jpeg";
import yugi from "@/assets/images/yugi.jpg"

const props = defineProps<{
  trade: Trade
}>()

defineEmits<{
  (e: 'open', trade: Trade): void
  (e: 'propose', trade: Trade): void
}>()

const avatars = [seto, joey, yugi]
const randomIndex = Math.floor(Math.random() * avatars.length)
const avatarImage = avatars[randomIndex]

const offering = computed(() =>
    (props.trade.tradeCards || []).filter((t: TradeCard) => t.type === 'OFFERING')
)

const receiving = computed(() =>
    (props.trade.tradeCards || []).filter((t: TradeCard) => t.type === 'RECEIVING')
)

const cardDialog = ref(false)
const selectedCard = ref<Card | null>(null)

function openCard(card: Card) {
  selectedCard.value = card
  cardDialog.value = true
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped lang="scss">
.trade {
  border-radius: 18px;
  background: #0b0c10;
}

.trade__header {
  padding: 12px 12px 10px;
}

.trade__avatar {
  background: $background-color-transparent;
  color: #ffffff;
  box-shadow: 0 0 0 1px rgba(157, 57, 109, 0.25) inset;
}

.trade__avatarText {
  font-weight: 800;
  letter-spacing: 0.6px;
}

.trade__title {
  font-weight: 750;
  font-size: 16px;
  font-family: "Cinzel", serif;
  color: #fff;
  letter-spacing: 0.2px;
}

.trade__subtitle {
  opacity: 0.7;
  color: rgba(255, 255, 255, 0.72);
}

.trade__sep {
  opacity: 0.15;
}

.trade__body {
  padding: 12px;
}

.trade__block {
  border-radius: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
}

.trade__blockHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.trade__blockTitle {
  color: #fff;
  font-weight: 700;
  font-family: "Cinzel", serif;
  letter-spacing: 0.2px;
  opacity: 0.95;
}

.trade__count {
  background: $background-color-transparent;
}

.trade__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.trade__empty {
  opacity: 0.6;
  font-size: 12px;
  padding: 10px 2px;
}

.trade__swapCol {
  display: flex;
}

.trade__swap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;

  @media (max-width: 1023px) {
    padding: 6px 0;
  }
}

.trade__swapIcon {
  opacity: 0.8;
  color: #fff;
}

.trade__footer {
  padding: 12px;
}

.trade__btn {
  border-radius: 14px;
}


</style>