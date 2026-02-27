<template>
  <q-inner-loading :showing="showing">
    <q-spinner :size="size" />
  </q-inner-loading>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
      showing: boolean
      size?: string
    }>(),
    {
      size: '50px'
    }
)
</script>

<style scoped lang="scss">
.q-inner-loading {
  background: #15171e3d;
  color: white;
}
</style>