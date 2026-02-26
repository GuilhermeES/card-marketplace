<template>
  <q-layout view="hHh Lpr fFf" class="app-shell">
    <AppHeaderMobile @toggle="toggleDrawer" />

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

    <RegisterDialog
        :model-value="ui.registerOpen"
        @update:model-value="(v: boolean) => !v && ui.closeAuthModal()"
        @go-login="ui.switchToLogin()"
        @success="handleRegister"
    />

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import AppHeaderMobile from '@/components/layouts/AppHeaderMobile.vue'
import RegisterDialog from "@/components/auth/RegisterDialog.vue";
import { useUiStore } from '@/stores/ui.store'

const ui = useUiStore()
const leftDrawerOpen = ref(false)

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function handleRegister(payload: { name: string; email: string; password: string }) {
  ui.closeAuthModal()
}
</script>