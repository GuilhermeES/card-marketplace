<template>
  <q-slide-transition>
    <div v-if="count > 0" class="selection-bar">
      <div class="selection-bar__content">

        <div class="selection-bar__info">
          {{ count }} selecionada{{ count > 1 ? 's' : '' }}
        </div>

        <div class="selection-bar__actions">
          <q-btn
              unelevated
              color="primary"
              icon="style"
              class="btn__primary--pink"
              label="Adicionar ao deck"
              :loading="loading"
              :disable="loading"
              @click="$emit('confirm')"
          />
        </div>

      </div>
    </div>
  </q-slide-transition>
</template>

<script setup lang="ts">
defineProps<{
  count: number,
  loading?: boolean
}>()

defineEmits<{
  (e: 'clear'): void
  (e: 'confirm'): void
}>()
</script>

<style lang="scss">
.selection-bar {
  position: sticky;
  bottom: 0;
  z-index: 10;
  margin-top: 18px;
  padding: 12px 0;
}

.selection-bar__content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 14px 18px;
  border-radius: 14px;
  background: $background-color;
  border: 1px solid rgba(255,255,255,0.10);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.selection-bar__info {
  font-weight: 600;
}

.selection-bar__actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 600px) {
  .selection-bar__content {
    flex-direction: column;
    align-items: stretch;
  }

  .selection-bar__actions {
    justify-content: flex-end;
  }
}
</style>