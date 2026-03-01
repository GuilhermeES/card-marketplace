<template>
  <div class="page-header q-pa-xl">
    <div class="page-header__left">
      <div class="page-header__title">
        {{ title }}
      </div>

      <p v-if="subtitle || $slots.subtitle" class="page-header__subtitle">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </p>
    </div>

    <div v-if="$slots.right" class="page-header__right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.page-header__title {
  font-size: 34px;
  font-weight: 800;
  color: white;
  font-family: "Cinzel", serif;
  letter-spacing: 0.6px;
}

.page-header__subtitle {
  font-size: 16px;
  color: white;
  font-family: "Cinzel", serif;
  margin: 0;
}

.page-header__right {
  display: flex;
  align-items: center;
}
</style>