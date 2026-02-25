<template>
  <q-layout view="hHh Lpr fFf" class="app-shell">

    <q-header elevated class="app-header" v-if="$q.screen.lt.md">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            icon="menu"
            @click="toggleDrawer"
        />
        <q-toolbar-title></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="280"
        :breakpoint="1024"
        class="app-drawer"
    >
      <Sidebar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import Sidebar from "@/components/sidebar/Sidebar.vue";

const $q = useQuasar();

const leftDrawerOpen = ref($q.screen.gt.md);

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped lang="scss">
.app-header {
  background: $background-color;
  backdrop-filter: blur(12px);
}

.app-drawer {
  background: $background-color;
  backdrop-filter: blur(14px);
  border-right: 1px solid #000000d6;
}
</style>