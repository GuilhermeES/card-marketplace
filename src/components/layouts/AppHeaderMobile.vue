<template>
  <q-header elevated class="app-header" v-if="$q.screen.lt.md">
    <q-toolbar>
      <q-btn flat dense round icon="menu" @click="$emit('toggle')" />
      <q-toolbar-title />
    </q-toolbar>
  </q-header>
</template>

<script setup>
defineEmits(['toggle'])
</script>

<style scoped lang="scss">
.app-header {
  background: $background-color;
  backdrop-filter: blur(12px);
}
</style>