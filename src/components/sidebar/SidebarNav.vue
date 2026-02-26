<template>
  <q-list class="menu" padding>
    <q-item v-if="auth.isAuthenticated"
        v-for="item in topItems"
        :key="item.label"
        clickable
        v-ripple
        :to="item.to"
        active-class="is-active"
        class="menu__item"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" class="menu__icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="menu__label">
          {{ item.label }}
        </q-item-label>
      </q-item-section>
    </q-item>

   <div v-if="!auth.isAuthenticated">
     <q-btn icon="login" label="Login" class="q-mb-md q-mt-md full-width btn__primary btn__primary--login"  @click="ui.openLogin()"/>
     <q-btn icon="person" label="Registrar" class="full-width btn__primary"  @click="ui.openRegister()"/>
   </div>

  </q-list>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui.store'
import type { SidebarItem } from "@/components/sidebar/sidebar.ts";

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const topItems: SidebarItem[] = [
  { label: "Solicitações de Troca", icon: "home", to: "/" },
];

const ui = useUiStore()
</script>

<style lang="scss">
.menu {
  margin-top: 4px;
  border-top: 1px solid rgba(163, 163, 163, 0.1882352941)
}

.menu__item {
  background-color: #b6105217 !important;
  border-radius: 10px;
  border: 1px solid #b6105294 !important;

  &:first-child{
    margin-top: 8px;
  }
}

.menu__icon {
  opacity: 0.85;
}

.menu__label {
  font-size: 14px;
}

.is-active {
  font-weight: 700;
}

</style>